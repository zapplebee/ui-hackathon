/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { PipelineContainer } from "./PipelineContainer";

/**
 * Secret is the pipeline representation of a
 * secret from the secrets block for a pipeline.
 */
export type PipelineSecret = {
  name?: string;
  value?: string;
  key?: string;
  engine?: string;
  type?: string;
  origin?: PipelineContainer;
};
