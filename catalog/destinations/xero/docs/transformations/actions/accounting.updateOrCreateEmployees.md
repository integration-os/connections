### update or Create Employees

Update or create employees in Xero.

[Documentation](https://xeroapi.github.io/xero-node/accounting/index.html#api-Accounting-updateOrCreateEmployees)

**Sample Payload**
```json
{
  "summarizeErrors": true,
  "employees": {
    "employees": [
      {
        "firstName": "Hello",
        "lastName": "World",
        "employeeID": "00000000-0000-0000-0000-000000000000"
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
        "employeeID": "00000000-0000-0000-0000-000000000000",
        "firstName": "Hello",
        "lastName": "World",
        "status": "ACTIVE"
      }
    ]
  }
}
```
