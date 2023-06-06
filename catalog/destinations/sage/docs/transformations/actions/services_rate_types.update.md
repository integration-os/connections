### Update Service Rate Type

Update a service rate type.

[Documentation](https://developer.sage.com/accounting/reference/products-services/#tag/Service-Rate-Types/operation/putServiceRateTypesKey)

**Types**
```ts
interface ActionPayload {
  id: string;
  params?: AnyObject;
  body?: AnyObject;
}
```

**Sample Payload**
```json
{
  "id": "string",
  "body": {
    "service_rate_type": {
      "name": "string",
      "active": true
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
  "active": true
}
```
