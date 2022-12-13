### Delete

Removes a single document from a collection.

[Documentation](https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference#delete)

**Types**

```ts
interface DeletePayload {
  collection: string;
  id: string;
}
```

**Sample Payload**

```js
{
  collection: "posts",
  id: "636c1406dfc1c70029bcb8ea"
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
