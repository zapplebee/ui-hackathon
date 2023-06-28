// GENERATION FAILED 🔴
//
// ----

// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
// import type { definitions_Token } from '../models/definitions_Token'; // <-------- BUG IN THE SYSTEM
// import type { Token } from '../models/Token';
// import type { Worker } from '../models/Worker';

// import type { CancelablePromise } from '../core/CancelablePromise';
// import { OpenAPI } from '../core/OpenAPI';
// import { request as __request } from '../core/request';

// export class WorkersService {

//     /**
//      * Retrieve a list of workers for the configured backend
//      * @returns Worker Successfully retrieved the list of workers
//      * @throws ApiError
//      */
//     public static getWorkers(): CancelablePromise<Array<Worker>> {
//         return __request(OpenAPI, {
//             method: 'GET',
//             url: '/api/v1/workers',
//             errors: {
//                 500: `Unable to retrieve the list of workers`,
//             },
//         });
//     }

//     /**
//      * Create a worker for the configured backend
//      * @param body Payload containing the worker to create
//      * @returns definitions_Token Successfully created the worker and retrieved auth token
//      * @throws ApiError
//      */
//     public static createWorker(
//         body: Worker,
//     ): CancelablePromise<definitions_Token> {
//         return __request(OpenAPI, {
//             method: 'POST',
//             url: '/api/v1/workers',
//             body: body,
//             errors: {
//                 400: `Unable to create the worker`,
//                 500: `Unable to create the worker`,
//             },
//         });
//     }

//     /**
//      * Retrieve a worker for the configured backend
//      * @param worker Hostname of the worker
//      * @returns Worker Successfully retrieved the worker
//      * @throws ApiError
//      */
//     public static getWorker(
//         worker: string,
//     ): CancelablePromise<Worker> {
//         return __request(OpenAPI, {
//             method: 'GET',
//             url: '/api/v1/workers/{worker}',
//             path: {
//                 'worker': worker,
//             },
//             errors: {
//                 404: `Unable to retrieve the worker`,
//             },
//         });
//     }

//     /**
//      * Update a worker for the configured backend
//      * @param body Payload containing the worker to update
//      * @param worker Name of the worker
//      * @returns Worker Successfully updated the worker
//      * @throws ApiError
//      */
//     public static updateWorker(
//         body: Worker,
//         worker: string,
//     ): CancelablePromise<Worker> {
//         return __request(OpenAPI, {
//             method: 'PUT',
//             url: '/api/v1/workers/{worker}',
//             path: {
//                 'worker': worker,
//             },
//             body: body,
//             errors: {
//                 400: `Unable to update the worker`,
//                 404: `Unable to update the worker`,
//                 500: `Unable to update the worker`,
//             },
//         });
//     }

//     /**
//      * Delete a worker for the configured backend
//      * @param worker Name of the worker
//      * @returns string Successfully deleted of worker
//      * @throws ApiError
//      */
//     public static deleteWorker(
//         worker: string,
//     ): CancelablePromise<string> {
//         return __request(OpenAPI, {
//             method: 'DELETE',
//             url: '/api/v1/workers/{worker}',
//             path: {
//                 'worker': worker,
//             },
//             errors: {
//                 500: `Unable to delete worker`,
//             },
//         });
//     }

//     /**
//      * Refresh authorization token for worker
//      * @param worker Name of the worker
//      * @returns Token Successfully refreshed auth
//      * @throws ApiError
//      */
//     public static refreshWorkerAuth(
//         worker: string,
//     ): CancelablePromise<Token> {
//         return __request(OpenAPI, {
//             method: 'POST',
//             url: '/api/v1/workers/{worker}/refresh',
//             path: {
//                 'worker': worker,
//             },
//             errors: {
//                 400: `Unable to refresh worker auth`,
//                 404: `Unable to refresh worker auth`,
//                 500: `Unable to refresh worker auth`,
//             },
//         });
//     }

// }
