/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from "../models/Build";
import type { Version } from "../models/Version";
import type { Webhook } from "../models/Webhook";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class BaseService {
  /**
   * Get a badge for the repo
   * @param org Name of the org the repo belongs to
   * @param repo Name of the repo to get the badge for
   * @returns string Successfully retrieved a status Badge
   * @throws ApiError
   */
  public static getBadge(org: string, repo: string): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/badge/{org}/{repo}/status.svg",
      path: {
        org: org,
        repo: repo,
      },
    });
  }

  /**
   * Check if the Vela API is available
   * @returns string Successfully 'ping'-ed Vela API
   * @throws ApiError
   */
  public static health(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/health",
    });
  }

  /**
   * Retrieve metrics from the Vela api
   * @param userCount Indicates a request for user count
   * @param repoCount Indicates a request for repo count
   * @param buildCount Indicates a request for build count
   * @param runningBuildCount Indicates a request for running build count
   * @param pendingBuildCount Indicates a request for pending build count
   * @param queuedBuildCount Indicates a request for queued build count
   * @param failureBuildCount Indicates a request for failure build count
   * @param killedBuildCount Indicates a request for killed build count
   * @param successBuildCount Indicates a request for success build count
   * @param errorBuildCount Indicates a request for error build count
   * @param stepImageCount Indicates a request for step image count
   * @param stepStatusCount Indicates a request for step status count
   * @param serviceImageCount Indicates a request for service image count
   * @param serviceStatusCount Indicates a request for service status count
   * @param workerBuildLimit Indicates a request for total worker build limit
   * @param activeWorkerCount Indicates a request for active worker count
   * @param inactiveWorkerCount Indicates a request for inactive worker count
   * @returns string Successfully retrieved the Vela metrics
   * @throws ApiError
   */
  public static baseMetrics(
    userCount: boolean = false,
    repoCount: boolean = false,
    buildCount: boolean = false,
    runningBuildCount: boolean = false,
    pendingBuildCount: boolean = false,
    queuedBuildCount: boolean = false,
    failureBuildCount: boolean = false,
    killedBuildCount: boolean = false,
    successBuildCount: boolean = false,
    errorBuildCount: boolean = false,
    stepImageCount: boolean = false,
    stepStatusCount: boolean = false,
    serviceImageCount: boolean = false,
    serviceStatusCount: boolean = false,
    workerBuildLimit: boolean = false,
    activeWorkerCount: boolean = false,
    inactiveWorkerCount: boolean = false
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/metrics",
      query: {
        user_count: userCount,
        repo_count: repoCount,
        build_count: buildCount,
        running_build_count: runningBuildCount,
        pending_build_count: pendingBuildCount,
        queued_build_count: queuedBuildCount,
        failure_build_count: failureBuildCount,
        killed_build_count: killedBuildCount,
        success_build_count: successBuildCount,
        error_build_count: errorBuildCount,
        step_image_count: stepImageCount,
        step_status_count: stepStatusCount,
        service_image_count: serviceImageCount,
        service_status_count: serviceStatusCount,
        worker_build_limit: workerBuildLimit,
        active_worker_count: activeWorkerCount,
        inactive_worker_count: inactiveWorkerCount,
      },
    });
  }

  /**
   * Get the version of the Vela API
   * @returns Version Successfully retrieved the Vela API version
   * @throws ApiError
   */
  public static version(): CancelablePromise<Version> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/version",
    });
  }

  /**
   * Deliver a webhook to the vela api
   * @param body Webhook payload that we expect from the user or VCS
   * @returns Build Successfully received the webhook
   * @throws ApiError
   */
  public static postWebhook(body: Webhook): CancelablePromise<Build> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/webhook",
      body: body,
      errors: {
        400: `Malformed webhook payload`,
        401: `Unauthenticated`,
        404: `Unable to receive the webhook`,
        500: `Unable to receive the webhook`,
      },
    });
  }
}
