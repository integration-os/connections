### Insert Data

Allows to insert row(s) into a BigQuery table

[Documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax)

**Types**

```typescript
interface IBigQueryInsert {
  dataset: string;
  table: string;
  data: AnyObject[]
  options?: {
    ignoreUnknownValues?: boolean;
    kind?: string;
    rows?: Array<{
      insertId?: string;
      json?: IJsonObject;
    }>;
    skipInvalidRows?: boolean;
    templateSuffix?: string;
    createInsertId?: boolean;
    partialRetries?: number;
    raw?: boolean;
    schema?: string | {};
  }
}
```

**Sample Payload**
```json
{
    "dataset": "datasetName",
    "table": "tableName",
    "data": [{ "id": 1, "name": "John Doe" }],
    "options": {
      "raw": false
    }
}
```

**Sample Response**
```json
[ { "kind": "bigquery#tableDataInsertAllResponse" } ]
```