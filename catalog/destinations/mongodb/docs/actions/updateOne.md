### Update One

Updates a single document within the collection based on the filter.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/)

***Parameters***

- **`collection`** - MongoDB collection name
  - Type: `String`
  - Default: `""`
  - Required: `true`
- **`filter`** - The selection criteria for the update
  - Type: `Object`
  - Default: `[]`
  - Required: `true`
- **`payload`** - The modifications to apply
  - Type: `Object`
  - Default: `{}`
  - Required: `true`
- **`options`** - Additional options
  - Type: `Object`
  - Default: `{}`
  - Required: `false`

***Sample Payload***

```js
{
  collection: "posts",
  filter: {
    _id: ObjectId("636c1406dfc1c70029bcb8ea)
  },
  payload: {
    description: "My updated blog post description..."
  }
}
```

***Sample Response***

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
