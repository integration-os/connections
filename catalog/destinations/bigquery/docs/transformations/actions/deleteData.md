### Update Data

Deletes row(s) from a BigQuery table

[Documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax)

**Types**

```typescript
interface IBigQueryDelete {
  dataset: string;
  table: string;
  filters: string;
}
```

**Sample Payload**

```json
{
    "dataset": "datasetName",
    "table": "tableName",
    "filters": "name=\"Jon Doe\" AND age > 20 OR location LIKE %Canada%"
}
```

**Sample Response**
```json
[ [] ]
```