import { useRef } from "react";
import { Toast, ToastCommands } from "../components/Toast";

export function Playground() {
  const autoSaveRef = useRef<ToastCommands>(null);
  const savedRef = useRef<ToastCommands>(null);
  const errRef = useRef<ToastCommands>(null);

  return (
    <>
      <div className="flex gap-4 p-4">
        <button
          className="btn-primary"
          onClick={() => {
            savedRef.current?.publish();
          }}
        >
          Save
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            autoSaveRef.current?.publish();
          }}
        >
          Autosave
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            errRef.current?.publish();
          }}
        >
          Error
        </button>
      </div>

      <Toast ref={savedRef} title={<h2>Saved</h2>} type="success">
        Saved successfully!
      </Toast>
      <Toast ref={autoSaveRef} title={<h2>Autosave</h2>} type="info">
        Automatically saved.
      </Toast>
      <Toast ref={errRef} title={<h2>Error</h2>} type="error">
        Sorry, we could not save. Try again later.
      </Toast>
    </>
  );
}
