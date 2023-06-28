import { useQuery } from "@tanstack/react-query";
import { useOrgRepoParams } from "../library/hooks/useOrgRepoParams";
import { Deployment, DeploymentService } from "../api";
import { usePageParam } from "../library/hooks/usePageParam";
import { Loader } from "../components/Loader";
import React from "react";
import { StatusIndicator } from "../components/StatusIndicator";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { IconGear } from "../components/IconGear";
import { TopBumper } from "../components/TopBumper";
import { Menu, Transition } from "@headlessui/react";
import { Pager } from "../components/Pager";

export function RepoDeployments() {
  const { org, repo } = useOrgRepoParams();
  const { page } = usePageParam();

  const deployments = useQuery({
    queryKey: ["deployments", org, repo, page],
    queryFn: () => DeploymentService.getDeployments(org!, repo!, page),
  });

  return (
    <>
      <TopBumper />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold">Deployments</h2>
            {deployments.isLoading ? <Loader /> : null}
          </div>
          {deployments.isSuccess ? (
            <div>
              <Link
                to={`/${org}/${repo}/add-deployment`}
                className="btn-secondary flex items-center gap-2"
              >
                <span>Add Deployment</span>
                <svg
                  fill="none"
                  height="18"
                  width="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </Link>
            </div>
          ) : null}
        </div>
        {deployments.isSuccess && deployments.data.length === 0 ? (
          <NoDeployments />
        ) : null}
        {deployments.isSuccess && deployments.data.length > 0 ? (
          <>
            {deployments.data.map((deployment) => {
              return (
                <React.Fragment key={deployment.id}>
                  <DeploymentRow
                    org={org!}
                    repo={repo!}
                    deployment={deployment}
                  />
                </React.Fragment>
              );
            })}
            <Pager path={`/${org}/${repo}/deployments`} page={page} />
          </>
        ) : null}
      </div>
    </>
  );
}

export function NoDeployments() {
  const { org, repo } = useOrgRepoParams();
  return (
    <>
      <p>
        There are no deployments yet for{" "}
        <code>
          {org}/{repo}
        </code>
        .
      </p>
    </>
  );
}

interface DeploymentRowProps {
  org: string;
  repo: string;
  deployment: Deployment;
}

function DeploymentRow(props: DeploymentRowProps) {
  return (
    <div className="relative" data-deployment-card>
      <div className="flex border-b-2 border-t-2 border-vela-green bg-vela-coal-dark text-white">
        <Link data-build-indicator to={`#`} className="flex">
          <StatusIndicator status={"success"} />
        </Link>
        <div className="flex flex-1 flex-col gap-1 px-6 py-4" data-build-info>
          <div className="flex items-center justify-between gap-4">
            <div>
              #{props.deployment.id} - {props.deployment.description}
            </div>
            <div>
              <DeploymentActions />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              {props.deployment.target} (
              {props.deployment.commit?.substring(0, 8)}) on{" "}
              {props.deployment.ref} by {props.deployment.user}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeploymentActions() {
  // todo: define the functionality
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-vela-gray hover:text-vela-offwhite">
          <IconGear />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-44 origin-top-right border border-vela-cyan bg-vela-coal-dark shadow-lg">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active
                      ? "bg-vela-coal text-white underline"
                      : "text-vela-offwhite",
                    "block w-full px-4 py-2 text-sm"
                  )}
                >
                  {/* what does this do? */}
                  Redeploy
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
