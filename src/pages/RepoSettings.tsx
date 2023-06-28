import { TopBumper } from "../components/TopBumper";

export function RepoSettings() {
  return (
    <>
      <TopBumper />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(24rem,100%),1fr))] gap-16">
        <SettingsWebhookEvents />

        <SettingsAccess />

        <SettingsBuildLimit />

        <SettingsBuildTimeout />

        <SettingsBuildCounter />

        <SettingsStatusBadge />

        <SettingsAdmin />

        <SettingsPipelineType />
      </div>
    </>
  );
}

function SettingsPipelineType() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Pipeline Type
      </h2>

      <p>Change how the compiler treats the base vela config.</p>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4" data-test="repo-radio-yaml">
          <input
            type="radio"
            name="pipeline-type"
            id="radio-yaml"
            className="h-4 w-4 focus:ring-vela-cyan"
          />
          <label className="form-label" htmlFor="radio-yaml">
            <strong>YAML</strong>
          </label>
        </div>
        <div className="flex items-center gap-4" data-test="repo-radio-go">
          <input
            type="radio"
            name="pipeline-type"
            id="radio-go"
            className="h-4 w-4 focus:ring-vela-cyan"
          />
          <label className="form-label" htmlFor="radio-go">
            <strong>Go</strong>
          </label>
        </div>
        <div
          className="flex items-center gap-4"
          data-test="repo-radio-starlark"
        >
          <input
            type="radio"
            name="pipeline-type"
            id="radio-starlark"
            className="h-4 w-4 focus:ring-vela-cyan"
          />
          <label className="form-label" htmlFor="radio-starlark">
            <strong>Starlark</strong>
          </label>
        </div>
      </div>
    </section>
  );
}

function SettingsAdmin() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Admin
      </h2>

      <p>These actions require admin privileges.</p>

      <dl className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <dt>
            <strong>Chown Repository</strong>
            <p className="text-sm italic">
              This will make you the owner of the webhook for this repository.
            </p>
          </dt>
          <dd>
            <button className="btn-secondary w-[7.5rem]">Chown</button>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>
            <strong>Repair Repository</strong>
            <p className="text-sm italic">
              This will repair the webhook for this repository.
            </p>
          </dt>
          <dd>
            <button className="btn-secondary w-[7.5rem]">Repair</button>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt>
            <strong>Disable Repository</strong>
            <p className="text-sm italic">
              This will delete the Vela webhook from this repository.
            </p>
          </dt>
          <dd>
            <button className="btn-secondary w-[7.5rem]">Disable</button>
          </dd>
        </div>
      </dl>
    </section>
  );
}

function SettingsStatusBadge() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Status Badge
      </h2>

      <p>
        Show off your build status.
        <br />
        <em>Uses the default branch on your repository.</em>
      </p>

      <p>
        {/* todo: get badge icon link? */}
        <img src={`#`} />
      </p>

      <div className="flex gap-2">
        <textarea
          className="flex-1 border-0 bg-vela-coal-dark font-mono text-sm"
          rows={4}
        >
          [![Build Status](https://.../status.svg)](https://...)
        </textarea>
        <button className="btn-secondary">Copy</button>
      </div>

      <p>
        To customize branch,{" "}
        <a
          className="text-vela-cyan underline hover:no-underline"
          href="https://go-vela.github.io/docs/usage/badge/"
          rel="noopener noreferrer"
          target="_blank"
        >
          see our Badges documentation
        </a>
        .
      </p>
    </section>
  );
}

function SettingsBuildCounter() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Build Counter
      </h2>

      <p>Builds increment based off this number.</p>

      <div className="form-controls">
        <div className="flex items-center gap-4" data-test="repo-limit">
          <input
            id="repo-limit"
            type="number"
            min="0"
            className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-vela-cyan bg-transparent"
          />
          <label className="form-label" htmlFor="repo-limit">
            count
          </label>
        </div>
      </div>
    </section>
  );
}

function SettingsBuildTimeout() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Build Timeout
      </h2>

      <p>Builds that reach this timeout setting will be stopped.</p>

      <div className="form-controls">
        <div className="flex items-center gap-4" data-test="repo-limit">
          <input
            id="repo-limit"
            type="number"
            min="1"
            max="90"
            className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-vela-cyan bg-transparent"
          />
          <label className="form-label" htmlFor="repo-limit">
            limit
          </label>
        </div>
      </div>
    </section>
  );
}

