/**
 * Tailwind class name recognition function stub. This is only used to provide a hit
 * to tooling that the string here are tailwind class names. Otherwise, this
 * function simply returns the given string.
 *
 * Add this to your visual studio code.
 *
 * ```json
 *   "tailwindCSS.experimental.classRegex": [
 *    ["twStub\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
 *  ],
 *  ```
 *
 * You can likely find an adapter for your preferred editor as well but you may
 * need a different regular expression. Or as a fallback, you can make tweaks by
 * using an making edits in a class/className attribute and then copy and paste
 * it back into position.
 *
 * Feel free to relocate this function anytime.
 *
 * @param classNames tailwind class names
 * @returns
 */
export function twStub(classNames: string) {
  return classNames;
}
