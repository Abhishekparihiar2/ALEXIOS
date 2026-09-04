(() => {
  const STORAGE_KEY = "alexios.customPolicies.v1";
  const read = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; } };
  const write = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  const esc = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const id = () => `POL-${String(Date.now()).slice(-6)}`;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const payrollRoot = () => {
    const heading = [...document.querySelectorAll("h1")].find((node) => node.textContent.trim() === "Policies & Pay Rules");
    return heading?.closest("#payroll-ui-fix .puf-main") || heading?.closest(".space-y-6");
  };

  const field = (name, label, value = "", type = "text", required = false) => `<label class="pay-policy-field"><span>${label}${required ? " *" : ""}</span><input name="${name}" type="${type}" value="${esc(value)}" ${required ? "required" : ""}></label>`;
  const select = (name, label, value, values) => `<label class="pay-policy-field"><span>${label}</span><select name="${name}">${values.map((item) => `<option${item === value ? " selected" : ""}>${esc(item)}</option>`).join("")}</select></label>`;
  const section = (title, subtitle, body) => `<section class="pay-policy-section"><header><h3>${title}</h3><p>${subtitle}</p></header><div class="pay-policy-grid">${body}</div></section>`;

  const icon = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

  // A custom policy now targets one area of payroll. "legacy" keeps the older
  // all-in-one shape so policies saved before this change still open correctly.
  const TYPES = {
    hours: { label: "Regular Working Hour", blurb: "Weekly working days and hours", icon: icon('<circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 16 14"></polyline>') },
    scheduling: { label: "Scheduling Rules", blurb: "Hour, shift and rest limits", icon: icon('<rect x="3" y="4" width="18" height="17" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="16" y1="2" x2="16" y2="6"></line>') },
    pay: { label: "Pay Rules", blurb: "Rate conditions and multipliers", icon: icon('<circle cx="12" cy="12" r="9"></circle><path d="M14.8 9.3a3 3 0 0 0-2.8-1.8c-1.6 0-2.6.9-2.6 2.1 0 1.3 1 1.9 2.8 2.3 1.8.4 2.9 1 2.9 2.4 0 1.3-1.1 2.2-2.9 2.2a3.1 3.1 0 0 1-3-1.9"></path><line x1="12" y1="6" x2="12" y2="18"></line>') },
    timeoff: { label: "Time Off", blurb: "Accrual, carry-over and waiting", icon: icon('<circle cx="12" cy="12" r="4.5"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="5" y1="5" x2="6.5" y2="6.5"></line><line x1="17.5" y1="17.5" x2="19" y2="19"></line><line x1="5" y1="19" x2="6.5" y2="17.5"></line><line x1="17.5" y1="6.5" x2="19" y2="5"></line>') }
  };

  const typeLabel = (type) => TYPES[type]?.label || "Custom Policy";

  const defaults = (policy = {}) => ({
    id: policy.id || id(), type: policy.type || "", name: policy.name || "", description: policy.description || "", appliesTo: policy.appliesTo || "Employees and Client Positions", status: policy.status || "Active",
    mondayStart: policy.mondayStart || "09:00", mondayEnd: policy.mondayEnd || "17:00",
    maxHoursWeek: policy.maxHoursWeek || "40", maxHoursDay: policy.maxHoursDay || "8", minHoursWeek: policy.minHoursWeek || "20",
    maxShiftsDay: policy.maxShiftsDay || "1", maxShiftsWeek: policy.maxShiftsWeek || "5", minShiftsWeek: policy.minShiftsWeek || "3", minRest: policy.minRest || "12",
    payRuleName: policy.payRuleName || "Standard Overtime", payType: policy.payType || "Overtime", triggerType: policy.triggerType || "After Hours / Week", triggerValue: policy.triggerValue || "40", multiplier: policy.multiplier || "1.5x",
    timeOffName: policy.timeOffName || "Custom PTO", daysPerYear: policy.daysPerYear || "15", accrual: policy.accrual || "1.25", carryOver: policy.carryOver || "Up to 5 days", waitingPeriod: policy.waitingPeriod || "90"
  });

  // ---- Step bodies -----------------------------------------------------
  const weekFields = (policy) => `<div class="pay-policy-week">${days.map((day, index) => `<div><label><input type="checkbox" name="work${day}" ${policy[`work${day}`] === true || (policy[`work${day}`] === undefined && index < 5) ? "checked" : ""}> ${day}</label><input type="time" name="${day.toLowerCase()}Start" value="${policy[`${day.toLowerCase()}Start`] || "09:00"}"><span>to</span><input type="time" name="${day.toLowerCase()}End" value="${policy[`${day.toLowerCase()}End`] || "17:00"}"></div>`).join("")}</div>`;

  const schedulingFields = (policy) => field("maxHoursWeek", "Max Hours / Week", policy.maxHoursWeek, "number")
    + field("maxHoursDay", "Max Hours / Day", policy.maxHoursDay, "number")
    + field("minHoursWeek", "Min Hours / Week", policy.minHoursWeek, "number")
    + field("maxShiftsDay", "Max Shifts / Day", policy.maxShiftsDay, "number")
    + field("maxShiftsWeek", "Max Shifts / Week", policy.maxShiftsWeek, "number")
    + field("minShiftsWeek", "Min Shifts / Week", policy.minShiftsWeek, "number")
    + field("minRest", "Gap Between Shifts (hrs)", policy.minRest, "number");

  const payFields = (policy) => field("payRuleName", "Rule Name", policy.payRuleName, "text", true)
    + select("payType", "Pay Type", policy.payType, ["Regular", "Overtime", "Double Time", "Holiday", "Premium Pay", "Custom"])
    + select("triggerType", "Trigger / Applies When", policy.triggerType, ["After Hours / Day", "After Hours / Week", "Specific Day", "Holiday", "Custom Condition"])
    + field("triggerValue", "Trigger Value", policy.triggerValue)
    + field("multiplier", "Multiplier", policy.multiplier, "text", true);

  const timeOffFields = (policy) => field("timeOffName", "Policy Name", policy.timeOffName, "text", true)
    + field("daysPerYear", "Days Per Year", policy.daysPerYear)
    + field("accrual", "Accrual Rate (days/month)", policy.accrual)
    + select("carryOver", "Carry Over", policy.carryOver, ["No Carry Over", "Up to 5 days", "Up to 10 days", "Unlimited"])
    + field("waitingPeriod", "Waiting Period (days)", policy.waitingPeriod, "number");

  const CONFIG = {
    hours: weekFields,
    scheduling: schedulingFields,
    pay: payFields,
    timeoff: timeOffFields
  };

  const infoFields = (policy) => field("name", "Policy Name", policy.name, "text", true)
    + field("description", "Description", policy.description)
    + select("appliesTo", "Available In", policy.appliesTo, ["Employees and Client Positions", "Employees Only", "Client Positions Only"])
    + select("status", "Status", policy.status, ["Active", "Inactive"]);

  const typeGrid = (selected) => `<div class="pay-policy-types">${Object.entries(TYPES).map(([key, meta]) => `<button type="button" class="pay-policy-type${key === selected ? " is-selected" : ""}" data-type="${key}" aria-pressed="${key === selected}"><span class="pay-policy-type-icon">${meta.icon}</span><b>${meta.label}</b><small>${meta.blurb}</small></button>`).join("")}</div>`;

  const stepBody = (step, draft) => {
    if (step === 1) return `<section class="pay-policy-section"><header><h3>Policy Type</h3><p>Choose what this policy configures. Step 3 then shows only its options.</p></header><div class="pay-policy-grid pay-policy-grid-wide">${typeGrid(draft.type)}</div></section>`;
    if (step === 2) return section("Policy Information", "Name and availability", infoFields(draft));
    if (draft.type === "legacy") {
      return section("Regular Working Hour", "Define the custom weekly working schedule", weekFields(draft))
        + section("Scheduling Rules", "Set hour, shift, and rest limits", schedulingFields(draft))
        + section("Pay Rules", "Create the custom rate condition", payFields(draft))
        + section("Time Off", "Define custom accrual and carry-over", timeOffFields(draft));
    }
    const meta = TYPES[draft.type];
    return section(meta.label, meta.blurb, CONFIG[draft.type](draft));
  };

  const STEP_NAMES = ["Policy Type", "Policy Information", "Configuration"];

  const stepper = (step) => `<ol class="pay-policy-steps">${STEP_NAMES.map((name, index) => { const n = index + 1; return `<li class="${n === step ? "is-current" : n < step ? "is-done" : ""}"><span>${n < step ? "✓" : n}</span><b>${name}</b></li>`; }).join("")}</ol>`;

  const wizardMarkup = (policy) => `
    <form class="pay-policy-editor pay-policy-wizard">
      <div class="pay-policy-hero"><button type="button" data-policy-back>←</button><div><small>CUSTOM PAYROLL POLICY</small><h2>${policy.name ? `Edit ${esc(policy.name)}` : "Create Custom Policy"}</h2><p data-wizard-blurb></p></div><div class="pay-policy-actions"><button type="button" data-policy-back>Cancel</button><button type="button" data-wizard-primary></button></div></div>
      <div data-wizard-stepper></div>
      <div class="pay-policy-error" role="alert" hidden></div>
      <div class="pay-policy-layout is-single" data-wizard-body></div>
      <footer class="pay-policy-footer"><button type="button" data-wizard-prev hidden>Back</button><button type="button" data-policy-back>Cancel</button><button type="button" data-wizard-next></button></footer>
    </form>`;

  // ---- Detail view -----------------------------------------------------
  const detailMarkup = (policy) => {
    const item = (label, value) => `<div><dt>${label}</dt><dd>${esc(value || "—")}</dd></div>`;
    const hoursView = () => section("Regular Working Hour", "Custom weekly schedule", `<dl>${item("Working Days", days.filter((day) => policy[`work${day}`] !== false).join(", "))}${item("Default Hours", `${policy.mondayStart || "09:00"} – ${policy.mondayEnd || "17:00"}`)}</dl>`);
    const schedulingView = () => section("Scheduling Rules", "Configured limits", `<dl>${item("Max Hours / Week", policy.maxHoursWeek)}${item("Max Hours / Day", policy.maxHoursDay)}${item("Min Hours / Week", policy.minHoursWeek)}${item("Max Shifts / Day", policy.maxShiftsDay)}${item("Max Shifts / Week", policy.maxShiftsWeek)}${item("Min Shifts / Week", policy.minShiftsWeek)}${item("Gap Between Shifts", `${policy.minRest} hrs`)}</dl>`);
    const payView = () => section("Pay Rules", "Custom rate condition", `<dl>${item("Rule Name", policy.payRuleName)}${item("Pay Type", policy.payType)}${item("Trigger", `${policy.triggerType} · ${policy.triggerValue}`)}${item("Multiplier", policy.multiplier)}</dl>`);
    const timeOffView = () => section("Time Off", "Custom accrual policy", `<dl>${item("Policy", policy.timeOffName)}${item("Days Per Year", policy.daysPerYear)}${item("Accrual Rate", `${policy.accrual} days/month`)}${item("Carry Over", policy.carryOver)}${item("Waiting Period", `${policy.waitingPeriod} days`)}</dl>`);
    const views = { hours: hoursView, scheduling: schedulingView, pay: payView, timeoff: timeOffView };
    const body = views[policy.type]
      ? section("Policy Information", "Name and availability", `<dl>${item("Policy Type", typeLabel(policy.type))}${item("Available In", policy.appliesTo)}${item("Status", policy.status)}</dl>`) + views[policy.type]()
      : hoursView() + schedulingView() + payView() + timeOffView();
    return `<div class="pay-policy-view"><div class="pay-policy-hero"><button type="button" data-policy-back>←</button><div><small>CUSTOM PAYROLL POLICY · ${policy.id}${views[policy.type] ? ` · ${typeLabel(policy.type).toUpperCase()}` : ""}</small><h2>${esc(policy.name)}</h2><p>${esc(policy.description || "Reusable policy for employees and client positions.")}</p></div><div class="pay-policy-actions"><button type="button" data-policy-edit>Edit Policy</button></div></div><div class="pay-policy-view-grid">${body}</div></div>`;
  };

  const swap = (root, markup, setup) => {
    const original = [...root.children]; original.forEach((node) => { node.hidden = true; });
    const shell = document.createElement("div"); shell.innerHTML = markup; const page = shell.firstElementChild; root.appendChild(page);
    const back = () => { page.remove(); original.forEach((node) => { node.hidden = false; }); renderRows(root); };
    page.querySelectorAll("[data-policy-back]").forEach((button) => button.addEventListener("click", back));
    setup?.(page, back);
  };

  // Only the fields of the chosen type are required; the rest keep their defaults.
  const REQUIRED = {
    pay: [["payRuleName", "rule name"], ["multiplier", "multiplier"]],
    timeoff: [["timeOffName", "time-off policy name"]],
    legacy: [["payRuleName", "rule name"], ["multiplier", "multiplier"], ["timeOffName", "time-off policy name"]]
  };

  const openEditor = (root, source = {}) => {
    // "+ Pay Rule" reaches us twice: payroll-ui-fix.js dispatches
    // alexios:policy-editor from a document-level capture listener and we also
    // bind the button itself. One editor at a time.
    if (root.querySelector(".pay-policy-wizard")) return;
    const policy = defaults(source);
    const draft = { ...policy };
    let step = draft.type ? 2 : 1;

    swap(root, wizardMarkup(policy), (form, back) => {
      const body = form.querySelector("[data-wizard-body]");
      const stepperBox = form.querySelector("[data-wizard-stepper]");
      const blurb = form.querySelector("[data-wizard-blurb]");
      const error = form.querySelector(".pay-policy-error");
      const prev = form.querySelector("[data-wizard-prev]");
      const next = form.querySelector("[data-wizard-next]");
      const primary = form.querySelector("[data-wizard-primary]");
      const isEdit = !!policy.name;

      // Pull whatever the visible step holds into the draft before moving on.
      const harvest = () => {
        body.querySelectorAll("input[name], select[name], textarea[name]").forEach((node) => {
          if (node.type === "checkbox") draft[node.name] = node.checked;
          else draft[node.name] = node.value;
        });
      };

      const fail = (message) => { error.textContent = message; error.hidden = false; };

      const paint = () => {
        error.hidden = true;
        body.innerHTML = stepBody(step, draft);
        body.classList.toggle("is-single", step !== 3 || draft.type !== "legacy");
        stepperBox.innerHTML = stepper(step);
        blurb.textContent = step === 1
          ? "Pick the policy type to configure."
          : step === 2
            ? "Name the policy and set where it is available."
            : `Configure ${typeLabel(draft.type)} options.`;
        prev.hidden = step === 1;
        next.textContent = step === 3 ? (isEdit ? "Save Changes" : "Create Policy") : "Next";
        primary.textContent = next.textContent;

        if (step === 1) {
          body.querySelectorAll("[data-type]").forEach((card) => card.addEventListener("click", () => {
            draft.type = card.dataset.type;
            body.querySelectorAll("[data-type]").forEach((other) => {
              const on = other === card;
              other.classList.toggle("is-selected", on);
              other.setAttribute("aria-pressed", String(on));
            });
            error.hidden = true;
          }));
        }
      };

      const save = () => {
        const missing = (REQUIRED[draft.type] || []).find(([key]) => !String(draft[key] || "").trim());
        if (missing) return fail(`Enter the ${missing[1]} for this ${typeLabel(draft.type)} policy.`);
        const saved = { ...draft, name: String(draft.name).trim(), updatedAt: new Date().toISOString() };
        const items = read(); const index = items.findIndex((item) => item.id === saved.id);
        index >= 0 ? items.splice(index, 1, saved) : items.push(saved);
        write(items); back();
      };

      const advance = () => {
        harvest();
        if (step === 1) { if (!draft.type) return fail("Select a policy type to continue."); step = 2; return paint(); }
        if (step === 2) { if (!String(draft.name || "").trim()) return fail("Enter a policy name to continue."); step = 3; return paint(); }
        save();
      };

      next.addEventListener("click", advance);
      primary.addEventListener("click", advance);
      prev.addEventListener("click", () => { harvest(); step -= 1; paint(); });
      form.addEventListener("submit", (event) => { event.preventDefault(); advance(); });

      paint();
    });
  };

  const openView = (root, policy) => swap(root, detailMarkup(policy), (page, back) => page.querySelector("[data-policy-edit]").addEventListener("click", () => { back(); openEditor(root, policy); }));

  const summary = (policy) => {
    if (policy.type === "hours") return `${days.filter((day) => policy[`work${day}`] !== false).length} days/week · ${esc(policy.mondayStart)}–${esc(policy.mondayEnd)}`;
    if (policy.type === "scheduling") return `${esc(policy.maxHoursWeek)} hrs/week · ${esc(policy.maxShiftsWeek)} shifts/week`;
    if (policy.type === "pay") return `${esc(policy.payRuleName)} · ${esc(policy.multiplier)}`;
    if (policy.type === "timeoff") return `${esc(policy.daysPerYear)} days/year · ${esc(policy.carryOver)}`;
    return `${esc(policy.maxHoursWeek)} hrs/week · ${esc(policy.payRuleName)}`;
  };

  const renderRows = (root) => {
    const tbody = root.querySelector("tbody"); if (!tbody) return;
    tbody.querySelectorAll("tr[data-custom-policy]").forEach((row) => row.remove());
    read().forEach((policy) => {
      const row = document.createElement("tr"); row.dataset.customPolicy = policy.id; row.className = "pay-policy-custom-row";
      const overlay = !!root.closest("#payroll-ui-fix");
      row.innerHTML = overlay
        ? `<td><b>${esc(policy.name)}</b><small>${policy.id}</small></td><td>${esc(typeLabel(policy.type))}</td><td>${esc(policy.appliesTo)}</td><td>Effective immediately</td><td>${summary(policy)}</td><td><span>${esc(policy.status)}</span></td><td><div><button data-view>View</button><button data-edit>Edit</button></div></td>`
        : `<td>${esc(policy.name)}<small>${policy.id}</small></td><td>${esc(typeLabel(policy.type))}</td><td>${esc(policy.appliesTo)}</td><td>${summary(policy)}</td><td><span>${esc(policy.status)}</span></td><td><div><button data-view>View</button><button data-edit>Edit</button></div></td>`;
      row.querySelector("[data-view]").addEventListener("click", () => openView(root, policy)); row.querySelector("[data-edit]").addEventListener("click", () => openEditor(root, policy)); tbody.appendChild(row);
    });
  };

  // Rows that ship with the page predate policy types, so they keep the
  // all-in-one shape unless their TYPE cell clearly says "Pay Rule".
  const inferType = (label) => /pay rule/i.test(label || "") ? "pay" : "legacy";

  const enhanceLegacyRows = (root) => {
    root.querySelectorAll("tbody tr:not([data-custom-policy])").forEach((row, index) => {
      if (row.dataset.policyActionsReady === "true") return;
      const cells = row.querySelectorAll("td");
      if (cells.length < 6) return;
      row.dataset.policyActionsReady = "true";
      const legacyId = `BASE-${index + 1}`;
      const saved = read().find((item) => item.id === legacyId);
      if (saved) { row.hidden = true; return; }
      const overlay = !!root.closest("#payroll-ui-fix");
      const source = defaults({ id: legacyId, type: inferType(cells[1]?.textContent.trim()), name: cells[0].textContent.trim(), appliesTo: cells[2].textContent.trim(), status: cells[overlay ? 5 : 4].textContent.trim(), description: cells[overlay ? 4 : 3].textContent.trim() });
      const actions = cells[overlay ? 6 : 5];
      actions.innerHTML = '<div class="pay-policy-legacy-actions"><button data-view>View</button><button data-edit>Edit</button></div>';
      actions.querySelector("[data-view]").addEventListener("click", (event) => { event.stopPropagation(); openView(root, source); });
      actions.querySelector("[data-edit]").addEventListener("click", (event) => { event.stopPropagation(); openEditor(root, source); });
      row.addEventListener("click", () => openView(root, source));
    });
  };

  const injectCatalogOptions = () => {
    const active = read().filter((policy) => policy.status === "Active"); if (!active.length) return;
    document.querySelectorAll("select").forEach((selectNode) => {
      const context = selectNode.closest("section, .space-y-4, .space-y-5, .space-y-6, .position-mode")?.textContent || "";
      const relevant = /Regular Working Hour|Scheduling Rules|Pay Rule|Time Off|Policy/i.test(context);
      if (!relevant) return;
      active.forEach((policy) => {
        if ([...selectNode.options].some((option) => option.value === policy.id)) return;
        const option = new Option(policy.name, policy.id); option.dataset.customPolicy = "true"; selectNode.add(option);
      });
    });
  };

  const enhance = () => {
    const root = payrollRoot();
    if (root && root.dataset.customPolicyReady !== "true") {
      root.dataset.customPolicyReady = "true"; const add = [...root.querySelectorAll("button")].find((button) => /^(\+\s*)?(Add Policy|Pay Rule)$/.test(button.textContent.trim()));
      add?.addEventListener("click", (event) => { event.preventDefault(); event.stopImmediatePropagation(); openEditor(root); }, true);
      enhanceLegacyRows(root);
      renderRows(root);
    }
    injectCatalogOptions();
  };

  document.addEventListener("alexios:policy-editor", (event) => {
    const root = payrollRoot(); if (!root) return;
    const detail = event.detail || {};
    if (detail.mode === "edit") {
      const row = root.querySelectorAll("tbody tr")[detail.index]; const cells = row?.querySelectorAll("td");
      if (cells?.length) openEditor(root, defaults({ id: `BASE-${detail.index + 1}`, type: inferType(cells[1]?.textContent.trim()), name: cells[0].textContent.trim(), appliesTo: cells[2].textContent.trim(), description: cells[4]?.textContent.trim(), status: cells[5]?.textContent.trim() }));
    } else openEditor(root);
  });

  let queued = false; new MutationObserver(() => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; enhance(); }); }).observe(document.body, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true }); else enhance();
})();
