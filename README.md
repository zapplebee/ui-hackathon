# vela with vite and tailwind proof of concept

This is a proof of concept of what vela could look like with vite and tailwind.

> 🟠 This is a proof of concept. The code is not pretty but it demonstrates the approach.

## Tech

- [vite](https://vitejs.dev/)
- [tailwind](https://tailwindcss.com/)
- [react](https://react.dev/)
- [react router](https://reactrouter.com/en/main)
- [date-fns](https://date-fns.org/)
- [prettier](https://prettier.io/)

## Todo

- [ ] toasts (possibly powered by radix)
  - [x] stubbed
  - [ ] wide implementation
- [ ] `{:buildNumber}/services` page
- [ ] `{:buildNumber}/pipeline` page
- [ ] better mobile designs
  - [x] once over pass of existing pages
- [ ] write-centric-pages (e.g. anything with forms)
  - [x] consider [react-hook-form](https://www.npmjs.com/package/react-hook-form)
  - [ ] add deployment
  - [x] add repo secret
  - [ ] add org secret
  - [ ] add shared secret
  - [ ] settings
- [ ] automatic anchor hash components
  - [ ] for steps
  - [ ] for line numbers
  - [ ] for line number ranges
- [ ] tech
  - [ ] replace `@headlessui/react` with [radix-ui](https://www.radix-ui.com/)
  - [ ] replace `classnames` with [clsx](https://www.npmjs.com/package/clsx)
- [ ] inline todos
  - [ ] roughly 55 inline todos as of 2023-06-26

## Integrations

Zac Skalko exported "Velakit". It's been inlined into this repository but could be a standalone repository too.

`./src/api` was generated with ...

- [openapi-typescript-codegen](https://www.npmjs.com/package/)
- [jcgregorio/typescriptify-golang-structs](https://pkg.go.dev/github.com/jcgregorio/typescriptify-golang-structs)
- and this node script...

  ```js
  const yaml = require("yaml");
  const child_process = require("child_process");
  const fs = require("fs");

  const swag = yaml.parse(
    fs.readFileSync("vela-swagger-doc.yml").toString("utf-8")
  );

  const defs = {};

  Object.entries(swag.definitions).forEach(([key, v]) => {
    if (!defs[v["x-go-package"]]) {
      defs[v["x-go-package"]] = [v["x-go-name"] ?? key];
    } else {
      defs[v["x-go-package"]].push(v["x-go-name"] ?? key);
    }
  });

  const foo = new Set();

  Object.entries(defs).forEach(([package, structs]) => {
    structs.forEach((s) => foo.add(s));
    const command = `tscriptify -package=${package} -target=${package
      .replace(/\//gi, "_")
      .replace(/\./gi, "")}.ts ${structs.join(" ")}`;
    console.log(command);
    child_process.execSync(command);
  });
  ```

😬 **note** that the api bindings for the vela swagger api were _not_ always sufficient.

## Usage

Start up the new vela user interface:

```
yarn install

yarn dev
```

You can run the backend services locally, but it is much easier to develop against an existing vela backend.

```
cd dev
docker compose up
```

💁‍♂️ **we use** the `dev` folder so that `vite` can load its own `.env` or similar files at the top level instead

### Proxy setup

1. set your `.env.local` file, with environment variable `VITE_VELA_API="..."`
2. use the proxy configuration option `USE_PROXY="..." yarn dev`

   or combine them `VITE_VELA_API="..." USE_PROXY="..."` yarn dev

😸 **this is useful** if you want to test against a live vela backend

If you end up using the _proxy setup_, you'll probably want to log into the local ui...

For now a trick is getting your _token_ from a live instance and then setting the local storage of the local ui.

Via devtools:

```
window.localStorage.setItem("vela-access-token", "YOUR TOKEN HERE")
```

Note: you _should_ remove `bearer` from the token before setting it
