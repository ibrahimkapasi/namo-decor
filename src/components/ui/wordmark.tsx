import Image from "next/image";

export function Wordmark({ size = "header", onClick }: { size?: "header" | "footer"; onClick?: () => void }) {
  return (
    <a className={`wordmark wordmark--${size}`} href="#top" onClick={onClick} aria-label="Namo Decor, back to top">
      <Image src="/images/namo-decor-logo.png" alt="Namo Decor" width={2400} height={885} sizes={size === "footer" ? "320px" : "220px"} preload={size === "header"} />
    </a>
  );
}
