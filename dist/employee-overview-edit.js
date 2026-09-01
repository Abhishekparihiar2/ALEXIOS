(() => {
  const STORE = "alexios.employeeOverview.v1";
  const labels = ["Employee ID", "User Type", "Title / Position", "Department", "Email", "Username", "Phone", "Status", "Added By", "Last Visit", "Address", "City / State", "ZIP Code", "Country"];
  const readStore = () => { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; } };
  const writeStore = (data) => localStorage.setItem(STORE, JSON.stringify(data));
  const esc = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const visible = (node) => !!node && !node.hidden && getComputedStyle(node).display !== "none" && getComputedStyle(node).visibility !== "hidden" && node.getClientRects().length > 0;
  let notesRetryActive = false; // IIFE-scoped so the retry loop survives across enhance() calls
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
        ${section("Activity Counters", "Overview totals displayed for this employee", ["Reports Filed", "Tours Completed", "Shifts Worked", "Skills Verified"].map((label) => `<label class="employee-overview-field"><span>${label}</span><input name="${label}" type="number" value="${esc(data.metric[label])}" disabled readonly style="background-color: #f1f5f9; color: #94a3b8; cursor: not-allowed; opacity: 0.7;"></label>`).join(""))}
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
    // ── Notes → Activity by Admin table conversion ───────────────────────
    // Only run when the notes section is actually visible on screen.
    // We use a retry loop so we wait for React to finish populating the cards
    // before we convert them — otherwise we'd stamp an empty table.
    const buildNotesTable = (wrapper) => {
      // Hide filter pill rows that sit immediately before this wrapper (scoped — no broad scan)
      const filterLabels = new Set(["All", "Notes", "Banned", "Terminated", "Reactivated", "Active", "Archived"]);
      let sib = wrapper.previousElementSibling;
      while (sib) {
        const btns = [...sib.children].filter((c) => c.tagName === "BUTTON");
        if (btns.length >= 2 && btns.every((b) => filterLabels.has(b.textContent.trim()))) {
          sib.style.display = "none";
          sib.dataset.activityFiltersHidden = "true";
        }
        sib = sib.previousElementSibling;
      }
      // Two different card shapes live in these sections — parse each correctly:
      //
      //   "Notes on Employee"  → 2 header spans: [author, date]
      //   "Activity by Admin"  → 3 header spans: [type, "date · site", status]
      //
      // Using one schema for both put the status in "Date and Time" and the activity
      // type in "Added By", so the shape is detected per card instead.
      const notesData = [];
      let kind = "notes";
      [...wrapper.children].forEach((card) => {
        if (card.tagName !== "DIV") return;
        const topRow = card.firstElementChild;
        const spans = topRow ? [...topRow.children].filter((c) => c.tagName === "SPAN") : [];
        const textEl = card.querySelector("p");
        const text = textEl ? textEl.textContent.trim() : "";
        if (spans.length >= 3) {
          kind = "activity";
          // middle span is "Jul 30, 2025 · Airport Terminal C"
          const mid = spans[1].textContent.trim();
          const sepIdx = mid.indexOf("·");
          notesData.push({
            type:   spans[0].textContent.trim(),
            date:   sepIdx >= 0 ? mid.slice(0, sepIdx).trim() : mid,
            site:   sepIdx >= 0 ? mid.slice(sepIdx + 1).trim() : "",
            status: spans[2].textContent.trim(),
            text,
          });
        } else {
          notesData.push({
            author: spans[0]?.textContent.trim() || "Unknown",
            date:   spans[1]?.textContent.trim() || "",
            text:   text || card.textContent.trim(),
          });
        }
      });

      const ACTION_CELL = `
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <button class="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-all" title="Edit">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <button class="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </td>`;

      const TH = (label) => `<th class="px-4 py-3 text-sm font-semibold text-slate-200">${label}</th>`;
      const statusPill = (s) => {
        const tone = /archiv|terminat/i.test(s) ? "text-slate-400 bg-slate-500/10"
                   : /ban/i.test(s)            ? "text-red-400 bg-red-400/10"
                   :                             "text-green-400 bg-green-400/10";
        return `<span class="text-xs font-bold px-2.5 py-1 rounded-full ${tone}">${esc(s)}</span>`;
      };
      const typePill = (t) => {
        const tone = /ban/i.test(t)      ? "text-red-400 bg-red-400/10"
                   : /terminat/i.test(t) ? "text-orange-400 bg-orange-400/10"
                   : /reactiv/i.test(t)  ? "text-green-400 bg-green-400/10"
                   :                       "text-blue-400 bg-blue-400/10";
        return `<span class="text-xs font-bold px-2.5 py-1 rounded-lg ${tone}">${esc(t)}</span>`;
      };

      const headRow = kind === "activity"
        ? TH("Date &amp; Time") + TH("Activity Type") + TH("Activity Details") + TH("Site") + TH("Status") + TH("Actions")
        : TH("Note") + TH("Note Type") + TH("Category") + TH("Date and Time") + TH("Added By") + TH("Attachment") + TH("Actions");
      const colCount = kind === "activity" ? 6 : 7;
      const emptyMsg = kind === "activity" ? "No admin activity found for this employee." : "No notes found for this employee.";

      // Activity rows carry data-type / data-status / data-search so the filter bar
      // can show and hide them client-side without rebuilding the table.
      const bodyRows = notesData.map((n) => kind === "activity" ? `
        <tr class="hover:bg-slate-800/30 transition-colors activity-row"
            data-type="${esc((n.type || "").toLowerCase())}"
            data-status="${esc((n.status || "").toLowerCase())}"
            data-search="${esc([n.type, n.text, n.site, n.date, n.status].join(" ").toLowerCase())}">
          <td class="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">${esc(n.date)}</td>
          <td class="px-4 py-3">${typePill(n.type)}</td>
          <td class="px-4 py-3 text-sm text-slate-300 max-w-md" title="${esc(n.text)}">${esc(n.text)}</td>
          <td class="px-4 py-3 text-sm text-slate-400">${esc(n.site) || "—"}</td>
          <td class="px-4 py-3">${statusPill(n.status)}</td>
          ${ACTION_CELL}
        </tr>` : `
        <tr class="hover:bg-slate-800/30 transition-colors">
          <td class="px-4 py-3 text-sm text-slate-300 max-w-md" title="${esc(n.text)}">${esc(n.text)}</td>
          <td class="px-4 py-3 text-sm text-slate-400">HR</td>
          <td class="px-4 py-3 text-sm text-slate-400">General</td>
          <td class="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">${esc(n.date)}</td>
          <td class="px-4 py-3 text-sm text-blue-400 font-medium">${esc(n.author)}</td>
          <td class="px-4 py-3 text-sm text-slate-500">None</td>
          ${ACTION_CELL}
        </tr>`).join("");
      // CRITICAL: never replace wrapper.innerHTML — React still tracks those card
      // nodes in its fiber tree and will throw NotFoundError on removeChild when the
      // user navigates away, unmounting the whole app (black screen).
      // Instead: hide React's cards (nodes stay intact) and append our table as a sibling.
      wrapper.style.display = "none";
      const host = document.createElement("div");
      host.dataset.notesTableHost = "true";
      host.__alexiosWrapper = wrapper; // keep a handle so cleanup can restore it
      host.dataset.tableKind = kind;
      // Record which section variant this table was built from, so cleanup can tell
      // Notes-vs-Activity apart inside the same reused container.
      host.dataset.srcKey = sectionKey(wrapper.closest("div.p-6") || wrapper.parentElement);
      // Filter bar — activity section only. Lives inside our host (never in React's
      // tree), and replaces the original React pill rows which we keep hidden.
      const TYPE_TABS = ["All", "Banned", "Terminated", "Reactivated", "Notes"];
      const filterBar = kind !== "activity" ? "" : `
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div class="inline-flex flex-wrap gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800" data-activity-typefilter>
            ${TYPE_TABS.map((t, i) => `
              <button type="button" data-type-tab="${t.toLowerCase()}"
                class="px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${i === 0
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"}">${t}</button>`).join("")}
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <div class="relative">
              <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="search" data-activity-search placeholder="Search activity…"
                class="pl-9 pr-3 py-2 w-52 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500">
            </div>
            <select data-activity-statusfilter
              class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500">
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <div class="text-xs text-slate-500 mb-2" data-activity-count></div>`;

      host.innerHTML = `
        <div class="w-full mt-4">
          ${filterBar}
          <div class="overflow-x-auto w-full">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-800/50 border-b border-slate-700">${headRow}</tr>
              </thead>
              <tbody class="divide-y divide-slate-700/50">
                ${notesData.length ? bodyRows
                  : `<tr><td colspan="${colCount}" class="px-4 py-8 text-center text-sm text-slate-500">${emptyMsg}</td></tr>`}
              </tbody>
            </table>
          </div>
        </div>`;
      wrapper.insertAdjacentElement("afterend", host);

      // ── Filter wiring (activity only) ──────────────────────────────────
      if (kind === "activity" && notesData.length) {
        const tbody = host.querySelector("tbody");
        const countEl = host.querySelector("[data-activity-count]");
        const searchEl = host.querySelector("[data-activity-search]");
        const statusEl = host.querySelector("[data-activity-statusfilter]");
        const typeBtns = [...host.querySelectorAll("[data-type-tab]")];
        let activeType = "all";

        const NO_MATCH_ROW = `<tr data-activity-nomatch><td colspan="${colCount}" class="px-4 py-8 text-center text-sm text-slate-500">No activity matches the selected filters.</td></tr>`;

        const applyFilters = () => {
          const q = (searchEl.value || "").trim().toLowerCase();
          const status = statusEl.value;
          const rows = [...tbody.querySelectorAll("tr.activity-row")];
          let shown = 0;
          rows.forEach((tr) => {
            // "Notes" tab matches the note-type entries; other tabs match their type.
            const typeOk = activeType === "all" || tr.dataset.type === activeType ||
                           (activeType === "notes" && /note/.test(tr.dataset.type));
            const statusOk = status === "all" || tr.dataset.status === status;
            const searchOk = !q || (tr.dataset.search || "").includes(q);
            const show = typeOk && statusOk && searchOk;
            tr.style.display = show ? "" : "none";
            if (show) shown += 1;
          });
          host.querySelector("[data-activity-nomatch]")?.remove();
          if (shown === 0) tbody.insertAdjacentHTML("beforeend", NO_MATCH_ROW);
          countEl.textContent = `Showing ${shown} of ${rows.length} activit${rows.length === 1 ? "y" : "ies"}`;
        };

        typeBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            activeType = btn.dataset.typeTab;
            typeBtns.forEach((b) => {
              const on = b === btn;
              b.className = `px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${on
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"}`;
            });
            applyFilters();
          });
        });
        searchEl.addEventListener("input", applyFilters);
        statusEl.addEventListener("change", applyFilters);
        // Re-run filters after an inline edit or delete changes the rows
        host.addEventListener("activity:refilter", applyFilters);
        applyFilters();
      }
      host.addEventListener("click", (e) => {
        const btn = e.target.closest("button[title='Edit'], button[title='Delete']");
        if (!btn) return;
        const tr = btn.closest("tr");
        if (!tr) return;
        const isActivity = kind === "activity";
        if (btn.title === "Delete") {
          if (confirm(isActivity ? "Delete this activity entry?" : "Delete this note?")) {
            tr.remove();
            const tbody = host.querySelector("tbody");
            const remaining = tbody ? tbody.querySelectorAll("tr.activity-row, tr:not([data-activity-nomatch])").length : 0;
            if (tbody && remaining === 0) {
              tbody.innerHTML = `<tr><td colspan="${colCount}" class="px-4 py-8 text-center text-sm text-slate-500">${emptyMsg}</td></tr>`;
            } else if (isActivity) {
              host.dispatchEvent(new CustomEvent("activity:refilter"));
            }
          }
          return;
        }

        const cells = tr.querySelectorAll("td");
        if (cells.length < colCount) return;

        const FIELD = (label, inner) =>
          `<div><label class="block text-xs font-semibold mb-1.5 text-slate-400 uppercase tracking-wider">${label}</label>${inner}</div>`;
        const SEL = (name, opts, cur) =>
          `<select name="${name}" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500">${opts.map((o) => `<option${o === cur ? " selected" : ""}>${o}</option>`).join("")}</select>`;
        const TXT = (name, val) =>
          `<textarea name="${name}" rows="4" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 resize-none">${esc(val)}</textarea>`;
        const RO = (val) =>
          `<input type="text" value="${esc(val)}" disabled class="w-full px-3 py-2 bg-slate-800/50 border border-slate-800 rounded-lg text-sm text-slate-500 cursor-not-allowed">`;
        const FILE = `<input type="file" name="attachment" class="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700">`;

        let title, body;
        if (isActivity) {
          // cells: [date, type, details, site, status, actions]
          title = "Edit Activity";
          body =
            FIELD("Activity Type", SEL("type", ["Notes", "Banned", "Terminated", "Reactivated"], cells[1].textContent.trim())) +
            FIELD("Status", SEL("status", ["Active", "Archived"], cells[4].textContent.trim())) +
            FIELD("Activity Details", TXT("text", cells[2].textContent.trim())) +
            FIELD("Site", RO(cells[3].textContent.trim())) +
            FIELD("Date &amp; Time", RO(cells[0].textContent.trim()));
        } else {
          // cells: [note, noteType, category, date, addedBy, attachment, actions]
          title = "Edit Note";
          body =
            FIELD("Note Type", SEL("type", ["HR", "Management", "Compliance", "Operations", "Other"], cells[1].textContent.trim())) +
            FIELD("Category", SEL("category", ["General", "Commendation", "Disciplinary", "Medical", "Safety", "Other"], cells[2].textContent.trim())) +
            FIELD("Note", TXT("text", cells[0].textContent.trim())) +
            FIELD("Attachment", FILE) +
            FIELD("Added By", RO(cells[4].textContent.trim()));
        }

        const modal = document.createElement("div");
        modal.className = "fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm";
        modal.innerHTML = `<form class="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <header class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
            <h3 class="text-lg font-bold text-white">${title}</h3>
            <button type="button" class="text-slate-400 hover:text-white transition-colors close-note-modal"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
          </header>
          <div class="p-6 space-y-4">${body}</div>
          <footer class="px-6 py-4 border-t border-slate-800 bg-slate-800/50 flex justify-end gap-3">
            <button type="button" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors close-note-modal">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors">Save Changes</button>
          </footer>
        </form>`;
        document.body.appendChild(modal);
        const closeModal = () => modal.remove();
        modal.querySelectorAll(".close-note-modal").forEach((b) => b.addEventListener("click", closeModal));
        modal.querySelector("form").addEventListener("submit", (ev) => {
          ev.preventDefault();
          const fd = new FormData(ev.target);
          if (isActivity) {
            const newType = fd.get("type"), newStatus = fd.get("status"), newText = fd.get("text");
            cells[1].innerHTML = typePill(newType);
            cells[2].textContent = newText; cells[2].title = newText;
            cells[4].innerHTML = statusPill(newStatus);
            // Keep the row's filter/search attributes in sync with the edit
            tr.dataset.type = String(newType).toLowerCase();
            tr.dataset.status = String(newStatus).toLowerCase();
            tr.dataset.search = [newType, newText, cells[3].textContent.trim(), cells[0].textContent.trim(), newStatus]
              .join(" ").toLowerCase();
            host.dispatchEvent(new CustomEvent("activity:refilter"));
          } else {
            cells[0].textContent = fd.get("text"); cells[0].title = fd.get("text");
            cells[1].textContent = fd.get("type");
            cells[2].textContent = fd.get("category");
          }
          closeModal();
        });
      });
    };

    // Notes section: detect by heading (original OR already-renamed text)
    // so the section is always caught regardless of which observer fire we're on.
    // Both note sections get the table view. Headings are left as React renders them
    // ("Notes on Employee" stays; the nav tab rename for "Notes by Employee" is handled separately).
    const NOTES_HEADING = new Set(["Notes by Employee", "Notes on Employee", "Activity by Admin"]);

    // Cleanup: React reuses section containers when switching tabs. If a table host
    // now sits in a section that is no longer a notes section, remove it and restore
    // the wrapper we hid — otherwise the notes table leaks into other tabs and the
    // real content stays invisible (our inline display:none survives React re-renders).
    // (cleanup runs after the detection helpers are defined — see below)

    // Filter-pill labels used by the "Activity by Admin" section (it has no <h3>).
    const FILTER_LABELS = new Set(["All", "Notes", "Banned", "Terminated", "Reactivated", "Active", "Archived"]);
    // The filter container nests its pills one level deeper (DIV > DIV > BUTTONs),
    // so match on DESCENDANT buttons rather than direct children.
    const isFilterRow = (el) => {
      if (!el || el.tagName !== "DIV") return false;
      const btns = [...el.querySelectorAll("button")];
      return btns.length >= 2 && btns.every((b) => FILTER_LABELS.has(b.textContent.trim()));
    };

    // Single source of truth for "which visible section is a notes/activity section".
    // Detection must be INDEX-AGNOSTIC: other patch scripts inject an "Edit" <button>
    // as child 0, which shifts positions. And the "Activity by Admin" section has no
    // <h3> at all — it is identified by its filter-pill row instead.
    // Works before AND after our own mutations (a hidden filter row still matches).
    const detectNotesSection = () => {
      const sections = [...document.querySelectorAll("div.p-6")].filter((d) => visible(d));
      for (const sec of sections) {
        const h3 = [...sec.querySelectorAll("h3")].find((x) => NOTES_HEADING.has(x.textContent.trim()));
        if (h3) return { sectionRoot: sec, headerEl: [...sec.children].find((c) => c.contains(h3)) };
        const pills = [...sec.children].find((c) => isFilterRow(c));
        if (pills) return { sectionRoot: sec, headerEl: pills };
      }
      return null;
    };

    // "Notes on Employee" and "Activity by Admin" are DIFFERENT sections that React
    // renders into the SAME reused div.p-6. Identifying a section as merely "a notes
    // section" is therefore not enough — without this key, switching between the two
    // tabs leaves the first section's table (and its data) showing on the second.
    // Notes has an <h3> and no filter pills; Activity has pills and no <h3>.
    const sectionKey = (sec) => {
      if (!sec) return "";
      const h3 = [...sec.querySelectorAll("h3")].find((x) => NOTES_HEADING.has(x.textContent.trim()));
      const hasPills = [...sec.children].some((c) => isFilterRow(c));
      return `${h3 ? h3.textContent.trim() : ""}|${hasPills}`;
    };

    // Cleanup: React reuses section containers when switching tabs. Remove any table
    // host that is no longer inside the current notes/activity section, and restore
    // whatever we hid — otherwise the table leaks into other tabs and real content
    // stays invisible (our inline display:none survives React re-renders).
    const activeNotes = detectNotesSection();
    [...document.querySelectorAll("[data-notes-table-host]")].forEach((host) => {
      const secRoot = host.closest("div.p-6") || host.parentElement;
      // Keep only if this is still the active notes section AND the section still holds
      // the same kind of content the table was built from.
      if (secRoot && activeNotes && secRoot === activeNotes.sectionRoot &&
          host.dataset.srcKey === sectionKey(secRoot)) return;
      const w = host.__alexiosWrapper;
      if (w && w.style.display === "none") w.style.display = "";
      if (secRoot) {
        [...secRoot.querySelectorAll("[data-activity-filters-hidden]")].forEach((f) => {
          f.style.display = "";
          delete f.dataset.activityFiltersHidden;
        });
      }
      host.remove();
    });

    // Attempt the conversion. Returns true when the table was built (or already exists,
    // or we're not on a notes section); false when the section is present but React
    // hasn't rendered the cards yet (caller should retry).
    const tryConvertNotes = () => {
      const found = detectNotesSection();
      if (!found) return true; // not on a notes/activity section
      const { sectionRoot, headerEl } = found;
      if (sectionRoot.querySelector("[data-notes-table-host]")) return true; // already built

      // The cards wrapper is the last DIV child that is neither the header nor our host.
      const candidates = [...sectionRoot.children].filter(
        (c) => c.tagName === "DIV" && c !== headerEl && !c.dataset.notesTableHost && !isFilterRow(c)
      );
      const w = candidates[candidates.length - 1] || null;
      if (!w) return false; // not rendered yet — retry
      const hasContent = [...w.children].some((c) => c.textContent.trim().length > 2);
      if (!hasContent) return false; // cards not rendered yet — retry

      // Hide the filter pill row (Activity by Admin) before building
      [...sectionRoot.children].forEach((c) => {
        if (isFilterRow(c)) { c.style.display = "none"; c.dataset.activityFiltersHidden = "true"; }
      });
      buildNotesTable(w);
      return true;
    };

    // Run immediately; if React hasn't committed the cards yet, retry a few times.
    // A standalone scheduler is required because we cannot rely on further DOM
    // mutations arriving to re-trigger enhance().
    if (!tryConvertNotes() && !notesRetryActive) {
      notesRetryActive = true;
      let attempts = 0;
      const tick = () => {
        attempts += 1;
        if (tryConvertNotes() || attempts >= 12) { notesRetryActive = false; return; }
        setTimeout(tick, 100);
      };
      setTimeout(tick, 60);
    }
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
          if (heading.textContent.trim() === "Add Note" && modal && !modal.querySelector('[data-add-note-fields]')) {
            const textarea = modal.querySelector("textarea");
            const noteField = textarea?.closest("div");
            if (noteField) {
              const newFields = document.createElement("div"); newFields.dataset.addNoteFields = "true";
              newFields.innerHTML = '<div class="mb-4"><label class="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-300">Category</label><select name="category" required class="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-black text-slate-900 dark:text-slate-100 focus:border-blue-500"><option value="" disabled selected>Select Category</option><option>General</option><option>Commendation</option><option>Disciplinary</option><option>Medical</option><option>Safety</option><option>Other</option></select></div><div class="mb-4"><label class="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-300">Attachment</label><input type="file" name="attachment" class="w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-800 dark:file:text-slate-300"></div>';
              noteField.insertAdjacentElement("beforebegin", newFields);
            }
          }
        }
      });
    }
    // Rename the nav tab "Notes by Employee" → "Activity by Admin"
    // Only target leaf spans (nav labels) — do NOT rename "Notes on Employee" which is a section heading
    [...document.querySelectorAll("span")].forEach((node) => {
      if (!node.childElementCount && node.textContent.trim() === "Notes by Employee" && visible(node)) {
        node.textContent = "Activity by Admin";
      }
    });

    // (Filter pill hiding is now handled inside buildNotesTable — no broad scan here)

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

  // setTimeout rather than requestAnimationFrame: rAF is throttled to a standstill in
  // background/non-fronted tabs, which stalls the cleanup + rebuild passes and lets a
  // stale table linger in the wrong section.
  let queued = false; new MutationObserver(() => { if (queued) return; queued = true; setTimeout(() => { queued = false; enhance(); }, 0); }).observe(document.body, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance, { once: true }); else enhance();
})();
