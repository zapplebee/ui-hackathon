/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from "../models/Build";
import type { Log } from "../models/Log";
import type { Token } from "../models/Token";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class BuildsService {
  /**
   * Get builds from the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param event Filter by build event
   * @param commit Filter builds based on the commit hash
   * @param branch Filter builds by branch
   * @param status Filter by build status
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @param before filter builds created before a certain time
   * @param after filter builds created after a certain time
   * @returns Build Successfully retrieved the builds
   * @throws ApiError
   */
  public static getBuilds(
    org: string,
    repo: string,
    event?: "push" | "pull_request" | "tag" | "deployment" | "comment",
    commit?: string,
    branch?: string,
    status?:
      | "canceled"
      | "error"
      | "failure"
      | "killed"
      | "pending"
      | "running"
      | "success",
    page: number = 1,
    perPage: number = 10
    // before: number = 1,
    // after?: number
  ): CancelablePromise<Array<Build>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds",
      path: {
        org: org,
        repo: repo,
      },
      query: {
        event: event,
        commit: commit,
        branch: branch,
        status: status,
        page: page,
        per_page: perPage,
        // before: before,
        // after: after,
      },
      errors: {
        400: `Unable to retrieve the list of builds`,
        500: `Unable to retrieve the list of builds`,
      },
    });
  }

  /**
   * Get builds from the configured backend by org
   *
   * TODO: why didn't the types generate this?
   *
   * @param org Name of the org
   * @param event Filter by build event
   * @param commit Filter builds based on the commit hash
   * @param branch Filter builds by branch
   * @param status Filter by build status
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @param before filter builds created before a certain time
   * @param after filter builds created after a certain time
   * @returns Build Successfully retrieved the builds
   * @throws ApiError
   */
  public static getBuildsForOrg(
    org: string,
    event?: "push" | "pull_request" | "tag" | "deployment" | "comment",
    commit?: string,
    branch?: string,
    status?:
      | "canceled"
      | "error"
      | "failure"
      | "killed"
      | "pending"
      | "running"
      | "success",
    page: number = 1,
    perPage: number = 10
    // before: number = 1,
    // after?: number
  ): CancelablePromise<Array<Build>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/builds",
      path: {
        org: org,
      },
      query: {
        event: event,
        commit: commit,
        branch: branch,
        status: status,
        page: page,
        per_page: perPage,
        // before: before,
        // after: after,
      },
      errors: {
        400: `Unable to retrieve the list of builds`,
        500: `Unable to retrieve the list of builds`,
      },
    });
  }

  /**
   * Create a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param body Payload containing the build to update
   * @returns string Request processed but build was skipped
   * @returns Build Successfully created the build
   * @throws ApiError
   */
  public static createBuild(
    org: string,
    repo: string,
    body: Build
  ): CancelablePromise<string | Build> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/repos/{org}/{repo}/builds",
      path: {
        org: org,
        repo: repo,
      },
      body: body,
      errors: {
        400: `Unable to create the build`,
        404: `Unable to create the build`,
        500: `Unable to create the build`,
      },
    });
  }

  /**
   * Get a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number to retrieve
   * @returns Build Successfully retrieved the build
   * @throws ApiError
   */
  public static getBuild(
    org: string,
    repo: string,
    build: number
  ): CancelablePromise<Build> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}",
      path: {
        org: org,
        repo: repo,
        build: build,
      },
    });
  }

  /**
   * Updates a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number to update
   * @param body Payload containing the build to update
   * @returns Build Successfully updated the build
   * @throws ApiError
   */
  public static updateBuild(
    org: string,
    repo: string,
    build: number,
    body: Build
  ): CancelablePromise<Build> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}",
      path: {
        org: org,
        repo: repo,
        build: build,
      },
      body: body,
      errors: {
        404: `Unable to update the build`,
        500: `Unable to update the build`,
      },
    });
  }

  /**
   * Restart a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number to restart
   * @returns string Request processed but build was skipped
   * @returns Build Successfully restarted the build
   * @throws ApiError
   */
  public static restartBuild(
    org: string, // TODO AND this one has org first?!
    repo: string,
    build: number
  ): CancelablePromise<string | Build> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}",
      path: {
        org: org,
        repo: repo,
        build: build,
      },
      errors: {
        400: `Unable to restart the build`,
        404: `Unable to restart the build`,
        500: `Unable to restart the build`,
      },
    });
  }

  /**
   * Delete a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number to delete
   * @returns string Successfully deleted the build
   * @throws ApiError
   */
  public static deleteBuild(
    org: string,
    repo: string,
    build: number
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}",
      path: {
        org: org,
        repo: repo,
        build: build,
      },
      errors: {
        400: `Unable to delete the build`,
        500: `Unable to delete the build`,
      },
    });
  }

  /**
   * Cancel a running build
   * @param repo Name of the repo
   * @param org Name of the org
   * @param build Build number to cancel
   * @returns string Successfully canceled the build
   * @throws ApiError
   */
  public static cancelBuild(
    repo: string, // TODO why does repo come first?
    org: string,
    build: number
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/cancel",
      path: {
        repo: repo,
        org: org,
        build: build,
      },
      errors: {
        400: `Unable to cancel build`,
        404: `Unable to cancel build`,
        500: `Unable to cancel build`,
      },
    });
  }

  /**
   * Get logs for a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns Log Successfully retrieved logs for the build
   * @throws ApiError
   */
  public static getBuildLogs(
    org: string,
    repo: string,
    build: number,
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<Log>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/logs",
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
        500: `Unable to retrieve logs for the build`,
      },
    });
  }

  /**
   * Get a build token
   * @param repo Name of the repo
   * @param org Name of the org
   * @param build Build number
   * @returns Token Successfully retrieved build token
   * @throws ApiError
   */
  public static getBuildToken(
    repo: string,
    org: string,
    build: number
  ): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/token",
      path: {
        repo: repo,
        org: org,
        build: build,
      },
      errors: {
        400: `Bad request`,
        500: `Unable to generate build token`,
      },
    });
  }

  /**
   * Get a single build by its id in the configured backend
   * @param id build id
   * @returns Build Successfully retrieved build
   * @throws ApiError
   */
  public static getBuildById(id: number): CancelablePromise<Build> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/search/builds/{id}",
      path: {
        id: id,
      },
      errors: {
        400: `Unable to retrieve the build`,
        500: `Unable to retrieve the build`,
      },
    });
  }
}
