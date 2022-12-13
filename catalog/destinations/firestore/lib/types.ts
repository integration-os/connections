import 'firebase/firestore';

export type FirestoreConfig = {
  SERVICE_ACCOUNT_CONFIG: string;
};

export type FirestoreInsertPayload = {
  collection: string;
  id?: string;
  data: Record<string, unknown>;
  options?: FirebaseFirestore.SetOptions;
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
