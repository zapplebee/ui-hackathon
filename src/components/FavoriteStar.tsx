import classNames from "classnames";

export interface FavoriteStarProps {
  enabled: boolean;
}

export function FavoriteStar({ enabled }: FavoriteStarProps) {
  const enabledCls = classNames(
    "w-8 h-8 stroke-2 transition-all duration-300 hover:scale-110",
    {
      "stroke-vela-yellow fill-vela-yellow": enabled,
      "stroke-vela-yellow": !enabled,
    },
  );

  return (
    <svg viewBox="0 0 30 30" className={enabledCls}>
      <path d="M23.1527 26.2212l-1.557-9.0781 6.5957-6.4292-9.115-1.3245L15 1.1298l-4.0764 8.2596-9.115 1.3245 6.5957 6.4292-1.557 9.0781L15 21.9352l8.1527 4.286z"></path>
    </svg>
  );
}
