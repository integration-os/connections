### Update Many

Updates all documents that match the specified filter for a collection.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/)

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
    name: "My blog post"
  },
  payload: {
    name: "My updated blog post"
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
