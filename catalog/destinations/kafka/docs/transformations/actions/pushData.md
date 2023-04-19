### Insert Data

Allows to insert row(s) into a BigQuery table

[Documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax)

**Types**

```typescript
interface IKafkaPushData {
  topic: string;
  data: string | string[] | Buffer | Buffer[] | AnyObject | AnyObject[];
}
```

**Sample Payload**
```json
{
    "topic": "topic_0",
    "data": [{ "id": 1, "name": "John Doe" }]
}
```

**Sample Response**
```json
[
  {
    "topicName": "topic_0",
    "partition": 3,
    "errorCode": 0,
    "baseOffset": "2",
    "logAppendTime": "-1",
    "logStartOffset": "0"
  }
]
```
