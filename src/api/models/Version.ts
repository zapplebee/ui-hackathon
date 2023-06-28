/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { PipelineMetadata } from "./PipelineMetadata";
/**
 * Version represents application information that
 * follows semantic version guidelines from
 * https://semver.org/.
 */
export type Version = {
  canonical: string;
  major: number;
  minor: number;
  patch: number;
  pre_release?: string;
  metadata?: PipelineMetadata;
};
