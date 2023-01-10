### Bulk

Allows to perform multiple index/update/delete operations in a single request.

[Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html)

**Types**

```ts
export interface BulkRequest<TDocument = unknown, TPartialDocument = unknown> extends RequestBase {
    index?: IndexName;
    pipeline?: string;
    refresh?: Refresh;
    routing?: Routing;
    _source?: SearchSourceConfigParam;
    _source_excludes?: Fields;
    _source_includes?: Fields;
    timeout?: Duration;
    wait_for_active_shards?: WaitForActiveShards;
    require_alias?: boolean;
    operations?: (BulkOperationContainer | BulkUpdateAction<TDocument, TPartialDocument> | TDocument)[];
}
```

**Sample Payload**

```js
{
  operations: [
    {
      "index": {
        "_index": "tweets-xjy75"
      }
    },
    {
      "id": 1,
      "text": "If I fall, don't bring me back.",
      "user": "jon",
      "date": "2023-01-10T21:08:57.906Z"
    },
    {
      "index": {
        "_index": "tweets-xjy75"
      }
    },
    {
      "id": 2,
      "text": "Winter is coming",
      "user": "ned",
      "date": "2023-01-10T21:08:57.906Z"
    },
    {
      "index": {
        "_index": "tweets-xjy75"
      }
    },
    {
      "id": 3,
      "text": "A Lannister always pays his debts.",
      "user": "tyrion",
      "date": "2023-01-10T21:08:57.906Z"
    },
    {
      "index": {
        "_index": "tweets-xjy75"
      }
    },
    {
      "id": 4,
      "text": "I am the blood of the dragon.",
      "user": "daenerys",
      "date": "2023-01-10T21:08:57.906Z"
    },
    {
      "index": {
        "_index": "tweets-xjy75"
      }
    },
    {
      "id": 5,
      "text": "A girl is Arya Stark of Winterfell. And I'm going home.",
      "user": "arya",
      "date": "2023-01-10T21:08:57.906Z"
    }
  ]
}
```

**Sample Response**

```json


{
  "took": 35,
  "errors": false,
  "items": [
    {
      "index": {
        "_index": "tweets-xjy75",
        "_id": "2jODnYUBuLF5sHDjyane",
        "_version": 1,
        "result": "created",
        "forced_refresh": true,
        "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
        },
        "_seq_no": 0,
        "_primary_term": 1,
        "status": 201
      }
    },
    {
      "index": {
        "_index": "tweets-xjy75",
        "_id": "2zODnYUBuLF5sHDjyane",
        "_version": 1,
        "result": "created",
        "forced_refresh": true,
        "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
        },
        "_seq_no": 1,
        "_primary_term": 1,
        "status": 201
      }
    },
    {
      "index": {
        "_index": "tweets-xjy75",
        "_id": "3DODnYUBuLF5sHDjyane",
        "_version": 1,
        "result": "created",
        "forced_refresh": true,
        "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
        },
        "_seq_no": 2,
        "_primary_term": 1,
        "status": 201
      }
    },
    {
      "index": {
        "_index": "tweets-xjy75",
        "_id": "3TODnYUBuLF5sHDjyane",
        "_version": 1,
        "result": "created",
        "forced_refresh": true,
        "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
        },
        "_seq_no": 3,
        "_primary_term": 1,
        "status": 201
      }
    },
    {
      "index": {
        "_index": "tweets-xjy75",
        "_id": "3jODnYUBuLF5sHDjyane",
        "_version": 1,
        "result": "created",
        "forced_refresh": true,
        "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
        },
        "_seq_no": 4,
        "_primary_term": 1,
        "status": 201
      }
    }
  ]
}


```
