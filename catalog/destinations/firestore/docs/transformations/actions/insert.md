### Insert

Inserts a single document into a collection.

[Documentation](https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference#set)

**Types**

```ts
interface InsertPayload {
  collection: string;
  id?: string;
  data: Record<string, unknown>;
  options?: FirebaseFirestore.SetOptions;
}
```

**Sample Payload**

```js
{
  collection: "posts",
  data: {
    name: "My blog post",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: new Date().getTime() 
  }
}
```

**Sample Response**

```json
{
  "data": {
    "_writeTime": {
      "_seconds": 1670891013,
      "_nanoseconds": 16074000
    }
  },
  "status": 200
}
```
