export function refreshAfterLayoutSettles(root: HTMLElement, refresh: () => void) {
  let active = true;
  let frame = 0;

  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (active) refresh();
    });
  };

  const pendingImages = Array.from(root.querySelectorAll("img")).filter((image) => !image.complete);
  pendingImages.forEach((image) => {
    image.addEventListener("load", schedule, { once: true });
    image.addEventListener("error", schedule, { once: true });
  });

  void document.fonts?.ready.then(schedule);
  schedule();

  return () => {
    active = false;
    cancelAnimationFrame(frame);
    pendingImages.forEach((image) => {
      image.removeEventListener("load", schedule);
      image.removeEventListener("error", schedule);
    });
  };
}
