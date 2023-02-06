import { InsertRowsOptions } from "@google-cloud/bigquery";
import { AnyObject } from "../../../../types/destinationClassDefinition";

type SupportedFiles = "AVRO" | "CSV" | "JSON" | "ORC" | "PARQUET"

export interface IBigQueryInsert {
  dataset: string;
  table: string;
  data: AnyObject[]
  options?: InsertRowsOptions
}
