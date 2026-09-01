(() => {
  const STORE = "alexios.employmentPolicies.v1";
  const readStore = () => { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; } };
  const writeStore = (data) => localStorage.setItem(STORE, JSON.stringify(data));
  const esc = (v) => String(v || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const visible = (n) => !!n && !n.hidden && getComputedStyle(n).display !== "none" && n.getClientRects().length > 0;

  const MANAGERS = ["James Kim", "Sarah Chen", "Mike Torres", "Emma Rodriguez", "David Park"];
  const SITES = ["Downtown Financial Center", "Westfield Mall Group", "Harbor District", "Airport Terminal C", "City Hall", "Riverside Plaza"];
  const WORK_POLICIES = ["Standard Full-Time (9 to 5)", "Night Shift (10 PM to 6 AM)", "Part-Time Morning (6 AM to 12 PM)", "Weekend Only", "Rotating Shift"];
  const SCHED_POLICIES = ["Standard Union Scheduling", "Flexible Hours Policy", "Fixed Schedule Policy", "On-Call Rotation Policy"];
  const TIME_OFF_POLICIES = ["Standard PTO", "Unlimited PTO", "Accrual Based PTO", "No PTO Policy"];
  const PAY_RULES_POLICIES = ["Standard Overtime (1.5x after 40h/wk)", "Double Time (2x after 12h/day)", "No Overtime", "Union Overtime Policy", "California OT Rules", "Flex-Time Policy"];
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ── Guards ───────────────────────────────────────────────────────────
  const onEmployeeDetail = () =>
    [...document.querySelectorAll("button, a")].some((b) => b.textContent.trim() === "Back to Employees" && visible(b));

  const findSection = () => {
    if (!onEmployeeDetail()) return null;
    const heading = [...document.querySelectorAll("h3")].find(
      (h) => h.textContent.trim() === "Employment Info & Policies" && visible(h)
    );
    return heading?.closest("div.p-6") || null;
  };

  const getEmployeeId = () => {
    const el = [...document.querySelectorAll("span, div, p")].find((n) =>
      n.childElementCount === 0 && /^EMP-\d+$/.test(n.textContent.trim())
    );
    return el?.textContent.trim() || "emp-unknown";
  };

  // ── CSS ──────────────────────────────────────────────────────────────
  const injectStyles = () => {
    if (document.getElementById("emp-pol-edit-css")) return;
    const s = document.createElement("style");
    s.id = "emp-pol-edit-css";
    s.textContent = `
      /* Edit icon button next to section heading */
      .emp-pol-edit-btn {
        display: inline-flex; align-items: center; gap: 5px;
        padding: 5px 11px; margin-left: 10px;
        background: transparent; border: 1px solid #1e293b; border-radius: 8px;
        color: #64748b; font-size: 12px; font-weight: 600; cursor: pointer;
        vertical-align: middle; transition: all 0.15s;
      }
      .emp-pol-edit-btn:hover { background: #0f172a; color: #cbd5e1; border-color: #334155; }
      .emp-pol-edit-btn svg { width: 13px; height: 13px; flex-shrink: 0; }

      /* Modal overlay — near-opaque black */
      #emp-pol-modal {
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: flex-start; justify-content: center;
        padding: 24px 16px; background: rgba(0,0,0,.88); backdrop-filter: blur(6px);
        overflow-y: auto;
      }

      /* Modal card — pure black */
      #emp-pol-form {
        width: 100%; max-width: 680px; margin: auto;
        background: #000000; border: 1px solid #1e293b;
        border-radius: 18px; box-shadow: 0 40px 100px rgba(0,0,0,.9);
        display: flex; flex-direction: column; color: #e2e8f0;
      }

      /* Header */
      #emp-pol-form header {
        padding: 20px 24px; border-bottom: 1px solid #0f172a;
        display: flex; align-items: flex-start; justify-content: space-between;
        background: #000000; border-radius: 18px 18px 0 0; position: sticky; top: 0; z-index: 2;
      }
      #emp-pol-form header h3 { margin: 0 0 3px; font-size: 17px; font-weight: 800; color: #f1f5f9; }
      #emp-pol-form header p  { margin: 0; font-size: 12px; color: #475569; }
      #emp-pol-close { background: none; border: none; color: #475569; cursor: pointer; padding: 2px; transition: color .15s; }
      #emp-pol-close:hover { color: #cbd5e1; }

      /* Body */
      .emp-pol-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; background: #000000; }

      .emp-pol-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .emp-pol-field { display: flex; flex-direction: column; gap: 6px; }
      .emp-pol-field label {
        font-size: 10px; font-weight: 800; letter-spacing: .09em;
        text-transform: uppercase; color: #475569;
      }

      /* Inputs & selects */
      .emp-pol-input {
        padding: 9px 12px; background: #050a14; border: 1px solid #1e293b;
        border-radius: 10px; color: #cbd5e1; font-size: 13px; outline: none;
        transition: border-color .15s, box-shadow .15s;
        appearance: auto;
      }
      .emp-pol-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.18); }
      .emp-pol-input option { background: #050a14; }

      /* Sub-section label */
      .emp-pol-section-label {
        font-size: 12px; font-weight: 800; letter-spacing: .06em;
        text-transform: uppercase; color: #475569; margin-bottom: 10px;
      }

      /* Sub-section card */
      .emp-pol-section-block {
        background: #03060d; border: 1px solid #0f172a; border-radius: 12px; padding: 16px;
      }

      /* Toggle pill row */
      .emp-pol-toggle {
        display: inline-flex; background: #050a14; border: 1px solid #1e293b;
        border-radius: 10px; padding: 3px; gap: 2px; margin-bottom: 14px;
      }
      .emp-pol-tab {
        padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700;
        color: #64748b; cursor: pointer; background: transparent; border: none; transition: all .15s;
      }
      .emp-pol-tab.active { background: #2563eb; color: #fff; }
      .emp-pol-tab:not(.active):hover { color: #e2e8f0; background: #334155; }

      /* Day rows */
      .emp-pol-day-row {
        display: grid; grid-template-columns: 20px 110px 1fr auto 1fr; align-items: center; gap: 10px;
        padding: 8px 0; border-bottom: 1px solid #1e293b;
      }
      .emp-pol-day-row:last-child { border-bottom: none; }
      .emp-pol-day-name { font-size: 13px; color: #cbd5e1; font-weight: 500; }
      .emp-pol-day-sep  { font-size: 11px; color: #475569; font-weight: 700; text-align: center; }
      .emp-pol-day-row input[type="checkbox"] { accent-color: #3b82f6; width: 15px; height: 15px; cursor: pointer; }
      .emp-pol-day-row input[type="time"] {
        padding: 6px 8px; background: #050a14; border: 1px solid #1e293b;
        border-radius: 8px; color: #cbd5e1; font-size: 12px; outline: none;
        transition: border-color .15s;
      }
      .emp-pol-day-row input[type="time"]:focus { border-color: #2563eb; }

      /* Scheduling custom grid */
      .emp-pol-sched-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

      /* Footer */
      #emp-pol-form footer {
        padding: 16px 24px; border-top: 1px solid #0f172a;
        display: flex; justify-content: flex-end; gap: 10px;
        background: #000000; border-radius: 0 0 18px 18px;
      }
      .emp-pol-btn-cancel {
        padding: 9px 18px; border: 1px solid #1e293b; border-radius: 10px;
        background: #050a14; color: #94a3b8; font-size: 13px; font-weight: 700;
        cursor: pointer; transition: all .15s;
      }
      .emp-pol-btn-cancel:hover { background: #0f172a; color: #e2e8f0; border-color: #334155; }
      .emp-pol-btn-save {
        padding: 9px 20px; border: none; border-radius: 10px;
        background: #2563eb; color: #fff; font-size: 13px; font-weight: 700;
        cursor: pointer; transition: background .15s;
      }
      .emp-pol-btn-save:hover { background: #1d4ed8; }

      /* Custom policy text field */
      .emp-pol-custom-policy {
        margin-top: 12px; display: flex; flex-direction: column; gap: 6px;
      }
      .emp-pol-custom-policy textarea {
        padding: 9px 12px; background: #050a14; border: 1px solid #1e293b;
        border-radius: 10px; color: #cbd5e1; font-size: 13px; outline: none;
        resize: vertical; min-height: 70px; font-family: inherit;
        transition: border-color .15s;
      }
      .emp-pol-custom-policy textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.18); }

      /* Checkbox row */
      .emp-pol-check-row {
        display: flex; align-items: center; gap: 8px;
        margin-top: 10px; padding-top: 10px; border-top: 1px solid #0f172a;
      }
      .emp-pol-check-row input[type="checkbox"] { accent-color: #2563eb; width: 15px; height: 15px; cursor: pointer; flex-shrink: 0; }
      .emp-pol-check-row label { font-size: 13px; color: #94a3b8; cursor: pointer; font-weight: 500; }

      /* Toast */
      .emp-pol-toast {
        position: fixed; top: 16px; right: 16px; z-index: 10001;
        padding: 12px 18px; background: #16a34a; color: #fff;
        font-size: 13px; font-weight: 700; border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,.4); animation: emp-pol-fadein .2s ease;
      }
      @keyframes emp-pol-fadein { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
    `;
    document.head.appendChild(s);
  };

  // ── Build modal HTML ─────────────────────────────────────────────────
  const buildModal = (employeeId) => {
    const saved = readStore()[employeeId] || {};
    const manager      = saved.manager       || "James Kim";
    const site         = saved.site          || "Downtown Financial Center";
    const hoursMode    = saved.hoursMode     || "policy";
    const workPolicy   = saved.workPolicy    || "Standard Full-Time (9 to 5)";
    const customHours  = saved.customHours   || DAYS.map((d, i) => ({ day: d, active: i < 5, from: "09:00", to: "17:00" }));
    const schedMode    = saved.schedMode     || "custom";
    const schedPolicy  = saved.schedPolicy   || "Standard Union Scheduling";
    const maxHrsWk     = saved.maxHrsWk      || "40";
    const maxHrsDay    = saved.maxHrsDay     || "8";
    const minHrsWk     = saved.minHrsWk      || "20";
    const maxShiftDay  = saved.maxShiftDay   || "1";
    const maxShiftWk   = saved.maxShiftWk    || "5";
    const minShiftWk   = saved.minShiftWk    || "2";
    const gapShift     = saved.gapShift      || "12";
    const timeOff            = saved.timeOff            || "Standard PTO";
    const payType            = saved.payType            || "hourly";
    const payRate            = saved.payRate            || "25.00";
    const payRulesMode       = saved.payRulesMode       || "policy";
    const payRulesPolicy     = saved.payRulesPolicy     || "Standard Overtime (1.5x after 40h/wk)";
    const customPolicyEnabled = saved.customPolicyEnabled || false;
    const customPolicyText   = saved.customPolicyText   || "";

    const policyShow   = hoursMode === "policy"    ? "" : "display:none";
    const customShow   = hoursMode === "custom"    ? "" : "display:none";
    const spolicyShow  = schedMode === "policy"    ? "" : "display:none";
    const scustomShow  = schedMode === "custom"    ? "" : "display:none";
    const prPolicyShow = payRulesMode === "policy" ? "" : "display:none";
    const prCustomShow = payRulesMode === "custom" ? "" : "display:none";

    return `
<div id="emp-pol-modal">
  <form id="emp-pol-form" autocomplete="off">

    <header>
      <div>
        <h3>Edit Employment Info &amp; Policies</h3>
        <p>Update manager, sites, hours, pay rules, scheduling, and pay rates.</p>
      </div>
      <button type="button" id="emp-pol-close" aria-label="Close">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </header>

    <div class="emp-pol-body">

      <!-- Direct Manager & Assign Site -->
      <div class="emp-pol-row">
        <div class="emp-pol-field">
          <label>Direct Manager</label>
          <select name="manager" class="emp-pol-input">
            ${MANAGERS.map((m) => `<option${m === manager ? " selected" : ""}>${esc(m)}</option>`).join("")}
          </select>
        </div>
        <div class="emp-pol-field">
          <label>Assign Site</label>
          <select name="site" class="emp-pol-input">
            ${SITES.map((s) => `<option${s === site ? " selected" : ""}>${esc(s)}</option>`).join("")}
          </select>
        </div>
      </div>

      <!-- Regular Working Hour -->
      <div>
        <div class="emp-pol-section-label">Regular Working Hour</div>
        <div class="emp-pol-section-block">
          <div class="emp-pol-toggle" id="hours-toggle">
            <button type="button" class="emp-pol-tab${hoursMode === "policy" ? " active" : ""}" data-hours="policy">Choose Policy</button>
            <button type="button" class="emp-pol-tab${hoursMode === "custom" ? " active" : ""}" data-hours="custom">Set Custom Working Hour</button>
          </div>
          <div id="hours-policy-view" style="${policyShow}">
            <div class="emp-pol-field">
              <select name="workPolicy" class="emp-pol-input">
                ${WORK_POLICIES.map((p) => `<option${p === workPolicy ? " selected" : ""}>${esc(p)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div id="hours-custom-view" style="${customShow}">
            ${customHours.map((d, i) => `
              <div class="emp-pol-day-row">
                <input type="checkbox" name="day-on-${i}" ${d.active ? "checked" : ""}>
                <span class="emp-pol-day-name">${d.day}</span>
                <input type="time" name="day-from-${i}" value="${d.from}" style="${!d.active ? "opacity:.4" : ""}">
                <span class="emp-pol-day-sep">TO</span>
                <input type="time" name="day-to-${i}" value="${d.to}" style="${!d.active ? "opacity:.4" : ""}">
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Scheduling Rules -->
      <div>
        <div class="emp-pol-section-label">Scheduling Rules</div>
        <div class="emp-pol-section-block">
          <div class="emp-pol-toggle" id="sched-toggle">
            <button type="button" class="emp-pol-tab${schedMode === "policy" ? " active" : ""}" data-sched="policy">Choose Policy</button>
            <button type="button" class="emp-pol-tab${schedMode === "custom" ? " active" : ""}" data-sched="custom">Create Custom Rules</button>
          </div>
          <div id="sched-policy-view" style="${spolicyShow}">
            <div class="emp-pol-field">
              <select name="schedPolicy" class="emp-pol-input">
                ${SCHED_POLICIES.map((p) => `<option${p === schedPolicy ? " selected" : ""}>${esc(p)}</option>`).join("")}
              </select>
            </div>
          </div>
          <div id="sched-custom-view" style="${scustomShow}">
            <div class="emp-pol-sched-grid">
              ${[["maxHrsWk","Max Hrs / Wk",maxHrsWk],["maxHrsDay","Max Hrs / Day",maxHrsDay],["minHrsWk","Min Hrs / Wk",minHrsWk],
                 ["maxShiftDay","Max Shift / Day",maxShiftDay],["maxShiftWk","Max Shift / Wk",maxShiftWk],["minShiftWk","Min Shift / Wk",minShiftWk],
                 ["gapShift","Gap Between Shift",gapShift]].map(([name, label, val]) => `
                <div class="emp-pol-field">
                  <label>${label}</label>
                  <input type="number" name="${name}" value="${esc(val)}" class="emp-pol-input" min="0">
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- Time Off -->
      <div class="emp-pol-field">
        <label>Time Off</label>
        <select name="timeOff" class="emp-pol-input">
          ${TIME_OFF_POLICIES.map((p) => `<option${p === timeOff ? " selected" : ""}>${esc(p)}</option>`).join("")}
        </select>
      </div>

      <!-- Pay Rates -->
      <div>
        <div class="emp-pol-section-label">Pay Rates</div>
        <div class="emp-pol-section-block">

          <!-- Pay type toggle: Hourly / Salary -->
          <div class="emp-pol-row" style="margin-bottom:14px">
            <div class="emp-pol-field">
              <label>Pay Type</label>
              <div class="emp-pol-toggle" id="paytype-toggle">
                <button type="button" class="emp-pol-tab${payType === "hourly" ? " active" : ""}" data-paytype="hourly">Hourly</button>
                <button type="button" class="emp-pol-tab${payType === "salary" ? " active" : ""}" data-paytype="salary">Salary</button>
              </div>
            </div>
            <div class="emp-pol-field">
              <label id="pay-rate-lbl">${payType === "salary" ? "Annual Salary" : "Hourly Rate"} ($)</label>
              <div style="position:relative">
                <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#475569;font-size:13px;pointer-events:none">$</span>
                <input type="number" name="payRate" value="${esc(payRate)}" step="0.01" min="0" class="emp-pol-input" style="padding-left:22px">
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Pay Rules -->
      <div>
        <div class="emp-pol-section-label">Pay Rules</div>
        <div class="emp-pol-section-block">
          <div class="emp-pol-toggle" id="payrules-toggle">
            <button type="button" class="emp-pol-tab${payRulesMode === "policy" ? " active" : ""}" data-payrules="policy">Choose Policy</button>
            <button type="button" class="emp-pol-tab${payRulesMode === "custom" ? " active" : ""}" data-payrules="custom">Create Custom Rules</button>
          </div>

          <!-- Policy dropdown -->
          <div id="payrules-policy-view" style="${prPolicyShow}">
            <div class="emp-pol-field">
              <select name="payRulesPolicy" class="emp-pol-input">
                ${PAY_RULES_POLICIES.map((p) => `<option${p === payRulesPolicy ? " selected" : ""}>${esc(p)}</option>`).join("")}
              </select>
            </div>
          </div>

          <!-- Custom numeric rules -->
          <div id="payrules-custom-view" style="${prCustomShow}">
            <div class="emp-pol-sched-grid">
              ${[["otRateRegular","OT Rate (Regular)", saved.otRateRegular || "1.5"],
                 ["otRateDouble","OT Rate (Double)", saved.otRateDouble || "2.0"],
                 ["otThresholdDay","OT After (hrs/day)", saved.otThresholdDay || "8"],
                 ["otThresholdWeek","OT After (hrs/wk)", saved.otThresholdWeek || "40"],
                 ["holidayRate","Holiday Rate", saved.holidayRate || "2.0"],
                 ["nightDiffRate","Night Diff Rate", saved.nightDiffRate || "1.25"]
                ].map(([name, label, val]) => `
                <div class="emp-pol-field">
                  <label>${label}</label>
                  <input type="number" name="${name}" value="${esc(val)}" step="0.05" min="0" class="emp-pol-input">
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Custom Policy text (always visible) -->
          <div class="emp-pol-check-row">
            <input type="checkbox" name="customPolicyEnabled" id="custom-policy-cb"${customPolicyEnabled ? " checked" : ""}>
            <label for="custom-policy-cb">Add custom policy note</label>
          </div>
          <div class="emp-pol-custom-policy" id="custom-policy-area" style="${customPolicyEnabled ? "" : "display:none"}">
            <textarea name="customPolicyText" placeholder="Describe the custom pay policy for this employee…">${esc(customPolicyText)}</textarea>
          </div>

        </div>
      </div>

    </div>

    <footer>
      <button type="button" class="emp-pol-btn-cancel" id="emp-pol-cancel">Cancel</button>
      <button type="submit" class="emp-pol-btn-save">Save Changes</button>
    </footer>

  </form>
</div>`;
  };

  // ── Apply saved values to the detail page DOM ────────────────────────
  const applyToPage = (section, data) => {
    // Direct Manager card
    const managerSection = [...section.querySelectorAll("div")].find((d) =>
      d.children.length === 0 && d.textContent.trim().toUpperCase() === "DIRECT MANAGER"
    )?.closest("div");
    if (managerSection) {
      const nameEl = managerSection.querySelector(".font-semibold, .font-bold, p");
      if (nameEl) nameEl.textContent = data.manager;
    }

    // Assigned Sites chips — find the ASSIGNED SITES label then its sibling chip container
    const sitesLabel = [...section.querySelectorAll("div, p, span")].find(
      (n) => n.children.length === 0 && n.textContent.trim().toUpperCase() === "ASSIGNED SITES"
    );
    if (sitesLabel) {
      const chipsParent = sitesLabel.closest("div")?.querySelector("div");
      if (chipsParent) {
        const chip = chipsParent.querySelector("span, div");
        if (chip) {
          // Replace chip content with new site
          chip.textContent = data.site;
          // Remove extra chips
          [...chipsParent.children].slice(1).forEach((c) => c.remove());
        }
      }
    }

    // Scheduling rules numeric inputs (already interactive in the DOM)
    const schedFields = { "Max Hrs / Wk": data.maxHrsWk, "Max Hrs / Day": data.maxHrsDay, "Min Hrs / Wk": data.minHrsWk,
                          "Max Shift / Day": data.maxShiftDay, "Max Shift / Wk": data.maxShiftWk, "Min Shift / Wk": data.minShiftWk,
                          "Gap Between Shift": data.gapShift };
    Object.entries(schedFields).forEach(([label, val]) => {
      if (!val) return;
      const labelEl = [...section.querySelectorAll("label, p, span")].find((n) => n.textContent.trim() === label);
      const input = labelEl?.closest("div")?.querySelector("input") || labelEl?.nextElementSibling?.querySelector("input");
      if (input) { input.value = val; input.dispatchEvent(new Event("input", { bubbles: true })); }
    });

    // Time Off select
    if (data.timeOff) {
      const selects = section.querySelectorAll("select");
      selects.forEach((sel) => {
        [...sel.options].forEach((opt) => { if (opt.textContent.trim() === data.timeOff) sel.value = opt.value; });
      });
    }

    // Pay Rate input
    if (data.payRate) {
      const payInput = [...section.querySelectorAll("input")].find(
        (i) => i.type === "number" || (i.value || "").replace(/\$/g, "").match(/^\d+(\.\d+)?$/)
      );
      if (payInput) { payInput.value = data.payRate; payInput.dispatchEvent(new Event("input", { bubbles: true })); }
    }
  };

  // ── Open modal ───────────────────────────────────────────────────────
  const openModal = (section, employeeId) => {
    document.getElementById("emp-pol-modal")?.remove();

    const wrapper = document.createElement("div");
    wrapper.innerHTML = buildModal(employeeId);
    document.body.appendChild(wrapper.firstElementChild);

    const modal = document.getElementById("emp-pol-modal");
    const form  = document.getElementById("emp-pol-form");
    const close = () => modal?.remove();

    modal.querySelector("#emp-pol-close")?.addEventListener("click", close);
    modal.querySelector("#emp-pol-cancel")?.addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });

    // Hours mode toggle
    let hoursMode = readStore()[employeeId]?.hoursMode || "policy";
    modal.querySelectorAll("[data-hours]").forEach((btn) => {
      btn.addEventListener("click", () => {
        hoursMode = btn.dataset.hours;
        modal.querySelectorAll("[data-hours]").forEach((b) => b.classList.toggle("active", b.dataset.hours === hoursMode));
        modal.querySelector("#hours-policy-view").style.display = hoursMode === "policy" ? "" : "none";
        modal.querySelector("#hours-custom-view").style.display = hoursMode === "custom" ? "" : "none";
      });
    });

    // Day checkbox — dim time inputs when day is off
    DAYS.forEach((_, i) => {
      const cb   = form.elements[`day-on-${i}`];
      const from = form.elements[`day-from-${i}`];
      const to   = form.elements[`day-to-${i}`];
      if (!cb) return;
      cb.addEventListener("change", () => {
        [from, to].forEach((inp) => { if (inp) inp.style.opacity = cb.checked ? "1" : "0.4"; });
      });
    });

    // Scheduling mode toggle
    let schedMode = readStore()[employeeId]?.schedMode || "custom";
    modal.querySelectorAll("[data-sched]").forEach((btn) => {
      btn.addEventListener("click", () => {
        schedMode = btn.dataset.sched;
        modal.querySelectorAll("[data-sched]").forEach((b) => b.classList.toggle("active", b.dataset.sched === schedMode));
        modal.querySelector("#sched-policy-view").style.display = schedMode === "policy" ? "" : "none";
        modal.querySelector("#sched-custom-view").style.display = schedMode === "custom" ? "" : "none";
      });
    });

    // Pay type toggle (Hourly / Salary)
    let payType = readStore()[employeeId]?.payType || "hourly";
    modal.querySelectorAll("[data-paytype]").forEach((btn) => {
      btn.addEventListener("click", () => {
        payType = btn.dataset.paytype;
        modal.querySelectorAll("[data-paytype]").forEach((b) => b.classList.toggle("active", b.dataset.paytype === payType));
        const lbl = modal.querySelector("#pay-rate-lbl");
        if (lbl) lbl.textContent = (payType === "salary" ? "Annual Salary" : "Hourly Rate") + " ($)";
      });
    });

    // Pay Rules mode toggle
    let payRulesMode = readStore()[employeeId]?.payRulesMode || "policy";
    modal.querySelectorAll("[data-payrules]").forEach((btn) => {
      btn.addEventListener("click", () => {
        payRulesMode = btn.dataset.payrules;
        modal.querySelectorAll("[data-payrules]").forEach((b) => b.classList.toggle("active", b.dataset.payrules === payRulesMode));
        modal.querySelector("#payrules-policy-view").style.display = payRulesMode === "policy" ? "" : "none";
        modal.querySelector("#payrules-custom-view").style.display = payRulesMode === "custom" ? "" : "none";
      });
    });

    // Custom Policy checkbox
    const customPolicyCb   = form.querySelector("#custom-policy-cb");
    const customPolicyArea = form.querySelector("#custom-policy-area");
    if (customPolicyCb && customPolicyArea) {
      customPolicyCb.addEventListener("change", () => {
        customPolicyArea.style.display = customPolicyCb.checked ? "" : "none";
      });
    }

    // Submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const customHours = DAYS.map((d, i) => ({
        day: d,
        active: form.elements[`day-on-${i}`]?.checked ?? (i < 5),
        from: fd.get(`day-from-${i}`) || "09:00",
        to:   fd.get(`day-to-${i}`)   || "17:00",
      }));
      const data = {
        manager:     fd.get("manager"),
        site:        fd.get("site"),
        hoursMode,
        workPolicy:  fd.get("workPolicy"),
        customHours,
        schedMode,
        schedPolicy: fd.get("schedPolicy"),
        maxHrsWk:    fd.get("maxHrsWk"),
        maxHrsDay:   fd.get("maxHrsDay"),
        minHrsWk:    fd.get("minHrsWk"),
        maxShiftDay: fd.get("maxShiftDay"),
        maxShiftWk:  fd.get("maxShiftWk"),
        minShiftWk:  fd.get("minShiftWk"),
        gapShift:    fd.get("gapShift"),
        timeOff:              fd.get("timeOff"),
        payType,
        payRate:              fd.get("payRate"),
        payRulesMode,
        payRulesPolicy:       fd.get("payRulesPolicy"),
        otRateRegular:        fd.get("otRateRegular"),
        otRateDouble:         fd.get("otRateDouble"),
        otThresholdDay:       fd.get("otThresholdDay"),
        otThresholdWeek:      fd.get("otThresholdWeek"),
        holidayRate:          fd.get("holidayRate"),
        nightDiffRate:        fd.get("nightDiffRate"),
        customPolicyEnabled:  form.querySelector("#custom-policy-cb")?.checked || false,
        customPolicyText:     fd.get("customPolicyText"),
      };
      const store = readStore();
      store[employeeId] = data;
      writeStore(store);
      applyToPage(section, data);
      close();

      const toast = document.createElement("div");
      toast.className = "emp-pol-toast";
      toast.textContent = "Employment info & policies updated successfully.";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3200);
    });
  };

  // ── Enhance: inject edit button ──────────────────────────────────────
  const enhance = () => {
    injectStyles();
    const section = findSection();

    // Cleanup: React reuses the section container across tabs, so a previously
    // injected Edit button (and its dataset flag) can leak into other sections
    // such as Actions. Drop any button that is no longer in the policies section.
    document.querySelectorAll(".emp-pol-edit-btn").forEach((stale) => {
      const owner = stale.closest("div.p-6");
      if (section && owner === section) return; // still the right section
      if (owner) delete owner.dataset.empPolEditReady;
      stale.remove();
    });

    if (!section) return;
    // Re-inject if the flag survived a re-render but the button itself is gone.
    if (section.dataset.empPolEditReady && section.querySelector(".emp-pol-edit-btn")) return;
    section.dataset.empPolEditReady = "true";

    const heading = section.querySelector("h3");
    if (!heading) return;

    const employeeId = getEmployeeId();

    // Restore saved values on load
    const saved = readStore()[employeeId];
    if (saved) applyToPage(section, saved);

    // Inject edit icon button inline with heading
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "emp-pol-edit-btn";
    btn.title = "Edit Employment Info & Policies";
    btn.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
           m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
    </svg>Edit`;
    btn.addEventListener("click", () => openModal(section, employeeId));
    heading.insertAdjacentElement("afterend", btn);
  };

  // setTimeout rather than requestAnimationFrame: rAF is throttled to a standstill in
  // background/non-fronted tabs, which would stall the stale-button cleanup.
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    setTimeout(() => { queued = false; enhance(); }, 0);
  }).observe(document.body, { childList: true, subtree: true });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true });
  else enhance();
})();
