import { AnyObject } from "../../../../types/destinationClassDefinition";

export interface IKafkaPushData {
  topic: string;
  data: string | string[] | Buffer | Buffer[] | AnyObject | AnyObject[];
}
