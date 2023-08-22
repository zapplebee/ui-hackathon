/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PipelineMetadata } from "./PipelineMetadata";
import type { PipelineSecret } from "./PipelineSecret";
import type { PipelineContainer } from "./PipelineContainer";
import type { PipelineStage } from "./PipelineStage";

export type PipelineBuild = {
  id?: string;
  version?: string;
  metadata?: PipelineMetadata;
  environment?: { [key: string]: string };
  worker?: Worker;
  secrets?: PipelineSecret[];
  services?: PipelineContainer[];
  stages?: PipelineStage[];
  steps?: PipelineContainer[];
};

export type PipelineExpansion = string;
