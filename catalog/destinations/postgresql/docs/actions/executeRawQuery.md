### Execute Raw Query

Execute a raw SQL query on a PostgreSQL table.

[Documentation](https://knexjs.org/guide/raw.html#raw-queries)

**Types**

```ts
interface ExecuteRawQueryPayload {
  statement: string,
  maxLimit: number = 100 // Max 250
}
```

**Sample Payload**

```js
{
  statement: "INSERT INTO names (name) VALUES ('John Doe');",
  maxLimit: 10
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
