(() => {
  const text = (value) => String(value || "").trim();

  const positionFromRow = (row) => {
    const cells = row.querySelectorAll("td");
    const uid = text(cells[0]?.textContent);
    const title = text(cells[1]?.textContent);
    const hours = text(cells[2]?.textContent);
    const bill = text(cells[3]?.textContent);
    const holiday = text(cells[4]?.textContent);
    const temporary = text(cells[5]?.textContent) === "Yes";
    const defaults = {
      uid, title, hours, bill, holiday, temporary,
      description: `${title} position configured for this site’s security operations.`,
      status: "Active",
      memo: temporary ? "Temporary coverage assignment" : "Standard recurring assignment",
      service: temporary ? "Temporary Service" : "Regular Service",
      beginDate: "January 15, 2024",
      breakRule: hours === "12h" ? "Standard 30-min Break" : "No Break Rule",
      payBasis: "Pay on Employee Pay Rate",
      breakPay: "Do Not Pay Breaks",
      holidayPay: holiday && holiday !== "—" ? `Rate Multiplier · ${holiday}` : "Do Not Pay Holiday Premium",
      workingHours: hours === "12h" ? "Custom 12-hour shift" : "Standard Full-Time (9 to 5)",
      scheduling: "Strict Scheduling (Must adhere to hours)",
      timeOff: "Standard PTO",
      daysPerYear: "15 days",
      accrual: "1.25 days / month",
      conditional: "Background Check",
      soft: "Bilingual preferred",
    };
    try { return { ...defaults, ...JSON.parse(row.dataset.positionDetails || "{}") }; }
    catch { return defaults; }
  };

  const field = (label, value, accent = false) => `
    <div class="position-view-field">
      <dt>${label}</dt>
      <dd${accent ? ' class="is-accent"' : ""}>${value || "—"}</dd>
    </div>`;

  const section = (title, subtitle, content) => `
    <section class="position-view-section">
      <div class="position-view-section__heading">
        <h3>${title}</h3>
        <p>${subtitle}</p>
      </div>
      <dl class="position-view-grid">${content}</dl>
    </section>`;

  const input = (name, label, value, type = "text", required = false) => `
    <label class="position-edit-field">
      <span>${label}${required ? ' <b>*</b>' : ""}</span>
      <input name="${name}" type="${type}" value="${value || ""}" ${required ? "required" : ""}>
    </label>`;

  const select = (name, label, value, options) => `
    <label class="position-edit-field">
      <span>${label}</span>
      <select name="${name}">${options.map((option) => `<option${option === value ? " selected" : ""}>${option}</option>`).join("")}</select>
    </label>`;

  const editSection = (title, subtitle, content) => `
    <section class="position-edit-section">
      <div class="position-view-section__heading"><h3>${title}</h3><p>${subtitle}</p></div>
      <div class="position-edit-grid">${content}</div>
    </section>`;

  const modeControl = (group, policyLabel, customLabel, policyContent, customContent, initial = "policy") => `
    <div class="position-mode position-edit-wide" data-mode-group="${group}" data-mode="${initial}">
      <div class="position-mode-tabs">
        <button type="button" data-mode-value="policy">${policyLabel}</button>
        <button type="button" data-mode-value="custom">${customLabel}</button>
      </div>
      <input type="hidden" name="${group}Mode" value="${initial}">
      <div data-mode-panel="policy">${policyContent}</div>
      <div data-mode-panel="custom">${customContent}</div>
    </div>`;

  const workingHourCustom = `
    <div class="position-week-grid">
      ${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => `
        <div class="position-week-row">
          <label><input type="checkbox" name="work${day}" ${index < 5 ? "checked" : ""}> ${day}</label>
          <input type="time" name="${day.toLowerCase()}Start" value="09:00">
          <span>to</span>
          <input type="time" name="${day.toLowerCase()}End" value="17:00">
        </div>`).join("")}
    </div>`;

  const renderEdit = (host, row, position) => {
    const original = [...host.children];
    original.forEach((node) => { node.hidden = true; });
    const editor = document.createElement("form");
    editor.className = "position-edit";
    editor.innerHTML = `
      <header class="position-view-hero position-edit-hero">
        <button type="button" class="position-view-back" data-edit-cancel aria-label="Cancel editing">←</button>
        <div class="position-view-icon">✎</div>
        <div class="position-view-title"><div class="position-view-eyebrow">Edit Position / Job Type</div><h2>${position.title}</h2><div class="position-edit-help">Update the fields below, then save your changes.</div></div>
        <div class="position-edit-actions"><button type="button" data-edit-cancel>Cancel</button><button type="submit">Save Changes</button></div>
      </header>
      <div class="position-edit-message" role="alert" hidden></div>
      <div class="position-edit-sections">
        ${editSection("Post Base Settings", "Identity and operational status", [
          input("title", "Post Name", position.title, "text", true), input("uid", "Post ID", position.uid, "text", true),
          `<label class="position-edit-field position-edit-wide"><span>Short Description of Position</span><textarea name="description" rows="3">${position.description}</textarea></label>`,
          select("status", "Status", position.status, ["Active", "Archived"]), input("memo", "Schedule Memo", position.memo)
        ].join(""))}
        ${editSection("Service & Scheduling", "Service period and break configuration", [
          select("service", "Service Duration", position.service, ["Regular Service", "Temporary Service"]),
          input("beginDate", "Begin Date", "2024-01-15", "date"),
          select("breakRule", "Break Rule", position.breakRule, ["No Break Rule", "California Break Rule", "Standard 30-min Break", "Custom"]),
          modeControl("workingHours", "Choose Policy", "Set Custom Working Hour",
            select("workingHours", "Regular Working Hour Policy", position.workingHours, ["Standard Full-Time (9 to 5)", "Night Shift (10 PM to 6 AM)", "Custom 12-hour shift"]),
            workingHourCustom, position.workingHoursMode || "policy"),
          modeControl("scheduling", "Choose Policy", "Create Custom Rules",
            select("scheduling", "Scheduling Policy", position.scheduling, ["Strict Scheduling (Must adhere to hours)", "Flexible Scheduling (Core hours required)"]),
            [input("maxHoursWeek", "Max Hours / Week", position.maxHoursWeek || "40", "number"), input("maxHoursDay", "Max Hours / Day", position.maxHoursDay || "8", "number"), input("minHoursWeek", "Min Hours / Week", position.minHoursWeek || "20", "number"), input("maxShiftsDay", "Max Shifts / Day", position.maxShiftsDay || "1", "number"), input("maxShiftsWeek", "Max Shifts / Week", position.maxShiftsWeek || "5", "number"), input("minRest", "Gap Between Shifts (hrs)", position.minRest || "12", "number")].join(""),
            position.schedulingMode || "policy")
        ].join(""))}
        ${editSection("Payroll & Billing", "Pay handling and premium rules", [
          select("payBasis", "Pay Basis", position.payBasis, ["Pay on Employee Pay Rate", "Pay on This Post Rate"]),
          select("breakPay", "Break Pay", position.breakPay, ["Do Not Pay Breaks", "Pay All Breaks"]),
          select("holidayPay", "Holiday Pay", position.holidayPay, [position.holidayPay, "Do Not Pay Holiday Premium", "Rate Multiplier"]),
          input("hours", "TPT Hours", position.hours, "text", true), input("bill", "Bill Rate", position.bill, "text", true), input("holiday", "Holiday Rate", position.holiday)
        ].join(""))}
        ${editSection("Pay Rules", "Configure existing policies or define a custom pay rule",
          modeControl("payRules", "Choose Policy", "Create Custom Rule",
            select("payRulePolicy", "Pay Rule Policy", position.payRulePolicy || "Standard Overtime (×1.5 after 40 hrs)", ["Standard Overtime (×1.5 after 40 hrs)", "Holiday Premium (×2.0 on holidays)", "Weekend Premium (×1.25)"]),
            [input("payRule", "Rule Name", position.payRule || "Standard Overtime"), select("payType", "Pay Type", position.payType || "Overtime", ["Regular", "Overtime", "Double Time", "Holiday", "Premium Pay", "Custom"]), select("payTriggerType", "Trigger / Applies When", position.payTriggerType || "After Hours / Week", ["After Hours / Day", "After Hours / Week", "Specific Day", "Holiday", "Custom Condition"]), input("payTrigger", "Trigger Value", position.payTrigger || "40"), input("payMultiplier", "Multiplier", position.payMultiplier || "×1.5")].join(""),
            position.payRulesMode || "policy"))}
        ${editSection("Time Off", "Choose a policy or define custom time-off rules",
          modeControl("timeOff", "Choose Policy", "Create Custom Rules",
            select("timeOff", "Time Off Policy", position.timeOff, ["Standard PTO", "Executive Leave", "Unlimited PTO", "No Paid Time Off"]),
            [input("timeOffName", "Policy Name", position.timeOffName || "Custom PTO"), input("daysPerYear", "Days Per Year", position.daysPerYear), input("accrual", "Accrual Rate (days/month)", position.accrual), select("carryOver", "Carry Over", position.carryOver || "Up to 5 days", ["No Carry Over", "Up to 5 days", "Up to 10 days", "Unlimited"]), input("waitingPeriod", "Waiting Period (days)", position.waitingPeriod || "90", "number")].join(""),
            position.timeOffMode || "policy"))}
        ${editSection("Requirements", "Conditions and preferred qualifications", [
          input("conditional", "Conditional Requirements", position.conditional), input("soft", "Soft Requirements", position.soft)
        ].join(""))}
      </div>
      <footer class="position-edit-footer"><button type="button" data-edit-cancel>Cancel</button><button type="submit">Save Changes</button></footer>`;

    host.appendChild(editor);
    host.scrollIntoView({ block: "start" });
    editor.querySelectorAll("[data-mode-group]").forEach((control) => {
      const setMode = (mode) => {
        control.dataset.mode = mode;
        control.querySelector('input[type="hidden"]').value = mode;
        control.querySelectorAll("[data-mode-value]").forEach((button) => button.classList.toggle("is-active", button.dataset.modeValue === mode));
        control.querySelectorAll("[data-mode-panel]").forEach((panel) => { panel.hidden = panel.dataset.modePanel !== mode; });
      };
      control.querySelectorAll("[data-mode-value]").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.modeValue)));
      setMode(control.dataset.mode || "policy");
    });
    const close = () => { editor.remove(); original.forEach((node) => { node.hidden = false; }); };
    editor.querySelectorAll("[data-edit-cancel]").forEach((button) => button.addEventListener("click", close));
    editor.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(editor).entries());
      const message = editor.querySelector(".position-edit-message");
      if (!text(data.title) || !text(data.uid) || !text(data.hours) || !text(data.bill)) {
        message.textContent = "Complete Post Name, Post ID, TPT Hours, and Bill Rate before saving.";
        message.hidden = false;
        return;
      }
      const updated = { ...position, ...data, title: text(data.title), uid: text(data.uid), temporary: data.service === "Temporary Service" };
      row.dataset.positionDetails = JSON.stringify(updated);
      const cells = row.querySelectorAll("td");
      cells[0].textContent = updated.uid;
      cells[1].textContent = updated.title;
      cells[2].textContent = updated.hours;
      cells[3].textContent = updated.bill;
      cells[4].textContent = updated.holiday || "—";
      const badge = cells[5].querySelector("span");
      if (badge) badge.textContent = updated.temporary ? "Yes" : "No";
      close();
      const notice = document.createElement("div");
      notice.className = "position-save-toast";
      notice.setAttribute("role", "status");
      notice.textContent = `${updated.title} was updated successfully.`;
      host.prepend(notice);
      setTimeout(() => notice.remove(), 3500);
    });
  };

  const renderView = (host, position) => {
    const original = [...host.children];
    original.forEach((node) => { node.hidden = true; });

    const view = document.createElement("div");
    view.className = "position-view";
    view.innerHTML = `
      <header class="position-view-hero">
        <button type="button" class="position-view-back" data-position-back aria-label="Back to positions">←</button>
        <div class="position-view-icon">${position.title.split(/\s+/).slice(0, 2).map((part) => part[0]).join("")}</div>
        <div class="position-view-title">
          <div class="position-view-eyebrow">Position / Job Type</div>
          <h2>${position.title}</h2>
          <div class="position-view-meta">
            <span class="position-view-id">${position.uid}</span>
            <span class="position-view-status"><i></i>${position.status}</span>
            <span class="position-view-service">${position.service}</span>
          </div>
        </div>
        <button type="button" class="position-view-edit" data-position-edit>Edit Position</button>
      </header>

      <div class="position-view-summary">
        <div><span>TPT Hours</span><strong>${position.hours}</strong></div>
        <div><span>Bill Rate</span><strong class="green">${position.bill}</strong></div>
        <div><span>Holiday Rate</span><strong>${position.holiday}</strong></div>
        <div><span>Temporary</span><strong>${position.temporary ? "Yes" : "No"}</strong></div>
      </div>

      <div class="position-view-sections">
        ${section("Post Base Settings", "Identity and operational status", [
          field("Post Name", position.title), field("Post ID", position.uid),
          field("Short Description of Position", position.description), field("Status", position.status, true),
          field("Schedule Memo", position.memo)
        ].join(""))}
        ${section("Service & Scheduling", "Service period and break configuration", [
          field("Service Duration", position.service), field("Begin Date", position.beginDate),
          field("Break Rule", position.breakRule),
          field("Regular Working Hour", position.workingHoursMode === "custom" ? "Custom weekly schedule" : position.workingHours),
          field("Scheduling Rules", position.schedulingMode === "custom" ? `Custom · ${position.maxHoursWeek || 40} hrs/week · ${position.maxShiftsWeek || 5} shifts/week` : position.scheduling)
        ].join(""))}
        ${section("Payroll & Billing", "Pay handling and premium rules", [
          field("Pay Basis", position.payBasis), field("Break Pay", position.breakPay),
          field("Holiday Pay", position.holidayPay), field("Bill Rate", position.bill, true),
          field("Holiday Rate", position.holiday)
        ].join(""))}
        ${section("Pay Rules", "Configured rate conditions", `
          <div class="position-view-rule position-view-grid__wide">
            <div><span>${position.payRulesMode === "custom" ? position.payRule || "Custom Pay Rule" : position.payRulePolicy || "Standard Overtime"}</span><small>${position.payRulesMode === "custom" ? `${position.payTriggerType || "After Hours / Week"} · ${position.payTrigger || 40}` : "Policy-based rate condition"}</small></div>
            <strong>${position.payRulesMode === "custom" ? position.payMultiplier || "×1.5" : "Policy"}</strong>
          </div>`)}
        ${section("Time Off Policy", "Accrual policy attached to this position", [
          field("Policy", position.timeOffMode === "custom" ? position.timeOffName || "Custom PTO" : position.timeOff), field("Days Per Year", position.daysPerYear),
          field("Accrual Rate (days/month)", position.accrual),
          ...(position.timeOffMode === "custom" ? [field("Carry Over", position.carryOver), field("Waiting Period", `${position.waitingPeriod || 0} days`)] : [])
        ].join(""))}
        ${section("Requirements", "Conditions and preferred qualifications", [
          field("Conditional Requirements", position.conditional),
          field("Soft Requirements", position.soft)
        ].join(""))}
      </div>`;

    host.appendChild(view);
    host.scrollIntoView({ block: "start" });

    const close = () => {
      view.remove();
      original.forEach((node) => { node.hidden = false; });
    };
    view.querySelector("[data-position-back]").addEventListener("click", close);
    view.querySelector("[data-position-edit]").addEventListener("click", () => {
      close();
      const matchingRow = [...host.querySelectorAll("tbody tr")]
        .find((row) => text(row.querySelector("td")?.textContent) === position.uid);
      if (matchingRow) renderEdit(host, matchingRow, positionFromRow(matchingRow));
    });
  };

  const enhance = () => {
    const search = document.querySelector('input[placeholder="Search positions…"]');
    const host = search?.closest(".p-6.space-y-5");
    if (!host) return;

    host.querySelectorAll("tbody tr").forEach((row) => {
      if (row.dataset.positionViewReady === "true") return;
      const titleCell = row.querySelector("td:nth-child(2)");
      const actions = row.querySelector("td:last-child > div");
      if (!titleCell || !actions) return;
      row.dataset.positionViewReady = "true";

      titleCell.classList.add("position-view-trigger");
      titleCell.setAttribute("role", "button");
      titleCell.setAttribute("tabindex", "0");
      titleCell.setAttribute("title", "View position details");

      const viewButton = document.createElement("button");
      viewButton.type = "button";
      viewButton.className = "position-row-view";
      viewButton.textContent = "View";
      actions.prepend(viewButton);

      const open = () => renderView(host, positionFromRow(row));
      const editButton = [...actions.querySelectorAll("button")].find((button) => text(button.textContent) === "Edit");
      editButton?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        renderEdit(host, row, positionFromRow(row));
      }, true);
      viewButton.addEventListener("click", open);
      titleCell.addEventListener("click", open);
      titleCell.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });
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
