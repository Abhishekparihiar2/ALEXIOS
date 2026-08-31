(() => {
  const updateDirectManager = () => {
    const label = [...document.querySelectorAll("label")]
      .find((node) => node.textContent.replace(/\*/g, "").trim() === "Direct Manager");
    const field = label?.parentElement;
    const select = field?.querySelector("select");
    if (!select) return;

    const placeholder = [...select.options].find((option) => option.value === "");
    if (placeholder) placeholder.textContent = "Select Admin";
    select.setAttribute("aria-label", "Direct Manager");
    select.dataset.managerFieldUpdated = "true";
  };

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; updateDirectManager(); });
  }).observe(document.body, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateDirectManager, { once: true });
  } else {
    updateDirectManager();
  }
})();
