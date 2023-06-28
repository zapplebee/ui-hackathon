import classNames from "classnames";
import React from "react";
import { User } from "../api";
import { mapOrgRepoToString } from "../library/utils";

interface FavoriteStarProps {
  onClick: (updatedFavorites: string[]) => void;
  currentUser: User;
  repo: string;
  org: string;
}

/**
 * Favorite star component. Requires parent to handle xhr and data.
 *
 * TODO: should parent need to do this or can this component handle it?
 *       or abstract it all with a hook?
 *
 * @param props
 * @returns
 */
export function FavoriteStar(props: FavoriteStarProps) {
  const fullName = mapOrgRepoToString({
    org: props.org,
    repo: props.repo,
  });

  const favorited = props.currentUser.favorites?.includes(fullName);
  const favoriteCls = classNames("stroke-2", {
    "fill-vela-yellow": favorited,
    "stroke-vela-yellow": !favorited,
  });

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let favorites = [];

    if (favorited) {
      favorites = (props.currentUser.favorites ?? []).filter(
        (f) => f !== fullName
      );
    } else {
      favorites = [
        ...(props.currentUser.favorites ?? []),
        mapOrgRepoToString({ org: props.org, repo: props.repo }),
      ];
    }

    props.onClick(favorites);
  }

  return (
    <>
      <button
        className="flex items-center justify-center"
        onClick={handleClick}
        title={
          favorited
            ? `Remove ${props.org}/${props.repo} from user favorites`
            : `Add ${props.org}/${props.repo} to user favorites`
        }
        aria-label={
          favorited
            ? `Remove ${props.org}/${props.repo} from user favorites`
            : `Add ${props.org}/${props.repo} to user favorites`
        }
      >
        <svg viewBox="0 0 30 30" width="30" height="30" className={favoriteCls}>
          <path d="M23.1527 26.2212l-1.557-9.0781 6.5957-6.4292-9.115-1.3245L15 1.1298l-4.0764 8.2596-9.115 1.3245 6.5957 6.4292-1.557 9.0781L15 21.9352l8.1527 4.286z"></path>
        </svg>
      </button>
    </>
  );
}
