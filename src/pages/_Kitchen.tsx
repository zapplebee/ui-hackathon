import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BuildFilterBar } from "../components/BuildFilterBar";
import { Details } from "../components/Details";
import { DetailsPanel } from "../components/DetailsPanel";
import { ExternalLink } from "../components/ExternalLink";
import { Loader } from "../components/Loader";
import { LogsDisplay } from "../components/LogsDisplay";
import { PageTitle } from "../components/PageTitle";
import { Searchbar } from "../components/Searchbar";
import { StatusIndicator } from "../components/StatusIndicator";
import { TopBumper } from "../components/TopBumper";
import { Button } from "../components/button/Button";

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

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Buttons as buttons</h3>

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
          <h3 className="font-bold">Buttons as anchors (links)</h3>

          <Button as="a" href="#">
            Primary (default) button
          </Button>
          <Button as="a" href="#" intent="secondary">
            Secondary button
          </Button>
          <Button as="a" href="#" intent="underlined">
            Underlined button
          </Button>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Buttons as a router link</h3>

          <Button as={Link} to="/?example">
            Primary (default) button
          </Button>
          <Button as={Link} to="/?example" intent="secondary">
            Secondary button
          </Button>
          <Button as={Link} to="/?example" intent="underlined">
            Underlined button
          </Button>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Buttons with icons</h3>

          <Button
            intent="primary"
            className="flex gap-2 justify-between items-center"
          >
            <span>Restart Build</span>
            <Loader />
          </Button>

          <Button
            intent="primary"
            className="flex gap-2 justify-start items-center"
          >
            <span>Restart Build</span>
            <Loader />
          </Button>

          <Button
            intent="secondary"
            className="flex gap-2 justify-between items-center"
          >
            <span>Restart Build</span>
            <Loader />
          </Button>

          <Button
            intent="secondary"
            className="flex gap-2 justify-start items-center"
          >
            <span>Restart Build</span>
            <Loader />
          </Button>

          <div className="flex items-center gap-4">
            <Button
              intent="primary"
              className="flex gap-2 justify-start items-center"
            >
              ← newer
            </Button>
            <Button
              intent="primary"
              className="flex gap-2 justify-start items-center"
            >
              older →
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              intent="secondary"
              className="flex gap-2 justify-start items-center"
            >
              ← newer
            </Button>
            <Button
              intent="secondary"
              className="flex gap-2 justify-start items-center"
            >
              older →
            </Button>
          </div>
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Loading</h3>

          <Loader />
        </div>

        <div className="flex w-1/2 flex-col gap-4">
          <h3 className="font-bold">Details</h3>

          <Details summary={<>Generic label</>}>
            <DetailsPanel>
              <div className="space-y-4">
                <p>Generic details panel content</p>
                <hr />
                <div className="space-x-2">
                  <Button>Save</Button>
                  <Button intent="underlined">Cancel</Button>
                </div>
              </div>
            </DetailsPanel>
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

        <div className="flex flex-col gap-4">
          <h3 className="font-bold">Build Filter Bar</h3>

          <div>
            <BuildFilterBar />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-bold">Logs</h3>

          <Details summary="Logs" open={true}>
            <DetailsPanel padded={false}>
              <LogsDisplay
                id="example"
                number={1}
                active={true}
                fetching={false}
                logs={["Line 1", "Line 2", "Line 3"]}
              />
            </DetailsPanel>
          </Details>
        </div>
      </div>
    </>
  );
}
