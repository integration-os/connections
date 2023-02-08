## Documentation
----

BigQuery is a fully-managed, serverless data warehouse provided by Google Cloud. It allows you to store, manage, and analyze large amounts of data with ease and at a low cost. BigQuery supports both structured and semi-structured data and can handle terabyte-scale datasets with fast query performance.

### Getting Started

To communicate with BigQuery, Buildable requires a service account key generated from your Google Cloud console as follows:
1. Go to the Google Cloud Console (https://console.cloud.google.com/) and select your project.
2. Navigate to the IAM & Admin section and select "Service accounts".
3. Click the "Create Service Account" button.
4. Give your service account a name, such as "bigquery-service-account".
5. Assign a role to the service account.
    - Permissions required by Buildable are:
      - `bigquery.tables.get`
      - `bigquery.tables.list`
      - `bigquery.tables.create`
      - `bigquery.tables.delete`
      - `bigquery.tables.update`
      - `bigquery.tables.updateData`
6. Click "Create Key" and select "JSON" as the key type.
7. Save the JSON key file to your local machine.
8. Copy the content of your JSON key file and paste it into your Buildable dashboard.

For more information about BigQuery IAM, please see https://cloud.google.com/bigquery/docs/access-control

For more information about Service Accounts, please see https://cloud.google.com/iam/docs/service-accounts

