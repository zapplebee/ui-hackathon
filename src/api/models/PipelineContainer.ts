/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Container is the pipeline representation
 * of a Container in a pipeline.
 */

import type { PipelineRuleset } from "./PipelineRuleset";
import type { PipelineStepSecret } from "./PipelineStepSecret";
import type { PipelineUlimit } from "./PipelineUlimit";
import type { PipelineVolume } from "./PipelineVolume";

export type PipelineContainer = {
  id?: string;
  commands?: string[];
  detach?: boolean;
  directory?: string;
  entrypoint?: string[];
  environment?: { [key: string]: string };
  exit_code?: number;
  image?: string;
  name?: string;
  needs?: string[];
  networks?: string[];
  number?: number;
  ports?: string[];
  privileged?: boolean;
  pull?: string;
  ruleset?: PipelineRuleset;
  secrets?: PipelineStepSecret[];
  ulimits?: PipelineUlimit[];
  volumes?: PipelineVolume[];
  user?: string;
};
