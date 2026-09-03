import Image from "next/image";

export function FutureWorkTransition() {
  return (
    <section className="future-work" aria-label="Transition to selected work">
      <div className="future-work__image"><Image src="/images/Neha-maam-bar-webp/11.webp" alt="3D visualization of an entertainment interior with a sculptural illuminated wall" fill sizes="100vw" /></div>
      <div className="future-work__shade" />
      <div className="site-container future-work__content"><span>Next field / Selected work</span><p>The visual archive<br />opens <em>next.</em></p><span>Fifteen curated visualizations</span></div>
    </section>
  );
}
