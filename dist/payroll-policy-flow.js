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

  const defaults = (policy = {}) => ({
    id: policy.id || id(), name: policy.name || "", description: policy.description || "", appliesTo: policy.appliesTo || "Employees and Client Positions", status: policy.status || "Active",
    mondayStart: policy.mondayStart || "09:00", mondayEnd: policy.mondayEnd || "17:00", maxHoursWeek: policy.maxHoursWeek || "40", maxHoursDay: policy.maxHoursDay || "8", minHoursWeek: policy.minHoursWeek || "20", maxShiftsWeek: policy.maxShiftsWeek || "5", minRest: policy.minRest || "12",
    payRuleName: policy.payRuleName || "Standard Overtime", payType: policy.payType || "Overtime", triggerType: policy.triggerType || "After Hours / Week", triggerValue: policy.triggerValue || "40", multiplier: policy.multiplier || "1.5x",
    timeOffName: policy.timeOffName || "Custom PTO", daysPerYear: policy.daysPerYear || "15", accrual: policy.accrual || "1.25", carryOver: policy.carryOver || "Up to 5 days", waitingPeriod: policy.waitingPeriod || "90"
  });

  const editorMarkup = (policy) => `
    <form class="pay-policy-editor">
      <div class="pay-policy-hero"><button type="button" data-policy-back>←</button><div><small>CUSTOM PAYROLL POLICY</small><h2>${policy.name ? `Edit ${esc(policy.name)}` : "Create Custom Policy"}</h2><p>Define working hours, scheduling, pay rules, and time off in one reusable policy.</p></div><div class="pay-policy-actions"><button type="button" data-policy-back>Cancel</button><button type="submit">${policy.name ? "Save Changes" : "Create Policy"}</button></div></div>
      <div class="pay-policy-error" role="alert" hidden></div>
      <div class="pay-policy-layout">
        ${section("Policy Information", "Name and availability", field("name", "Policy Name", policy.name, "text", true) + field("description", "Description", policy.description) + select("appliesTo", "Available In", policy.appliesTo, ["Employees and Client Positions", "Employees Only", "Client Positions Only"]) + select("status", "Status", policy.status, ["Active", "Inactive"]))}
        ${section("Regular Working Hour", "Define the custom weekly working schedule", `<div class="pay-policy-week">${days.map((day, index) => `<div><label><input type="checkbox" name="work${day}" ${policy[`work${day}`] === true || (policy[`work${day}`] === undefined && index < 5) ? "checked" : ""}> ${day}</label><input type="time" name="${day.toLowerCase()}Start" value="${policy[`${day.toLowerCase()}Start`] || "09:00"}"><span>to</span><input type="time" name="${day.toLowerCase()}End" value="${policy[`${day.toLowerCase()}End`] || "17:00"}"></div>`).join("")}</div>`)}
        ${section("Scheduling Rules", "Set hour, shift, and rest limits", field("maxHoursWeek", "Max Hours / Week", policy.maxHoursWeek, "number") + field("maxHoursDay", "Max Hours / Day", policy.maxHoursDay, "number") + field("minHoursWeek", "Min Hours / Week", policy.minHoursWeek, "number") + field("maxShiftsWeek", "Max Shifts / Week", policy.maxShiftsWeek, "number") + field("minRest", "Gap Between Shifts (hrs)", policy.minRest, "number"))}
        ${section("Pay Rules", "Create the custom rate condition", field("payRuleName", "Rule Name", policy.payRuleName, "text", true) + select("payType", "Pay Type", policy.payType, ["Regular", "Overtime", "Double Time", "Holiday", "Premium Pay", "Custom"]) + select("triggerType", "Trigger / Applies When", policy.triggerType, ["After Hours / Day", "After Hours / Week", "Specific Day", "Holiday", "Custom Condition"]) + field("triggerValue", "Trigger Value", policy.triggerValue) + field("multiplier", "Multiplier", policy.multiplier, "text", true))}
        ${section("Time Off", "Define custom accrual and carry-over", field("timeOffName", "Policy Name", policy.timeOffName, "text", true) + field("daysPerYear", "Days Per Year", policy.daysPerYear) + field("accrual", "Accrual Rate (days/month)", policy.accrual) + select("carryOver", "Carry Over", policy.carryOver, ["No Carry Over", "Up to 5 days", "Up to 10 days", "Unlimited"]) + field("waitingPeriod", "Waiting Period (days)", policy.waitingPeriod, "number"))}
      </div>
      <footer class="pay-policy-footer"><button type="button" data-policy-back>Cancel</button><button type="submit">${policy.name ? "Save Changes" : "Create Policy"}</button></footer>
    </form>`;

  const detailMarkup = (policy) => {
    const item = (label, value) => `<div><dt>${label}</dt><dd>${esc(value || "—")}</dd></div>`;
    return `<div class="pay-policy-view"><div class="pay-policy-hero"><button type="button" data-policy-back>←</button><div><small>CUSTOM PAYROLL POLICY · ${policy.id}</small><h2>${esc(policy.name)}</h2><p>${esc(policy.description || "Reusable policy for employees and client positions.")}</p></div><div class="pay-policy-actions"><button type="button" data-policy-edit>Edit Policy</button></div></div><div class="pay-policy-view-grid">
      ${section("Regular Working Hour", "Custom weekly schedule", `<dl>${item("Working Days", days.filter((day) => policy[`work${day}`] !== false).join(", "))}${item("Default Hours", `${policy.mondayStart || "09:00"} – ${policy.mondayEnd || "17:00"}`)}</dl>`)}
      ${section("Scheduling Rules", "Configured limits", `<dl>${item("Max Hours / Week", policy.maxHoursWeek)}${item("Max Hours / Day", policy.maxHoursDay)}${item("Min Hours / Week", policy.minHoursWeek)}${item("Max Shifts / Week", policy.maxShiftsWeek)}${item("Gap Between Shifts", `${policy.minRest} hrs`)}</dl>`)}
      ${section("Pay Rules", "Custom rate condition", `<dl>${item("Rule Name", policy.payRuleName)}${item("Pay Type", policy.payType)}${item("Trigger", `${policy.triggerType} · ${policy.triggerValue}`)}${item("Multiplier", policy.multiplier)}</dl>`)}
      ${section("Time Off", "Custom accrual policy", `<dl>${item("Policy", policy.timeOffName)}${item("Days Per Year", policy.daysPerYear)}${item("Accrual Rate", `${policy.accrual} days/month`)}${item("Carry Over", policy.carryOver)}${item("Waiting Period", `${policy.waitingPeriod} days`)}</dl>`)}
    </div></div>`;
  };

  const swap = (root, markup, setup) => {
    const original = [...root.children]; original.forEach((node) => { node.hidden = true; });
    const shell = document.createElement("div"); shell.innerHTML = markup; const page = shell.firstElementChild; root.appendChild(page);
    const back = () => { page.remove(); original.forEach((node) => { node.hidden = false; }); renderRows(root); };
    page.querySelectorAll("[data-policy-back]").forEach((button) => button.addEventListener("click", back));
    setup?.(page, back);
  };

  const openEditor = (root, source = {}) => {
    const policy = defaults(source);
    swap(root, editorMarkup(policy), (form, back) => form.addEventListener("submit", (event) => {
      event.preventDefault(); const data = Object.fromEntries(new FormData(form).entries()); const error = form.querySelector(".pay-policy-error");
      if (!data.name?.trim() || !data.payRuleName?.trim() || !data.multiplier?.trim() || !data.timeOffName?.trim()) { error.textContent = "Complete the policy name, pay rule, multiplier, and time-off policy name."; error.hidden = false; return; }
      days.forEach((day) => { data[`work${day}`] = form.elements[`work${day}`].checked; });
      const saved = { ...policy, ...data, name: data.name.trim(), updatedAt: new Date().toISOString() };
      const items = read(); const index = items.findIndex((item) => item.id === saved.id); index >= 0 ? items.splice(index, 1, saved) : items.push(saved); write(items); back();
    }));
  };

  const openView = (root, policy) => swap(root, detailMarkup(policy), (page, back) => page.querySelector("[data-policy-edit]").addEventListener("click", () => { back(); openEditor(root, policy); }));

  const renderRows = (root) => {
    const tbody = root.querySelector("tbody"); if (!tbody) return;
    tbody.querySelectorAll("tr[data-custom-policy]").forEach((row) => row.remove());
    read().forEach((policy) => {
      const row = document.createElement("tr"); row.dataset.customPolicy = policy.id; row.className = "pay-policy-custom-row";
      const overlay = !!root.closest("#payroll-ui-fix");
      row.innerHTML = overlay
        ? `<td><b>${esc(policy.name)}</b><small>${policy.id}</small></td><td>Custom Policy</td><td>${esc(policy.appliesTo)}</td><td>Effective immediately</td><td>${esc(policy.maxHoursWeek)} hrs/week · ${esc(policy.payRuleName)}</td><td><span>${esc(policy.status)}</span></td><td><div><button data-view>View</button><button data-edit>Edit</button></div></td>`
        : `<td>${esc(policy.name)}<small>${policy.id}</small></td><td>Custom Policy</td><td>${esc(policy.appliesTo)}</td><td>${esc(policy.maxHoursWeek)} hrs/week · ${esc(policy.payRuleName)}</td><td><span>${esc(policy.status)}</span></td><td><div><button data-view>View</button><button data-edit>Edit</button></div></td>`;
      row.querySelector("[data-view]").addEventListener("click", () => openView(root, policy)); row.querySelector("[data-edit]").addEventListener("click", () => openEditor(root, policy)); tbody.appendChild(row);
    });
  };

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
      const source = defaults({ id: legacyId, name: cells[0].textContent.trim(), appliesTo: cells[2].textContent.trim(), status: cells[overlay ? 5 : 4].textContent.trim(), description: cells[overlay ? 4 : 3].textContent.trim() });
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
      if (cells?.length) openEditor(root, defaults({ id: `BASE-${detail.index + 1}`, name: cells[0].textContent.trim(), appliesTo: cells[2].textContent.trim(), description: cells[4]?.textContent.trim(), status: cells[5]?.textContent.trim() }));
    } else openEditor(root);
  });

  let queued = false; new MutationObserver(() => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; enhance(); }); }).observe(document.body, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true }); else enhance();
})();
