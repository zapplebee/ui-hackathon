import { useLocation } from "react-router";

export interface Props {
  title?: string;
}

export function ComingSoon({ title }: Props) {
  const location = useLocation();
  return (
    <div className="my-4 rounded border border-dashed border-gray-600 p-4">
      <h1 className="text-3xl font-bold text-white">
        {title ? title : "Coming Soon"}
      </h1>
      <p className="text-stone-100">
        Hi, you found a screen that is not ready yet. Check back soon!
      </p>
      <br />
      <div className="border-l-4 border-vela-lavender p-4">
        <h2 className="text-sm font-bold uppercase text-vela-cyan">Route</h2>
        <p className="font-mono text-vela-green">{location.pathname}</p>
      </div>
    </div>
  );
}
