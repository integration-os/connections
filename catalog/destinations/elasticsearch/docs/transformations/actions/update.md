### Update

Updates a document with a script or partial document.

[Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html)

**Types**

```ts
export interface UpdateRequest<TDocument = unknown, TPartialDocument = unknown> extends RequestBase {
    id: Id;
    index: IndexName;
    if_primary_term?: long;
    if_seq_no?: SequenceNumber;
    lang?: string;
    refresh?: Refresh;
    require_alias?: boolean;
    retry_on_conflict?: integer;
    routing?: Routing;
    timeout?: Duration;
    wait_for_active_shards?: WaitForActiveShards;
    _source_excludes?: Fields;
    _source_includes?: Fields;
    /** @deprecated The use of the 'body' key has been deprecated, move the nested keys to the top level object. */
    body?: {
        detect_noop?: boolean;
        doc?: TPartialDocument;
        doc_as_upsert?: boolean;
        script?: Script;
        scripted_upsert?: boolean;
        _source?: SearchSourceConfig;
        upsert?: TDocument;
    };
}
```

**Sample Payload**

```js
{
  index: 'test-ai3mr',
  id: '4DOKnYUBuLF5sHDjKqlh',
  doc: {
    character: 'Daenerys Targaryen',
    quote: 'I am the blood of the winter dragon.'
  }
}
```

**Sample Response**

```json
{
  "_index": "test-ai3mr",
  "_id": "4DOKnYUBuLF5sHDjKqlh",
  "_version": 2,
  "result": "updated",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 3,
  "_primary_term": 1
}
```
