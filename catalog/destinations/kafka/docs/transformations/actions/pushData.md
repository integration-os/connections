### Push Data

Allows to push data into a Kafka topic

[Documentation](https://kafka.apache.org/quickstart)

**Types**

```typescript
interface IKafkaPushData {
  topic: string;
  data: string | string[] | Buffer | Buffer[] | AnyObject | AnyObject[];
  headers?: AnyObject;
  partition?: number;
  key?: string;
  timestamp?: number;
}
```

**Sample Payload**
```json
{
  "topic": "topic_0",
  "data": [{ 
    "id": 1, 
    "name": "John Doe" 
  }],
  "headers": {
    "header1": "value1",
    "header2": "value2"
  },
  "partition": 3,
  "key": "1"
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
