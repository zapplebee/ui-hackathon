/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Repo = {
  id?: number;
  user_id?: number;
  org?: string;
  name?: string;
  full_name?: string;
  link?: string;
  clone?: string;
  branch?: string;
  topics?: string[];
  build_limit?: number;
  timeout?: number;
  counter?: number;
  visibility?: string;
  private?: boolean;
  trusted?: boolean;
  active?: boolean;
  allow_pull?: boolean;
  allow_push?: boolean;
  allow_deploy?: boolean;
  allow_tag?: boolean;
  allow_comment?: boolean;
  pipeline_type?: string;
  previous_name?: string;
};
