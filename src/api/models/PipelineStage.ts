/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PipelineContainer } from "./PipelineContainer";

/**
 * Stage is the pipeline representation
 * of a stage in a pipeline.
 */
export type PipelineStage = {
  environment?: { [key: string]: string };
  name?: string;
  needs?: string[];
  independent?: boolean;
  steps?: PipelineContainer[];
};
