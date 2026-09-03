export function Wordmark({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <a
      className={`wordmark${light ? " wordmark--light" : ""}`}
      href="#top"
      onClick={onClick}
      aria-label="Namo Decor, back to top"
    >
      <span>Namo</span>
      <small>Decor</small>
    </a>
  );
}
