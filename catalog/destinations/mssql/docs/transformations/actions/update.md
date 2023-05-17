### Update

Update queried rows in an MSSQL table.

[Documentation](https://knexjs.org/guide/query-builder.html#update)

**Types**

```ts
interface UpdatePayload {
  tableName: string;
  query: object;
  data: object;
  returning: string[];
  options: object ;
}
```

**Sample Payload**

```js
{
  tableName: "posts",
  query: {
    _id: 1
  },
  data: {
    name: "John Doe"
  }
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
