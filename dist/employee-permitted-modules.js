(() => {
  const modules = [
    "Dashboard", "Scheduling", "Time Clock", "Employees", "Clients & Sites",
    "Checkpoints & Tours", "Reports & Incidents", "Forms", "Tasks & Dispatch",
    "Communications", "Activity Journal", "Manage Tickets", "Skills & Certifications",
    "Documents & Policies", "Vehicles", "Automations", "Payroll & Back Office",
    "Groups & Segments", "Get Help", "Help Desk", "Settings"
  ];
  const addedState = new Map();

  const makeButton = (name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "permitted-module-added";
    button.dataset.module = name;
    button.setAttribute("aria-pressed", String(addedState.get(name) || false));
    button.innerHTML = `<span class="permission-check" aria-hidden="true"></span><span>${name}</span>`;
    button.addEventListener("click", () => {
      const selected = button.getAttribute("aria-pressed") !== "true";
      addedState.set(name, selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    return button;
  };

  const update = () => {
    const heading = [...document.querySelectorAll("p")]
      .find((node) => node.textContent.replace(/\s+/g, " ").trim() === "Permitted Modules");
    const grid = heading?.nextElementSibling;
    if (!grid) return;
    grid.classList.add("permitted-modules-complete");
    const existing = new Set([...grid.querySelectorAll("button")]
      .map((button) => button.textContent.replace(/\s+/g, " ").trim()));
    modules.forEach((name) => {
      if (!existing.has(name)) grid.appendChild(makeButton(name));
    });
  };

  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  });
  const start = () => { update(); observer.observe(document.body, { childList: true, subtree: true }); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
