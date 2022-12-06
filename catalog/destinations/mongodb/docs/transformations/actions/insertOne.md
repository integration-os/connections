### Insert One

Inserts a single document into a collection.

[Documentation](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/)

**Types**

```ts
interface InsertOnePayload {
  collection: string;
  document: object;
  options?: object;
}
```

**Sample Payload**

```js
{
  collection: "posts",
  document: {
    name: "My blog post",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: new Date().getTime() 
  }
}
```

**Sample Response**

```json
{
  "data": {
    "acknowledged": true,
    "insertedId": "636c1406dfc1c70029bcb8ea"
  },
  "status": 200
}
```
