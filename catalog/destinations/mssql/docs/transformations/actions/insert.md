### Insert

Insert one or more rows into an MSSQL table.

[Documentation](https://knexjs.org/guide/query-builder.html#insert)

**Types**

```ts
interface InsertPayload {
  tableName: string;
  data: object | object[];
  returning: string[];
  options: object ;
}
```

**Sample Payload**

```js
{
  tableName: "posts",
  data: [
    {
      name: "My blog post",
      description: "Lorem ipsum dolor sit amet.",
    }
  ]
}
```

**Sample Response**

```json
{
  "data": {
    
  },
  "status": 200
}
```
