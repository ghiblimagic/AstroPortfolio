export function initFadeInObserver() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    // Just show everything immediately
    document.querySelectorAll(".fade-in").forEach((el) => {
      el.classList.add("visible");
    });
    return;
  }

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll(".fade-in")
    .forEach((el) => fadeObserver.observe(el));
}
