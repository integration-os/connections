### Index

Creates or updates a document in an index.

[Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html)

**Types**

```ts
export interface IndexRequest<TDocument = unknown> extends RequestBase {
    id?: Id;
    index: IndexName;
    if_primary_term?: long;
    if_seq_no?: SequenceNumber;
    op_type?: OpType;
    pipeline?: string;
    refresh?: Refresh;
    routing?: Routing;
    timeout?: Duration;
    version?: VersionNumber;
    version_type?: VersionType;
    wait_for_active_shards?: WaitForActiveShards;
    require_alias?: boolean;
    document?: TDocument;
}
```

**Sample Payload**

```js
{
  index: 'test-0ts2t',
  document: { character: 'Ned Stark', quote: 'Winter is coming.' }
}
```

**Sample Response**

```json
{
  "_index": "test-0ts2t",
  "_id": "4jOOnYUBuLF5sHDjgqnO",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 0,
  "_primary_term": 1
}
```
