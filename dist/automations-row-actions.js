(() => {
    // Automations view / edit / activation flow.
    //
    // Listing table "..." menu -> View + Edit.
    // Detail page            -> working Edit and Deactivate/Activate buttons.
    //
    // The bundle ships no edit route and no activation handler, so Edit reuses
    // the automation form (relabelled + prefilled) and activation state is held
    // here and reflected on both the detail page and the listing row.

    if (!document.getElementById("automations-row-actions-style")) {
        const style = document.createElement("style");
        style.id = "automations-row-actions-style";
        style.textContent = `
            .ara-menu { position: fixed; z-index: 10001; min-width: 168px; padding: 6px; background: #111; border: 1px solid #334155; border-radius: 10px; box-shadow: 0 18px 44px rgba(0,0,0,0.6); color: #e2e8f0; }
            .ara-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 12px; background: transparent; border: none; border-radius: 7px; color: #e2e8f0; font-size: 13px; font-weight: 600; text-align: left; cursor: pointer; }
            .ara-item:hover { background: #1e293b; color: #fff; }
            .ara-item svg { color: #94a3b8; flex-shrink: 0; }
            .ara-item:hover svg { color: #60a5fa; }

            .ara-overlay { position: fixed; inset: 0; z-index: 10002; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(0,0,0,0.72); backdrop-filter: blur(4px); }
            .ara-dialog { width: min(440px, 100%); padding: 24px; background: #111; border: 1px solid #334155; border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,0.6); color: #e2e8f0; }
            .ara-dialog-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; border-radius: 11px; }
            .ara-dialog-icon.is-off { background: rgba(120, 53, 15, 0.3); color: #f59e0b; }
            .ara-dialog-icon.is-on { background: rgba(20, 83, 45, 0.3); color: #22c55e; }
            .ara-dialog h3 { margin: 0 0 6px; color: #fff; font-size: 18px; font-weight: 800; }
            .ara-dialog p { margin: 0; color: #94a3b8; font-size: 13px; line-height: 1.55; }
            .ara-dialog p strong { color: #e2e8f0; font-weight: 700; }
            .ara-dialog-actions { display: flex; justify-content: flex-end; gap: 9px; margin-top: 22px; }
            .ara-dialog-actions button { padding: 9px 15px; border: 1px solid #475569; border-radius: 9px; background: transparent; color: #e2e8f0; font-size: 12px; font-weight: 700; cursor: pointer; }
            .ara-dialog-actions button:hover { background: #1e293b; }
            .ara-dialog-actions button[data-confirm]:hover { filter: brightness(1.12); }
            .ara-dialog-actions button[data-confirm].is-off { border-color: #b45309; background: #b45309; color: #fff; }
            .ara-dialog-actions button[data-confirm].is-on { border-color: #15803d; background: #15803d; color: #fff; }
        `;
        document.head.appendChild(style);
    }

    const svg = (body, size) =>
        `<svg width="${size || 16}" height="${size || 16}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

    const viewIcon = svg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>');
    const editIcon = svg('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"></path>');
    const pauseIcon = svg('<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>');
    const playIcon = svg('<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"></polygon>');

    const trim = (el) => el.textContent.replace(/\s+/g, " ").trim();
    const findButton = (label) =>
        [...document.querySelectorAll("button")].find((b) => trim(b) === label);

    // ---- Activation state ----------------------------------------------
    // Keyed by automation name; the bundle has no store of its own.
    const statusByName = new Map();
    const statusOf = (name) => statusByName.get(name) || "Active";

    // ---- Listing "..." menu --------------------------------------------
    let openMenu = null;

    const closeMenu = () => {
        if (!openMenu) return;
        openMenu.remove();
        openMenu = null;
        document.removeEventListener("keydown", onKey, true);
        window.removeEventListener("scroll", closeMenu, true);
        window.removeEventListener("resize", closeMenu, true);
        document.removeEventListener("mousedown", onOutside, true);
    };

    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    const onOutside = (e) => { if (openMenu && !openMenu.contains(e.target)) closeMenu(); };

    // ---- Edit mode ------------------------------------------------------
    let editingName = null;

    const setReactValue = (input, value) => {
        const setter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value"
        ).set;
        setter.call(input, value);
        input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const findFormHeading = () => [...document.querySelectorAll("h1, h2, h3")]
        .find((el) => {
            const t = el.textContent.trim();
            return t === "Create Automation" || t === "Edit Automation";
        });

    const applyEditMode = () => {
        const heading = findFormHeading();

        // Left the form: drop edit mode so the next visit reads "Create".
        if (!heading) {
            editingName = null;
            return;
        }
        if (!editingName) return;

        if (heading.textContent.trim() !== "Edit Automation") {
            heading.textContent = "Edit Automation";
        }

        const label = [...document.querySelectorAll("label")]
            .find((l) => trim(l).startsWith("Automation Name"));
        const input = label && label.parentElement.querySelector("input");
        if (input && input.dataset.araPrefilled !== editingName) {
            input.dataset.araPrefilled = editingName;
            setReactValue(input, editingName);
        }
    };

    const openFormForEdit = (name) => {
        editingName = name;
        const createBtn = findButton("Create Automation");
        if (createBtn) createBtn.click();
    };

    // From the detail page the form lives back on the listing, so return
    // there first and open it once the listing has rendered.
    const openFormForEditFromDetail = (name) => {
        editingName = name;

        const back = detailBackButton();
        if (back) back.click();

        let tries = 25;
        const tick = () => {
            const createBtn = findButton("Create Automation");
            if (createBtn) { createBtn.click(); return; }
            if (--tries > 0) setTimeout(tick, 120);
        };
        setTimeout(tick, 120);
    };

    const showMenu = (anchor, row) => {
        closeMenu();

        const name = row.firstElementChild ? trim(row.firstElementChild) : "";

        const menu = document.createElement("div");
        menu.className = "ara-menu";
        menu.innerHTML = `
            <button type="button" class="ara-item" data-act="view">${viewIcon}<span>View</span></button>
            <button type="button" class="ara-item" data-act="edit">${editIcon}<span>Edit</span></button>
        `;
        document.body.appendChild(menu);

        const rect = anchor.getBoundingClientRect();
        const box = menu.getBoundingClientRect();
        const top = rect.bottom + 6 + box.height > window.innerHeight
            ? Math.max(8, rect.top - box.height - 6)
            : rect.bottom + 6;
        menu.style.top = `${top}px`;
        menu.style.left = `${Math.max(8, Math.min(rect.right - box.width, window.innerWidth - box.width - 8))}px`;

        menu.addEventListener("click", (e) => {
            const item = e.target.closest(".ara-item");
            if (!item) return;
            e.preventDefault();
            e.stopPropagation();
            const act = item.dataset.act;
            closeMenu();
            if (act === "view") {
                row.click();          // the row already targets the detail page
            } else {
                openFormForEdit(name);
            }
        });

        openMenu = menu;
        document.addEventListener("keydown", onKey, true);
        window.addEventListener("scroll", closeMenu, true);
        window.addEventListener("resize", closeMenu, true);
        document.addEventListener("mousedown", onOutside, true);
    };

    // ---- Detail page ----------------------------------------------------
    const detailToggleButton = () =>
        [...document.querySelectorAll("button")].find((b) => /^(Deactivate|Activate)$/.test(trim(b)));

    const detailHeaderRow = () => {
        const toggle = detailToggleButton();
        return toggle ? toggle.parentElement : null;
    };

    const detailBackButton = () => {
        const header = detailHeaderRow();
        if (!header || !header.parentElement) return null;
        return [...header.parentElement.querySelectorAll("button")]
            .find((b) => !trim(b) && b.querySelector("svg")) || null;
    };

    const detailTitle = () => {
        const h1 = document.querySelector("h1");
        return h1 ? h1.textContent.trim() : "";
    };

    // The detail page shows exactly one status pill; listing pills live in a table.
    const detailStatusBadge = () => [...document.querySelectorAll("span")]
        .find((s) => /^(Active|Inactive)$/.test(s.textContent.trim())
            && s.className.includes("rounded-md")
            && !s.closest("table"));

    const isDetailPage = () => !!detailToggleButton() && !!findButton("Edit") && !!document.querySelector("h1");

    const confirmToggle = (name, status, onConfirm) => {
        const goingOff = status === "Active";
        const overlay = document.createElement("div");
        overlay.className = "ara-overlay";
        overlay.innerHTML = `
            <div class="ara-dialog" role="dialog" aria-modal="true">
                <div class="ara-dialog-icon ${goingOff ? "is-off" : "is-on"}">${goingOff ? pauseIcon : playIcon}</div>
                <h3>${goingOff ? "Deactivate automation" : "Activate automation"}</h3>
                <p>
                    ${goingOff
                        ? `<strong>${name}</strong> will stop running. Its trigger is ignored and no actions are sent until you activate it again.`
                        : `<strong>${name}</strong> will start running again. Its trigger is evaluated and actions are sent from now on.`}
                </p>
                <div class="ara-dialog-actions">
                    <button type="button" data-cancel>Cancel</button>
                    <button type="button" data-confirm class="${goingOff ? "is-off" : "is-on"}">${goingOff ? "Deactivate" : "Activate"}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const close = () => {
            document.removeEventListener("keydown", key, true);
            overlay.remove();
        };
        const key = (e) => { if (e.key === "Escape") close(); };
        document.addEventListener("keydown", key, true);

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay || e.target.closest("[data-cancel]")) {
                close();
                return;
            }
            if (e.target.closest("[data-confirm]")) {
                close();
                onConfirm();
            }
        });

        const confirmBtn = overlay.querySelector("[data-confirm]");
        if (confirmBtn) setTimeout(() => confirmBtn.focus(), 40);
    };

    // Class strings lifted from the page's own Active / Inactive renderings.
    const TOGGLE_BASE = "flex items-center gap-2 px-3 py-2 text-sm font-semibold border rounded-xl shadow-sm transition-colors";
    const TOGGLE_DEACTIVATE = `${TOGGLE_BASE} border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-500 dark:hover:bg-amber-900/40`;
    const TOGGLE_ACTIVATE = `${TOGGLE_BASE} border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-800/50 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40`;

    const BADGE_BASE = "px-2.5 py-1 text-xs font-bold rounded-md border";
    const BADGE_ACTIVE = `${BADGE_BASE} text-green-700 bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800/50 dark:text-green-400`;
    const BADGE_INACTIVE = `${BADGE_BASE} text-slate-600 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400`;

    // The page's own label is the source of truth for an automation we have not
    // toggled yet: it renders "Activate" for one that ships inactive.
    const seedStatus = (name, nativeLabel) => {
        if (!name || statusByName.has(name)) return;
        statusByName.set(name, nativeLabel === "Activate" ? "Inactive" : "Active");
    };

    const paintToggle = (btn, status) => {
        const label = status === "Active" ? "Deactivate" : "Activate";
        if (btn.dataset.araLabel !== label) {
            btn.dataset.araLabel = label;
            btn.innerHTML = `${status === "Active" ? pauseIcon : playIcon}<span>${label}</span>`;
        }
        const cls = status === "Active" ? TOGGLE_DEACTIVATE : TOGGLE_ACTIVATE;
        if (btn.className !== cls) btn.className = cls;
    };

    const paintBadge = (badge, status) => {
        const cls = status === "Active" ? BADGE_ACTIVE : BADGE_INACTIVE;
        if (badge.className !== cls) badge.className = cls;
        if (badge.textContent.trim() !== status) badge.textContent = status;
    };

    const enhanceDetail = () => {
        if (!isDetailPage()) return;

        const name = detailTitle();
        if (!name) return;

        const nativeToggle = detailToggleButton();
        if (nativeToggle) seedStatus(name, nativeToggle.dataset.araLabel || trim(nativeToggle));
        const status = statusOf(name);

        const editBtn = findButton("Edit");
        if (editBtn) {
            if (!editBtn.dataset.araIcon) {
                editBtn.dataset.araIcon = "true";
                editBtn.innerHTML = `${editIcon}<span>Edit</span>`;
            }
            if (!editBtn.dataset.araBound) {
                editBtn.dataset.araBound = "true";
                editBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openFormForEditFromDetail(detailTitle());
                }, true);
            }
        }

        const toggle = detailToggleButton();
        if (toggle) {
            paintToggle(toggle, status);
            if (!toggle.dataset.araBound) {
                toggle.dataset.araBound = "true";
                toggle.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const current = statusOf(detailTitle());
                    confirmToggle(detailTitle(), current, () => {
                        statusByName.set(detailTitle(), current === "Active" ? "Inactive" : "Active");
                        enhance();
                    });
                }, true);
            }
        }

        const badge = detailStatusBadge();
        if (badge) paintBadge(badge, status);
    };

    // ---- Listing table --------------------------------------------------
    const isAutomationsTable = (table) => {
        const head = table.querySelector("thead");
        if (!head) return false;
        const text = trim(head);
        return text.includes("Automation") && text.includes("Trigger");
    };

    const enhanceTable = () => {
        document.querySelectorAll("table").forEach((table) => {
            if (!isAutomationsTable(table)) return;

            table.querySelectorAll("tbody tr").forEach((row) => {
                const name = row.firstElementChild ? trim(row.firstElementChild) : "";

                // Keep the row's status pill in step with the detail page,
                // seeding from whatever the page rendered first.
                const badge = [...row.querySelectorAll("span")]
                    .find((s) => /^(Active|Inactive)$/.test(s.textContent.trim()));
                if (name && badge) {
                    if (!statusByName.has(name)) {
                        statusByName.set(name, badge.textContent.trim());
                    }
                    paintBadge(badge, statusOf(name));
                }

                const cell = row.lastElementChild;
                const btn = cell && cell.querySelector("button");
                if (!btn || btn.dataset.araBound) return;
                btn.dataset.araBound = "true";

                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();   // keep the row's own navigation from firing
                    if (openMenu) { closeMenu(); return; }
                    showMenu(btn, row);
                }, true);
            });
        });
    };

    const enhance = () => {
        applyEditMode();
        enhanceDetail();
        enhanceTable();
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
