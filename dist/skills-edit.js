(() => {
    const visible = (node) => !!node && !node.hidden && getComputedStyle(node).display !== "none" && getComputedStyle(node).visibility !== "hidden" && node.getClientRects().length > 0;

    // === PERMANENT HIDE: Scope column & All Regions filter ===
    // Injected once, survives all React re-renders because it targets elements by content.
    if (!document.getElementById('skills-hide-overrides')) {
        const permStyle = document.createElement('style');
        permStyle.id = 'skills-hide-overrides';
        permStyle.textContent = `
            /* Hide Scope column header (3rd column on Skills table) */
            table th:nth-child(3),
            table td:nth-child(3) {
                display: none !important;
            }
            /* Hide the All Regions filter - target by aria-label variants */
            button[aria-label*="Region"],
            button[aria-label*="region"],
            [data-testid*="region"],
            [data-testid*="Region"] {
                display: none !important;
            }
        `;
        document.head.appendChild(permStyle);
    }

    const createModal = (data, onSave, onCancel) => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.backdropFilter = "blur(12px)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "10000";

        const dialog = document.createElement("div");
        dialog.style.backgroundColor = "#0f0f0f";
        dialog.style.border = "1px solid #262626";
        dialog.style.borderRadius = "12px";
        dialog.style.width = "480px";
        dialog.style.maxWidth = "90%";
        dialog.style.maxHeight = "90vh";
        dialog.style.overflowY = "auto";
        dialog.style.boxShadow = "0 20px 40px rgba(0,0,0,0.5)";
        
        dialog.innerHTML = `
            <div style="padding: 24px; border-bottom: 1px solid #262626; position: sticky; top: 0; background: #0f0f0f; z-index: 10;">
                <h3 style="margin: 0; color: white; font-size: 18px; font-weight: 700;">Edit Skill / Certification</h3>
                <p style="margin: 4px 0 0; color: #a1a1aa; font-size: 13px;">Update the configuration for this qualification.</p>
            </div>
            
            <div style="padding: 24px;">
                <!-- Basic Info -->
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Skill Name <span style="color: #ef4444;">*</span></label>
                    <input id="skill-edit-name" type="text" value="${data.name || ''}" placeholder="e.g., Forklift Operator" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;" />

                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Category <span style="color: #ef4444;">*</span></label>
                    <select id="skill-edit-category" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;">
                        <option value="" disabled>Select a category</option>
                        <option value="Licenses & Permits" ${data.category === "Licenses & Permits" ? "selected" : ""}>Licenses & Permits</option>
                        <option value="Training & Certifications" ${data.category === "Training & Certifications" ? "selected" : ""}>Training & Certifications</option>
                        <option value="Languages" ${data.category === "Languages" ? "selected" : ""}>Languages</option>
                        <option value="Diplomas" ${data.category === "Diplomas" ? "selected" : ""}>Diplomas</option>
                        <option value="Other" ${!["Licenses & Permits", "Training & Certifications", "Languages", "Diplomas"].includes(data.category) && data.category ? "selected" : ""}>Other</option>
                    </select>

                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Description</label>
                    <textarea rows="3" placeholder="Provide a brief description of this qualification..." style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; resize: vertical;"></textarea>

                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Verification / Reference URL</label>
                    <input type="url" placeholder="https://" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;" />
                </div>

                <!-- Validity and Expiration -->
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                    <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Validity & Expiration</h4>
                    
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 14px;">
                        <input id="skill-edit-expires" type="checkbox" style="width: 16px; height: 16px; accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 600;">Does this certification expire?</span>
                    </label>

                    <div id="skill-edit-expiration-fields" style="display: none; background: #1a1a1a; padding: 14px; border-radius: 10px; border: 1px solid #262626;">
                        <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Default Validity Period</label>
                        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
                            <input id="skill-edit-validity-num" type="number" min="1" placeholder="e.g., 2" style="flex: 1; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;" />
                            <select id="skill-edit-validity-unit" style="flex: 1; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;">
                                <option value="Years">Years</option>
                                <option value="Months">Months</option>
                                <option value="Days">Days</option>
                            </select>
                        </div>
                        
                        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                            <input id="skill-edit-reminders" type="checkbox" checked style="width: 16px; height: 16px; accent-color: #2563eb;" />
                            <span style="font-size: 13px; font-weight: 600;">Enable Expiration Reminders</span>
                        </label>
                    </div>
                </div>

                <!-- Requirements & Visibility -->
                <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                    <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Requirements & Visibility</h4>
                    
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 14px;">
                        <input id="skill-edit-req-doc" type="checkbox" style="width: 16px; height: 16px; accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 600;">Require Supporting Document on Assignment</span>
                    </label>
                    
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input id="skill-edit-visible" type="checkbox" checked style="width: 16px; height: 16px; accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 600;">Visible to Client Portal</span>
                    </label>
                </div>

                <!-- Status -->
                <div style="margin-bottom: 24px;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input id="skill-edit-status" type="checkbox" checked style="width: 16px; height: 16px; accent-color: #22c55e;" />
                        <span style="font-size: 13px; font-weight: 600;">Active Qualification</span>
                    </label>
                </div>
                
                <div style="display: flex; justify-content: flex-end; gap: 9px;">
                    <button id="skill-edit-cancel" style="padding: 10px 16px; border: 1px solid #262626; border-radius: 8px; font-size: 13px; font-weight: 700; background: transparent; color: #e2e8f0; cursor: pointer; transition: background 0.2s;">Cancel</button>
                    <button id="skill-edit-save" style="padding: 10px 16px; border: 1px solid #2563eb; border-radius: 8px; font-size: 13px; font-weight: 700; background: #2563eb; color: white; cursor: pointer; transition: background 0.2s;">Save Changes</button>
                </div>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const expiresCheckbox = document.getElementById("skill-edit-expires");
        const expirationFields = document.getElementById("skill-edit-expiration-fields");
        expiresCheckbox.addEventListener("change", (e) => {
            expirationFields.style.display = e.target.checked ? "block" : "none";
        });

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                document.body.removeChild(overlay);
                document.removeEventListener("keydown", handleEsc);
                if (onCancel) onCancel();
            }
        };
        document.addEventListener("keydown", handleEsc);

        document.getElementById("skill-edit-cancel").addEventListener("click", () => {
            document.body.removeChild(overlay);
            document.removeEventListener("keydown", handleEsc);
            if (onCancel) onCancel();
        });

        document.getElementById("skill-edit-save").addEventListener("click", () => {
            const nameInput = document.getElementById("skill-edit-name");
            const categorySelect = document.getElementById("skill-edit-category");

            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = "#ef4444";
                return;
            } else {
                nameInput.style.borderColor = "#475569";
            }

            if (!categorySelect.value) {
                categorySelect.style.borderColor = "#ef4444";
                return;
            } else {
                categorySelect.style.borderColor = "#475569";
            }

            document.body.removeChild(overlay);
            document.removeEventListener("keydown", handleEsc);
            onSave({
                name: nameInput.value.trim(),
                category: categorySelect.value
            });
        });
    };

    const createViewModal = (data, onEdit) => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.backdropFilter = "blur(12px)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "10000";

        const dialog = document.createElement("div");
        dialog.style.backgroundColor = "#0f0f0f";
        dialog.style.border = "1px solid #262626";
        dialog.style.borderRadius = "12px";
        dialog.style.width = "480px";
        dialog.style.maxWidth = "90%";
        dialog.style.maxHeight = "90vh";
        dialog.style.overflowY = "auto";
        dialog.style.boxShadow = "0 20px 40px rgba(0,0,0,0.5)";
        
        dialog.innerHTML = `
            <div style="padding: 24px; border-bottom: 1px solid #262626; position: sticky; top: 0; background: #0f0f0f; z-index: 10; display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <h3 style="margin: 0; color: white; font-size: 18px; font-weight: 700;">Skill Overview</h3>
                    <p style="margin: 4px 0 0; color: #a1a1aa; font-size: 13px;">View configuration for this qualification.</p>
                </div>
                <div style="padding: 4px 10px; background: #22c55e20; border: 1px solid #22c55e40; color: #22c55e; border-radius: 12px; font-size: 11px; font-weight: 700; display: inline-block;">
                    ACTIVE
                </div>
            </div>
            
            <div style="padding: 24px;">
                <div style="margin-bottom: 24px;">
                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px; font-weight: 600;">SKILL NAME</div>
                    <div style="font-size: 15px; color: white; font-weight: 500;">${data.name}</div>
                </div>

                <div style="margin-bottom: 24px;">
                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px; font-weight: 600;">CATEGORY</div>
                    <div style="font-size: 15px; color: white; font-weight: 500;">${data.category}</div>
                </div>

                <div style="margin-bottom: 24px;">
                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px; font-weight: 600;">DESCRIPTION</div>
                    <div style="font-size: 14px; color: #e2e8f0; line-height: 1.5;">This qualification is required for specific field operations and demonstrates competency in handling advanced machinery safely.</div>
                </div>

                <div style="margin-bottom: 24px;">
                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px; font-weight: 600;">VALIDITY & EXPIRATION</div>
                    <div style="font-size: 14px; color: #e2e8f0; display: flex; align-items: center; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #2563eb;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Expires every 2 Years
                    </div>
                </div>

                <div style="margin-bottom: 24px;">
                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px; font-weight: 600;">REQUIREMENTS</div>
                    <div style="font-size: 14px; color: #e2e8f0; display: flex; align-items: center; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #2563eb;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Supporting Document Required on Assignment
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 9px; margin-top: 10px; border-top: 1px solid #262626; padding-top: 20px;">
                    <button id="skill-view-close" style="padding: 10px 16px; border: 1px solid #262626; border-radius: 8px; font-size: 13px; font-weight: 700; background: transparent; color: #e2e8f0; cursor: pointer; transition: background 0.2s;">Close</button>
                    <button id="skill-view-edit" style="padding: 10px 16px; border: 1px solid #2563eb; border-radius: 8px; font-size: 13px; font-weight: 700; background: #2563eb; color: white; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; gap: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        Edit
                    </button>
                </div>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                document.body.removeChild(overlay);
                document.removeEventListener("keydown", handleEsc);
            }
        };
        document.addEventListener("keydown", handleEsc);

        document.getElementById("skill-view-close").addEventListener("click", () => {
            document.body.removeChild(overlay);
            document.removeEventListener("keydown", handleEsc);
        });

        document.getElementById("skill-view-edit").addEventListener("click", () => {
            document.body.removeChild(overlay);
            document.removeEventListener("keydown", handleEsc);
            if (onEdit) onEdit();
        });
    };

    const showToast = (message) => {
        const notice = document.createElement("div");
        notice.style.position = "fixed";
        notice.style.bottom = "24px";
        notice.style.right = "24px";
        notice.style.zIndex = "10001";
        notice.className = "px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold transition-opacity shadow-lg";
        notice.textContent = message;
        document.body.appendChild(notice);
        setTimeout(() => {
            notice.style.opacity = "0";
            setTimeout(() => notice.remove(), 300);
        }, 3000);
    };

    const enhance = () => {
        // Ensure we are on the skills page by looking for the metric cards
        if (!document.body.textContent.includes("Total Skills") && !document.body.textContent.includes("SKILL / CERTIFICATION") && !document.body.textContent.includes("Skills & Certifications")) return;

        // Region filter and Scope column are hidden permanently via injected CSS above.
        // Additionally, hide by text content as CSS cannot target inner text.
        document.querySelectorAll("button, [role='button']").forEach(btn => {
            const txt = btn.textContent.trim();
            if ((txt.includes("All Regions") || txt === "Region") && !btn.dataset.regionHidden) {
                btn.style.setProperty("display", "none", "important");
                btn.dataset.regionHidden = "true";
                // Also hide the parent wrapper if it is just a single-child container
                const p = btn.parentElement;
                if (p && p.children.length === 1) {
                    p.style.setProperty("display", "none", "important");
                }
            }
        });

        // FOOLPROOF Edit Button Detection: Find rows via the Category text column
        const rows = [];
        document.querySelectorAll("div, span, td, p").forEach(node => {
            if (node.children.length === 0 && ["Licenses & Permits", "Training & Certifications", "Languages", "Diplomas"].includes(node.textContent.trim())) {
                let parent = node.parentElement;
                while (parent && parent.querySelectorAll("button").length < 2 && parent.tagName !== "BODY") {
                    parent = parent.parentElement;
                }
                if (parent && parent.querySelectorAll("button").length >= 2) {
                    if (!rows.includes(parent)) rows.push(parent);
                }
            }
        });

        rows.forEach(row => {
            // Find the actions container (usually a flex div at the end of the row)
            const actionsContainer = row.querySelector("td:last-child > div, div:last-child");
            if (!actionsContainer) return;
            
            // Add View Button if not present
            if (!actionsContainer.dataset.skillViewAdded) {
                actionsContainer.dataset.skillViewAdded = "true";
                // Inject the eye icon button at the start of the actions container
                const viewBtn = document.createElement("button");
                viewBtn.className = "text-slate-400 hover:text-blue-500 transition-colors";
                viewBtn.title = "View Qualification";
                viewBtn.style.padding = "4px";
                viewBtn.innerHTML = \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>\`;
                actionsContainer.insertBefore(viewBtn, actionsContainer.firstChild);

                viewBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    let name = "";
                    let category = "";
                    const textNodes = [...row.querySelectorAll("div, span, td, p")].filter(n => 
                        n.children.length === 0 && n.textContent.trim().length > 0 && visible(n)
                    );
                    const nameNode = textNodes.find(n => n.className.includes("font-semibold") || n.className.includes("text-slate-900") || n.className.includes("text-white") || n.tagName === "STRONG" || n.className.includes("text-slate-200"));
                    if (nameNode) name = nameNode.textContent.trim();
                    const categoryNode = textNodes.find(n => ["Licenses & Permits", "Training & Certifications", "Languages", "Diplomas"].includes(n.textContent.trim()));
                    if (categoryNode) category = categoryNode.textContent.trim();

                    if (!name) name = textNodes[0]?.textContent.trim() || "Unknown Skill";
                    if (!category && textNodes.length > 1) category = textNodes[1].textContent.trim();

                    // Open View Modal, and pass a callback to open the Edit modal if they click Edit
                    createViewModal({ name, category }, () => {
                        createModal({ name, category }, (updatedData) => {
                            if (nameNode) nameNode.textContent = updatedData.name;
                            if (categoryNode) categoryNode.textContent = updatedData.category;
                            showToast("Skill details updated successfully.");
                        });
                    });
                });
            }

            const buttons = [...actionsContainer.querySelectorAll("button")];
            // The actions column now has View, Edit, Delete. Edit should be index 1.
            const btn = buttons[1];
            
            if (!btn || btn.dataset.skillEditWired) return;
            btn.dataset.skillEditWired = "true";

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                let name = "";
                let category = "";
                let nameNode, categoryNode;

                const textNodes = [...row.querySelectorAll("div, span, td, p")].filter(n => 
                    n.children.length === 0 && n.textContent.trim().length > 0 && visible(n)
                );

                nameNode = textNodes.find(n => n.className.includes("font-semibold") || n.className.includes("text-slate-900") || n.className.includes("text-white") || n.tagName === "STRONG" || n.className.includes("text-slate-200"));
                if (nameNode) name = nameNode.textContent.trim();

                categoryNode = textNodes.find(n => ["Licenses & Permits", "Training & Certifications", "Languages", "Diplomas"].includes(n.textContent.trim()));
                if (categoryNode) {
                    category = categoryNode.textContent.trim();
                }

                if (!name) name = textNodes[0]?.textContent.trim() || "Unknown Skill";
                if (!category && textNodes.length > 1) category = textNodes[1].textContent.trim();

                createModal({ name, category }, (updatedData) => {
                    if (nameNode) nameNode.textContent = updatedData.name;
                    if (categoryNode) categoryNode.textContent = updatedData.category;
                    
                    showToast("Skill details updated successfully.");
                });
            });
        });
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
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(enhance, 300);
        }, { once: true }); 
    } else {
        setTimeout(enhance, 300);
    }
})();
