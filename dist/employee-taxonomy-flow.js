(() => {
  const panelInfo = () => {
    const heading = [...document.querySelectorAll("h3")]
      .find((node) => ["Departments", "Employee Types"].includes(node.textContent.trim()));
    const panel = heading?.closest(".flex-1.overflow-y-auto") || heading?.parentElement?.parentElement;
    const input = panel?.querySelector("#newItemInput");
    const button = [...(panel?.querySelectorAll("button") || [])]
      .find((node) => node.textContent.trim() === "Add New");
    if (!heading || !panel || !input || !button) return null;
    return {
      panel,
      heading,
      input,
      button,
      singular: heading.textContent.trim() === "Departments" ? "department" : "employee type",
    };
  };

  const clearFeedback = (panel) => panel.querySelector(".taxonomy-feedback")?.remove();

  const feedback = ({ panel, input }, message, type) => {
    clearFeedback(panel);
    const note = document.createElement("p");
    note.className = `taxonomy-feedback taxonomy-feedback--${type}`;
    note.setAttribute("role", type === "error" ? "alert" : "status");
    note.textContent = message;
    input.closest(".flex.items-center")?.insertAdjacentElement("afterend", note);
    input.setAttribute("aria-invalid", String(type === "error"));
    if (type === "error") input.focus();
    if (type === "success") setTimeout(() => note.remove(), 3500);
  };

  const existingNames = (panel) => [...panel.querySelectorAll("tbody td:first-child")]
    .map((cell) => cell.textContent.trim().toLocaleLowerCase());

  const validate = (info) => {
    const value = info.input.value.trim().replace(/\s+/g, " ");
    if (!value) {
      const article = info.singular === "employee type" ? "an" : "a";
      feedback(info, `Enter ${article} ${info.singular} name before adding it.`, "error");
      return null;
    }
    if (value.length < 2) {
      feedback(info, `The ${info.singular} name must contain at least 2 characters.`, "error");
      return null;
    }
    if (value.length > 60) {
      feedback(info, `The ${info.singular} name must be 60 characters or fewer.`, "error");
      return null;
    }
    if (existingNames(info.panel).includes(value.toLocaleLowerCase())) {
      feedback(info, `That ${info.singular} already exists.`, "error");
      return null;
    }
    info.input.value = value;
    clearFeedback(info.panel);
    info.input.setAttribute("aria-invalid", "false");
    return value;
  };

  document.addEventListener("input", (event) => {
    if (event.target.id !== "newItemInput") return;
    const info = panelInfo();
    if (info) {
      clearFeedback(info.panel);
      info.input.setAttribute("aria-invalid", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.target.id !== "newItemInput" || event.key !== "Enter") return;
    const info = panelInfo();
    if (!info) return;
    const value = validate(info);
    if (!value) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    requestAnimationFrame(() => {
      const refreshed = panelInfo();
      if (!refreshed) return;
      feedback(refreshed, `${value} was added successfully.`, "success");
      refreshed.input.focus();
    });
  }, true);

  document.addEventListener("click", (event) => {
    const clicked = event.target.closest("button");
    if (!clicked || clicked.textContent.trim() !== "Add New") return;
    const info = panelInfo();
    if (!info || clicked !== info.button) return;
    const value = validate(info);
    if (!value) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    requestAnimationFrame(() => {
      const refreshed = panelInfo();
      if (!refreshed) return;
      feedback(refreshed, `${value} was added successfully.`, "success");
      refreshed.input.focus();
    });
  }, true);

  const enhance = () => {
    const info = panelInfo();
    if (!info || info.panel.dataset.taxonomyFlow === "ready") return;
    info.panel.dataset.taxonomyFlow = "ready";
    info.input.setAttribute("autocomplete", "off");
    info.input.setAttribute("maxlength", "60");
    info.input.setAttribute("aria-describedby", "taxonomy-add-help");
    info.button.setAttribute("type", "button");
    const help = document.createElement("span");
    help.id = "taxonomy-add-help";
    help.className = "sr-only";
    help.textContent = `Enter a unique ${info.singular} name and select Add New, or press Enter.`;
    info.input.insertAdjacentElement("afterend", help);
  };

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; enhance(); });
  }).observe(document.body, { childList: true, subtree: true });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true });
  else enhance();
})();
