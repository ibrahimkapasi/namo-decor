import Image from "next/image";

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <a className="wordmark" href="#top" onClick={onClick} aria-label="Namo Decor, back to top">
      <Image
        src="/images/logo-mark.webp"
        alt=""
        width={900}
        height={332}
        loading="eager"
        fetchPriority="high"
        sizes="180px"
      />
    </a>
  );
}
