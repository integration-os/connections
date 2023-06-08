## Connect 

BigQuery is a fully-managed, serverless data warehouse provided by Google Cloud. It allows you to store, manage, and analyze large amounts of data with ease and at a low cost. BigQuery supports both structured and semi-structured data and can handle terabyte-scale datasets with fast query performance.

### Generate a Service Account key

To communicate with BigQuery, Event requires a service account key generated from your Google Cloud console as follows:
1. Go to the Google Cloud Console (https://console.cloud.google.com/) and select your project.
2. Navigate to the IAM & Admin section and select "Service accounts".
3. Click the "Create Service Account" button.
4. Give your service account a name, such as "bigquery-service-account".
5. Assign a role to the service account.   
   - Permissions required by Event are:
     - `bigquery.tables.get`
     - `bigquery.tables.list`
     - `bigquery.tables.create`
     - `bigquery.tables.delete`
     - `bigquery.tables.update`
     - `bigquery.tables.updateData`
6. Click "Create Key" and select "JSON" as the key type.
7. Save the JSON key file to your local machine.
8. Copy the content of your JSON key file and paste it into your Event dashboard.

For more information about BigQuery IAM, please see https://cloud.google.com/bigquery/docs/access-control

For more information about Service Accounts, please see https://cloud.google.com/iam/docs/service-accounts

### IP Whitelisting

To enable Event to connect to your database, please ensure that your firewall accepts incoming requests from the following IP addresses:

`35.245.232.82` `35.245.100.81`

`34.120.49.202` `34.160.218.232`

`3.12.101.201` `3.129.238.32`

`3.13.190.25` `3.133.23.83`

### Securely Encrypted

Rest assured, your credentials are securely encrypted to keep your information safe.

### Need Help?

Start a conversation by sending an email to [support@event.dev](mailto:support@event.dev). Our Data Engineers are available 24/7 to help if you ever get stuck.