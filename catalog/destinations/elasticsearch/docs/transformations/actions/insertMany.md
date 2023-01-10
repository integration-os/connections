### Insert Many

Inserts multiple documents into a collection.

[Documentation](https://www.elasticsearch.com/docs/manual/reference/method/db.collection.insertMany/)

**Types**

```ts
interface InsertManyPayload {
  collection: string;
  documents: object;
  options?: object;
}
```

**Sample Payload**

```js
{
  collection: "posts",
  documents: [
    {
      name: "My blog post",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: new Date().getTime() 
    },
    {
      name: "My blog post 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      createdAt: new Date().getTime() 
    }
  ]
}
```

**Sample Response**

```json
{
  "data": {
    "acknowledged": true,
    "insertedIds": [
      "629518e0f69d06001298dac6",
      "629518e0c89a200014db1234"
    ]
  },
  "status": 200
}
```
