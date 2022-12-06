### Update One

Updates a single document within the collection based on the filter.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/)

**Types**

```ts
interface UpdateOnePayload {
  collection: string;
  filter: object;
  update: object;
  options?: object;
}
```

**Sample Payload**

```js
{
  collection: "posts",
  filter: {
    _id: ObjectId("636c1406dfc1c70029bcb8ea")
  },
  update: {
    $set: {
      description: "My updated blog post description..."
    }
  }
}
```

**Sample Response**

```json
{
  "data": {
    "acknowledged": true,
    "matchedCount": 1,
    "modifiedCount": 1
  },
  "status": 200
}
```
