(() => {
    const STORE_KEY = "alexios.clientOverview.v1";
    
    const readStore = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); } catch { return {}; } };
    const writeStore = (data) => localStorage.setItem(STORE_KEY, JSON.stringify(data));
    const esc = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

    const visible = (node) => !!node && !node.hidden && getComputedStyle(node).display !== "none" && getComputedStyle(node).visibility !== "hidden" && node.getClientRects().length > 0;

    const isClientOverview = () => {
        const overviewBtn = [...document.querySelectorAll("button, a, div")].find(b => b.textContent.trim() === "Overview" && visible(b));
        if (!overviewBtn) return false;
        
        const style = `${overviewBtn.className} ${overviewBtn.getAttribute("style") || ""}`;
        const isOverviewTabActive = /blue|active|selected/i.test(style) || overviewBtn.getAttribute("aria-current") === "page" || overviewBtn.getAttribute("aria-selected") === "true";
        
        const hasSiteName = [...document.querySelectorAll("div, label, h2, h3, h4")].some(d => {
            const text = d.textContent.trim().toUpperCase();
            return (text.includes("SITE NAME") || text.includes("COMPANY NAME") || text.includes("TIME ZONE") || text.includes("UNIQUE ID") || text.includes("COMPANY INFO") || text.includes("ACCOUNT TYPE")) && visible(d);
        });
        return isOverviewTabActive && hasSiteName;
    };

    const enableEditMode = (root, editButton) => {
        const dataCards = [];
        
        root.querySelectorAll("div.p-6, div.bg-slate-900, div.rounded-2xl").forEach(section => {
            const header = section.querySelector("h3, h2, h4, .text-slate-400.font-semibold");
            if (header && header.textContent.trim().toLowerCase().includes("emergency contacts")) {
                return;
            }

            [...section.querySelectorAll("div")].forEach(node => {
                if (node.children.length === 2 && node.firstElementChild.tagName !== "DIV" && node.lastElementChild.tagName !== "DIV") {
                    const labelNode = node.firstElementChild;
                    const valueNode = node.lastElementChild;
                    const labelText = labelNode.textContent.trim();
                    
                    if (labelText && labelText !== "Edit" && !node.querySelector("svg") && getComputedStyle(labelNode).fontSize.includes("10px") || labelNode.className.includes("text-xs") || labelNode.className.includes("uppercase")) {
                        dataCards.push({
                            container: node,
                            labelNode: labelNode,
                            valueNode: valueNode,
                            originalValue: valueNode.textContent.trim()
                        });
                    }
                }
            });
        });

        if (editButton) editButton.style.display = "none";
        
        const actionContainer = document.createElement("div");
        actionContainer.className = "client-overview-action-buttons";
        
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save Changes";
        saveBtn.className = "client-overview-btn client-overview-btn-save";
        
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.className = "client-overview-btn client-overview-btn-cancel";
        
        actionContainer.appendChild(cancelBtn);
        actionContainer.appendChild(saveBtn);
        
        if (editButton && editButton.parentElement) {
            editButton.parentElement.appendChild(actionContainer);
        } else {
            root.prepend(actionContainer);
        }
        
        dataCards.forEach(card => {
            const input = document.createElement("input");
            input.type = "text";
            input.className = "client-overview-input";
            input.value = card.originalValue;
            input.dataset.original = card.originalValue;
            
            card.valueNode.style.display = "none";
            card.container.appendChild(input);
            card.inputNode = input;
        });

        const closeEditMode = () => {
            if (editButton) editButton.style.display = "";
            actionContainer.remove();
            dataCards.forEach(card => {
                if (card.inputNode) card.inputNode.remove();
                card.valueNode.style.display = "";
            });
        };

        cancelBtn.addEventListener("click", closeEditMode);
        
        saveBtn.addEventListener("click", () => {
            const store = readStore();
            const siteIdCard = dataCards.find(c => c.labelNode.textContent.trim() === "UNIQUE ID");
            const siteId = siteIdCard ? siteIdCard.inputNode.value : "default_site";
            
            const updatedData = store[siteId] || {};
            
            dataCards.forEach(card => {
                const newValue = card.inputNode.value.trim();
                card.valueNode.textContent = newValue;
                updatedData[card.labelNode.textContent.trim()] = newValue;
            });
            
            store[siteId] = updatedData;
            writeStore(store);
            
            closeEditMode();
            
            const notice = document.createElement("div");
            notice.className = "px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-4 transition-opacity";
            notice.textContent = "Client details updated successfully.";
            root.prepend(notice);
            setTimeout(() => {
                notice.style.opacity = "0";
                setTimeout(() => notice.remove(), 300);
            }, 3000);
        });
    };

    const enhance = () => {
        if (!isClientOverview()) return;
        
        // Find the main container of the overview page. It's usually a div with some padding/spacing containing the content.
        let root = [...document.querySelectorAll("div")].find(d => 
            (d.className.includes("space-y-6") || d.className.includes("space-y-4") || d.className.includes("w-full") || d.className.includes("flex-1")) && visible(d) && 
            [...d.querySelectorAll("div, label, h2, h3, h4")].some(child => {
                const text = child.textContent.trim().toUpperCase();
                return text.includes("SITE NAME") || text.includes("COMPANY NAME") || text.includes("TIME ZONE") || text.includes("UNIQUE ID") || text.includes("COMPANY INFO") || text.includes("ACCOUNT TYPE");
            })
        );
        
        // Fallback if we still can't find a tight root wrapper
        if (!root) {
            root = [...document.querySelectorAll("div.px-6, div.p-6, main, article")].find(d => visible(d) && d.textContent.toUpperCase().includes("ACCOUNT TYPE"));
        }

        if (!root) return;
        
        if (root.dataset.clientOverviewEditReady === "true") return;
        root.dataset.clientOverviewEditReady = "true";

        const store = readStore();
        let siteId = "default_site";
        const uniqueIdLabel = [...root.querySelectorAll("div")].find(n => n.children.length === 0 && n.textContent.trim() === "UNIQUE ID");
        if (uniqueIdLabel && uniqueIdLabel.nextElementSibling) {
            siteId = uniqueIdLabel.nextElementSibling.textContent.trim();
        }
        
        const saved = store[siteId];
        if (saved) {
            root.querySelectorAll("div.p-6, div.bg-slate-900, div.rounded-2xl").forEach(section => {
                [...section.querySelectorAll("div")].forEach(node => {
                    if (node.children.length === 2 && node.firstElementChild.tagName !== "DIV" && node.lastElementChild.tagName !== "DIV") {
                        const label = node.firstElementChild.textContent.trim();
                        if (saved[label] !== undefined) {
                            node.lastElementChild.textContent = saved[label];
                        }
                    }
                });
            });
        }

        const svgs = [...root.querySelectorAll("svg")];
        let editSvg = svgs.find(svg => {
            const path = svg.querySelector("path");
            if (!path) return false;
            const d = path.getAttribute("d") || "";
            return d.includes("M15.232") || d.includes("l3.536") || d.includes("M11 5H6") || d.includes("l.867");
        });
        
        let editBtn = editSvg ? editSvg.closest("button, a, div.cursor-pointer") : null;

        if (!editBtn) {
            const headerActions = [...root.querySelectorAll("div.flex.justify-between")].shift();
            if (headerActions) {
                const possibleButtons = [...headerActions.querySelectorAll("button")];
                if (possibleButtons.length > 0) editBtn = possibleButtons[possibleButtons.length - 1];
            }
        }
        
        if (!root.querySelector(".client-close-account-btn")) {
            const closeBtn = document.createElement("div");
            closeBtn.className = "client-close-account-btn p-5 mt-8 rounded-xl border cursor-pointer transition-all";
            closeBtn.style.borderColor = "rgba(220, 38, 38, 0.3)";
            closeBtn.style.backgroundColor = "rgba(220, 38, 38, 0.05)";
            
            closeBtn.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background: rgba(220, 38, 38, 0.15); color: #ef4444;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold mb-0.5" style="color: #ef4444;">Close Account</h3>
                        <p class="text-xs" style="color: rgba(239, 68, 68, 0.7);">Terminate site and all associated contracts</p>
                    </div>
                </div>
            `;
            
            closeBtn.addEventListener("mouseenter", () => closeBtn.style.backgroundColor = "rgba(220, 38, 38, 0.1)");
            closeBtn.addEventListener("mouseleave", () => closeBtn.style.backgroundColor = "rgba(220, 38, 38, 0.05)");
            
            closeBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to close this account? This action cannot be undone.")) {
                    alert("Account closure initiated.");
                }
            });
            
            root.appendChild(closeBtn);
        }

        if (editBtn) {
            const clonedBtn = editBtn.cloneNode(true);
            editBtn.parentNode.replaceChild(clonedBtn, editBtn);
            
            clonedBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                enableEditMode(root, clonedBtn);
            });
        }
    };

    const enhanceGlobalCloseAccount = () => {
        // Ensure we are inside a client view (e.g. Overview, Post Orders tab exists)
        const isClientView = [...document.querySelectorAll("button, a, div, span")].some(b => b.textContent.trim() === "Post Orders" && visible(b));
        if (!isClientView) {
            const existing = document.querySelector(".global-close-account-btn");
            if (existing) existing.remove();
            return;
        }
        
        // Remove old local button if it exists
        const oldLocalBtn = document.querySelector(".client-close-account-btn");
        if (oldLocalBtn) oldLocalBtn.remove();
        
        if (!document.querySelector(".global-close-account-btn")) {
            const wrapper = document.createElement("div");
            wrapper.className = "global-close-account-btn";
            // Make it genuinely fixed to the screen viewport footer!
            wrapper.style.position = "fixed";
            wrapper.style.bottom = "0";
            wrapper.style.right = "0";
            wrapper.style.zIndex = "9999";
            // Guessing sidebar width is ~280px, but flex layout is safer to just give it a max-width or right alignment.
            // Let's make it span from the left edge of the main content.
            // Find main content left offset
            let leftOffset = 300; 
            const mainContent = document.querySelector("main") || [...document.querySelectorAll("div")].find(d => d.className.includes("flex-1") && d.getBoundingClientRect().width > 500);
            if (mainContent) leftOffset = mainContent.getBoundingClientRect().left;
            
            wrapper.style.left = `${leftOffset}px`;
            wrapper.style.padding = "16px 32px";
            wrapper.style.backgroundColor = "rgba(11, 17, 33, 0.85)";
            wrapper.style.backdropFilter = "blur(12px)";
            wrapper.style.borderTop = "1px solid rgba(220, 38, 38, 0.2)";
            wrapper.style.boxShadow = "0 -4px 20px rgba(0,0,0,0.5)";
            
            const closeBtn = document.createElement("div");
            closeBtn.className = "p-4 rounded-xl border cursor-pointer transition-all";
            closeBtn.style.borderColor = "rgba(220, 38, 38, 0.4)";
            closeBtn.style.backgroundColor = "rgba(220, 38, 38, 0.1)";
            
            closeBtn.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style="background: rgba(220, 38, 38, 0.2); color: #ef4444;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold mb-0.5" style="color: #ef4444;">Close Account</h3>
                        <p class="text-xs" style="color: rgba(239, 68, 68, 0.7);">Terminate site and all associated contracts</p>
                    </div>
                </div>
            `;
            
            closeBtn.addEventListener("mouseenter", () => closeBtn.style.backgroundColor = "rgba(220, 38, 38, 0.15)");
            closeBtn.addEventListener("mouseleave", () => closeBtn.style.backgroundColor = "rgba(220, 38, 38, 0.1)");
            
            closeBtn.addEventListener("click", () => {
                if (confirm("Are you sure you want to close this account? This action cannot be undone.")) {
                    alert("Account closure initiated.");
                }
            });
            
            wrapper.appendChild(closeBtn);
            document.body.appendChild(wrapper);
        } else {
            // Update left offset dynamically if window resizes
            const wrapper = document.querySelector(".global-close-account-btn");
            const mainContent = document.querySelector("main") || [...document.querySelectorAll("div")].find(d => d.className.includes("flex-1") && d.getBoundingClientRect().width > 500);
            if (mainContent) {
                wrapper.style.left = `${mainContent.getBoundingClientRect().left}px`;
            }
        }
    };

    let queued = false; 
    new MutationObserver(() => { 
        if (queued) return; 
        queued = true; 
        setTimeout(() => { 
            queued = false; 
            enhance(); 
            enhanceGlobalCloseAccount();
        }, 150); 
    }).observe(document.body, { childList: true, subtree: true });
    
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            enhance();
            enhanceGlobalCloseAccount();
        }, { once: true }); 
    } else {
        setTimeout(() => {
            enhance();
            enhanceGlobalCloseAccount();
        }, 300);
    }
})();
