/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Log } from "../models/Log";
import type { Service } from "../models/Service";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ServicesService {
  /**
   * Get a list of all services for a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns Service Successfully retrieved the list of services
   * @throws ApiError
   */
  public static getServices(
    org: string,
    repo: string,
    build: number,
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<Service>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services",
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
        400: `Unable to retrieve the list of services`,
        500: `Unable to retrieve the list of services`,
      },
    });
  }

  /**
   * Create a service for a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param body Payload containing the service to create
   * @returns Service Successfully created the service
   * @throws ApiError
   */
  public static createService(
    org: string,
    repo: string,
    build: number,
    body: Service
  ): CancelablePromise<Service> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services",
      path: {
        org: org,
        repo: repo,
        build: build,
      },
      body: body,
      errors: {
        400: `Unable to create the service`,
        500: `Unable to create the service`,
      },
    });
  }

  /**
   * Get a service for a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param service Name of the service
   * @returns Service Successfully retrieved the service
   * @throws ApiError
   */
  public static getService(
    org: string,
    repo: string,
    build: number,
    service: number
  ): CancelablePromise<Service> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services/{service}",
      path: {
        org: org,
        repo: repo,
        build: build,
        service: service,
      },
      errors: {
        400: `Unable to retrieve the service`,
        500: `Unable to retrieve the service`,
      },
    });
  }

  /**
   * Update a service for a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param service Service number
   * @param body Payload containing the service to update
   * @returns Service Successfully updated the service
   * @throws ApiError
   */
  public static updateService(
    org: string,
    repo: string,
    build: number,
    service: number,
    body: Service
  ): CancelablePromise<Service> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services/{service}",
      path: {
        org: org,
        repo: repo,
        build: build,
        service: service,
      },
      body: body,
      errors: {
        400: `Unable to update the service`,
        500: `Unable to update the service`,
      },
    });
  }

  /**
   * Delete a service for a build in the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param service Service Number
   * @returns string Successfully deleted the service
   * @throws ApiError
   */
  public static deleteService(
    org: string,
    repo: string,
    build: number,
    service: number
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services/{service}",
      path: {
        org: org,
        repo: repo,
        build: build,
        service: service,
      },
      errors: {
        500: `Unable to delete the service`,
      },
    });
  }

  /**
   * Retrieve the logs for a service
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param service ID of the service
   * @returns Log Successfully retrieved the service logs
   * @throws ApiError
   */
  public static getServiceLogs(
    org: string,
    repo: string,
    build: number,
    service: number
  ): CancelablePromise<Log> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services/{service}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        service: service,
      },
      errors: {
        500: `Unable to retrieve the service logs`,
      },
    });
  }

  /**
   * @deprecated
   * Update the logs for a service
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param service ID of the service
   * @param body Payload containing the log to update
   * @returns Log Successfully updated the service logs
   * @throws ApiError
   */
  public static updateServiceLog(
    org: string,
    repo: string,
    build: number,
    service: number,
    body: Log
  ): CancelablePromise<Log> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services/{service}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        service: service,
      },
      body: body,
      errors: {
        400: `Unable to updated the service logs`,
        500: `Unable to updates the service logs`,
      },
    });
  }

  /**
   * @deprecated
   * Create the logs for a service
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param service ID of the service
   * @param body Payload containing the log to create
   * @returns Log Successfully created the service logs
   * @throws ApiError
   */
  public static createServiceLogs(
    org: string,
    repo: string,
    build: number,
    service: number,
    body: Log
  ): CancelablePromise<Log> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services/{service}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        service: service,
      },
      body: body,
      errors: {
        400: `Unable to create the service logs`,
        500: `Unable to create the service logs`,
      },
    });
  }

  /**
   * Delete the logs for a service
   * @param org Name of the org
   * @param repo Name of the repo
   * @param build Build number
   * @param service ID of the service
   * @returns string Successfully deleted the service logs
   * @throws ApiError
   */
  public static deleteServiceLogs(
    org: string,
    repo: string,
    build: number,
    service: number
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/repos/{org}/{repo}/builds/{build}/services/{service}/logs",
      path: {
        org: org,
        repo: repo,
        build: build,
        service: service,
      },
      errors: {
        500: `Unable to delete the service logs`,
      },
    });
  }
}
