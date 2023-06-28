/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pipeline } from "../models/Pipeline";
import type { PipelineBuild } from "../models/PipelineBuild";
import type { Template } from "../models/Template";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PipelinesService {
  /**
   * List pipelines from the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns Pipeline Successfully retrieved the pipelines
   * @throws ApiError
   */
  public static listPipelines(
    org: string,
    repo: string,
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<Pipeline>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/pipelines/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      query: {
        page: page,
        per_page: perPage,
      },
      errors: {
        400: `Unable to retrieve the list of pipelines`,
        500: `Unable to retrieve the list of pipelines`,
      },
    });
  }

  /**
   * Create a pipeline in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param body Payload containing the pipeline to create
   * @returns Pipeline Successfully created the pipeline
   * @throws ApiError
   */
  public static createPipeline(
    org: string,
    repo: string,
    body: Pipeline
  ): CancelablePromise<Pipeline> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/pipelines/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      body: body,
      errors: {
        400: `Unable to create the pipeline`,
        404: `Unable to create the pipeline`,
        500: `Unable to create the pipeline`,
      },
    });
  }

  /**
   * Get a pipeline from the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param pipeline Commit SHA for pipeline to retrieve
   * @returns Pipeline Successfully retrieved the pipeline
   * @throws ApiError
   */
  public static getPipeline(
    org: string,
    repo: string,
    pipeline: string
  ): CancelablePromise<Pipeline> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/pipelines/{org}/{repo}/{pipeline}",
      path: {
        org: org,
        repo: repo,
        pipeline: pipeline,
      },
    });
  }

  /**
   * Update a pipeline in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param pipeline Commit SHA for pipeline to update
   * @param body Payload containing the pipeline to update
   * @returns Pipeline Successfully updated the pipeline
   * @throws ApiError
   */
  public static updatePipeline(
    org: string,
    repo: string,
    pipeline: string,
    body: Pipeline
  ): CancelablePromise<Pipeline> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/pipelines/{org}/{repo}/{pipeline}",
      path: {
        org: org,
        repo: repo,
        pipeline: pipeline,
      },
      body: body,
      errors: {
        404: `Unable to update the pipeline`,
        500: `Unable to update the pipeline`,
      },
    });
  }

  /**
   * Delete a pipeline from the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param pipeline Commit SHA for pipeline to delete
   * @returns string Successfully deleted the pipeline
   * @throws ApiError
   */
  public static deletePipeline(
    org: string,
    repo: string,
    pipeline: string
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/pipelines/{org}/{repo}/{pipeline}",
      path: {
        org: org,
        repo: repo,
        pipeline: pipeline,
      },
      errors: {
        400: `Unable to delete the pipeline`,
        500: `Unable to delete the pipeline`,
      },
    });
  }

  /**
   * Get, expand and compile a pipeline from the configured backend
   * @param repo Name of the repo
   * @param org Name of the org
   * @param pipeline Commit SHA for pipeline to retrieve
   * @param output Output string for specifying output format
   * @returns PipelineBuild Successfully retrieved and compiled the pipeline
   * @throws ApiError
   */
  public static compilePipeline(
    repo: string,
    org: string,
    pipeline: string,
    output: "json" | "yaml" = "yaml"
  ): CancelablePromise<PipelineBuild> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/pipelines/{org}/{repo}/{pipeline}/compile",
      path: {
        repo: repo,
        org: org,
        pipeline: pipeline,
      },
      query: {
        output: output,
      },
      errors: {
        400: `Unable to validate the pipeline configuration`,
        404: `Unable to retrieve the pipeline configuration`,
      },
    });
  }

  /**
   * Get and expand a pipeline from the configured backend
   * @param repo Name of the repo
   * @param org Name of the org
   * @param pipeline Commit SHA for pipeline to retrieve
   * @param output Output string for specifying output format
   * @returns PipelineBuild Successfully retrieved and expanded the pipeline
   * @throws ApiError
   */
  public static expandPipeline(
    repo: string,
    org: string,
    pipeline: string,
    output: "json" | "yaml" = "yaml"
  ): CancelablePromise<PipelineBuild> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/pipelines/{org}/{repo}/{pipeline}/expand",
      path: {
        repo: repo,
        org: org,
        pipeline: pipeline,
      },
      query: {
        output: output,
      },
      errors: {
        400: `Unable to expand the pipeline configuration`,
        404: `Unable to retrieve the pipeline configuration`,
      },
    });
  }

  /**
   * Get a map of templates utilized by a pipeline from the configured backend
   * @param repo Name of the repo
   * @param org Name of the org
   * @param pipeline Commit SHA for pipeline to retrieve
   * @param output Output string for specifying output format
   * @returns Template Successfully retrieved the map of pipeline templates
   * @throws ApiError
   */
  public static getTemplates(
    repo: string,
    org: string,
    pipeline: string,
    output: "json" | "yaml" = "yaml"
  ): CancelablePromise<Template> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/pipelines/{org}/{repo}/{pipeline}/templates",
      path: {
        repo: repo,
        org: org,
        pipeline: pipeline,
      },
      query: {
        output: output,
      },
      errors: {
        400: `Unable to retrieve the pipeline configuration templates`,
        404: `Unable to retrieve the pipeline configuration templates`,
      },
    });
  }

  /**
   * Get, expand and validate a pipeline from the configured backend
   * @param repo Name of the repo
   * @param org Name of the org
   * @param pipeline Commit SHA for pipeline to retrieve
   * @param output Output string for specifying output format
   * @returns string Successfully retrieved, expanded and validated the pipeline
   * @throws ApiError
   */
  public static validatePipeline(
    repo: string,
    org: string,
    pipeline: string,
    output: "json" | "yaml" = "yaml"
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/pipelines/{org}/{repo}/{pipeline}/validate",
      path: {
        repo: repo,
        org: org,
        pipeline: pipeline,
      },
      query: {
        output: output,
      },
      errors: {
        400: `Unable to validate the pipeline configuration`,
        404: `Unable to retrieve the pipeline configuration`,
      },
    });
  }
}
