# Send an account invite to a customer

Sends an account invite to a customer.

**Requirements**

- Requires access to protected customer data
- Requires `custmers` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/customer)

**Sample Payload**

```json
{
  "data": {
    "customer_invite": {
      "to": "new_test_email@shopify.com",
      "from": "j.limited@example.com",
      "bcc": [
        "j.limited@example.com"
      ],
      "subject": "Welcome to my new shop",
      "custom_message": "My awesome new store"
    }
  }
}
```

**Sample Response**

```json
{
  "customer_invite": {
    "to": "new_test_email@shopify.com",
    "from": "j.limited@example.com",
    "subject": "Welcome to my new shop",
    "custom_message": "My awesome new store",
    "bcc": [
      "j.limited@example.com"
    ]
  }
}
```