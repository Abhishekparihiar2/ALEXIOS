(() => {
  const hiddenLabels = new Set([
    "Training",
    "Overtime Rules",
    "Pay Codes",
    "Compensation",
    "Employee Classes",
    "Export Formats",
    "Bill Items",
  ]);

  const pruneNavigation = () => {
    document.querySelectorAll("button").forEach((button) => {
      const label = button.textContent.replace(/\s+/g, " ").trim();
      if (hiddenLabels.has(label)) {
        button.remove();
      }
    });
  };

  const observer = new MutationObserver(pruneNavigation);

  const start = () => {
    pruneNavigation();
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
