(() => {
    const visible = (node) => !!node && !node.hidden && getComputedStyle(node).display !== "none" && getComputedStyle(node).visibility !== "hidden" && node.getClientRects().length > 0;

    const createDocumentModal = (onSave, onCancel) => {
        const overlay = document.createElement("div");
        overlay.className = "document-add-modal-overlay";
        overlay.style.cssText = "position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,0.72);backdrop-filter:blur(4px);overflow-y:auto;padding:20px;";

        const dialog = document.createElement("div");
        dialog.className = "document-add-dialog";
        dialog.style.cssText = "width:min(540px, 100%);padding:26px;border:1px solid #334155;border-radius:14px;background-color:#111111;box-shadow:0 24px 60px rgba(0,0,0,0.55);color:#e2e8f0;max-height:90vh;overflow-y:auto;margin:auto;";

        dialog.innerHTML = `
            <h3 style="margin: 0 0 5px; color: white; font-size: 20px; font-weight: 800;">Add Document</h3>
            <p style="margin-bottom: 22px; color: #94a3b8; font-size: 13px;">Upload and configure a new document for this record.</p>
            
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Document Information</h4>
                
                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Document Name <span style="color: #ef4444;">*</span></label>
                <input id="doc-add-name" type="text" placeholder="e.g., Driver's License" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; box-sizing: border-box;" />
                
                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Category <span style="color: #ef4444;">*</span></label>
                <select id="doc-add-category" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; box-sizing: border-box;">
                    <option value="" disabled selected>Select a category...</option>
                    <option value="Identity">Identity</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="Training">Training</option>
                    <option value="Medical">Medical</option>
                    <option value="Policies">Policies</option>
                    <option value="Other">Other</option>
                </select>

                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Description/Notes</label>
                <textarea id="doc-add-desc" rows="2" placeholder="Additional context..." style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; resize: vertical; box-sizing: border-box;"></textarea>
            </div>

            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">File Upload <span style="color: #ef4444;">*</span></h4>
                <div style="border: 1px dashed #334155; border-radius: 9px; padding: 24px 16px; text-align: center; background: #000000; cursor: pointer; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#334155'">
                    <svg style="margin: 0 auto 10px; color: #94a3b8;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <div style="font-size: 13px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px;">Click to upload or drag and drop</div>
                    <div style="font-size: 12px; color: #64748b;">PDF, JPG, or PNG (Max 10MB)</div>
                </div>
            </div>

            <div style="margin-bottom: 24px;">
                <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Validity (Optional)</h4>
                
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 14px;">
                    <input id="doc-add-expires" type="checkbox" style="width: 16px; height: 16px; accent-color: #2563eb;" />
                    <span style="font-size: 13px; font-weight: 600;">Does this document expire?</span>
                </label>

                <div id="doc-add-expiration-fields" style="display: none; background: #1a1a1a; padding: 14px; border-radius: 10px; border: 1px solid #262626;">
                    <div style="display: flex; gap: 14px; margin-bottom: 14px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Issue Date</label>
                            <input id="doc-add-issue" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; color-scheme: dark; box-sizing: border-box;" />
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Expiration Date</label>
                            <input id="doc-add-exp" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; color-scheme: dark; box-sizing: border-box;" />
                        </div>
                    </div>
                    
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input id="doc-add-reminders" type="checkbox" checked style="width: 16px; height: 16px; accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 600;">Enable Expiration Reminders</span>
                    </label>
                </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 9px;">
                <button id="doc-add-cancel" style="padding: 10px 16px; border: 1px solid #262626; border-radius: 8px; font-size: 13px; font-weight: 700; background: transparent; color: #e2e8f0; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#262626'" onmouseout="this.style.background='transparent'">Cancel</button>
                <button id="doc-add-save" style="padding: 10px 16px; border: 1px solid #2563eb; border-radius: 8px; font-size: 13px; font-weight: 700; background: #2563eb; color: white; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">Upload Document</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        // Toggle logic for expiration fields
        const expiresCheckbox = document.getElementById("doc-add-expires");
        const expirationFields = document.getElementById("doc-add-expiration-fields");
        
        expiresCheckbox.addEventListener("change", () => {
            expirationFields.style.display = expiresCheckbox.checked ? "block" : "none";
        });

        const close = () => {
            document.body.removeChild(overlay);
            document.removeEventListener("keydown", handleEsc);
            if (onCancel) onCancel();
        };

        const handleEsc = (e) => {
            if (e.key === "Escape") close();
        };
        document.addEventListener("keydown", handleEsc);

        document.getElementById("doc-add-cancel").addEventListener("click", close);

        document.getElementById("doc-add-save").addEventListener("click", () => {
            const nameInput = document.getElementById("doc-add-name");
            const categorySelect = document.getElementById("doc-add-category");

            let isValid = true;
            
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = "#ef4444";
                isValid = false;
            } else {
                nameInput.style.borderColor = "#475569";
            }

            if (!categorySelect.value) {
                categorySelect.style.borderColor = "#ef4444";
                isValid = false;
            } else {
                categorySelect.style.borderColor = "#475569";
            }

            if (!isValid) return;

            close();
            onSave({
                name: nameInput.value.trim(),
                category: categorySelect.value
            });
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
        const isDocsPage = document.body.textContent.includes("All Documents") && document.body.textContent.includes("DOCUMENTS & POLICIES");
        
        const addButtons = [...document.querySelectorAll("button")].filter(btn => {
            if (!visible(btn) || btn.dataset.docAddWired) return false;
            
            const text = btn.textContent;
            const matchesText = text.includes("Add Document") || text.includes("Upload Document") || (text.includes("Add New") && text.includes("Document"));
            const matchesDocsPage = isDocsPage && (text.includes("Add New") || text.includes("Upload"));
            
            return matchesText || matchesDocsPage;
        });

        addButtons.forEach(btn => {
            btn.dataset.docAddWired = "true";
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                createDocumentModal((data) => {
                    showToast("Document '" + data.name + "' added successfully.");
                });
            }, true);
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
