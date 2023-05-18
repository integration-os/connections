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
  "responses": [
    {
      "Id": "12b9a900-fd76-4db0-b392-9551e165f3bb",
      "Status": "OK",
      "ProviderName": "Event Test App",
      "DateTimeUTC": "/Date(1684354973404)/",
      "Employees": [
        {
          "firstName": "Nick",
          "lastName": "Fury"
        }
      ]
    }
  ],

}
```
