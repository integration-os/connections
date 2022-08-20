export type ShipStationWebhookSubscribeResponse = { id: number };
export type ShipStationWebhookSubscribeRequest = {
  target_url: string;
  event: string;
};

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
