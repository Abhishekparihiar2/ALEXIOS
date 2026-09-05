(() => {
  // View / Edit / Delete on the payroll listing tables, matching the actions on
  // Policies & Pay Rules. Edit and Delete reuse the payroll module's own
  // handlers so its state and audit trail stay correct; only the read-only View
  // is new. Add a table by appending an entry to TABLES.

  const esc = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const trashIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>';

  const TABLES = [
    {
      heading: "Payroll Schedules",
      act: "schedule",                 // -> edit-schedule / delete-schedule
      noun: "schedule",
      editLabel: "Edit Schedule",
      blurb: "Pay period boundaries, cutoffs and pay dates for this schedule.",
      kicker: (r) => `PAYROLL SCHEDULE · ${r.frequency}`,
      columns: ["name", "frequency", "week", "current", "next", "payDate", "status"],
      sections: [
        ["Schedule Information", "Frequency and workweek", [["Frequency", "frequency"], ["Workweek Starts", "week"], ["Status", "status"]]],
        ["Pay Periods", "Current and upcoming", [["Current Period", "current"], ["Next Period", "next"], ["Pay Date", "payDate"]]]
      ]
    },
    {
      heading: "Break Management",
      act: "breaks",                   // -> edit-breaks / delete-breaks
      noun: "break rule",
      editLabel: "Edit Break Rule",
      blurb: "Break deductions by shift length and employee scope.",
      kicker: (r) => `BREAK RULE · ${r.type}`,
      columns: ["name", "minimum", "duration", "type", "deduction", "scope", "status"],
      sections: [
        ["Break Rule", "When the break applies", [["Minimum Shift", "minimum"], ["Break Duration", "duration"], ["Break Type", "type"], ["Status", "status"]]],
        ["Deduction", "How it is applied", [["Deduction", "deduction"], ["Applies To", "scope"]]]
      ]
    },
    {
      heading: "Holidays",
      act: "holidays",                 // -> edit-holidays / delete-holidays
      noun: "holiday",
      editLabel: "Edit Holiday",
      blurb: "Holiday dates, eligibility and pay treatment.",
      kicker: (r) => `HOLIDAY · ${r.group}`,
      columns: ["name", "date", "observed", "group", "scope", "multiplier", "status"],
      sections: [
        ["Holiday Information", "Dates and grouping", [["Date", "date"], ["Observed", "observed"], ["Holiday Group", "group"], ["Status", "status"]]],
        ["Pay Treatment", "Eligibility and worked rate", [["Applies To", "scope"], ["Worked Holiday Rate", "multiplier"]]]
      ]
    }
  ];

  const rootFor = (heading) => {
    const node = [...document.querySelectorAll("h1")].find((h1) => h1.textContent.trim() === heading);
    return node?.closest("#payroll-ui-fix .puf-main") || null;
  };

  const section = (title, subtitle, body) => `<section class="pay-policy-section"><header><h3>${title}</h3><p>${subtitle}</p></header><div class="pay-policy-grid">${body}</div></section>`;
  const item = (label, value) => `<div><dt>${label}</dt><dd>${esc(value || "—")}</dd></div>`;

  const detailMarkup = (config, record) => `<div class="pay-policy-view">
      <div class="pay-policy-hero">
        <button type="button" data-table-back>←</button>
        <div>
          <small>${esc(config.kicker(record)).toUpperCase()}</small>
          <h2>${esc(record.name)}</h2>
          <p>${esc(config.blurb)}</p>
        </div>
        <div class="pay-policy-actions"><button type="button" data-table-edit>${esc(config.editLabel)}</button></div>
      </div>
      <div class="pay-policy-view-grid">
        ${config.sections.map(([title, subtitle, fields]) =>
          section(title, subtitle, `<dl>${fields.map(([label, key]) => item(label, record[key])).join("")}</dl>`)
        ).join("")}
      </div>
    </div>`;

  const openView = (root, config, record, index) => {
    const original = [...root.children];
    original.forEach((node) => { node.hidden = true; });

    const shell = document.createElement("div");
    shell.innerHTML = detailMarkup(config, record);
    const page = shell.firstElementChild;
    root.appendChild(page);

    const back = () => {
      page.remove();
      original.forEach((node) => { node.hidden = false; });
    };

    page.querySelectorAll("[data-table-back]").forEach((button) => button.addEventListener("click", back));
    page.querySelector("[data-table-edit]").addEventListener("click", () => {
      back();
      // Hand off to the module's own editor, already wired to this row.
      root.querySelector(`[data-act="edit-${config.act}"][data-i="${index}"]`)?.click();
    });
  };

  const enhanceTable = (config) => {
    const root = rootFor(config.heading);
    if (!root) return;

    root.querySelectorAll("tbody tr").forEach((row, index) => {
      if (row.dataset.tableActionsReady === "true") return;
      const cells = row.querySelectorAll("td");
      if (cells.length < config.columns.length + 1) return;
      row.dataset.tableActionsReady = "true";

      const record = {};
      config.columns.forEach((key, i) => { record[key] = cells[i].textContent.trim(); });

      const actions = cells[config.columns.length];
      actions.innerHTML = `<div class="pay-policy-legacy-actions">
          <button type="button" data-table-view>View</button>
          <button type="button" data-act="edit-${config.act}" data-i="${index}">Edit</button>
          <button type="button" class="pay-policy-delete" data-act="delete-${config.act}" data-i="${index}" title="Delete ${config.noun}" aria-label="Delete ${config.noun}">${trashIcon}</button>
        </div>`;

      actions.querySelector("[data-table-view]").addEventListener("click", (event) => {
        event.stopPropagation();
        openView(root, config, record, index);
      });

      // The module's handlers run in the capture phase, so by the bubble phase
      // they are done; stop here so the row does not also open the view.
      actions.querySelectorAll("[data-act]").forEach((button) =>
        button.addEventListener("click", (event) => event.stopPropagation()));

      row.addEventListener("click", () => openView(root, config, record, index));
    });
  };

  const enhance = () => TABLES.forEach(enhanceTable);

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    setTimeout(() => { queued = false; enhance(); }, 150);
  }).observe(document.body, { childList: true, subtree: true });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true });
  else enhance();
})();
