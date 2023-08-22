import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { UsersService } from "../api";
import { Logo } from "./Logo";

export function AppHeader() {
  return (
    <header
      id="vela-top"
      className="__custom-header-radial-gradient __custom-header-border-effect"
    >
      <div className="flex items-center justify-between">
        {/* left */}
        <div className="flex gap-4">
          <Link to="/" className="py-4 pl-12">
            <div className="sr-only">Vela</div>
            <div className="block h-6 w-6">
              <Logo />
            </div>
          </Link>

          <div className="py-4">
            <UserActions />
          </div>
        </div>

        {/* right */}
        <div className="hidden py-4 pr-12 sm:block">
          <ul className="flex items-center gap-4 text-xs">
            {/* todo: slash separators */}

            <li>
              <Link to="/">overview</Link>
            </li>
            <li>
              <a
                href="https://github.com/go-vela/community/issues/new/choose"
                rel="noopener noreferrer"
              >
                feedback
              </a>
            </li>
            <li>
              <a
                href="https://go-vela.github.io/docs/"
                rel="noopener noreferrer"
              >
                docs
              </a>
            </li>
            {/* todo: needs aria, interactive popover, etc */}
            <li>
              <a className="text-vela-offwhite underline" href="#">
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
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function UserActions() {
  const navigate = useNavigate();

  const currentUser = useQuery({
    queryKey: ["current-user"],
    queryFn: UsersService.getCurrentUser,
  });

  if (!currentUser.data) {
    return (
      <div className="relative inline-block text-left">
        <div className="flex items-center gap-2 text-vela-offwhite hover:text-white">
          <span>Vela</span>
        </div>
      </div>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center gap-2 text-vela-offwhite hover:text-white">
          {({ open }) => {
            return (
              <>
                <span>{currentUser.data.name}</span>
                <svg
                  className={classNames(
                    "transform text-vela-cyan transition-transform duration-300",
                    { "-rotate-180": open },
                    { "rotate-0": !open },
                  )}
                  fill="none"
                  height="20"
                  width="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </>
            );
          }}
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
        <Menu.Items className="absolute left-0 z-10 w-44 origin-top-right border border-vela-cyan bg-vela-coal-dark shadow-lg">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#settings"
                  className={classNames(
                    active
                      ? "bg-vela-coal !text-white underline"
                      : "!text-vela-offwhite",
                    "block w-full px-4 py-2 text-sm",
                  )}
                >
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    window.localStorage.clear();
                    navigate("/account/login");
                  }}
                  className={classNames(
                    active
                      ? "bg-vela-coal !text-white underline"
                      : "!text-vela-offwhite",
                    "block w-full px-4 py-2 text-left text-sm",
                  )}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