function SettingsBuildLimit() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Build Limit
      </h2>

      <p>
        Concurrent builds (pending or running) that exceed this limit will be
        stopped.
      </p>

      <div className="form-controls">
        <div className="flex items-center gap-4" data-test="repo-timeout">
          <input
            id="repo-timeout"
            type="number"
            min="1"
            max="30"
            className="border-b-2 border-l-0 border-r-0 border-t-0 border-b-vela-cyan bg-transparent"
          />
          <label className="form-label" htmlFor="repo-timeout">
            minutes
          </label>
        </div>
      </div>
    </section>
  );
}

function SettingsAccess() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Webhook Events
      </h2>

      <p>Change who can access build information.</p>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4" data-test="repo-radio-private">
          <input
            type="radio"
            id="radio-private"
            name="access-level"
            className="h-4 w-4 focus:ring-vela-cyan"
          />
          <label className="flex items-center gap-4" htmlFor="radio-private">
            <strong>Private</strong>
            <span className="text-sm text-vela-gray">
              (restricted to those with repository access)
            </span>
          </label>
        </div>
        <div className="flex items-center gap-4" data-test="repo-radio-public">
          <input
            type="radio"
            id="radio-public"
            name="access-level"
            className="h-4 w-4 focus:ring-vela-cyan"
          />
          <label className="flex items-center gap-4" htmlFor="radio-public">
            <strong>Any</strong>
            <span className="text-sm text-vela-gray">
              (anyone with access to this Vela instance)
            </span>
          </label>
        </div>
      </div>
    </section>
  );
}

function SettingsWebhookEvents() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="border-b-2 border-b-vela-lavender text-2xl font-bold">
        Webhook Events
      </h2>

      <p>
        Control which events on Git will trigger Vela pipelines. Active
        repositories must have at least one event enabled.
      </p>

      <div className="flex flex-col gap-2">
        <div
          className="flex items-center gap-4"
          data-test="repo-checkbox-allow_push"
        >
          <input
            type="checkbox"
            id="checkbox-allow_push"
            className="h-4 w-4 rounded-none focus:ring-vela-cyan"
          />

          <label
            className="flex items-center gap-4"
            htmlFor="checkbox-allow_push"
          >
            <strong>Push</strong>
          </label>
        </div>
        <div
          className="flex items-center gap-4"
          data-test="repo-checkbox-allow_pull"
        >
          <input
            type="checkbox"
            id="checkbox-allow_pull"
            className="h-4 w-4 rounded-none focus:ring-vela-cyan"
          />
          <label className="form-label" htmlFor="checkbox-allow_pull">
            <strong>Pull Request</strong>
          </label>
        </div>
        <div
          className="flex items-center gap-4"
          data-test="repo-checkbox-allow_tag"
        >
          <input
            type="checkbox"
            id="checkbox-allow_tag"
            className="h-4 w-4 rounded-none focus:ring-vela-cyan"
          />
          <label className="form-label" htmlFor="checkbox-allow_tag">
            <strong>Tag</strong>
          </label>
        </div>
        <div
          className="flex items-center gap-4"
          data-test="repo-checkbox-allow_comment"
        >
          <input
            type="checkbox"
            id="checkbox-allow_comment"
            className="h-4 w-4 rounded-none focus:ring-vela-cyan"
          />
          <label className="form-label" htmlFor="checkbox-allow_comment">
            <strong>Comment</strong>
          </label>
        </div>
        <div
          className="flex items-center gap-4"
          data-test="repo-checkbox-allow_deploy"
        >
          <input
            type="checkbox"
            id="checkbox-allow_deploy"
            className="h-4 w-4 rounded-none focus:ring-vela-cyan"
          />
          <label className="form-label" htmlFor="checkbox-allow_deploy">
            <strong>Deploy</strong>
          </label>
        </div>
      </div>

      <div>
        <p className="bg-vela-coal-light p-4 text-vela-offwhite">
          Disclaimer: Vela repos do NOT have the <strong>pull_request</strong>{" "}
          event enabled by default. For all public repositories,{" "}
          <strong>any user</strong>, even outside of the organization, can open
          a pull request, triggering a build.{" "}
          <strong>
            The risks from this can include: changes to the pipeline, arbitrary
            code execution inside your environment, and exposure of
            Vela-accessible secrets in your repository.
          </strong>{" "}
          You can override this behavior, at your own risk.
        </p>
      </div>
    </section>
  );
}
