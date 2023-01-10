### Delete Many

Removes all documents that match the filter from a collection.

[Documentation](https://www.elasticsearch.com/docs/manual/reference/method/db.collection.deleteMany/)

**Types**

```ts
interface DeleteManyPayload {
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
    category: "technology"
  }
}
```

**Sample Response**

```json
{
  "data": {
    "acknowledged": true,
    "deletedCount": 5
  },
  "status": 200
}
```
