(() => {
  const updateHelpLabel = () => {
    const sidebar = document.querySelector("aside");
    if (!sidebar) return;

    [...sidebar.querySelectorAll("button")].forEach((button) => {
      const label = button.textContent.replace(/\s+/g, " ").trim();
      if (label !== "Help" && label !== "Need Help") return;

      const walker = document.createTreeWalker(button, NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = walker.nextNode())) {
        if (["Help", "Need Help"].includes(textNode.textContent.trim())) {
          textNode.textContent = textNode.textContent.replace(/Need Help|Help/, "Get Help");
        }
      }
      button.title = "Get Help";
      button.setAttribute("aria-label", "Get Help");
    });
  };

  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      updateHelpLabel();
    });
  });

  const start = () => {
    updateHelpLabel();
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
