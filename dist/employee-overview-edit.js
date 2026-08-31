(() => {
  const STORE = "alexios.employeeOverview.v1";
  const labels = ["Employee ID", "User Type", "Title / Position", "Department", "Email", "Username", "Phone", "Status", "Added By", "Last Visit", "Address", "City / State", "ZIP Code", "Country"];
  const readStore = () => { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; } };
  const writeStore = (data) => localStorage.setItem(STORE, JSON.stringify(data));
  const esc = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const visible = (node) => !!node && !node.hidden && getComputedStyle(node).display !== "none" && getComputedStyle(node).visibility !== "hidden" && node.getClientRects().length > 0;
  const overviewIsActive = () => [...document.querySelectorAll("button")].some((button) => {
    if (button.textContent.trim() !== "Overview" || !visible(button)) return false;
    const style = `${button.className} ${button.getAttribute("style") || ""}`;
    return /blue|active|selected/i.test(style) || button.getAttribute("aria-current") === "page" || button.getAttribute("aria-selected") === "true";
  });
  const overviewRoot = () => {
    if (!overviewIsActive()) return null;
    return [...document.querySelectorAll("div.p-6.space-y-6")]
      .find((node) => visible(node) && node.textContent.includes("Employee ID") && node.textContent.includes("Portal Access") && node.textContent.includes("Reports Filed"));
  };

  const cards = (root) => {
    const result = {};
    root.querySelectorAll("div").forEach((node) => {
      const first = node.firstElementChild;
      if (!first || !labels.includes(first.textContent.trim()) || node.children.length < 2) return;
      result[first.textContent.trim()] = { card: node, valueNode: node.children[1], value: node.children[1].textContent.trim() };
    });
    return result;
  };

  const snapshot = (root) => {
    const found = cards(root);
    const heroName = root.querySelector(".text-lg.font-bold")?.textContent.trim() || "";
    const parts = heroName.split(/\s+/);
    const metric = {};
    ["Reports Filed", "Tours Completed", "Shifts Worked", "Skills Verified"].forEach((label) => {
      const labelNode = [...root.querySelectorAll("div")].find((node) => node.children.length === 0 && node.textContent.trim() === label);
      metric[label] = labelNode?.previousElementSibling?.textContent.trim() || "0";
    });
    const portal = {};
    ["Admin Portal", "Guard Mobile App", "Supervisor View"].forEach((label) => {
      const node = [...root.querySelectorAll("span")].find((span) => span.textContent.trim() === label);
      portal[label] = node?.previousElementSibling?.style.backgroundColor !== "rgb(71, 85, 105)";
    });
    return {
      firstName: parts[0] || "", middleName: parts.length > 2 ? parts.slice(1, -1).join(" ") : "", lastName: parts.at(-1) || "",
      fields: Object.fromEntries(labels.map((label) => [label, found[label]?.value || ""])), metric, portal
    };
  };

  const input = (name, label, value, type = "text", required = false) => `<label class="employee-overview-field"><span>${label}${required ? " *" : ""}</span><input name="${name}" type="${type}" value="${esc(value)}" ${required ? "required" : ""}></label>`;
  const select = (name, label, value, options) => `<label class="employee-overview-field"><span>${label}</span><select name="${name}">${options.map((option) => `<option${option === value ? " selected" : ""}>${esc(option)}</option>`).join("")}</select></label>`;
  const section = (title, subtitle, body) => `<section class="employee-overview-section"><header><h3>${title}</h3><p>${subtitle}</p></header><div class="employee-overview-grid">${body}</div></section>`;

  const editor = (data) => `
    <form class="employee-overview-editor">
      <div class="employee-overview-toolbar"><div><small>EMPLOYEE OVERVIEW</small><h2>Edit Overview</h2><p>Update employee identity, contact, access, and activity information.</p></div><div><button type="button" data-overview-cancel>Cancel</button><button type="submit">Save Changes</button></div></div>
      <div class="employee-overview-error" role="alert" hidden></div>
      <div class="employee-overview-sections">
        ${section("Identity", "Employee name and system identifiers", input("firstName", "First Name", data.firstName, "text", true) + input("middleName", "Middle Name", data.middleName) + input("lastName", "Last Name", data.lastName, "text", true) + input("Employee ID", "Employee ID", data.fields["Employee ID"], "text", true) + input("Username", "Username", data.fields.Username, "text", true))}
        ${section("Employment", "Role, department, and current status", select("User Type", "User Type", data.fields["User Type"], ["Guard", "Employee", "Supervisor", "Admin", "Contractor", "Part-Time"]) + input("Title / Position", "Title / Position", data.fields["Title / Position"], "text", true) + select("Department", "Department", data.fields.Department, ["Operations", "Security", "Administration", "Field Services", "Training", "Payroll"]) + select("Status", "Status", data.fields.Status, ["Active", "Inactive", "On Leave", "Terminated"]) + input("Added By", "Added By", data.fields["Added By"]) + input("Last Visit", "Last Visit", data.fields["Last Visit"]))}
        ${section("Contact & Address", "Communication and location details", input("Email", "Email", data.fields.Email, "email", true) + input("Phone", "Phone", data.fields.Phone, "tel") + `<label class="employee-overview-field employee-overview-wide"><span>Address</span><input name="Address" value="${esc(data.fields.Address)}"></label>` + input("City / State", "City / State", data.fields["City / State"]) + input("ZIP Code", "ZIP Code", data.fields["ZIP Code"]) + input("Country", "Country", data.fields.Country))}
        ${section("Portal Access", "Application access available to this employee", ["Admin Portal", "Guard Mobile App", "Supervisor View"].map((label) => `<label class="employee-access-toggle"><input type="checkbox" name="${label}" ${data.portal[label] ? "checked" : ""}><span>${label}</span></label>`).join(""))}
        ${section("Activity Counters", "Overview totals displayed for this employee", ["Reports Filed", "Tours Completed", "Shifts Worked", "Skills Verified"].map((label) => input(label, label, data.metric[label], "number")).join(""))}
      </div>
      <footer class="employee-overview-footer"><button type="button" data-overview-cancel>Cancel</button><button type="submit">Save Changes</button></footer>
    </form>`;

  const applyData = (root, data) => {
    const found = cards(root);
    Object.entries(data.fields).forEach(([label, value]) => { if (found[label]) found[label].valueNode.textContent = value; });
    const fullName = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");
    const heroName = root.querySelector(".text-lg.font-bold"); if (heroName) heroName.textContent = fullName;
    const pageHeader = [...document.querySelectorAll("h2")].find((node) => node.textContent.includes(data.lastName) || node.parentElement?.textContent.includes(data.fields["Employee ID"]));
    if (pageHeader) pageHeader.textContent = fullName;
    Object.entries(data.metric).forEach(([label, value]) => { const node = [...root.querySelectorAll("div")].find((item) => item.children.length === 0 && item.textContent.trim() === label); if (node?.previousElementSibling) node.previousElementSibling.textContent = value; });
    Object.entries(data.portal).forEach(([label, enabled]) => { const node = [...root.querySelectorAll("span")].find((span) => span.textContent.trim() === label); if (node) { node.style.color = enabled ? "#16a34a" : "#94a3b8"; if (node.previousElementSibling) node.previousElementSibling.style.background = enabled ? "#16a34a" : "#475569"; } });
  };

  const openEditor = (root) => {
    const original = [...root.children]; const current = snapshot(root); const employeeKey = current.fields["Employee ID"] || "employee";
    original.forEach((node) => { node.hidden = true; });
    const shell = document.createElement("div"); shell.innerHTML = editor(current); const form = shell.firstElementChild; root.appendChild(form);
    const close = () => { form.remove(); original.forEach((node) => { node.hidden = false; }); };
    form.querySelectorAll("[data-overview-cancel]").forEach((button) => button.addEventListener("click", close));
    form.addEventListener("submit", (event) => {
      event.preventDefault(); const values = Object.fromEntries(new FormData(form).entries()); const error = form.querySelector(".employee-overview-error");
      if (!values.firstName?.trim() || !values.lastName?.trim() || !values["Employee ID"]?.trim() || !values.Email?.trim() || !values["Title / Position"]?.trim()) { error.textContent = "Complete first name, last name, employee ID, title, and email before saving."; error.hidden = false; return; }
      const updated = { firstName: values.firstName.trim(), middleName: values.middleName.trim(), lastName: values.lastName.trim(), fields: Object.fromEntries(labels.map((label) => [label, String(values[label] ?? current.fields[label]).trim()])), metric: Object.fromEntries(["Reports Filed", "Tours Completed", "Shifts Worked", "Skills Verified"].map((label) => [label, values[label] || "0"])), portal: Object.fromEntries(["Admin Portal", "Guard Mobile App", "Supervisor View"].map((label) => [label, form.elements[label].checked])) };
      const store = readStore(); store[employeeKey] = updated; writeStore(store); close(); applyData(root, updated);
      const notice = document.createElement("div"); notice.className = "employee-overview-success"; notice.textContent = "Employee overview updated successfully."; root.prepend(notice); setTimeout(() => notice.remove(), 3500);
    });
  };

  const enhance = () => {
    [...document.querySelectorAll("h3")].filter((heading) => heading.textContent.trim() === "Assigned Sites" && visible(heading)).forEach((heading) => {
      const sectionRoot = heading.closest("div.p-6") || heading.parentElement?.parentElement;
      const table = sectionRoot?.querySelector("table");
      if (table) {
        const headers = [...table.querySelectorAll("thead th")];
        const rateDateIndex = headers.findIndex((cell) => cell.textContent.trim() === "Eff. Rate Date");
        if (rateDateIndex >= 0) {
          table.querySelectorAll("tr").forEach((row) => row.children[rateDateIndex]?.remove());
        }
        const currentHeaders = [...table.querySelectorAll("thead th")];
        if (!currentHeaders.some((cell) => cell.textContent.trim() === "Job Type")) {
          const jobHeader = document.createElement("th"); jobHeader.className = currentHeaders[0]?.className || ""; jobHeader.textContent = "Job Type";
          currentHeaders[0]?.insertAdjacentElement("afterend", jobHeader);
          const jobTypes = ["Day Shift Guard", "Night Patrol Officer"];
          table.querySelectorAll("tbody tr").forEach((row, index) => {
            const jobCell = document.createElement("td"); jobCell.className = row.children[0]?.className || ""; jobCell.textContent = jobTypes[index] || "Security Officer";
            row.children[0]?.insertAdjacentElement("afterend", jobCell);
          });
        }
        table.querySelectorAll("button").forEach((button) => {
          if (button.textContent.trim() === "Make Primary") button.remove();
        });
      }
    });
    const onEmployeeDetail = [...document.querySelectorAll("button, a")].some((node) => node.textContent.trim() === "Back to Employees" && visible(node));
    if (onEmployeeDetail) {
      const employeeDialogs = ["Assign Site", "Ban Site", "Add Emergency Contact", "Add Note"];
      document.querySelectorAll(".fixed.inset-0.z-50 h3").forEach((heading) => {
        if (employeeDialogs.includes(heading.textContent.trim())) {
          const modal = heading.closest(".fixed.inset-0.z-50"); modal?.classList.add("employee-detail-modal-theme");
          if (heading.textContent.trim() === "Assign Site" && modal && !modal.querySelector('[data-assign-job-type]')) {
            const siteSelect = [...modal.querySelectorAll("select")][0]; const siteField = siteSelect?.closest("div");
            if (siteField) {
              const jobField = document.createElement("div"); jobField.dataset.assignJobType = "true";
              jobField.innerHTML = '<label class="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-300">Job Type</label><select name="jobType" required class="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 focus:border-blue-500"><option value="" disabled selected>Select Job Type</option><option>Day Shift Guard</option><option>Night Patrol Officer</option><option>Weekend Supervisor</option><option>Security Officer</option></select>';
              siteField.insertAdjacentElement("afterend", jobField);
            }
          }
          if (heading.textContent.trim() === "Add Emergency Contact" && modal && !modal.querySelector('[data-contact-primary]')) {
            const fields = modal.querySelectorAll("select"); const statusField = fields[fields.length - 1]?.closest("div");
            if (statusField) {
              const primaryField = document.createElement("div"); primaryField.dataset.contactPrimary = "true";
              primaryField.innerHTML = '<label class="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-300">Make Primary</label><select name="isPrimary" class="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 focus:border-blue-500"><option value="No" selected>No</option><option value="Yes">Yes</option></select>';
              statusField.insertAdjacentElement("afterend", primaryField);
            }
          }
        }
      });
    }
    document.querySelectorAll(".employee-overview-edit-button").forEach((button) => {
      if (!overviewIsActive() || !visible(button.closest("div.p-6.space-y-6"))) {
        const owner = button.closest("div.p-6.space-y-6");
        if (owner) delete owner.dataset.overviewEditReady;
        button.remove();
      }
    });
    const root = overviewRoot(); if (!root) return;
    if (root.dataset.overviewEditReady === "true" && root.querySelector(".employee-overview-edit-button")) return;
    root.dataset.overviewEditReady = "true";
    const current = snapshot(root); const saved = readStore()[current.fields["Employee ID"]]; if (saved) applyData(root, saved);
    const hero = root.firstElementChild; const button = document.createElement("button"); button.type = "button"; button.className = "employee-overview-edit-button"; button.textContent = "Edit Overview"; button.addEventListener("click", () => openEditor(root)); hero.appendChild(button);
  };

  let queued = false; new MutationObserver(() => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; enhance(); }); }).observe(document.body, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true }); else enhance();
})();
