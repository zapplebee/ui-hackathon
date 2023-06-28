/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Webhook = {
  id?: number;
  repo_id?: number;
  build_id?: number;
  number?: number;
  source_id?: string;
  created?: number;
  host?: string;
  event?: string;
  event_action?: string;
  branch?: string;
  error?: string;
  status?: string;
  link?: string;
  webhook_id?: number;
};
