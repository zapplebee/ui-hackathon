import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function AppFooter() {
  return (
    <footer className="px-4 md:px-12 py-8 text-sm flex justify-between items-center">
      <ul className="flex gap-4">
        <li>
          <a href="#vela-top">back to top</a>
        </li>
        <li>
          <Link to="/">overview</Link>
        </li>
        <li>
          <a
            href="https://github.com/go-vela/community/issues/new/choose"
            rel="noopener noreferrer"
          >
            feedback
          </a>
        </li>
        <li>
          <a href="https://go-vela.github.io/docs/" rel="noopener noreferrer">
            docs
          </a>
        </li>
      </ul>
      <Link to="/" className="flex gap-2 items-center">
        <div className="block h-6 w-6 grayscale hover:grayscale-0">
          <Logo />
        </div>
        <div className="sr-only">Vela</div>
      </Link>
    </footer>
  );
}
