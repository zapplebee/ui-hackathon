/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Deployment } from "../models/Deployment";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DeploymentService {
  /**
   * Get a list of deployments for the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns Deployment Successfully retrieved the list of deployments
   * @throws ApiError
   */
  public static getDeployments(
    org: string,
    repo: string,
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<Deployment>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/deployments/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      query: {
        page: page,
        per_page: perPage,
      },
      errors: {
        400: `Unable to retrieve the list of deployments`,
        500: `Unable to retrieve the list of deployments`,
      },
    });
  }

  /**
   * Create a deployment for the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @returns Deployment Successfully created the deployment
   * @throws ApiError
   */
  public static createDeployment(
    org: string,
    repo: string
  ): CancelablePromise<Deployment> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/deployments/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      errors: {
        400: `Unable to create the deployment`,
        500: `Unable to create the deployment`,
      },
    });
  }

  /**
   * Get a deployment from the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param deployment Name of the org
   * @returns Deployment Successfully retrieved the deployment
   * @throws ApiError
   */
  public static getDeployment(
    org: string,
    repo: string,
    deployment: string
  ): CancelablePromise<Deployment> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/deployments/{org}/{repo}/{deployment}",
      path: {
        org: org,
        repo: repo,
        deployment: deployment,
      },
      errors: {
        400: `Unable to retrieve the deployment`,
        500: `Unable to retrieve the deployment`,
      },
    });
  }
}
