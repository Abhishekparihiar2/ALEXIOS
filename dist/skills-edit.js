(() => {
    const visible = (node) => !!node && !node.hidden && getComputedStyle(node).display !== "none" && getComputedStyle(node).visibility !== "hidden" && node.getClientRects().length > 0;

    const createModal = (data, onSave, onCancel) => {
        const overlay = document.createElement("div");
        overlay.className = "skills-edit-modal-overlay";
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.zIndex = "10000";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.72)";
        overlay.style.backdropFilter = "blur(4px)";

        const dialog = document.createElement("div");
        dialog.className = "skills-edit-dialog";
        dialog.style.width = "min(440px, 100%)";
        dialog.style.padding = "22px";
        dialog.style.border = "1px solid #334155";
        dialog.style.borderRadius = "14px";
        dialog.style.backgroundColor = "#0f172a";
        dialog.style.boxShadow = "0 24px 60px rgba(0, 0, 0, 0.55)";
        dialog.style.color = "#e2e8f0";

        dialog.innerHTML = `
            <h3 style="margin: 0 0 5px; color: white; font-size: 18px; font-weight: 800;">Edit Skill / Certification</h3>
            <p style="margin-bottom: 18px; color: #94a3b8; font-size: 13px;">Update the details for this skill.</p>
            
            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Skill Name</label>
            <input id="skill-edit-name" type="text" value="${data.name}" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #475569; border-radius: 9px; outline: none; background: #020617; color: #e2e8f0; font-size: 13px;" />
            
            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Category</label>
            <select id="skill-edit-category" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #475569; border-radius: 9px; outline: none; background: #020617; color: #e2e8f0; font-size: 13px;">
                <option value="Licenses & Permits" ${data.category === "Licenses & Permits" ? "selected" : ""}>Licenses & Permits</option>
                <option value="Training & Certifications" ${data.category === "Training & Certifications" ? "selected" : ""}>Training & Certifications</option>
                <option value="Languages" ${data.category === "Languages" ? "selected" : ""}>Languages</option>
                <option value="Diplomas" ${data.category === "Diplomas" ? "selected" : ""}>Diplomas</option>
                <option value="Other" ${!["Licenses & Permits", "Training & Certifications", "Languages", "Diplomas"].includes(data.category) ? "selected" : ""}>Other</option>
            </select>
            
            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Scope</label>
            <select id="skill-edit-scope" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #475569; border-radius: 9px; outline: none; background: #020617; color: #e2e8f0; font-size: 13px;">
                <option value="Global" ${data.scope === "Global" ? "selected" : ""}>Global</option>
                <option value="Region-Specific" ${data.scope === "Region-Specific" ? "selected" : ""}>Region-Specific</option>
                <option value="Site-Specific" ${data.scope === "Site-Specific" ? "selected" : ""}>Site-Specific</option>
            </select>
            
            <div style="display: flex; justify-content: flex-end; gap: 9px; margin-top: 18px;">
                <button id="skill-edit-cancel" style="padding: 9px 14px; border: 1px solid #475569; border-radius: 8px; font-size: 12px; font-weight: 700; background: transparent; color: #e2e8f0; cursor: pointer;">Cancel</button>
                <button id="skill-edit-save" style="padding: 9px 14px; border: 1px solid #2563eb; border-radius: 8px; font-size: 12px; font-weight: 700; background: #2563eb; color: white; cursor: pointer;">Save Changes</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        document.getElementById("skill-edit-cancel").addEventListener("click", () => {
            document.body.removeChild(overlay);
            if (onCancel) onCancel();
        });

        document.getElementById("skill-edit-save").addEventListener("click", () => {
            const newName = document.getElementById("skill-edit-name").value;
            const newCategory = document.getElementById("skill-edit-category").value;
            const newScope = document.getElementById("skill-edit-scope").value;
            document.body.removeChild(overlay);
            onSave({ name: newName, category: newCategory, scope: newScope });
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
        // HIDE REGION FILTER SAFELY
        const selects = document.querySelectorAll("select");
        selects.forEach(sel => {
            if (sel.textContent.includes("All Regions") && sel.style.display !== "none") {
                sel.style.display = "none";
                sel.dataset.regionFilterHidden = "true";
            }
        });

        // Ensure we are on the skills page by looking for the metric cards
        if (!document.body.textContent.includes("Total Skills") && !document.body.textContent.includes("SKILL / CERTIFICATION")) return;

        // FOOLPROOF Edit Button Detection: Find rows via the Scope text column
        const rows = [];
        document.querySelectorAll("div, span, td, p").forEach(node => {
            if (node.children.length === 0 && (node.textContent.trim() === "Global" || node.textContent.trim() === "Region-Specific" || node.textContent.trim() === "Site-Specific")) {
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
            const buttons = [...row.querySelectorAll("button")];
            // The actions column typically has Edit then Delete (2 buttons). Or View, Edit, Delete (3 buttons).
            // Usually the edit button is the second to last.
            const btn = buttons[buttons.length - 2];
            
            if (!btn || btn.dataset.skillEditWired) return;
            btn.dataset.skillEditWired = "true";

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                let name = "";
                let category = "";
                let scope = "";
                let nameNode, categoryNode, scopeNode;

                const textNodes = [...row.querySelectorAll("div, span, td, p")].filter(n => 
                    n.children.length === 0 && n.textContent.trim().length > 0 && visible(n)
                );

                nameNode = textNodes.find(n => n.className.includes("font-semibold") || n.className.includes("text-slate-900") || n.className.includes("text-white") || n.tagName === "STRONG" || n.className.includes("text-slate-200"));
                if (nameNode) name = nameNode.textContent.trim();

                scopeNode = textNodes.find(n => n.textContent.trim() === "Global" || n.textContent.trim() === "Region-Specific" || n.textContent.trim() === "Site-Specific");
                if (scopeNode) {
                    scope = scopeNode.textContent.trim();
                }

                if (nameNode && scopeNode) {
                    const nameIndex = textNodes.indexOf(nameNode);
                    const scopeIndex = textNodes.indexOf(scopeNode);
                    if (scopeIndex > nameIndex + 1) {
                        categoryNode = textNodes[nameIndex + 1];
                        category = categoryNode.textContent.trim();
                    }
                }

                if (!name) name = textNodes[0]?.textContent.trim() || "Unknown Skill";
                if (!category && textNodes.length > 1) category = textNodes[1].textContent.trim();
                if (!scope && textNodes.length > 2) scope = textNodes[2].textContent.trim();

                createModal({ name, category, scope }, (updatedData) => {
                    if (nameNode) nameNode.textContent = updatedData.name;
                    if (categoryNode) categoryNode.textContent = updatedData.category;
                    if (scopeNode) scopeNode.textContent = updatedData.scope;
                    
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
