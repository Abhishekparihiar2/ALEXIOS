(() => {
    const triggers = {
        "Time clock": [
            "User clocks in",
            "User clocked out",
            "User auto clocked out",
            "User is buddy punching",
            "Daily limit exceeded",
            "User left geofence",
            "Before break is due",
            "User is late for a break",
            "User started a break",
            "After user starts a break",
            "Before planned break end",
            "User ended a break",
            "After user ends a break"
        ],
        "Schedule": [
            "Shifts created",
            "Shifts updated",
            "Shifts deleted",
            "Shift replacement requested",
            "A user has rejected a shift",
            "User submitted unavailability",
            "User submitted work preference",
            "User unclaims shift",
            "User late for shift",
            "Unfilled open shift",
            "Shift not confirmed before start",
            "Before shift starts",
            "After shift starts",
            "Before shift ends",
            "After shift ends",
            "Repeating shift ends"
        ],
        "Forms": [
            "User submits a form",
            "Form status column changed"
        ],
        "Quick tasks": [
            "Task published",
            "Task completed",
            "New comment on a task"
        ],
        "General": [
            "On recurrence"
        ],
        "NFC": [
            "NFC Tag Scanned"
        ],
        "Courses": [
            "User completes a course"
        ],
        "Quizzes": [
            "Quiz was submitted"
        ],
        "Recognitions": [
            "User received recognition"
        ],
        "Celebrations": [
            "Employee birthday",
            "Employee work anniversary"
        ],
        "Time off": [
            "User requested time off",
            "Time off request approved or declined"
        ],
        "Documents": [
            "Document approved",
            "Document expired",
            "Document pending"
        ],
        "User onboarding": [
            "Onboarding approved"
        ],
        "Hiring": [
            "Candidate in hiring stage",
            "Candidate moved stage"
        ],
        "Users": [
            "Time since start date",
            "User logged in on a new device",
            "User logs out of the app",
            "User Archived",
            "User created",
            "User entered smart group",
            "User left smart group"
        ]
    };

    if (!document.getElementById("automations-add-style")) {
        const style = document.createElement("style");
        style.id = "automations-add-style";
        style.textContent = `
            .at-overlay { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(0,0,0,0.76); backdrop-filter: blur(8px); }
            .at-dialog { width: min(600px, 100%); max-height: 90vh; display: flex; flex-direction: column; background: #111; border: 1px solid #334155; border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,0.6); color: #e2e8f0; }
            .at-head { padding: 20px 24px; border-bottom: 1px solid #262626; display: flex; justify-content: space-between; align-items: center; }
            .at-head h3 { margin: 0; color: #fff; font-size: 18px; font-weight: 700; }
            .at-close { background: transparent; border: none; color: #94a3b8; font-size: 24px; cursor: pointer; line-height: 1; padding: 0; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 6px; }
            .at-close:hover { background: #1e293b; color: #fff; }
            .at-search-bar { padding: 16px 24px; border-bottom: 1px solid #262626; }
            .at-search-bar input { width: 100%; padding: 10px 14px; background: #000; border: 1px solid #334155; border-radius: 8px; color: #e2e8f0; outline: none; font-size: 14px; }
            .at-search-bar input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.13); }
            .at-body { padding: 16px 24px; overflow-y: auto; flex: 1; }
            .at-category { margin-bottom: 24px; }
            .at-category:last-child { margin-bottom: 0; }
            .at-cat-title { margin: 0 0 12px; color: #94a3b8; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
            .at-options { display: grid; grid-template-columns: 1fr; gap: 8px; }
            .at-option { display: flex; align-items: center; padding: 12px 16px; background: #1a1a1a; border: 1px solid #262626; border-radius: 8px; cursor: pointer; transition: background 0.15s, border-color 0.15s; color: #e2e8f0; font-size: 14px; font-weight: 500; }
            .at-option:hover { background: #1e293b; border-color: #3b82f6; color: #fff; }
            .at-option.selected { border-color: #2563eb; background: rgba(37,99,235,0.1); color: #fff; }
            
            /* Styles to make the trigger button look good on the page */
            .at-trigger-btn { display: inline-flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #000; border: 1px solid #334155; border-radius: 8px; color: #e2e8f0; font-size: 14px; cursor: pointer; width: 100%; max-width: 400px; text-align: left; }
            .at-trigger-btn:hover { border-color: #475569; }
            .at-trigger-btn svg { color: #94a3b8; }
            
            /* The trigger card ships its selector button as opacity-0 until the
               card is hovered. Keep it visible without hover. */
            .border-blue-300.group > button.opacity-0 { opacity: 1 !important; transition: none !important; }

            /* Hide the original Late Shift configuration boxes */
            .at-hide-original { display: none !important; }
        `;
        document.head.appendChild(style);
    }

    const showTriggerPopup = (currentValue, onSelect) => {
        const overlay = document.createElement("div");
        overlay.className = "at-overlay";
        
        const dialog = document.createElement("div");
        dialog.className = "at-dialog";
        
        let html = `
            <div class="at-head">
                <h3>Select Trigger</h3>
                <button class="at-close" aria-label="Close">&times;</button>
            </div>
            <div class="at-search-bar">
                <input type="text" id="at-search" placeholder="Search triggers...">
            </div>
            <div class="at-body" id="at-list">
        `;

        Object.entries(triggers).forEach(([cat, options]) => {
            html += `<div class="at-category" data-cat="${cat}">
                        <h4 class="at-cat-title">${cat}</h4>
                        <div class="at-options">`;
            options.forEach(opt => {
                const sel = opt === currentValue ? " selected" : "";
                html += `<div class="at-option${sel}" data-value="${opt}">${opt}</div>`;
            });
            html += `</div></div>`;
        });
        
        html += `</div>`;
        dialog.innerHTML = html;
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        const close = () => {
            document.removeEventListener("keydown", key);
            overlay.remove();
        };
        const key = e => { if (e.key === "Escape") close(); };
        document.addEventListener("keydown", key);
        
        dialog.querySelector(".at-close").addEventListener("click", close);
        overlay.addEventListener("click", e => {
            if (e.target === overlay) close();
        });

        // Search logic
        const searchInput = dialog.querySelector("#at-search");
        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase().trim();
            dialog.querySelectorAll(".at-category").forEach(catEl => {
                let hasMatch = false;
                catEl.querySelectorAll(".at-option").forEach(optEl => {
                    const match = optEl.textContent.toLowerCase().includes(term);
                    optEl.style.display = match ? "flex" : "none";
                    if (match) hasMatch = true;
                });
                catEl.style.display = hasMatch ? "block" : "none";
            });
        });
        setTimeout(() => searchInput.focus(), 50);

        // Selection logic
        dialog.querySelector("#at-list").addEventListener("click", e => {
            const opt = e.target.closest(".at-option");
            if (opt) {
                onSelect(opt.dataset.value);
                close();
            }
        });
    };

    const enhance = () => {
        // Look for buttons or elements that indicate choosing a trigger on an automation page.
        // The user says: "Under When this happens, when user clicks on Change Trigger... Keep default placeholder as Select Trigger"
        
        // Find elements with text "Change Trigger" or "Select Trigger"
        const triggerBtns = Array.from(document.querySelectorAll("button, div, span, p")).filter(el => {
            if (el.children.length > 0 && el.tagName !== "BUTTON") return false; 
            const txt = el.textContent.trim();
            return txt === "Change Trigger" || txt === "Select Trigger" || txt.startsWith("Select Trigger");
        });

        triggerBtns.forEach(btn => {
            // Prevent multiple bindings
            if (btn.dataset.atEnhanced) return;
            btn.dataset.atEnhanced = "true";

            // If it's not a button, we might need to style it or wrap it
            if (btn.tagName !== "BUTTON") {
               btn.classList.add("at-trigger-btn");
               if(btn.textContent.trim() === "Change Trigger") {
                   btn.textContent = "Select Trigger"; // default placeholder as requested
               }
            }

            // Replace click handler
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const current = btn.dataset.currentValue || "";
                showTriggerPopup(current, (selectedVal) => {
                    btn.dataset.currentValue = selectedVal;
                    // Update the button text, maybe keep a chevron if it's a dropdown
                    btn.innerHTML = `${selectedVal} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
                    btn.classList.add("at-trigger-btn"); // ensure styles
                });
            }, true);
            
            // Set initial state if needed
            if (!btn.dataset.currentValue && btn.textContent.trim() === "Change Trigger") {
                btn.innerHTML = `Select Trigger <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            }
        });
        
        // Safe, targeted hide of "Late Shift" and "15 minutes" boxes
        const hideRedundantBoxes = () => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while (node = walker.nextNode()) {
                const text = node.nodeValue.trim();
                
                // If we find the specific text node
                if (text === "Late Shift" || 
                    text === "Employee has not clocked in after shift start" || 
                    text.includes("When an employee has not clocked in") || 
                    text.includes("minutes after shift start")) {
                    
                    // Walk up to find the closest box container (div)
                    let box = node.parentElement;
                    while (box && box.tagName !== "DIV" && box !== document.body) {
                        box = box.parentElement;
                    }
                    
                    // Only hide if it's a small container, not a main page wrapper
                    // We check if it has a small number of child elements or isn't too tall
                    if (box && box !== document.body && box.id !== "root") {
                        // Find the nearest wrapper that looks like the card (has border or specific padding)
                        // By walking up max 3 levels from the text
                        let target = box;
                        let levels = 0;
                        while (target && target.tagName === "DIV" && levels < 3) {
                            if (target.children.length > 8) break; // Don't hide big wrappers
                            
                            // If this div contains both texts, it's the right box
                            const boxText = target.textContent;
                            if ((boxText.includes("Late Shift") && boxText.includes("Employee has not clocked in")) ||
                                (boxText.includes("When an employee has not clocked in") && boxText.includes("minutes after shift start"))) {
                                target.style.setProperty("display", "none", "important");
                                break;
                            }
                            
                            target = target.parentElement;
                            levels++;
                        }
                    }
                }
            }
        };
        
        hideRedundantBoxes();

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
