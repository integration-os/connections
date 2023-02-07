import { firestore } from "firebase-admin";

export type FirestoreConfig = {
  SERVICE_ACCOUNT_CONFIG: string;
};

export type FirestoreInsertPayload = {
  collection: string;
  id?: string;
  data: Record<string, unknown>;
  options?: firestore.Firestore;
}

export type FirestoreUpdatePayload = {
  collection: string;
  id?: string;
  data: Record<string, unknown>;
}

export type FirestoreRemovePayload = {
  collection: string;
  id: string;
}
