export function getRootRoute() {
  return "/";
}

export function getRepoSecretsRoute(org: string, repo: string) {
  return `/${org}/${repo}/$/secrets/native`;
}

export function getRepoSecretsAddRoute(org: string, repo: string) {
  return `/${org}/${repo}/$/secrets/native/add`;
}

export function getRepoSecretsEditRoute(
  org: string,
  repo: string,
  secretName: string,
) {
  return `/${org}/${repo}/$/secrets/native/edit/${secretName}`;
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

export function getBuildRoute(
  org: string,
  repo: string,
  number: string | number,
) {
  return `/${org}/${repo}/${number}`;
}

export function getBuildServicesRoute(
  org: string,
  repo: string,
  number: string | number,
) {
  return `/${org}/${repo}/${number}/services`;
}

export function getBuildPipelineRoute(
  org: string,
  repo: string,
  number: string | number,
) {
  return `/${org}/${repo}/${number}/pipeline`;
}

export function getSourceReposRoute() {
  return `/account/source-repos`;
}
