### Update Many

Updates all documents that match the specified filter for a collection.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/)

**Types**

```ts
interface UpdateManyPayload {
  collection: string;
  filter: object;
  update: object;
  options?: object;
}
```

***Sample Payload***

```js
{
  collection: "posts",
  filter: {
    name: "My blog post"
  },
  update: {
    $set: {
      name: "My updated blog post"
    }
  }
}
```

***Sample Response***

```json
{
  "data": {
    "acknowledged": true,
    "matchedCount": 2,
    "modifiedCount": 2
  },
  "status": 200
}
```
