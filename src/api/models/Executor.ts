/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from "./Build";
import type { Repo } from "./Repo";

export type Executor = {
  id?: number;
  host?: string;
  runtime?: string;
  distribution?: string;
  build?: Build;
  repo?: Repo;
  pipeline?: Build;
};
