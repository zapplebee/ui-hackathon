import { Helmet } from "react-helmet-async";
// import { Button } from "../components/button/Button";
import { Details } from "../components/Details";
import { DetailsPanel } from "../components/DetailsPanel";
import { PageTitle } from "../components/PageTitle";
import { TopBumper } from "../components/TopBumper";
import { StatusIndicator } from "../components/StatusIndicator";
import { ExternalLink } from "../components/ExternalLink";
import { Searchbar } from "../components/Searchbar";

/**
 * The purpose of the kitchen is to display generic non-connected versions of
 * components. Think of this like a storybook that's built in.
 *
 * The name is inspired by the phrase `and the kitchen sink`, because it has everything.
 *
 */
export function Kitchen() {
  return (
    <>
      <Helmet>
        <title>{`Kitchen - Vela`}</title>
      </Helmet>
      <TopBumper />
      <div className="space-y-4">
        <PageTitle>Kitchen</PageTitle>

        {/* <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Buttons, Plain</h3>

          <Button>Primary (default) button</Button>
          <Button intent="secondary">Secondary button</Button>
          <Button intent="underlined">Underlined button</Button>

          <h3 className="font-bold">Buttons, Disabled</h3>
          <Button disabled>Primary (default) button</Button>
          <Button intent="secondary" disabled>
            Secondary button
          </Button>
          <Button intent="underlined" disabled>
            Underlined button
          </Button>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Anchors, Plain</h3>

          <Button as="a" href="#">
            Primary (default) button
          </Button>
          <Button as="a" href="#" intent="secondary">
            Secondary button
          </Button>
          <Button as="a" href="#" intent="underlined">
            Underlined button
          </Button>
        </div> */}

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Details</h3>

          <Details summary={<>Generic label</>}>
            <DetailsPanel>Generic details panel content</DetailsPanel>
          </Details>

          <Details summary={<>Open by default</>} open={true}>
            <DetailsPanel>Generic details panel content</DetailsPanel>
          </Details>

          <Details summary={<>Customized details panel alternative</>}>
            <div className="bg-vela-coal-light p-4 text-sm">
              Customized panel
            </div>
          </Details>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Status Indicator</h3>

          <div className="flex items-center gap-4">
            <StatusIndicator status="success" />
            <div>Success</div>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="running" />
            <div>Running</div>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="pending" />
            <div>Pending</div>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="failure" />
            <div>Failure</div>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="canceled" />
            <div>Canceled</div>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="error" />
            <div>Error</div>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">External link</h3>

          <div>
            <ExternalLink href="#">External link</ExternalLink>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Search bar</h3>

          <div>
            <Searchbar placeholder="search" />
          </div>
        </div>
      </div>
    </>
  );
}
