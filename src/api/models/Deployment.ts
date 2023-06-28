/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from "./Build";

export type Deployment = {
  id?: number;
  repo_id?: number;
  url?: string;
  user?: string;
  commit?: string;
  ref?: string;
  task?: string;
  target?: string;
  description?: string;
  payload?: { [key: string]: string };
  builds?: Build[];
};
