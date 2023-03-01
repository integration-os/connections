# Create a Customer
Creates a customer

[Documentation](https://shopify.dev/docs/api/admin-rest/2023-01/resources/customer)


**Sample Payload**
```json
{
  "data": {
    "customer":{
      "first_name":"Steve",
      "last_name":"Lastnameson",
      "email":"steve.lastnameson@example.com",
      "phone":"+15142546011",
      "verified_email":true,
      "addresses":[
        {
          "address1":"123 Oak St",
          "city":"Ottawa",
          "province":"ON",
          "phone":"555-1212",
          "zip":"123 ABC",
          "last_name":"Lastnameson",
          "first_name":"Mother",
          "country":"CA"
        }
      ],
      "password":"newpass",
      "password_confirmation":"newpass",
      "send_email_welcome":false
    }
  }
}
```

**Sample Response**
```json
{
  "customer": {
    "id": 1073339468,
    "email": "steve.lastnameson@example.com",
    "accepts_marketing": false,
    "created_at": "2023-02-02T09:42:12-05:00",
    "updated_at": "2023-02-02T09:42:12-05:00",
    "first_name": "Steve",
    "last_name": "Lastnameson",
    "orders_count": 0,
    "state": "enabled",
    "total_spent": "0.00",
    "last_order_id": null,
    "note": null,
    "verified_email": true,
    "multipass_identifier": null,
    "tax_exempt": false,
    "tags": "",
    "last_order_name": null,
    "currency": "USD",
    "phone": "+15142546011",
    "addresses": [
      {
        "id": 1053317302,
        "customer_id": 1073339468,
        "first_name": "Mother",
        "last_name": "Lastnameson",
        "company": null,
        "address1": "123 Oak St",
        "address2": null,
        "city": "Ottawa",
        "province": "Ontario",
        "country": "Canada",
        "zip": "123 ABC",
        "phone": "555-1212",
        "name": "Mother Lastnameson",
        "province_code": "ON",
        "country_code": "CA",
        "country_name": "Canada",
        "default": true
      }
    ],
    "accepts_marketing_updated_at": "2023-02-02T09:42:12-05:00",
    "marketing_opt_in_level": null,
    "tax_exemptions": [],
    "email_marketing_consent": {
      "state": "not_subscribed",
      "opt_in_level": "single_opt_in",
      "consent_updated_at": null
    },
    "sms_marketing_consent": {
      "state": "not_subscribed",
      "opt_in_level": "single_opt_in",
      "consent_updated_at": null,
      "consent_collected_from": "OTHER"
    },
    "admin_graphql_api_id": "gid://shopify/Customer/1073339468",
    "default_address": {
      "id": 1053317302,
      "customer_id": 1073339468,
      "first_name": "Mother",
      "last_name": "Lastnameson",
      "company": null,
      "address1": "123 Oak St",
      "address2": null,
      "city": "Ottawa",
      "province": "Ontario",
      "country": "Canada",
      "zip": "123 ABC",
      "phone": "555-1212",
      "name": "Mother Lastnameson",
      "province_code": "ON",
      "country_code": "CA",
      "country_name": "Canada",
      "default": true
    }
  }
}
```
