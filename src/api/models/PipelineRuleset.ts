/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Ruleset is the pipeline representation of
 * a ruleset block for a step in a pipeline.
 *
 *
 */

import { PipelineRules } from "./PipelineRules";

export type PipelineRuleset = {
  if?: PipelineRules;
  unless?: PipelineRules;
  matcher?: string;
  operator?: string;
  continue?: boolean;
};
