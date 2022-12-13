import { initializeApp, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { v4 } from "uuid";
import {
  FirestoreConfig,
  FirestoreInsertPayload,
  FirestoreRemovePayload,
  FirestoreUpdatePayload,
} from "./lib/types";

export const createClient = async (config: FirestoreConfig) => {
  const appName = v4();

  initializeApp(
    {
      credential: cert(JSON.parse(config.SERVICE_ACCOUNT_CONFIG)),
    },
    appName,
  );

  const db = getFirestore(getApp(appName));

  return db;
};

export const insert = async (
  client: FirebaseFirestore.Firestore,
  payload: FirestoreInsertPayload,
) => {
  const {
    collection,
    id = v4().replace(/-/g, ""),
    data,
    options = {},
  } = payload;

  const result = await client
    .collection(collection)
    .doc(id)
    .set({ ...data }, options);

  return result;
};

export const update = async (
  client: FirebaseFirestore.Firestore,
  payload: FirestoreUpdatePayload,
) => {
  const { collection, id, data } = payload;

  const doc = await client.collection(collection).doc(id).get();

  if (!doc.exists) throw new Error("Document Not Found");

  const result = await client.collection(collection).doc(id).update(data);

  return result;
};

export const remove = async (
  client: FirebaseFirestore.Firestore,
  payload: FirestoreRemovePayload,
) => {
  const { collection, id } = payload;

  const doc = await client.collection(collection).doc(id).get();

  if (!doc.exists) throw new Error("Document Not Found");

  const result = await client.collection(collection).doc(id).delete();

  return result;
};

export const disconnect = async (client: FirebaseFirestore.Firestore) => {
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
          client: FirebaseFirestore.Firestore,
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

            await methods["disconnect"](client);

            return result;
          } catch (error) {
            console.log("Error occured ===> ", error);
            throw error;
          }
        };
      }

      throw new Error(`Method ${propAsString} not found`);
    },
  });
};

export default getProxyDriver;
