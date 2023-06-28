/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Repo } from "../models/Repo";
import type { Token } from "../models/Token";
import type { User } from "../models/User";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UsersService {
  /**
   * Retrieve the current authenticated user from the configured backend
   * @returns User Successfully retrieved the current user
   * @throws ApiError
   */
  public static getCurrentUser(): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/user",
    });
  }

  /**
   * Update the current authenticated user in the configured backend
   * @param body Payload containing the user to update
   * @returns User Successfully updated the current user
   * @throws ApiError
   */
  public static updateCurrentUser(body: User): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/user",
      body: body,
      errors: {
        400: `Unable to update the current user`,
        404: `Unable to update the current user`,
        500: `Unable to update the current user`,
      },
    });
  }

  /**
   * Retrieve a list of repos for the current authenticated user
   * @returns Repo Successfully retrieved a list of repos for the current user
   * @throws ApiError
   */
  public static getSourceRepos(): CancelablePromise<Repo> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/user/source/repos",
      errors: {
        404: `Unable to retrieve a list of repos for the current user`,
      },
    });
  }

  /**
   * Create a token for the current authenticated user
   * @returns Token Successfully created a token for the current user
   * @throws ApiError
   */
  public static createToken(): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/user/token",
      errors: {
        503: `Unable to create a token for the current user`,
      },
    });
  }

  /**
   * Delete a token for the current authenticated user
   * @returns string Successfully delete a token for the current user
   * @throws ApiError
   */
  public static deleteToken(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/user/token",
      errors: {
        500: `Unable to delete a token for the current user`,
      },
    });
  }

  /**
   * Retrieve a list of users for the configured backend
   * @param page The page of results to retrieve
   * @param perPage How many results per page to return
   * @returns User Successfully retrieved the list of users
   * @throws ApiError
   */
  public static listUsers(
    page: number = 1,
    perPage: number = 10
  ): CancelablePromise<Array<User>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users",
      query: {
        page: page,
        per_page: perPage,
      },
      errors: {
        400: `Unable to retrieve the list of users`,
        500: `Unable to retrieve the list of users`,
      },
    });
  }

  /**
   * Create a user for the configured backend
   * @param body Payload containing the user to create
   * @returns User Successfully created the user
   * @throws ApiError
   */
  public static createUser(body: User): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/users",
      body: body,
      errors: {
        400: `Unable to create the user`,
        500: `Unable to create the user`,
      },
    });
  }

  /**
   * Retrieve a user for the configured backend
   * @param user Name of the user
   * @returns User Successfully retrieved the user
   * @throws ApiError
   */
  public static getUser(user: string): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/users/{user}",
      path: {
        user: user,
      },
      errors: {
        404: `Unable to retrieve the user`,
      },
    });
  }

  /**
   * Update a user for the configured backend
   * @param user Name of the user
   * @param body Payload containing the user to update
   * @returns User Successfully updated the user
   * @throws ApiError
   */
  public static updateUser(user: string, body: User): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/v1/users/{user}",
      path: {
        user: user,
      },
      body: body,
      errors: {
        400: `Unable to update the user`,
        404: `Unable to update the user`,
        500: `Unable to update the user`,
      },
    });
  }

  /**
   * Delete a user for the configured backend
   * @param user Name of the user
   * @returns string Successfully deleted of user
   * @throws ApiError
   */
  public static deleteUser(user: string): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/users/{user}",
      path: {
        user: user,
      },
      errors: {
        404: `Unable to delete user`,
        500: `Unable to delete user`,
      },
    });
  }
}
