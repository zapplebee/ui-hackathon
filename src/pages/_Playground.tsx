import { Helmet } from "react-helmet-async";
import { PageTitle } from "../components/PageTitle";
import { TopBumper } from "../components/TopBumper";

/**
 * The purpose of the playground is to try new components before they are finalized
 * and often put into the `./Kitchen`.
 *
 * @see ./Kitchen.tsx
 */
export function Playground() {
  return (
    <>
      <Helmet>
        <title>{`Playground - Vela`}</title>
      </Helmet>
      <TopBumper />
      <div className="space-y-4">
        <PageTitle>Playground</PageTitle>
        <div>{/* play here */}</div>
      </div>
    </>
  );
}
