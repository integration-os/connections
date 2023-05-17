### Delete

Delete queried rows in an MSSQL table.

[Documentation](https://knexjs.org/guide/query-builder.html#del-delete)

**Types**

```ts
interface DeletePayload {
  tableName: string;
  query: object;
}
```

**Sample Payload**

```js
{
  tableName: "posts",
  query: {
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
