export type OrgRepo = { org: string; repo: string };

export function mapOrgRepoStringsToObjects(
  orgRepoStrings: string[] | undefined | null
): OrgRepo[] {
  // favorites are stringy values org/repo format
  // let's map them into org/repo objects
  if (!orgRepoStrings) {
    return [];
  }
  const mapped = orgRepoStrings.map((favorite) =>
    mapOrgRepoStringToObject(favorite)
  );

  return mapped;
}

export function mapOrgRepoStringToObject(orgRepoString: string): OrgRepo {
  const split = orgRepoString.split("/");
  const org = split[0];
  const repo = split[1];
  return { org, repo };
}

export function mapToTree(orgRepos: OrgRepo[]): Record<string, OrgRepo[]> {
  const uniqueOrgs = orgRepos.reduce((a: string[], b: OrgRepo) => {
    if (!a.includes(b.org)) {
      return [...a, b.org];
    }
    return a;
  }, []);

  const repos = uniqueOrgs.map((org) => {
    const reposForOrg = orgRepos.filter((or) => or.org === org);
    return reposForOrg;
  });

  const zip = Object.fromEntries(
    uniqueOrgs.map((org, index) => {
      return [org, repos[index]];
    })
  );

  return zip;
}

export function mapOrgRepoToString(orgRepo: OrgRepo) {
  return `${orgRepo.org}/${orgRepo.repo}`;
}
