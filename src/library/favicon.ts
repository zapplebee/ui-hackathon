/**
 * Replaces existing favicon with a new favicon.
 * @param href to the favicon file
 */
export function replaceFavicon(href: string) {
  const previous = document.querySelectorAll("link[rel='shortcut icon']");
  if (previous && previous.length > 0) {
    previous.forEach((prev) => {
      prev.remove();
    });
  }
  const el = document.createElement("link");
  el.setAttribute("rel", "shortcut icon");
  el.setAttribute("type", "icon/ico");
  el.setAttribute("href", href);
  el.dataset.time = `${Date.now()}`;

  document.querySelector("head")?.appendChild(el);
}
