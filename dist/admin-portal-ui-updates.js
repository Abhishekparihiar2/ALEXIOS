(() => {
  const exactButton = (label) => [...document.querySelectorAll("button")]
    .find((button) => button.textContent.replace(/\s+/g, " ").trim() === label);

  const updateSidebar = () => {
    const sidebar = document.querySelector("aside");
    if (!sidebar) return;

    const help = [...sidebar.querySelectorAll("button")]
      .find((button) => ["Help", "Need Help"].includes(button.textContent.replace(/\s+/g, " ").trim()));
    if (help) {
      [...help.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE)
        .forEach((node) => { if (["Help", "Need Help"].includes(node.textContent.trim())) node.textContent = "Get Help"; });
      help.title = "Get Help";
    }

    const settings = [...sidebar.querySelectorAll("button")]
      .find((button) => button.textContent.replace(/\s+/g, " ").trim() === "Settings");
    if (settings) {
      const item = settings.parentElement;
      const group = item?.parentElement;
      if (item && group && item !== group.lastElementChild) group.appendChild(item);
    }
  };

  const dashboardModules = [
    ["Employees", "Employees", "People", "10"],
    ["Clients & Sites", "Clients & Sites", "Locations", "4"],
    ["Checkpoints & Tours", "Checkpoints & Tours", "Field", "12"],
    ["Reports & Incidents", "Reports & Incidents", "Reports", "12"],
    ["Forms", "Forms", "Custom", "6"],
    ["Tasks & Dispatch", "Tasks & Dispatch", "Operations", "5"],
    ["Communications", "Communications", "Messages", "7"],
    ["Automations", "Automations", "Rules", "6"],
    ["Payroll & Back Office", "Payroll", "Back Office", ""],
  ];

  const updateAdministrationQuadrant = () => {
    const heading = [...document.querySelectorAll("h3")]
      .find((element) => element.textContent.trim() === "Administration");
    if (!heading) return;
    const card = heading.closest(".rounded-2xl");
    const grid = card?.querySelector(".grid");
    if (!grid) return;

    card.classList.add("admin-quadrant");
    heading.classList.add("admin-quadrant-heading");
    heading.title = "Open Administration";

    if (grid.dataset.adminUpdated === "true") return;

    grid.dataset.adminUpdated = "true";
    grid.className = "admin-nine-grid";
    grid.innerHTML = dashboardModules.map(([sidebarLabel, title, sub, count], index) => `
      <button class="admin-module-card" data-sidebar-label="${sidebarLabel}">
        <span class="admin-card-top"><i>${index + 1}</i>${count ? `<b>${count}</b>` : ""}</span>
        <span class="admin-card-title">${title}</span>
        <small>${sub}</small>
      </button>`).join("");
  };

  const openAdministration = (card) => {
    const container = card.parentElement;
    if (!container || card.classList.contains("admin-full-view")) return;
    container.classList.add("admin-full-view-container");
    card.classList.add("admin-full-view");
    const heading = [...card.querySelectorAll("h3")].find((item) => item.textContent.trim() === "Administration");
    if (heading && !card.querySelector("[data-admin-close]")) {
      heading.insertAdjacentHTML("afterend", '<button type="button" class="admin-close-view" data-admin-close aria-label="Back to Dashboard">← Back to Dashboard</button>');
    }
    card.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const closeAdministration = (card) => {
    card.classList.remove("admin-full-view");
    card.parentElement?.classList.remove("admin-full-view-container");
    card.querySelector("[data-admin-close]")?.remove();
  };

  const vehicleTitles = new Set(["Vehicles", "Create Vehicle", "Add Vehicle Document"]);
  const updateVehicleTheme = () => {
    document.querySelectorAll(".vehicle-theme-fixed").forEach((element) => element.classList.remove("vehicle-theme-fixed"));
    const candidates = [...document.querySelectorAll("h1")]
      .filter((element) => vehicleTitles.has(element.textContent.trim()));
    const createButton = exactButton("Create Vehicle");
    if (createButton && !candidates.length) candidates.push(createButton);
    candidates.forEach((element) => {
      const root = element.closest(".w-full.h-full.flex") || element.closest(".flex-1.overflow-y-auto.flex.flex-col");
      root?.classList.add("vehicle-theme-fixed");
    });
  };

  const updateSkillsTableTheme = () => {
    document.querySelectorAll(".skills-table-theme").forEach((element) => element.classList.remove("skills-table-theme"));
    const heading = [...document.querySelectorAll("th")]
      .find((element) => element.textContent.trim() === "Skill / Certification");
    const tableCard = heading?.closest(".rounded-xl");
    tableCard?.classList.add("skills-table-theme");
  };

  const updateAssignEmployeeModal = () => {
    [...document.querySelectorAll("label, span, div, p")].forEach((el) => {
      if (el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE && el.textContent.trim() === "Filter by Skills / Role") {
        el.textContent = "Select Job Type";
      }
    });
  };

  const updateCreateSiteContactModal = () => {
    [...document.querySelectorAll("span, div, p, label")].forEach((el) => {
      if (el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE && el.textContent.trim().includes("Use this address as Bill-To Address")) {
        // Find the flex wrapper containing the checkbox, or the parent element
        const wrapper = el.closest("label") || el.closest("div.flex") || el.parentElement;
        if (wrapper && wrapper.style.display !== "none") {
          wrapper.style.display = "none";
        }
      }
    });
  };

  const updateSiteActionsNavigation = () => {
    [...document.querySelectorAll("*")].forEach((el) => {
      if (el.childNodes.length === 1 && el.firstChild.nodeType === Node.TEXT_NODE && el.textContent.trim() === "Site Actions") {
        const wrapper = el.closest("button") || el.closest("a") || el.closest("div.cursor-pointer") || el;
        if (wrapper && wrapper.style.display !== "none") {
          wrapper.style.display = "none";
        }
      }
    });
  };

  const removeImportExcel = () => {
    [...document.querySelectorAll("button")].forEach((el) => {
      if (el.textContent.trim().includes("Import Excel")) {
        if (el.style.display !== "none") el.style.display = "none";
      }
    });
  };

  const update = () => {
    updateSidebar();
    updateAdministrationQuadrant();
    updateVehicleTheme();
    updateSkillsTableTheme();
    updateAssignEmployeeModal();
    updateCreateSiteContactModal();
    updateSiteActionsNavigation();
    removeImportExcel();
  };

  document.addEventListener("click", (event) => {
    const close = event.target.closest("[data-admin-close]");
    if (close) {
      event.preventDefault();
      event.stopPropagation();
      closeAdministration(close.closest(".admin-quadrant"));
      return;
    }

    const card = event.target.closest(".admin-module-card");
    if (card) {
      const target = exactButton(card.dataset.sidebarLabel);
      target?.click();
      return;
    }

    const heading = event.target.closest(".admin-quadrant-heading");
    if (heading) openAdministration(heading.closest(".admin-quadrant"));
  });

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; update(); });
  });

  const start = () => {
    update();
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
