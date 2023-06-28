/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Build = {
  id?: number;
  repo_id?: number;
  pipeline_id?: number;
  number?: number;
  parent?: number;
  event?: string;
  event_action?: string;
  status?: string;
  error?: string;
  enqueued?: number;
  created?: number;
  started?: number;
  finished?: number;
  deploy?: string;
  deploy_payload?: { [key: string]: string };
  clone?: string;
  source?: string;
  title?: string;
  message?: string;
  commit?: string;
  sender?: string;
  author?: string;
  email?: string;
  link?: string;
  branch?: string;
  ref?: string;
  base_ref?: string;
  head_ref?: string;
  host?: string;
  runtime?: string;
  distribution?: string;
};
