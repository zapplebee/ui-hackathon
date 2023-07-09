import classNames from "classnames";
import { Link } from "react-router-dom";
import { Build } from "../api";
import { StatusIndicator } from "./StatusIndicator";

import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { IconGear } from "./icons/IconGear.tsx";
import { TimeDuration } from "./TimeDuration";
import { TimeTicker3 } from "./TimeTicker3";

interface BuildRowProps {
  build: Build;
  showOrg?: boolean;
  showActions?: boolean;
}

export function BuildRow({
  build,
  showOrg = false,
  showActions = true,
}: BuildRowProps) {
  // well this is a hack, what is going on in here?
  // todo: refactor this; should come from build now
  const matches = build.clone!.match(/https?:\/\/.*\/(.+)\/(.+)\.git/);
  const orgName = matches?.[1] ?? "unknown";
  const repoName = matches?.[2] ?? "unknown";

  const cls = classNames("flex text-white bg-vela-coal-dark", {
    // running has a special case
    "border-vela-green border-t-2 border-b-2": build.status === "success",
    "border-vela-red border-t-2 border-b-2":
      build.status === "failure" ||
      build.status === "canceled" ||
      build.status === "error",
  });

  const buildBase = `/${orgName}/${repoName}`;

  return (
    <div
      className="relative"
      data-build-card
      data-org={orgName}
      data-repo={repoName}
    >
      <div className={cls}>
        <Link
          data-build-indicator
          to={`${buildBase}/${build.number}`}
          className="flex"
        >
          <StatusIndicator
            status={
              build.status as Parameters<typeof StatusIndicator>[0]["status"]
            }
          />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col px-6 py-4" data-build-info>
          <div className="flex min-w-0 flex-row items-center justify-between">
            <div className="flex min-w-0 flex-row gap-1">
              <div>
                <Link
                  className="text-blue-400 underline hover:no-underline"
                  to={`${buildBase}/${build.number}`}
                >
                  #{build.number}
                </Link>
              </div>
              <div>&ndash;</div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {build.message}
              </div>
            </div>
            <div>{showActions ? <BuildActions /> : null}</div>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div>
              {showOrg ? (
                <>
                  <a
                    // todo: how do we reconstruct this url?
                    // todo: add rel no ref / no opener w/ target blank
                    href="#"
                    className="text-blue-400 underline hover:no-underline"
                  >
                    {repoName}
                  </a>
                  :{" "}
                </>
              ) : null}
              {build.event} (
              <a
                href="#"
                className="text-blue-400 underline hover:no-underline"
              >
                {build.commit!.substring(0, 8)}
              </a>
              ) on{" "}
              <a
                href="#"
                className="text-blue-400 underline hover:no-underline"
              >
                {build.branch}
              </a>{" "}
              by {build.author}
            </div>
            <div className="flex gap-2">
              <div className="block whitespace-nowrap">
                <TimeDuration created={build.created!} />
              </div>
              <div className="text-vela-lavender">/</div>
              <div className="font-mono">
                <TimeTicker3 start={build.started!} end={build.finished} />
              </div>
            </div>
          </div>
          {/* this is error line, probably */}
          <div>
            {build.status === "canceled" ? (
              <div className="text-base text-vela-red-light">
                build was canceled
              </div>
            ) : null}
            {build.status === "error" ? (
              <div className="text-base text-vela-red-light">
                {build.error ? build.error : "unknown error"}
              </div>
            ) : null}
          </div>
        </div>
        {build.status === "running" ? <BuildAnimation /> : null}
      </div>
    </div>
  );
}

// TODO
export function BuildAnimation() {
  return (
    <>
      <div className="build-animation">
        <svg
          className="-frame-0 -top -cover build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-particles "
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          ></line>
        </svg>
        <svg
          className="-frame-0 -top -start build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-start none"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          ></line>
        </svg>
        <svg
          className="-frame-1 -top -running build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-particles -animation-dashes-2"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          ></line>
        </svg>
        <svg
          className="-frame-2 -top -running build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-particles -animation-dashes-2"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          ></line>
        </svg>
        <svg
          className="-frame-0 -bottom -cover build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-particles "
            x1="0%"
            x2="100%"
            y1="100%"
            y2="100%"
          ></line>
        </svg>
        <svg
          className="-frame-0 -bottom -start build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-start none"
            x1="0%"
            x2="100%"
            y1="100%"
            y2="100%"
          ></line>
        </svg>
        <svg
          className="-frame-1 -bottom -running build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-particles -animation-dashes-1"
            x1="0%"
            x2="100%"
            y1="100%"
            y2="100%"
          ></line>
        </svg>
        <svg
          className="-frame-2 -bottom -running build-animation"
          strokeWidth="4"
          height="4"
          aria-hidden="true"
        >
          <line
            className="-running-particles -animation-dashes-1"
            x1="0%"
            x2="100%"
            y1="100%"
            y2="100%"
          ></line>
        </svg>
      </div>
    </>
  );
}

function BuildActions() {
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
                  Restart build
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
