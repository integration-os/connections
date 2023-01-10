### Delete One

Removes a single document from a collection.

[Documentation](https://www.elasticsearch.com/docs/manual/reference/method/db.collection.deleteOne/)

**Types**

```ts
interface DeleteOnePayload {
  collection: string;
  filter: object;
  options?: object;
}
```

**Sample Payload**

```js
{
  collection: "posts",
  filter: {
    _id: ObjectId("636c1406dfc1c70029bcb8ea")
  }
}
```

**Sample Response**

```json
{
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  },
  "status": 200
}
```
