/**
 * React Query mutations provide an `any` typed failure reason. This utility
 * extracts the error text from an api error and returns it.
 * @param failureReason E
 * @returns failure reason text if available
 */
export function getFailureText(failureReason: any) {
  const failureString =
    ((failureReason && typeof failureReason?.body) === "string"
      ? JSON.parse(failureReason?.body)?.error
      : failureReason?.body?.error) ?? "Unknown Error";

  return failureString;
}
