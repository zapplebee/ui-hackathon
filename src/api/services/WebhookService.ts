/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Webhook } from "../models/Webhook";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class WebhookService {
  /**
   * Retrieve the webhooks for the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns Webhook Successfully retrieved webhooks
   * @throws ApiError
   */
  public static getHooks(
    org: string,
    repo: string,
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<Webhook>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/hooks/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      query: {
        page: page,
        per_page: perPage,
      },
      errors: {
        400: `Unable to retrieve webhooks`,
        500: `Unable to retrieve webhooks`,
      },
    });
  }

  /**
   * Create a webhook for the configured backend
   * @param body Webhook payload that we expect from the user or VCS
   * @param org Name of the org
   * @param repo Name of the repo
   * @returns Webhook The webhook has been created
   * @throws ApiError
   */
  public static createHook(
    body: Webhook,
    org: string,
    repo: string
  ): CancelablePromise<Webhook> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/hooks/{org}/{repo}",
      path: {
        org: org,
        repo: repo,
      },
      body: body,
      errors: {
        400: `The webhook was unable to be created`,
        500: `The webhook was unable to be created`,
      },
    });
  }

  /**
   * Retrieve a webhook for the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param hook Number of the hook
   * @returns Webhook Successfully retrieved the webhook
   * @throws ApiError
   */
  public static getHook(
    org: string,
    repo: string,
    hook: number
  ): CancelablePromise<Webhook> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/hooks/{org}/{repo}/{hook}",
      path: {
        org: org,
        repo: repo,
        hook: hook,
      },
      errors: {
        400: `Unable to retrieve the webhook`,
        500: `Unable to retrieve the webhook`,
      },
    });
  }

  /**
   * Update a webhook for the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param hook Number of the hook
   * @param body Webhook payload that we expect from the user or VCS
   * @returns Webhook Successfully updated the webhook
   * @throws ApiError
   */
  public static updateHook(
    org: string,
    repo: string,
    hook: number,
    body: Webhook
  ): CancelablePromise<Webhook> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/hooks/{org}/{repo}/{hook}",
      path: {
        org: org,
        repo: repo,
        hook: hook,
      },
      body: body,
      errors: {
        400: `The webhook was unable to be updated`,
        404: `The webhook was unable to be updated`,
        500: `The webhook was unable to be updated`,
      },
    });
  }

  /**
   * Delete a webhook for the configured backend
   * @param org Name of the org
   * @param repo Name of the repo
   * @param hook Number of the hook
   * @returns string Successfully deleted the webhook
   * @throws ApiError
   */
  public static deleteHook(
    org: string,
    repo: string,
    hook: number
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/hooks/{org}/{repo}/{hook}",
      path: {
        org: org,
        repo: repo,
        hook: hook,
      },
      errors: {
        400: `The webhook was unable to be deleted`,
        404: `The webhook was unable to be deleted`,
        500: `The webhook was unable to be deleted`,
      },
    });
  }

  /**
   * Redeliver a webhook from the SCM
   * @param org Name of the org
   * @param repo Name of the repo
   * @param hook Number of the hook
   * @returns Webhook Successfully redelivered the webhook
   * @throws ApiError
   */
  public static redeliverHook(
    org: string,
    repo: string,
    hook: number
  ): CancelablePromise<Webhook> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/hooks/{org}/{repo}/{hook}/redeliver",
      path: {
        org: org,
        repo: repo,
        hook: hook,
      },
      errors: {
        400: `The webhook was unable to be redelivered`,
        404: `The webhook was unable to be redelivered`,
        500: `The webhook was unable to be redelivered`,
      },
    });
  }
}
