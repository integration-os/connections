### Insert One

Inserts a single document into a collection.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/)

***Parameters***

- **`collection`** - MongoDB collection name
  - Type: `String`
  - Default: `""`
  - Required: `true`
- **`payload`** - Record to insert into collection
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
  payload: {
    name: "My blog post",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: new Date().getTime() 
  }
}
```

***Sample Response***

```json
{
  "data": {
    "acknowledged": true,
    "insertedId": "636c1406dfc1c70029bcb8ea"
  },
  "status": 200
}
```
