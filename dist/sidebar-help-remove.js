(() => {
  // "Get Help" is retired from the sidebar; support runs through Help Desk.
  // Matches the pre-relabel wording too, because the app renders this item as
  // "Help" and admin-portal-ui-updates.js may rewrite it to "Get Help" first,
  // so whichever lands, the entry goes. "Help Desk" is a separate module and
  // must survive, hence exact matches rather than a substring test.
  const TARGETS = new Set(["Get Help", "Need Help", "Help"]);

  const isTarget = (button) => {
    const label = button.textContent.replace(/\s+/g, " ").trim();
    // A collapsed sidebar renders icons only, so fall back to the tooltip.
    const name = label || button.title.trim() || (button.getAttribute("aria-label") || "").trim();
    return TARGETS.has(name);
  };

  const removeHelp = () => {
    const sidebar = document.querySelector("aside");
    if (!sidebar) return;

    sidebar.querySelectorAll("button").forEach((button) => {
      if (!isTarget(button)) return;
      // Each nav item sits in its own wrapper; drop that too when the button is
      // all it holds, so the list is not left with an empty box in the gap.
      const wrapper = button.parentElement;
      const target = wrapper && wrapper !== sidebar && wrapper.children.length === 1 ? wrapper : button;
      target.remove();
    });
  };

  // Debounced with setTimeout rather than requestAnimationFrame: rAF is
  // suspended while the tab is hidden, which would leave `queued` stuck true and
  // stop the observer permanently.
  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    setTimeout(() => { queued = false; removeHelp(); }, 60);
  });

  const start = () => {
    removeHelp();
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
