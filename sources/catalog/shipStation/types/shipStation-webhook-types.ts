export type ShipStationWebhookSubscribe = { id: number };

export type ShipStationWebhook = {
  IsLabelAPIHook: boolean;
  WebHookID: number;
  SellerID: number;
  StoreID?: number;
  HookType: string;
  MessageFormat: string;
  Url: string;
  Name?: string;
  BulkCopyBatchID?: number;
  BulkCopyRecordID?: number;
  Active: boolean;
  WebhookLogs?: any[];
  Seller?: string;
  Store?: string;
};

export type ShipStationWebhookList = {
  webhooks: ShipStationWebhook[];
};
