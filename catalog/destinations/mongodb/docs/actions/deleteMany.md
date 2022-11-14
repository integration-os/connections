### Delete Many

Removes all documents that match the filter from a collection.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/)

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
    category: "technology"
  }
}
```

***Sample Response***

```json
{
  "data": {
    "acknowledged": true,
    "deletedCount": 5
  },
  "status": 200
}
```
