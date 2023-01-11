### Delete

Removes a document from the index.

[Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html)

**Types**

```ts
export interface DeleteRequest extends RequestBase {
    id: Id;
    index: IndexName;
    if_primary_term?: long;
    if_seq_no?: SequenceNumber;
    refresh?: Refresh;
    routing?: Routing;
    timeout?: Duration;
    version?: VersionNumber;
    version_type?: VersionType;
    wait_for_active_shards?: WaitForActiveShards;
}
```

**Sample Payload**

```js
{
  index: "my-index-000001",
  id: 1
}
```

**Sample Response**

```json
{
  "_shards": {
    "total": 2,
    "failed": 0,
    "successful": 2
  },
  "_index": "my-index-000001",
  "_id": "1",
  "_version": 2,
  "_primary_term": 1,
  "_seq_no": 5,
  "result": "deleted"
}


```
