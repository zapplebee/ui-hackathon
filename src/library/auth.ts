export function getTokenKey() {
  return "vela-access-token";
}

export function getToken() {
  return window.localStorage.getItem(getTokenKey());
}

/**
 * Detects if the current user is authenticated.
 *
 * @todo 🔴 only reads session storage and does not validate token expiration
 *
 * @returns
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}
