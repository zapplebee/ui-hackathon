export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} rel="noopener noreferrer">
      {children}
    </a>
  );
}
