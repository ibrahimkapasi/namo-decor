import type { ReactNode } from "react";

export function ArrowLink({
  href,
  children,
  variant = "solid",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  onClick?: () => void;
}) {
  return (
    <a className={`arrow-link arrow-link--${variant}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <span className="arrow-link__icon" aria-hidden="true">
        <svg viewBox="0 0 20 20"><path d="M5 15 15 5M7 5h8v8" /></svg>
      </span>
    </a>
  );
}
