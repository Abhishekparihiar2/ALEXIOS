(() => {
  const payrollPages = new Set(["Policies & Pay Rules", "Payroll Schedules"]);

  const currentPage = () => [...document.querySelectorAll("h1")]
    .map((el) => el.textContent.trim())
    .find((text) => payrollPages.has(text));

  const closeMenu = () => document.querySelector(".pla-menu")?.remove();

  const showToast = (message) => {
    document.querySelector(".pla-toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "pla-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  };

  const openEditor = (row) => {
    const table = row.closest("table");
    const headers = [...table.querySelectorAll("thead th")].map((th) => th.textContent.trim());
    const cells = [...row.querySelectorAll(":scope > td")];
    const editable = headers.slice(0, -1).map((header, index) => ({
      header,
      cell: cells[index],
      value: cells[index]?.textContent.replace(/\s+/g, " ").trim() || "",
    }));

    const overlay = document.createElement("div");
    overlay.className = "pla-overlay";
    overlay.innerHTML = `<div class="pla-dialog">
      <header><div><h2>Edit ${currentPage() === "Payroll Schedules" ? "Schedule" : "Policy / Rule"}</h2><p>Update the selected table entry.</p></div><button data-pla="close">×</button></header>
      <div class="pla-fields">${editable.map((item, index) => {
        const status = item.header.toLowerCase() === "status";
        return `<label>${item.header}${status
          ? `<select data-field="${index}"><option ${item.value === "Active" ? "selected" : ""}>Active</option><option ${item.value === "Inactive" ? "selected" : ""}>Inactive</option></select>`
          : `<input data-field="${index}" value="${item.value.replace(/&/g,"&amp;").replace(/"/g,"&quot;")}">`}</label>`;
      }).join("")}</div>
      <footer><button data-pla="close">Cancel</button><button class="primary" data-pla="save">Save Changes</button></footer>
    </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (event) => {
      const action = event.target.closest("button")?.dataset.pla;
      if (action === "close") overlay.remove();
      if (action === "save") {
        editable.forEach((item, index) => {
          const value = overlay.querySelector(`[data-field="${index}"]`).value.trim();
          if (item.header.toLowerCase() === "status") {
            item.cell.innerHTML = `<span class="pla-status ${value.toLowerCase()}">${value}</span>`;
          } else {
            item.cell.textContent = value;
          }
        });
        overlay.remove();
        showToast("Entry updated successfully");
      }
    });
  };

  const openMenu = (button, row) => {
    closeMenu();
    const rect = button.getBoundingClientRect();
    const menu = document.createElement("div");
    menu.className = "pla-menu";
    menu.style.top = `${Math.min(rect.bottom + 6, window.innerHeight - 105)}px`;
    menu.style.left = `${Math.max(10, rect.right - 145)}px`;
    menu.innerHTML = `<button data-action="edit">Edit</button><button class="danger" data-action="delete">Delete</button>`;
    document.body.appendChild(menu);
    menu.addEventListener("click", (event) => {
      const action = event.target.closest("button")?.dataset.action;
      closeMenu();
      if (action === "edit") openEditor(row);
      if (action === "delete") {
        const name = row.querySelector("td")?.textContent.replace(/\s+/g, " ").trim() || "this entry";
        if (confirm(`Delete “${name}”?`)) {
          row.remove();
          showToast("Entry deleted successfully");
        }
      }
    });
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("#payroll-ui-fix")) return;
    const button = event.target.closest("button");
    if (!button || !currentPage()) {
      if (!event.target.closest(".pla-menu")) closeMenu();
      return;
    }
    const cell = button.closest("td");
    const row = button.closest("tbody tr");
    if (!cell || !row || cell !== row.lastElementChild) return;
    event.preventDefault();
    event.stopPropagation();
    openMenu(button, row);
  }, true);
})();
