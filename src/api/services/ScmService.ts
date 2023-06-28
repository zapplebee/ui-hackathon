/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ScmService {
  /**
   * Sync up repos from scm service and database in a specified org
   * @param org Name of the org
   * @returns string Successfully synchronized repos
   * @throws ApiError
   */
  public static syncRepos(org: string): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/scm/orgs/{org}/sync",
      path: {
        org: org,
      },
      errors: {
        500: `Unable to synchronize org repositories`,
      },
    });
  }

  /**
   * Sync up scm service and database in the context of a specific repo
   * @param org Name of the org
   * @param repo Name of the repo
   * @returns any Successfully synchronized repo
   * @throws ApiError
   */
  public static syncRepo(org: string, repo: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/scm/repos/{org}/{repo}/sync",
      path: {
        org: org,
        repo: repo,
      },
      errors: {
        500: `Unable to synchronize repo`,
      },
    });
  }
}
