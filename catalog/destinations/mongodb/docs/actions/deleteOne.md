### Delete One

Removes a single document from a collection.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/)

***Parameters***

- **`collection`** - MongoDB collection name
  - Type: `String`
  - Default: `""`
  - Required: `true`
- **`filter`** - The selection criteria for the delete
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
    _id: ObjectId("636c1406dfc1c70029bcb8ea")
  }
}
```

***Sample Response***

```json
{
  "data": {
    "acknowledged": true,
    "deletedCount": 1
  },
  "status": 200
}
```
