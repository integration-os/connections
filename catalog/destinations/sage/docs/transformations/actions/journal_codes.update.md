### Update Journal Code

Update an existing journal code.

[Documentation](https://developer.sage.com/accounting/reference/accounting/#tag/Journal-Codes/operation/putJournalCodesKey)

**Types**

```ts
interface ActionPayload {
  id?: string;
  params?: AnyObject;
  body?: AnyObject;
}
```

**Sample Payload**

```json
{
  "id": "string",
  "body": {
    "journal_code": {
      "name": "string",
      "code": "string",
      "journal_code_type_id": "string",
      "control_name": "string",
      "reserved": true
    }
  }
}
```

**Sample Response**
```json
{
  "id": "string",
  "displayed_as": "string",
  "$path": "string",
  "created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z",
  "name": "string",
  "code": "string",
  "journal_code_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "control_name": "string",
  "reserved": true
}
```


