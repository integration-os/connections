### Create Employees

Create one or more employees in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-createEmployees)


**Sample Payload**
```json
{
  "summarizeErrors": true,
  "employees": {
    "employees": [
      {
        "firstName": "Nick",
        "lastName": "Fury"
      }
    ]
  }
}
```

**Sample Response**

```json
{
  "tenant1": {
    "employees": [
      {
        "firstName": "Nick",
        "lastName": "Fury"
      }
    ]
  }
}
```
