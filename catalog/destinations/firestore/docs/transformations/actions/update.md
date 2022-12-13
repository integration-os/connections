### Update

Updates a single document within the collection based on the filter.

[Documentation](https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference#update)

**Types**

```ts
interface UpdatePayload {
  collection: string;
  id?: string;
  data: Record<string, unknown>;
}
```

**Sample Payload**

```js
{
  collection: "posts",
  id: "636c1406dfc1c70029bcb8ea",
  data: {
    title: "Updated title"
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
