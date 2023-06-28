/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Repo } from "../models/Repo";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ReposService {
  /**
   * Get all repos in the configured backend
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns Repo Successfully retrieved the repo
   * @throws ApiError
   */
  public static listRepos(
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<Repo>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos",
      query: {
        page: page,
        per_page: perPage,
      },
      errors: {
        400: `Unable to retrieve the repo`,
        500: `Unable to retrieve the repo`,
      },
    });
  }

  /**
   * Create a repo in the configured backend
   * @param body Payload containing the repo to create
   * @returns Repo Successfully created the repo
   * @throws ApiError
   */
  public static createRepo(body: Repo): CancelablePromise<Repo> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/repos",
      body: body,
      errors: {
        400: `Unable to create the repo`,
        403: `Unable to create the repo`,
        409: `Unable to create the repo`,
        500: `Unable to create the repo`,
        503: `Unable to create the repo`,
      },
    });
  }

  /**
   * Get all repos for the provided org in the configured backend
   * @param org Name of the org
   * @param active Filter active repos
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @param sortBy How to sort the results
   * @returns Repo Successfully retrieved the repo
   * @throws ApiError
   */
  public static listReposForOrg(
    org: string,
    active: boolean = true,
    page: number = 1,
    perPage: number = 10,
    sortBy: "name" | "latest" = "name"
  ): CancelablePromise<Array<Repo>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}",
      path: {
        org: org,
      },
      query: {
        active: active,
        page: page,
        per_page: perPage,
        sort_by: sortBy,
      },
      errors: {
        400: `Unable to retrieve the org`,
        500: `Unable to retrieve the org`,
      },
    });
  }

  /**
   * Get a repo in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @returns Repo Successfully retrieved the repo
   * @throws ApiError
   */
  public static getRepo(org: string, repo: string): CancelablePromise<Repo> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
    });
  }

  /**
   * Update a repo in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param body Payload containing the repo to update
   * @returns Repo Successfully updated the repo
   * @throws ApiError
   */
  public static updateRepo(
    org: string,
    repo: string,
    body: Repo
  ): CancelablePromise<Repo> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/repos/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      body: body,
      errors: {
        400: `Unable to update the repo`,
        500: `Unable to update the repo`,
        503: `Unable to update the repo`,
      },
    });
  }

  /**
   * Delete a repo in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @returns string Successfully deleted the repo
   * @throws ApiError
   */
  public static deleteRepo(
    org: string,
    repo: string
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/repos/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      errors: {
        500: `Unable to  deleted the repo`,
        510: `Unable to  deleted the repo`,
      },
    });
  }

  /**
   * Change the owner of the webhook for a repo
   * @param org Name of the org
   * @param repo Name of the repo
   * @returns string Successfully changed the owner for the repo
   * @throws ApiError
   */
  public static chownRepo(
    org: string,
    repo: string
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/repos/{org}/{repo}/chown",
      path: {
        org: org,
        repo: repo,
      },
      errors: {
        500: `Unable to change the owner for the repo`,
      },
    });
  }

  /**
   * Remove and recreate the webhook for a repo
   * @param org Name of the org
   * @param repo Name of the repo
   * @returns string Successfully repaired the repo
   * @throws ApiError
   */
  public static repairRepo(
    org: string,
    repo: string
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/repos/{org}/{repo}/repair",
      path: {
        org: org,
        repo: repo,
      },
      errors: {
        500: `Unable to repair the repo`,
      },
    });
  }
}
