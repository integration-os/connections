### Create Attachment

Create a new attachment for a contact.

[Documentation](https://developer.sage.com/accounting/reference/attachments/#tag/Attachments)

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
  "body": {
    "attachment": {
      "file": "string",
      "file_name": "string",
      "mime_type": "string",
      "description": "string",
      "file_extension": "string",
      "transaction_id": "string",
      "file_size": 2621440,
      "attachment_context_type_id": "string",
      "attachment_context_id": "string",
      "is_public": true
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
  "deleted_at": "2023-05-28T18:43:32.558Z",
  "file": "string",
  "mime_type": "string",
  "description": "string",
  "file_extension": "string",
  "transaction": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "file_size": 0,
  "file_name": "string",
  "$file_path": "string",
  "attachment_context_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "attachment_context": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "is_public": true,
  "created_at": "2023-05-28T18:43:32.558Z",
  "updated_at": "2023-05-28T18:43:32.558Z"
}
```
