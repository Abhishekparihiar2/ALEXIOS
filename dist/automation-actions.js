(() => {
    // Action catalogue for "Then do this" on the Create Automation page.
    const actions = {
        "Communication": [
            "Send message to group",
            "Send message to user",
            "Send SMS",
            "Make notification call",
            "Send email"
        ],
        "Forms": [
            "Assign form"
        ],
        "Quick tasks": [
            "Create task"
        ],
        "Time off": [
            "Create time off request",
            "Grant time off balance"
        ]
    };

    const categoryOf = (action) =>
        Object.keys(actions).find((cat) => actions[cat].includes(action)) || "";

    const groups = ["All Employees", "Security Officers", "Supervisors", "Mobile Patrol", "Downtown Financial Team", "Westfield Mall Team"];
    const users = ["J. Rivera", "M. Chen", "T. Williams", "A. Okafor", "D. Patel", "L. Santos"];
    const recipients = ["Triggering Employee", "Site Supervisor", "Admin", "Selected User"];
    const forms = ["Incident Report", "Daily Activity Report", "Vehicle Inspection", "Visitor Log", "Maintenance Request"];
    const policies = ["Paid Time Off", "Sick Leave", "Unpaid Leave", "Bereavement", "Jury Duty"];

    // Fields rendered per action type. `half: true` puts two fields on one row.
    const fields = {
        "Send message to group": [
            { label: "Group", type: "select", options: groups, required: true },
            { label: "Message Title", type: "text", placeholder: "e.g., Late shift alert" },
            { label: "Message", type: "textarea", placeholder: "Message sent to the group…" }
        ],
        "Send message to user": [
            { label: "Recipient", type: "select", options: recipients.concat(users), required: true },
            { label: "Message Title", type: "text", placeholder: "e.g., Late shift alert" },
            { label: "Message", type: "textarea", placeholder: "Message sent to the user…" }
        ],
        "Send SMS": [
            { label: "Recipient", type: "select", options: recipients.concat(users), required: true, half: true },
            { label: "Mobile Number", type: "text", placeholder: "Use profile number if blank", half: true },
            { label: "SMS Message", type: "textarea", placeholder: "Keep under 160 characters…" }
        ],
        "Make notification call": [
            { label: "Recipient", type: "select", options: recipients.concat(users), required: true, half: true },
            { label: "Retry Attempts", type: "number", value: "2", half: true },
            { label: "Call Message", type: "textarea", placeholder: "Message read out on the call…" }
        ],
        "Send email": [
            { label: "Recipient", type: "select", options: recipients.concat(users), required: true, half: true },
            { label: "Email Address", type: "text", placeholder: "Use profile email if blank", half: true },
            { label: "Subject", type: "text", placeholder: "e.g., Late shift notification" },
            { label: "Email Body", type: "textarea", placeholder: "Email content…" }
        ],
        "Assign form": [
            { label: "Form", type: "select", options: forms, required: true, half: true },
            { label: "Assign To", type: "select", options: recipients.concat(users), required: true, half: true },
            { label: "Due", type: "select", options: ["Immediately", "Within 1 hour", "Within 4 hours", "End of shift", "End of day"], half: true },
            { label: "Due Date", type: "date", half: true }
        ],
        "Create task": [
            { label: "Task Title", type: "text", placeholder: "e.g., Verify guard location", required: true },
            { label: "Assign To", type: "select", options: recipients.concat(users), required: true, half: true },
            { label: "Due Date", type: "date", half: true },
            { label: "Description", type: "textarea", placeholder: "What needs to be done…" }
        ],
        "Create time off request": [
            { label: "Employee", type: "select", options: recipients.concat(users), required: true, half: true },
            { label: "Time Off Policy", type: "select", options: policies, required: true, half: true },
            { label: "Start Date", type: "date", half: true },
            { label: "End Date", type: "date", half: true },
            { label: "Note", type: "textarea", placeholder: "Reason or note…" }
        ],
        "Grant time off balance": [
            { label: "Employee", type: "select", options: recipients.concat(users), required: true, half: true },
            { label: "Time Off Policy", type: "select", options: policies, required: true, half: true },
            { label: "Amount", type: "number", value: "8", half: true },
            { label: "Unit", type: "select", options: ["Hours", "Days"], half: true },
            { label: "Effective Date", type: "date", half: true },
            { label: "Note", type: "textarea", placeholder: "Reason or note…" }
        ]
    };

    const icons = {
        "Communication": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
        "Forms": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>',
        "Quick tasks": '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
        "Time off": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>'
    };

    const svg = (body, size) =>
        `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

    const escapeHtml = (value) =>
        String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

    if (!document.getElementById("automation-actions-style")) {
        const style = document.createElement("style");
        style.id = "automation-actions-style";
        style.textContent = `
            .ax-overlay { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(0,0,0,0.76); backdrop-filter: blur(8px); }
            .ax-dialog { width: min(600px, 100%); max-height: 90vh; display: flex; flex-direction: column; background: #111; border: 1px solid #334155; border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,0.6); color: #e2e8f0; }
            .ax-head { padding: 20px 24px; border-bottom: 1px solid #262626; display: flex; justify-content: space-between; align-items: center; }
            .ax-head h3 { margin: 0; color: #fff; font-size: 18px; font-weight: 700; }
            .ax-close { background: transparent; border: none; color: #94a3b8; font-size: 24px; cursor: pointer; line-height: 1; padding: 0; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 6px; }
            .ax-close:hover { background: #1e293b; color: #fff; }
            .ax-search-bar { padding: 16px 24px; border-bottom: 1px solid #262626; }
            .ax-search-bar input { width: 100%; padding: 10px 14px; background: #000; border: 1px solid #334155; border-radius: 8px; color: #e2e8f0; outline: none; font-size: 14px; }
            .ax-search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.13); }
            .ax-body { padding: 16px 24px; overflow-y: auto; flex: 1; }
            .ax-category { margin-bottom: 24px; }
            .ax-category:last-child { margin-bottom: 0; }
            .ax-cat-title { margin: 0 0 12px; color: #94a3b8; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
            .ax-options { display: grid; grid-template-columns: 1fr; gap: 8px; }
            .ax-option { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: #1a1a1a; border: 1px solid #262626; border-radius: 8px; cursor: pointer; transition: background 0.15s, border-color 0.15s; color: #e2e8f0; font-size: 14px; font-weight: 500; }
            .ax-option:hover { background: #1e293b; border-color: #3b82f6; color: #fff; }
            .ax-option svg { color: #94a3b8; flex-shrink: 0; }
            .ax-option:hover svg { color: #60a5fa; }
            .ax-empty { padding: 24px 0; color: #64748b; font-size: 13px; text-align: center; }

            /* The page ships a pre-filled Push Notification action. Start blank
               and show only the actions added through the picker. */
            [data-ax-actions] > div:not(.ax-card) { display: none !important; }
        `;
        document.head.appendChild(style);
    }

    const showActionPicker = (onSelect) => {
        const overlay = document.createElement("div");
        overlay.className = "ax-overlay";

        const dialog = document.createElement("div");
        dialog.className = "ax-dialog";

        let html = `
            <div class="ax-head">
                <h3>Select Action</h3>
                <button class="ax-close" aria-label="Close">&times;</button>
            </div>
            <div class="ax-search-bar">
                <input type="text" id="ax-search" placeholder="Search actions...">
            </div>
            <div class="ax-body" id="ax-list">
        `;

        Object.entries(actions).forEach(([cat, options]) => {
            html += `<div class="ax-category" data-cat="${escapeHtml(cat)}">
                        <h4 class="ax-cat-title">${escapeHtml(cat)}</h4>
                        <div class="ax-options">`;
            options.forEach((opt) => {
                html += `<div class="ax-option" data-value="${escapeHtml(opt)}">${svg(icons[cat], 18)}<span>${escapeHtml(opt)}</span></div>`;
            });
            html += `</div></div>`;
        });

        html += `<div class="ax-empty" id="ax-empty" style="display:none;">No actions match your search.</div></div>`;
        dialog.innerHTML = html;
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const close = () => {
            document.removeEventListener("keydown", key);
            overlay.remove();
        };
        const key = (e) => { if (e.key === "Escape") close(); };
        document.addEventListener("keydown", key);

        dialog.querySelector(".ax-close").addEventListener("click", close);
        overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

        const searchInput = dialog.querySelector("#ax-search");
        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase().trim();
            let anyMatch = false;
            dialog.querySelectorAll(".ax-category").forEach((catEl) => {
                let hasMatch = false;
                catEl.querySelectorAll(".ax-option").forEach((optEl) => {
                    const match = optEl.textContent.toLowerCase().includes(term);
                    optEl.style.display = match ? "flex" : "none";
                    if (match) hasMatch = true;
                });
                catEl.style.display = hasMatch ? "block" : "none";
                if (hasMatch) anyMatch = true;
            });
            dialog.querySelector("#ax-empty").style.display = anyMatch ? "none" : "block";
        });
        setTimeout(() => searchInput.focus(), 50);

        dialog.querySelector("#ax-list").addEventListener("click", (e) => {
            const opt = e.target.closest(".ax-option");
            if (opt) {
                onSelect(opt.dataset.value);
                close();
            }
        });
    };

    const labelClass = "block text-xs font-semibold mb-1 text-slate-500 uppercase tracking-wide dark:text-slate-400";
    const controlClass = "w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm";

    const renderField = (field) => {
        const span = field.half ? "col-span-1" : "col-span-1 md:col-span-2";
        const required = field.required ? ' <span class="text-red-500">*</span>' : "";
        let control;

        if (field.type === "select") {
            const options = [`<option value="">Select…</option>`]
                .concat(field.options.map((o) => `<option>${escapeHtml(o)}</option>`))
                .join("");
            control = `<select class="${controlClass}">${options}</select>`;
        } else if (field.type === "textarea") {
            control = `<textarea rows="3" class="${controlClass}" placeholder="${escapeHtml(field.placeholder || "")}"></textarea>`;
        } else {
            control = `<input type="${field.type}" class="${controlClass}" placeholder="${escapeHtml(field.placeholder || "")}" value="${escapeHtml(field.value || "")}" />`;
        }

        return `<div class="${span}">
                    <label class="${labelClass}">${escapeHtml(field.label)}${required}</label>
                    ${control}
                </div>`;
    };

    const buildCard = (action) => {
        const card = document.createElement("div");
        card.className = "ax-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm space-y-4";
        card.dataset.axAction = action;
        card.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    ${svg(icons[categoryOf(action)] || icons.Communication, 18)}
                    <span class="font-bold text-slate-900 dark:text-white">${escapeHtml(action)}</span>
                </div>
                <button type="button" class="ax-remove text-slate-400 hover:text-red-500 transition-colors" aria-label="Remove action" title="Remove action">
                    ${svg('<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>', 18)}
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${(fields[action] || []).map(renderField).join("")}
            </div>
        `;
        card.querySelector(".ax-remove").addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            card.remove();
        });
        return card;
    };

    const findActionList = () => {
        const heading = [...document.querySelectorAll("h2, h3, h4")]
            .find((el) => el.children.length === 0 && el.textContent.trim() === "Then do this");
        if (!heading) return null;

        const headerRow = heading.parentElement;
        const section = headerRow && headerRow.parentElement;
        if (!section) return null;

        return [...section.children].find(
            (child) => child !== headerRow && child.classList.contains("space-y-4")
        ) || null;
    };

    const enhance = () => {
        const list = findActionList();
        if (!list) return;

        // Drives the CSS rule that hides the page's pre-filled action card.
        if (!list.hasAttribute("data-ax-actions")) {
            list.setAttribute("data-ax-actions", "true");
        }

        const addBtn = [...list.querySelectorAll("button")].find(
            (b) => b.textContent.replace(/\s+/g, " ").trim() === "Add Action"
        );
        if (!addBtn || addBtn.dataset.axBound) return;
        addBtn.dataset.axBound = "true";

        addBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            showActionPicker((action) => {
                list.insertBefore(buildCard(action), addBtn);
            });
        }, true);
    };

    let queued = false;
    new MutationObserver(() => {
        if (queued) return;
        queued = true;
        setTimeout(() => {
            queued = false;
            enhance();
        }, 150);
    }).observe(document.body, { childList: true, subtree: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", enhance, { once: true });
    } else {
        enhance();
    }
})();
