import { PropsWithChildren } from "react";
import { Details } from "./Details";

export interface Props extends PropsWithChildren {
  name: React.ReactNode;
  decoration?: React.ReactNode;
  open?: boolean;
}

export function OrgGroup(props: Props) {
  return (
    <>
      <Details
        open={props.open}
        summary={
          <div className="flex gap-4">
            <div>{props.name}</div>
            {props.decoration ? (
              <div className="text-vela-gray-light">{props.decoration}</div>
            ) : null}
          </div>
        }
      >
        {props.children}
      </Details>
    </>
  );
}
