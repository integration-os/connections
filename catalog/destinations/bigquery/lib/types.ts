import { InsertRowsOptions } from "@google-cloud/bigquery";
import { AnyObject } from "../../../../types/destinationClassDefinition";

export type BigQuerySchemaType = "STRING" | "BYTES" | "INTEGER" | "FLOAT" | "NUMERIC" | "BIGNUMERIC" | "BOOLEAN" | "TIMESTAMP" | "DATE" | "TIME" | "DATETIME" | "GEOGRAPHY" | "RECORD" | "JSON"

export interface IBigQueryInsert {
  dataset: string;
  table: string;
  data: AnyObject[]
  options?: InsertRowsOptions
}

export interface IBigQueryUpdate {
  dataset: string;
  table: string;
  set: string[] | AnyObject
  filters: string;
}

export interface IBigQueryDelete {
  dataset: string;
  table: string;
  filters: string;
}

export interface IBigQueryRawQuery {
  query: string;
}
