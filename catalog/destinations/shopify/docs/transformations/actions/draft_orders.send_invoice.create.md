# Send an invoice

Sends an invoice for the draft order.

**Requirements**

- Requires access to protected customer data
- Requires `draft_orders` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/draftorder)

**Sample Payload**

```json
{
  "data": {
    "draft_order_invoice": {
      "to": "first@example.com",
      "from": "j.smith@example.com",
      "bcc": [
        "j.smith@example.com"
      ],
      "subject": "Apple Computer Invoice",
      "custom_message": "Thank you for ordering!"
    }
  }
}
```

**Sample Response**

```json
{
  "draft_order_invoice": {
    "to": "first@example.com",
    "from": "j.smith@example.com",
    "subject": "Apple Computer Invoice",
    "custom_message": "Thank you for ordering!",
    "bcc": [
      "j.smith@example.com"
    ]
  }
}
```