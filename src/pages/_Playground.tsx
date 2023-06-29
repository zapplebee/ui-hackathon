import { useToast } from "../components/Toast";

export function Playground() {
  const Toast = useToast();
  const Toast2 = useToast();

  return (
    <>
      <div className="flex gap-4 p-4">
        <button
          className="btn-primary"
          onClick={() => {
            Toast.publish();
          }}
        >
          Save
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            Toast2.publish();
          }}
        >
          Save
        </button>
      </div>

      <Toast.Component title={<h2>Saved</h2>} type="success">
        Saved successfully!
      </Toast.Component>
      <Toast2.Component title={<h2>Saved</h2>} type="error">
        Info
      </Toast2.Component>
    </>
  );
}
