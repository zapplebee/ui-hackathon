interface SecretsTableProps {
  head: React.ReactNode;
  body: React.ReactNode;
}
export function Table({ head, body }: SecretsTableProps) {
  return (
    <>
      <div className="overflow-x-scroll">
        <table className="mb-4 w-full border-collapse bg-vela-coal-dark">
          <thead className="border-b-2 border-b-vela-lavender [&_th]:whitespace-nowrap [&_th]:p-[0.625rem] [&_th]:text-left [&_th]:font-bold">
            {head}
          </thead>
          <tbody className="[&_td]:p-[0.625rem] [&_td]:text-left [&_td]:[word-wrap:break-word] [&_tr]:border-b [&_tr]:border-b-vela-coal-light last:[&_tr]:border-b-transparent">
            {body}
          </tbody>
        </table>
      </div>
    </>
  );
}
