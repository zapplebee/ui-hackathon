/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Build } from "../models/Build";
import type { BuildQueue } from "../models/BuildQueue";
import type { Repo } from "../models/Repo";
import type { Secret } from "../models/Secret";
import type { Service } from "../models/Service";
import type { Step } from "../models/Step";
import type { Token } from "../models/Token";
import type { User } from "../models/User";
import type { Webhook } from "../models/Webhook";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AdminService {
  /**
   * Update a build in the database
   * @param body Payload containing build to update
   * @returns Build Successfully updated the build in the database
   * @throws ApiError
   */
  public static adminUpdateBuild(body: Build): CancelablePromise<Build> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/build",
      body: body,
      errors: {
        404: `Unable to update the build in the database`,
        500: `Unable to update the build in the database`,
      },
    });
  }

  /**
   * Get all of the running and pending builds in the database
   * @param after Unix timestamp to limit builds returned
   * @returns BuildQueue Successfully retrieved all running and pending builds from the database
   * @throws ApiError
   */
  public static allBuildsQueue(
    after?: string
  ): CancelablePromise<Array<BuildQueue>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/admin/builds/queue",
      query: {
        after: after,
      },
      errors: {
        500: `Unable to retrieve all running and pending builds from the database`,
      },
    });
  }

  /**
   * Get All (Not Implemented)
   * @returns void
   * @throws ApiError
   */
  public static adminUpdateDeployment(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/deployment",
      errors: {
        501: `This endpoint is not implemented`,
      },
    });
  }

  /**
   * Update a hook in the database
   * @param body Payload containing hook to update
   * @returns Webhook Successfully updated the hook in the database
   * @throws ApiError
   */
  public static adminUpdateHook(body: Webhook): CancelablePromise<Webhook> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/hook",
      body: body,
      errors: {
        404: `Unable to update the hook in the database`,
        501: `Unable to update the hook in the database`,
      },
    });
  }

  /**
   * Update a repo in the database
   * @param body Payload containing repo to update
   * @returns Repo Successfully updated the repo in the database
   * @throws ApiError
   */
  public static adminUpdateRepo(body: Repo): CancelablePromise<Repo> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/repo",
      body: body,
      errors: {
        404: `Unable to update the repo in the database`,
        501: `Unable to update the repo in the database`,
      },
    });
  }

  /**
   * Update a secret in the database
   * @param body Payload containing secret to update
   * @returns Secret Successfully updated the secret in the database
   * @throws ApiError
   */
  public static adminUpdateSecret(body: Secret): CancelablePromise<Secret> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/secret",
      body: body,
      errors: {
        404: `Unable to update the secret in the database`,
        501: `Unable to update the secret in the database`,
      },
    });
  }

  /**
   * Update a hook in the database
   * @param body Payload containing service to update
   * @returns Service Successfully updated the service in the database
   * @throws ApiError
   */
  public static adminUpdateService(body: Service): CancelablePromise<Service> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/service",
      body: body,
      errors: {
        404: `Unable to update the service in the database`,
        500: `Unable to update the service in the database`,
      },
    });
  }

  /**
   * Update a step in the database
   * @param body Payload containing step to update
   * @returns Step Successfully updated the step in the database
   * @throws ApiError
   */
  public static adminUpdateStep(body: Step): CancelablePromise<Step> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/step",
      body: body,
      errors: {
        404: `Unable to update the step in the database`,
        500: `Unable to update the step in the database`,
      },
    });
  }

  /**
   * Update a user in the database
   * @param body Payload containing user to update
   * @returns User Successfully updated the user in the database
   * @throws ApiError
   */
  public static adminUpdateUser(body: User): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/admin/user",
      body: body,
      errors: {
        404: `Unable to update the user in the database`,
        500: `Unable to update the user in the database`,
      },
    });
  }

  /**
   * Get a worker registration token
   * @param worker Hostname of the worker
   * @returns Token Successfully generated registration token
   * @throws ApiError
   */
  public static registerToken(worker: string): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/admin/workers/{worker}/register-token",
      path: {
        worker: worker,
      },
      errors: {
        401: `Unauthorized`,
      },
    });
  }
}
