### Create Contact Persons

Create a new contact person for a contact.

[Documentation](https://developer.sage.com/accounting/reference/contact-persons/#tag/Contact-Persons/operation/postContactPersons)

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
    "contact_person": {
      "address_id": "string",
      "name": "string",
      "contact_person_type_ids": [
        "string"
      ],
      "job_title": "string",
      "telephone": "string",
      "mobile": "string",
      "email": "string",
      "fax": "string",
      "is_main_contact": true,
      "is_preferred_contact": true
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
  "deleted_at": "2019-08-24T14:15:22Z",
  "contact_person_types": [
    {
      "id": "string",
      "displayed_as": "string",
      "$path": "string"
    }
  ],
  "name": "string",
  "job_title": "string",
  "telephone": "string",
  "mobile": "string",
  "email": "string",
  "fax": "string",
  "is_main_contact": true,
  "address": {
    "id": "string",
    "displayed_as": "string",
    "$path": "string"
  },
  "is_preferred_contact": true
}
```
