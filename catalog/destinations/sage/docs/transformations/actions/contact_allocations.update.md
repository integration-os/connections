### Update Contact Allocations

Update an existing contact allocation for a contact.

[Documentation](https://developer.sage.com/accounting/reference/payments/#tag/Contact-Allocations/operation/putContactAllocationsKey)

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
    "contact_allocation": {
      "transaction_type_id": "string",
      "contact_id": "string",
      "date": "2019-08-24",
      "allocated_artefacts": [
        {
          "artefact_id": "string",
          "amount": 0
        }
      ]
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
  "links": [
    {
      "href": "string",
      "rel": "string",
      "type": "string"
    }
  ],
  "transaction": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "transaction_type": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "deleted_at": "2019-08-24T14:15:22Z",
  "date": "2019-08-24",
  "contact": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "allocated_artefacts": [
    {
      "id": "string",
      "artefact": {
        "id": "string",
        "displayed_as": "string",
        "$path": "string",
        "links": [
          {
            "href": "string",
            "rel": "string",
            "type": "string"
          }
        ]
      },
      "amount": 0
    }
  ]
}
```
