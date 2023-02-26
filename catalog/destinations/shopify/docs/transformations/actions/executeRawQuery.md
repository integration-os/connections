### Update Data

Executes an arbitrary GoogleSQL statement.

[Documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)

**Types**

```typescript
export interface IBigQueryRawQuery {
  query: string;
}
```

**Sample Payload**

```json
{
  "query": "SELECT name FROM `bigquery-public-data.usa_names.usa_1910_2013` WHERE state = 'TX' LIMIT 1"
}
```

**Sample Response**
```json
[[ { "name": "Ruby" } ]]
```