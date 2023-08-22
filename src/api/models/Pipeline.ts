/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Pipeline = {
  id?: number;
  repo_id?: number;
  commit?: string;
  flavor?: string;
  platform?: string;
  ref?: string;
  type?: string;
  version?: string;
  external_secrets?: boolean;
  internal_secrets?: boolean;
  services?: boolean;
  stages?: boolean;
  steps?: boolean;
  templates?: boolean;
  data?: string; // TODO this was number before
};
