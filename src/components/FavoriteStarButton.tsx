import React from "react";
import { mapOrgRepoToString } from "../library/utils";
import { FavoriteStar } from "./FavoriteStar";

interface FavoriteStarProps {
  onClick?: (updatedFavorites: string[]) => void;
  favorites?: string[];
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
export function FavoriteStarButton({
  onClick,
  favorites,
  repo,
  org,
}: FavoriteStarProps) {
  const fullName = mapOrgRepoToString({
    org: org,
    repo: repo,
  });

  const favorited = !!favorites?.includes(fullName);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let nextFavorites = [];

    if (favorited) {
      nextFavorites = (favorites ?? []).filter((f) => f !== fullName);
    } else {
      nextFavorites = [
        ...(favorites ?? []),
        mapOrgRepoToString({ org: org, repo: repo }),
      ];
    }

    if (onClick) {
      onClick(nextFavorites);
    }
  }

  return (
    <>
      <button
        className="flex items-center justify-center"
        onClick={handleClick}
        title={
          favorited
            ? `Remove ${org}/${repo} from user favorites`
            : `Add ${org}/${repo} to user favorites`
        }
        aria-label={
          favorited
            ? `Remove ${org}/${repo} from user favorites`
            : `Add ${org}/${repo} to user favorites`
        }
      >
        <FavoriteStar enabled={favorited} />
      </button>
    </>
  );
}
