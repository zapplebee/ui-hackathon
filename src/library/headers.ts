/**
 * What is all of this?
 *
 * It's a workaround for the API using headers to define pagination and total count status.
 *
 * We dangerously append a secret field `__headers` to api body results returned.
 *
 * Then, we can get access back to those headers using these methods.
 *
 * We need to adjust the Generated API if we do not want this approach, or convert the responses
 * to inline pagination details.
 */

export type SerializedHeaders = Record<string, string>;

export function getHeaders(value: unknown): SerializedHeaders | null {
  if (value && typeof value === "object" && "__headers" in value) {
    return value.__headers as SerializedHeaders;
  }

  return null;
}

export function getTotalCount(headers: SerializedHeaders | null) {
  const name = "x-total-count";

  if (!headers) {
    return null;
  }

  const header = headers[name];
  return header ?? null;
}

export function getLink(headers: SerializedHeaders | null) {
  const name = "link";

  if (!headers) {
    return null;
  }

  const header = headers[name];
  return header ?? null;
}

export function getPagination(header: string | null) {
  if (!header) {
    return null;
  }

  const tuples = header.split(",").map((s) => s.trim());
  const kvs = tuples.map((tuple) => {
    const matches = [...tuple.matchAll(/<(.*)>;\srel="(.*)"/gi)];

    const key = matches[0][2];
    const value = matches[0][1];
    const kv = [key, value];

    return kv;
  });

  const serializedHeaders: SerializedHeaders = Object.fromEntries(kvs);

  return serializedHeaders;
}
