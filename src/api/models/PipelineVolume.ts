/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Volume is the pipeline representation of a volume
 * from a volumes block for a step in a pipeline.
 */
export type PipelineVolume = {
  source?: string;
  destination?: string;
  access_mode?: string;
};
