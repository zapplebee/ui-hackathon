/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Rules is the pipeline representation of the ruletypes
 * from a ruleset block for a step in a pipeline.
 */
export type PipelineRules = {
  branch?: string[];
  comment?: string[];
  event?: string[];
  path?: string[];
  repo?: string[];
  status?: string[];
  tag?: string[];
  target?: string[];
};
