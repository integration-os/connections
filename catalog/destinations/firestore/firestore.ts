import { cert, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { v4 } from "uuid";
import { firestore } from "firebase-admin";
import { FirestoreConfig, FirestoreInsertPayload, FirestoreRemovePayload, FirestoreUpdatePayload } from "./lib/types";

export const createClient = async (config: FirestoreConfig) => {
  const appName = v4();

  initializeApp(
    {
      credential: cert(JSON.parse(config.SERVICE_ACCOUNT_CONFIG)),
    },
    appName,
  );

  return getFirestore(getApp(appName));
};

export const insert = async (
  client: firestore.Firestore,
  payload: FirestoreInsertPayload,
) => {
  const {
    collection,
    id = v4().replace(/-/g, ""),
    data,
    options = {},
  } = payload;

  return client
    .collection(collection)
    .doc(id)
    .set({ ...data }, options);
};

export const update = async (
  client: firestore.Firestore,
  payload: FirestoreUpdatePayload,
) => {
  const { collection, id, data } = payload;

  const doc = await client.collection(collection).doc(id).get();

  if (!doc.exists) throw new Error("Document Not Found");

  return client.collection(collection).doc(id).update(data);
};

export const remove = async (
  client: firestore.Firestore,
  payload: FirestoreRemovePayload,
) => {
  const { collection, id } = payload;

  const doc = await client.collection(collection).doc(id).get();

  if (!doc.exists) throw new Error("Document Not Found");

  return client.collection(collection).doc(id).delete();
};

export const disconnect = async (client: firestore.Firestore) => {
  await client.terminate();
};

export const testConnection = async (config: FirestoreConfig) => {
  const client = await createClient(config);

  try {
    // Test the connection by trying to list
    const query = client.collection("buildable-test-connection");

    await query.get();

    return {
      success: true,
      message: "Connection tested successfully!",
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const getProxyDriver = (config: FirestoreConfig) => {
  return new Proxy(() => {}, {
    get: (target, prop) => {
      const whitelistedMethods = [
        "insert",
        "update",
        "remove",
        "testConnection",
      ];

      const methods: {
        [key: string]: (
          client: firestore.Firestore,
          payload?: unknown,
        ) => Promise<unknown>;
      } = {
        disconnect,
        insert,
        update,
        remove,
      };

      const propAsString = prop as string;

      if (whitelistedMethods.includes(propAsString)) {
        // Establish and close connection for each method call
        return async (payload: unknown) => {
          try {
            // Do not connect and disconnect for testConnection
            if (prop === "testConnection") {
              return await testConnection(config);
            }

            const client = await createClient(config);

            const result = await methods[propAsString](client, payload);

            await methods.disconnect(client);

            return result;
          } catch (error) {
            console.log("Error occurred ===> ", error);
            throw error;
          }
        };
      }

      throw new Error(`Method ${propAsString} not found`);
    },
  });
};

export default getProxyDriver;
