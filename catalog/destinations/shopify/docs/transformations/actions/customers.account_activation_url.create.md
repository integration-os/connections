# Creates an account activation URL for a customer

Generate an account activation URL for a customer whose account is not yet enabled.

**Requirements**

- Requires access to protected customer data
- Requires `customers` access scope.

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/customer)

**Sample Payload**

```json
{
  "primaryResourceId": 123456789
}
```

**Note:** `primaryResourceId` represents the customer ID

**Sample Response**

```json
{
  "account_activation_url": "https://jsmith.myshopify.com/account/activate/207119551/16c9ae961139da3a6a96340fbb057ecf-1675349581"
}
```