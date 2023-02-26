### Update Data

Updates row(s) values from a BigQuery table

[Documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax)

**Types**

```typescript
interface IBigQueryUpdate {
  dataset: string;
  table: string;
  set: string[] | AnyObject
  filters: string;
}
```

**Sample Payload**

Changeset can be set as an object:

```json
{
    "dataset": "datasetName",
    "table": "tableName",
    "filters": "name=\"Jon Doe\" AND age > 20 OR location LIKE %Canada%",
    "set": { "id": 1, "name": "John Doe" }
}
```

Or as an array of SQL-Like assignments

```json
{
    "dataset": "datasetName",
    "table": "tableName",
    "filters": "name=\"Jon Doe\" AND age > 20 OR location LIKE %Canada%",
    "set": ["id=1", "name=\"John Doe\""]
}
```

**Sample Response**
```json
[ [] ]
```