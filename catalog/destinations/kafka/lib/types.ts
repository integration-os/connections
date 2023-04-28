import { AnyObject } from "../../../../types/destinationClassDefinition";

export interface IKafkaPushData {
  topic: string;
  data: string | string[] | Buffer | Buffer[] | AnyObject | AnyObject[];
  headers?: AnyObject;
  partition?: number;
  key?: string;
  timestamp?: number;
}
