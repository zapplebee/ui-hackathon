/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Ulimit is the pipeline representation of a ulimit
 * from the ulimits block for a step in a pipeline.
 */
export type PipelineUlimit = {
  name?: string;
  soft?: number;
  hard?: number;
};
