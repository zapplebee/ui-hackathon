/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Token } from "../models/Token";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AuthenticateService {
  /**
   * Start OAuth flow or exchange tokens
   * @param code the code received after identity confirmation
   * @param state a random string
   * @param redirectUri the url where the user will be sent after authorization
   * @returns Token Successfully authenticated
   * @throws ApiError
   */
  public static getAuthenticate(
    code?: string,
    state?: string,
    redirectUri?: string
  ): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/authenticate",
      query: {
        code: code,
        state: state,
        redirect_uri: redirectUri,
      },
      errors: {
        307: `Redirected for authentication`,
        401: `Unable to authenticate`,
        503: `Service unavailable`,
      },
    });
  }

  /**
   * Authentication entrypoint that builds the right post-auth
   * redirect URL for CLI authentication requests
   * and redirects to /authenticate after
   * @param port the port number
   * @param code the code received after identity confirmation
   * @param state a random string
   * @returns void
   * @throws ApiError
   */
  public static getAuthenticateTypeCli(
    port: number,
    code?: string,
    state?: string
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/authenticate/cli/{port}",
      path: {
        port: port,
      },
      query: {
        code: code,
        state: state,
      },
      errors: {
        307: `Redirected for authentication`,
      },
    });
  }

  /**
   * Authenticate to Vela via personal access token
   * @param token scopes: repo, repo:status, user:email, read:user, and read:org
   *
   * @returns Token Successfully authenticated
   * @throws ApiError
   */
  public static postAuthenticateToken(token: string): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/authenticate/token",
      headers: {
        Token: token,
      },
      errors: {
        401: `Unable to authenticate`,
        503: `Service unavailable`,
      },
    });
  }

  /**
   * Authentication entrypoint that builds the right post-auth
   * redirect URL for web authentication requests
   * and redirects to /authenticate after
   * @param code the code received after identity confirmation
   * @param state a random string
   * @returns void
   * @throws ApiError
   */
  public static getAuthenticateTypeWeb(
    code?: string,
    state?: string
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/authenticate/web",
      query: {
        code: code,
        state: state,
      },
      errors: {
        307: `Redirected for authentication`,
      },
    });
  }

  /**
   * Log into the Vela api
   * @param type the login type ("cli" or "web")
   * @param port the port number when type=cli
   * @returns void
   * @throws ApiError
   */
  public static getLogin(
    type?: "web" | "cli",
    port?: number
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/login",
      query: {
        type: type,
        port: port,
      },
      errors: {
        307: `Redirected to /authenticate`,
      },
    });
  }

  /**
   * Log out of the Vela api
   * @returns string Successfully logged out
   * @throws ApiError
   */
  public static getLogout(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/logout",
      errors: {
        503: `Logout did not succeed`,
      },
    });
  }

  /**
   * Refresh an access token
   * @returns Token Successfully refreshed a token
   * @throws ApiError
   */
  public static getRefreshAccessToken(): CancelablePromise<Token> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/token-refresh",
      errors: {
        401: `Unauthorized`,
      },
    });
  }

  /**
   * Validate a server token
   * @returns string Successfully validated a token
   * @throws ApiError
   */
  public static validateServerToken(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/validate-token",
      errors: {
        401: `Unauthorized`,
      },
    });
  }
}
