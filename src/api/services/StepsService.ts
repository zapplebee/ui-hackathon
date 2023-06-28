/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Log } from "../models/Log";
import type { Step } from "../models/Step";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class StepsService {
  /**
   * Retrieve a list of steps for a build
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns Step Successfully retrieved the list of steps
   * @throws ApiError
   */
  public static getSteps(
    org: string,
    repo: string,
    build: number,
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<Step>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps",
      path: {
        org: org,
        repo: repo,
        build: build,
      },
      query: {
        page: page,
        per_page: perPage,
      },
      errors: {
        400: `Unable to retrieve the list of steps`,
        500: `Unable to retrieve the list of steps`,
      },
    });
  }

  /**
   * Create a step for a build
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param body Payload containing the step to create
   * @returns Step Successfully created the step
   * @throws ApiError
   */
  public static createStep(
    org: string,
    repo: string,
    build: number,
    body: Step
  ): CancelablePromise<Step> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps",
      path: {
        org: org,
        repo: repo,
        build: build,
      },
      body: body,
      errors: {
        400: `Unable to create the step`,
        500: `Unable to create the step`,
      },
    });
  }

  /**
   * Retrieve a step for a build
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param step Step number
   * @returns Step Successfully retrieved the step
   * @throws ApiError
   */
  public static getStep(
    org: string,
    repo: string,
    build: number,
    step: string
  ): CancelablePromise<Step> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps/{step}",
      path: {
        org: org,
        repo: repo,
        build: build,
        step: step,
      },
    });
  }

  /**
   * Update a step for a build
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param step Step number
   * @param body Payload containing the step to update
   * @returns Step Successfully updated the step
   * @throws ApiError
   */
  public static updateStep(
    org: string,
    repo: string,
    build: number,
    step: number,
    body: Step
  ): CancelablePromise<Step> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps/{step}",
      path: {
        org: org,
        repo: repo,
        build: build,
        step: step,
      },
      body: body,
      errors: {
        400: `Unable to update the step`,
        500: `Unable to update the step`,
      },
    });
  }

  /**
   * Delete a step for a build
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param step Step number
   * @returns string Successfully deleted the step
   * @throws ApiError
   */
  public static deleteStep(
    org: string,
    repo: string,
    build: number,
    step: number
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps/{step}",
      path: {
        org: org,
        repo: repo,
        build: build,
        step: step,
      },
      errors: {
        500: `Successfully deleted the step`,
      },
    });
  }

  /**
   * Retrieve the logs for a step
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param step Step number
   * @returns Log Successfully retrieved the logs for step
   * @throws ApiError
   */
  public static getStepLog(
    org: string,
    repo: string,
    build: number,
    step: number
  ): CancelablePromise<Log> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps/{step}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        step: step,
      },
      errors: {
        500: `Unable to retrieve the logs for a step`,
      },
    });
  }

  /**
   * @deprecated
   * Update the logs for a step
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param step Step number
   * @param body Payload containing the log to update
   * @returns Log Successfully updated the logs for step
   * @throws ApiError
   */
  public static updateStepLog(
    org: string,
    repo: string,
    build: number,
    step: number,
    body: Log
  ): CancelablePromise<Log> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps/{step}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        step: step,
      },
      body: body,
      errors: {
        400: `Unable to update the logs for a step`,
        500: `Unable to update the logs for a step`,
      },
    });
  }

  /**
   * @deprecated
   * Create the logs for a step
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param step Step number
   * @param body Payload containing the log to create
   * @returns Log Successfully created the logs for step
   * @throws ApiError
   */
  public static createStepLog(
    org: string,
    repo: string,
    build: number,
    step: number,
    body: Log
  ): CancelablePromise<Log> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps/{step}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        step: step,
      },
      body: body,
      errors: {
        400: `Unable to create the logs for a step`,
        500: `Unable to create the logs for a step`,
      },
    });
  }

  /**
   * Delete the logs for a step
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param step Step number
   * @returns string Successfully deleted the logs for the step
   * @throws ApiError
   */
  public static deleteStepLog(
    org: string,
    repo: string,
    build: number,
    step: number
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/steps/{step}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        step: step,
      },
      errors: {
        500: `Unable to delete the logs for the step`,
      },
    });
  }
}
