(() => {
    const visible = (node) => !!node && !node.hidden && getComputedStyle(node).display !== "none" && getComputedStyle(node).visibility !== "hidden" && node.getClientRects().length > 0;

    const createAddModal = (onSave, onCancel) => {
        const overlay = document.createElement("div");
        overlay.className = "skills-add-modal-overlay";
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.zIndex = "10000";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.72)";
        overlay.style.backdropFilter = "blur(4px)";
        overlay.style.overflowY = "auto";
        overlay.style.padding = "20px";

        const dialog = document.createElement("div");
        dialog.className = "skills-add-dialog";
        dialog.style.width = "min(540px, 100%)";
        dialog.style.padding = "26px";
        dialog.style.border = "1px solid #334155";
        dialog.style.borderRadius = "14px";
        dialog.style.backgroundColor = "#111111";
        dialog.style.boxShadow = "0 24px 60px rgba(0, 0, 0, 0.55)";
        dialog.style.color = "#e2e8f0";
        dialog.style.maxHeight = "90vh";
        dialog.style.overflowY = "auto";
        dialog.style.margin = "auto";

        dialog.innerHTML = `
            <h3 style="margin: 0 0 5px; color: white; font-size: 20px; font-weight: 800;">Add Skill / Certification</h3>
            <p style="margin-bottom: 22px; color: #94a3b8; font-size: 13px;">Create a new qualification definition and configure its settings.</p>
            
            <!-- 14.4.1 Basic Information -->
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Basic Information</h4>
                
                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Skill Name <span style="color: #ef4444;">*</span></label>
                <input id="skill-add-name" type="text" placeholder="e.g., CPR Certification" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;" />
                
                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Category <span style="color: #ef4444;">*</span></label>
                <select id="skill-add-category" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;">
                    <option value="" disabled selected>Select a category...</option>
                    <option value="Licenses & Permits">Licenses & Permits</option>
                    <option value="Training & Certifications">Training & Certifications</option>
                    <option value="Languages">Languages</option>
                    <option value="Diplomas">Diplomas</option>
                    <option value="Other">Other</option>
                </select>

                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Description</label>
                <textarea id="skill-add-description" rows="2" placeholder="Brief description of the qualification..." style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; resize: vertical;"></textarea>

                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Verification/Reference URL</label>
                <input id="skill-add-url" type="url" placeholder="https://" style="width: 100%; padding: 10px 12px; margin-bottom: 4px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;" />
            </div>

            <!-- 14.4.2 Validity and Expiration -->
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Validity & Expiration</h4>
                
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 14px;">
                    <input id="skill-add-expires" type="checkbox" style="width: 16px; height: 16px; accent-color: #2563eb;" />
                    <span style="font-size: 13px; font-weight: 600;">Does this certification expire?</span>
                </label>

                <div id="skill-add-expiration-fields" style="display: none; background: #1a1a1a; padding: 14px; border-radius: 10px; margin-bottom: 14px; border: 1px solid #262626;">
                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Default Validity Period</label>
                    <div style="display: flex; gap: 8px; margin-bottom: 14px;">
                        <input id="skill-add-validity-num" type="number" min="1" placeholder="e.g., 2" style="flex: 1; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;" />
                        <select id="skill-add-validity-unit" style="flex: 1; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;">
                            <option value="Years">Years</option>
                            <option value="Months">Months</option>
                            <option value="Days">Days</option>
                        </select>
                    </div>
                    
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input id="skill-add-reminders" type="checkbox" checked style="width: 16px; height: 16px; accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 600;">Enable Expiration Reminders</span>
                    </label>
                </div>
            </div>

            <!-- 14.4.3 Document Requirements -->
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Requirements</h4>
                
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 14px;">
                    <input id="skill-add-req-doc" type="checkbox" style="width: 16px; height: 16px; accent-color: #2563eb;" />
                    <span style="font-size: 13px; font-weight: 600;">Require Supporting Document on Assignment</span>
                </label>
            </div>

            <!-- Initial Assignment (Optional) -->
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #262626;">
                <h4 style="margin: 0 0 12px; color: white; font-size: 14px; font-weight: 700;">Initial Assignment (Optional)</h4>
                
                <div style="display: flex; gap: 16px; margin-bottom: 14px;">
                    <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                        <input type="radio" name="skill-add-assign" value="none" checked style="accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 500;">None</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                        <input type="radio" name="skill-add-assign" value="employee" style="accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 500;">Assign to Employee</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                        <input type="radio" name="skill-add-assign" value="position" style="accent-color: #2563eb;" />
                        <span style="font-size: 13px; font-weight: 500;">Assign to Position</span>
                    </label>
                </div>

                <!-- Assign to Employee Fields -->
                <div id="skill-add-assign-employee" style="display: none; background: #1a1a1a; padding: 14px; border-radius: 10px; border: 1px solid #262626;">
                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Select Employee <span style="color: #ef4444;">*</span></label>
                    <select id="skill-add-assign-emp-id" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;">
                        <option value="" disabled selected>Search employees...</option>
                        <option value="emp1">Larry Freeman Jr.</option>
                        <option value="emp2">James Morrison</option>
                        <option value="emp3">Sarah Jenkins</option>
                    </select>

                    <div id="skill-add-assign-emp-dates" style="display: none; gap: 14px; margin-bottom: 14px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Issue Date</label>
                            <input id="skill-add-assign-emp-issue" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; color-scheme: dark;" />
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Expiration Date</label>
                            <input id="skill-add-assign-emp-exp" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; color-scheme: dark;" />
                        </div>
                    </div>

                    <div id="skill-add-assign-emp-doc-wrapper" style="display: none;">
                        <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Upload Document <span style="color: #ef4444;">*</span></label>
                        <div style="border: 1px dashed #334155; border-radius: 9px; padding: 16px; text-align: center; margin-bottom: 14px; background: #000000; cursor: pointer;">
                            <span style="font-size: 12px; color: #94a3b8;">Click to upload PDF, JPG, or PNG (Max 10MB)</span>
                        </div>
                    </div>
                    
                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Notes</label>
                    <textarea rows="2" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; resize: vertical;"></textarea>
                </div>

                <!-- Assign to Position Fields -->
                <div id="skill-add-assign-position" style="display: none; background: #1a1a1a; padding: 14px; border-radius: 10px; border: 1px solid #262626;">
                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Select Position / Job Type <span style="color: #ef4444;">*</span></label>
                    <select id="skill-add-assign-pos-id" style="width: 100%; padding: 10px 12px; margin-bottom: 14px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;">
                        <option value="" disabled selected>Search positions...</option>
                        <option value="pos1">Security Guard</option>
                        <option value="pos2">Shift Supervisor</option>
                        <option value="pos3">Site Manager</option>
                    </select>

                    <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Requirement Level</label>
                    <div style="display: flex; gap: 16px; margin-bottom: 14px;">
                        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                            <input type="radio" name="skill-add-pos-level" value="Required" checked style="accent-color: #2563eb;" />
                            <span style="font-size: 13px; font-weight: 500;">Required</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                            <input type="radio" name="skill-add-pos-level" value="Recommended" style="accent-color: #2563eb;" />
                            <span style="font-size: 13px; font-weight: 500;">Recommended</span>
                        </label>
                    </div>

                    <div id="skill-add-assign-pos-dates" style="display: none; gap: 14px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Issue Date</label>
                            <input id="skill-add-assign-pos-issue" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; color-scheme: dark;" />
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Expiration Date</label>
                            <input id="skill-add-assign-pos-exp" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px; color-scheme: dark;" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 14.4.6 Status -->
            <div style="margin-bottom: 24px;">
                <label style="display: block; margin-bottom: 7px; font-size: 12px; font-weight: 700;">Status <span style="color: #ef4444;">*</span></label>
                <select id="skill-add-status" style="width: 100%; padding: 10px 12px; border: 1px solid #262626; border-radius: 9px; outline: none; background: #000000; color: #e2e8f0; font-size: 13px;">
                    <option value="active" selected>Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            
            <div style="display: flex; justify-content: flex-end; gap: 9px;">
                <button id="skill-add-cancel" style="padding: 10px 16px; border: 1px solid #262626; border-radius: 8px; font-size: 13px; font-weight: 700; background: transparent; color: #e2e8f0; cursor: pointer; transition: background 0.2s;">Cancel</button>
                <button id="skill-add-save" style="padding: 10px 16px; border: 1px solid #2563eb; border-radius: 8px; font-size: 13px; font-weight: 700; background: #2563eb; color: white; cursor: pointer; transition: background 0.2s;">Create Skill</button>
            </div>
        `;

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        // Toggle logic for expiration fields
        const expiresCheckbox = document.getElementById("skill-add-expires");
        const expirationFields = document.getElementById("skill-add-expiration-fields");
        const empDates = document.getElementById("skill-add-assign-emp-dates");
        const posDates = document.getElementById("skill-add-assign-pos-dates");
        
        const updateDatesVisibility = () => {
            const expires = expiresCheckbox.checked;
            expirationFields.style.display = expires ? "block" : "none";
            empDates.style.display = expires ? "flex" : "none";
            posDates.style.display = expires ? "flex" : "none";
        };
        
        expiresCheckbox.addEventListener("change", updateDatesVisibility);

        // Toggle logic for assignment fields
        const assignRadios = document.querySelectorAll("input[name='skill-add-assign']");
        const assignEmployeeDiv = document.getElementById("skill-add-assign-employee");
        const assignPositionDiv = document.getElementById("skill-add-assign-position");
        const reqDocCheckbox = document.getElementById("skill-add-req-doc");
        const empDocWrapper = document.getElementById("skill-add-assign-emp-doc-wrapper");

        const updateAssignmentVisibility = () => {
            const selected = document.querySelector("input[name='skill-add-assign']:checked").value;
            assignEmployeeDiv.style.display = selected === "employee" ? "block" : "none";
            assignPositionDiv.style.display = selected === "position" ? "block" : "none";
            
            // Show upload wrapper only if employee is selected AND doc is required
            empDocWrapper.style.display = (selected === "employee" && reqDocCheckbox.checked) ? "block" : "none";
        };

        assignRadios.forEach(radio => radio.addEventListener("change", updateAssignmentVisibility));
        reqDocCheckbox.addEventListener("change", updateAssignmentVisibility);
        
        // Run once on load to set initial state
        updateDatesVisibility();
        updateAssignmentVisibility();

        // Close on escape
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                document.body.removeChild(overlay);
                document.removeEventListener("keydown", handleEsc);
                if (onCancel) onCancel();
            }
        };
        document.addEventListener("keydown", handleEsc);

        document.getElementById("skill-add-cancel").addEventListener("click", () => {
            document.body.removeChild(overlay);
            document.removeEventListener("keydown", handleEsc);
            if (onCancel) onCancel();
        });

        document.getElementById("skill-add-save").addEventListener("click", () => {
            const nameInput = document.getElementById("skill-add-name");
            const categorySelect = document.getElementById("skill-add-category");

            let isValid = true;
            
            // Basic Validation
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

            // Assignment Validation
            const selectedAssign = document.querySelector("input[name='skill-add-assign']:checked").value;
            if (selectedAssign === "employee") {
                const empSelect = document.getElementById("skill-add-assign-emp-id");
                if (!empSelect.value) {
                    empSelect.style.borderColor = "#ef4444";
                    isValid = false;
                } else {
                    empSelect.style.borderColor = "#262626";
                }
            } else if (selectedAssign === "position") {
                const posSelect = document.getElementById("skill-add-assign-pos-id");
                if (!posSelect.value) {
                    posSelect.style.borderColor = "#ef4444";
                    isValid = false;
                } else {
                    posSelect.style.borderColor = "#262626";
                }
            }

            if (!isValid) return;

            document.body.removeChild(overlay);
            document.removeEventListener("keydown", handleEsc);
            onSave({
                name: nameInput.value.trim(),
                category: categorySelect.value,
                active: document.getElementById("skill-add-status").value === "active"
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
        // Find buttons containing "Add New" or "Add Skill"
        const addButtons = [...document.querySelectorAll("button")].filter(btn =>
            visible(btn) && (btn.textContent.includes("Add New") || btn.textContent.includes("Add Skill") || btn.textContent.includes("Add Certification")) && !btn.dataset.skillAddWired
        );

        addButtons.forEach(btn => {
            // Only attach if we are likely on the Skills page. 
            // We can check the DOM for "Total Skills" or "SKILL / CERTIFICATION"
            if (!document.body.textContent.includes("Total Skills") && !document.body.textContent.includes("SKILL / CERTIFICATION") && !document.body.textContent.includes("Skills & Certifications")) {
                return;
            }

            btn.dataset.skillAddWired = "true";

            // If the button has an original click handler, this might override it or just stack.
            // If it's a React app underneath, we intercept the click.
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                createAddModal((data) => {
                    showToast("Skill/Certification '" + data.name + "' created successfully.");
                });
            }, true); // Use capture to intercept before React
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
