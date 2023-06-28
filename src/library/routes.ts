export function getRootRoute() {
  return "/";
}

export function getRepoSecretsRoute(org: string, repo: string) {
  return `/${org}/${repo}/$/secrets/native`;
}

export function getOrgSecretsRoute(org: string) {
  return `/${org}/$/secrets/native`;
}

export function getOrgSharedSecretsRoute(org: string, team: string) {
  return `/${org}/$/secrets/native/shared/${team}`;
}

export function getOrgRoute(org: string) {
  return `/${org}`;
}

export function getRepoRoute(org: string, repo: string) {
  return `/${org}/${repo}`;
}

export function getBuildRoute(org: string, repo: string, number: string) {
  return `/${org}/${repo}/${number}`;
}

export function getSourceReposRoute() {
  return `/account/source-repos`;
}
