(function () {
    const createFullPageUI = (onClose) => {
        const page = document.createElement("div");
        page.style.position = "fixed";
        page.style.inset = "0";
        page.style.backgroundColor = "rgba(0, 0, 0, 0.72)";
        page.style.backdropFilter = "blur(8px)";
        page.style.zIndex = "9999";
        page.style.overflowY = "auto";
        page.style.color = "#e2e8f0";
        page.style.fontFamily = "inherit";

        page.innerHTML = `
            <div style="position: sticky; top: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid #262626; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; z-index: 10;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    <button id="cp-back-btn" style="background: transparent; border: none; color: #94a3b8; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600; padding: 6px 10px; border-radius: 6px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back
                    </button>
                    <div>
                        <h2 style="margin: 0; font-size: 18px; font-weight: 700; color: white;">Create Checkpoint</h2>
                        <p style="margin: 2px 0 0; font-size: 12px; color: #94a3b8;">Configure a new patrol or monitoring checkpoint.</p>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button id="cp-cancel-btn" style="padding: 8px 16px; border: 1px solid #334155; border-radius: 8px; font-size: 13px; font-weight: 600; background: transparent; color: #e2e8f0; cursor: pointer;">Cancel</button>
                    <button id="cp-save-btn" style="padding: 8px 16px; border: 1px solid #2563eb; border-radius: 8px; font-size: 13px; font-weight: 600; background: #2563eb; color: white; cursor: pointer;">Save Checkpoint</button>
                </div>
            </div>

            <div style="max-width: 800px; margin: 40px auto; padding: 0 24px; display: flex; flex-direction: column; gap: 32px;">
                
                <!-- 1. Basic Information -->
                <div style="background: #111111; border: 1px solid #262626; border-radius: 12px; padding: 24px;">
                    <h3 style="margin: 0 0 20px; font-size: 16px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px;">
                        <div style="width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px;">1</div>
                        Basic Information
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Checkpoint Name <span style="color: #ef4444;">*</span></label>
                            <input type="text" placeholder="e.g., North Gate Entry" style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;" />
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Checkpoint ID <span style="color: #ef4444;">*</span></label>
                            <input type="text" placeholder="e.g., CP-001" style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;" />
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Associated Site Location <span style="color: #ef4444;">*</span></label>
                        <select style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;">
                            <option value="" disabled selected>Select a site...</option>
                            <option value="s1">Downtown Tech Campus</option>
                            <option value="s2">Northside Logistics Hub</option>
                            <option value="s3">Westview Mall</option>
                        </select>
                    </div>

                    <div>
                        <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Special Instructions for Guards</label>
                        <textarea rows="3" placeholder="Provide instructions on what to check when scanning this point..." style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px; resize: vertical;"></textarea>
                    </div>
                </div>

                <!-- 2. Scanning Method -->
                <div style="background: #111111; border: 1px solid #262626; border-radius: 12px; padding: 24px;">
                    <h3 style="margin: 0 0 20px; font-size: 16px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px;">
                        <div style="width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px;">2</div>
                        Scanning Method
                    </h3>

                    <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                        <label style="flex: 1; padding: 16px; border: 1px solid #3b82f6; border-radius: 10px; background: #1e3a8a20; cursor: pointer; display: flex; flex-direction: column; gap: 8px; transition: 0.2s;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600; color: white;">NFC Tag</span>
                                <input type="radio" name="cp-scan-type" value="nfc" checked style="accent-color: #ffffff;" />
                            </div>
                            <span style="font-size: 12px; color: #94a3b8; line-height: 1.4;">Guard taps their device to a physical NFC sticker.</span>
                        </label>

                        <label style="flex: 1; padding: 16px; border: 1px solid #262626; border-radius: 10px; background: #1a1a1a; cursor: pointer; display: flex; flex-direction: column; gap: 8px; transition: 0.2s;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600; color: white;">Barcode</span>
                                <input type="radio" name="cp-scan-type" value="barcode" style="accent-color: #ffffff;" />
                            </div>
                            <span style="font-size: 12px; color: #94a3b8; line-height: 1.4;">Guard scans a printable QR code or barcode.</span>
                        </label>

                        <label style="flex: 1; padding: 16px; border: 1px solid #262626; border-radius: 10px; background: #1a1a1a; cursor: pointer; display: flex; flex-direction: column; gap: 8px; transition: 0.2s;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600; color: white;">GPS</span>
                                <input type="radio" name="cp-scan-type" value="gps" style="accent-color: #ffffff;" />
                            </div>
                            <span style="font-size: 12px; color: #94a3b8; line-height: 1.4;">System automatically validates guard location.</span>
                        </label>
                    </div>

                    <!-- Dynamic NFC Setup -->
                    <div id="cp-method-nfc" style="display: block; padding: 20px; background: #1a1a1a; border: 1px solid #262626; border-radius: 8px; text-align: center;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #e2e8f0; margin-bottom: 12px;"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                        <h4 style="margin: 0 0 8px; font-size: 14px; font-weight: 600;">NFC Setup Required</h4>
                        <p style="margin: 0 0 16px; font-size: 13px; color: #94a3b8;">You must scan the physical NFC tag with your device to capture its unique identifier.</p>
                        <button style="padding: 8px 16px; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; background: #ffffff; color: #000000; cursor: pointer;">Scan NFC Tag Now</button>
                    </div>

                    <!-- Dynamic Barcode Setup -->
                    <div id="cp-method-barcode" style="display: none; padding: 20px; background: #1a1a1a; border: 1px solid #262626; border-radius: 8px;">
                        <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Barcode Value <span style="color: #ef4444;">*</span></label>
                        <div style="display: flex; gap: 12px;">
                            <input type="text" placeholder="Enter alphanumeric code to generate" style="flex: 1; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;" />
                            <button style="padding: 10px 16px; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; background: #334155; color: white; cursor: pointer;">Generate & Download</button>
                        </div>
                    </div>

                    <!-- Dynamic GPS Setup -->
                    <div id="cp-method-gps" style="display: none; padding: 20px; background: #1a1a1a; border: 1px solid #262626; border-radius: 8px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px;">
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Latitude</label>
                                <input type="number" step="0.000001" placeholder="e.g., 40.7128" style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;" />
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Longitude</label>
                                <input type="number" step="0.000001" placeholder="e.g., -74.0060" style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;" />
                            </div>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Required GPS Accuracy Level (Meters) <span style="color: #ef4444;">*</span></label>
                            <input type="number" value="15" style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;" />
                            <p style="margin: 6px 0 0; font-size: 12px; color: #94a3b8;">Guard must be within this many meters of the coordinates to scan successfully.</p>
                        </div>
                    </div>
                </div>

                <!-- 3. Authorization & Rules -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
                    <!-- Authorization -->
                    <div style="background: #111111; border: 1px solid #262626; border-radius: 12px; padding: 24px;">
                        <h3 style="margin: 0 0 20px; font-size: 16px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px;">
                            <div style="width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px;">3</div>
                            Can Be Scanned By
                        </h3>
                        
                        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                                <input type="radio" name="cp-auth" value="all" checked style="accent-color: #ffffff;" />
                                <span style="font-size: 13px; font-weight: 500;">All Positions</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                                <input type="radio" name="cp-auth" value="restricted" style="accent-color: #ffffff;" />
                                <span style="font-size: 13px; font-weight: 500;">Restricted</span>
                            </label>
                        </div>

                        <div id="cp-auth-restricted" style="display: none;">
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Select Allowed Positions</label>
                            <select multiple style="width: 100%; height: 100px; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;">
                                <option value="p1">Security Guard</option>
                                <option value="p2">Shift Supervisor</option>
                                <option value="p3">Site Manager</option>
                            </select>
                        </div>
                    </div>

                    <!-- Monitoring -->
                    <div style="background: #111111; border: 1px solid #262626; border-radius: 12px; padding: 24px;">
                        <h3 style="margin: 0 0 20px; font-size: 16px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px;">
                            <div style="width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px;">4</div>
                            Monitoring
                        </h3>
                        
                        <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Monitoring Rule</label>
                        <select id="cp-monitoring-type" style="width: 100%; padding: 10px 14px; margin-bottom: 16px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;">
                            <option value="none">Do Not Monitor / Scan Randomly</option>
                            <option value="tour">Checkpoint Is Part of Tour</option>
                            <option value="interval">Request Scan on Regular Interval</option>
                        </select>

                        <div id="cp-monitoring-interval" style="display: none; gap: 12px;">
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Frequency</label>
                                <input type="number" min="1" value="1" style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;" />
                            </div>
                            <div style="flex: 1;">
                                <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Unit</label>
                                <select style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;">
                                    <option value="minutes">Minutes</option>
                                    <option value="hours" selected>Hours</option>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 5. Advanced Actions -->
                <div style="background: #111111; border: 1px solid #262626; border-radius: 12px; padding: 24px; margin-bottom: 40px;">
                    <h3 style="margin: 0 0 20px; font-size: 16px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px;">
                        <div style="width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 255, 255, 0.1); color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px;">5</div>
                        Advanced Actions
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Extra Scan Option</label>
                            <select style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;">
                                <option value="record">Record Scan Only</option>
                                <option value="message">Display Custom Message</option>
                                <option value="report">Open Report Form</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Exception Verification</label>
                            <select style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;">
                                <option value="none">No additional verification</option>
                                <option value="range">Range validation</option>
                                <option value="yesno_no_exc">Yes/No response ("No" is exception)</option>
                                <option value="yesno_yes_exc">Yes/No response ("Yes" is exception)</option>
                                <option value="multiple">Multiple verification questions</option>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">Manual Scanning Policy</label>
                            <select style="width: 100%; padding: 10px 14px; border: 1px solid #262626; border-radius: 8px; background: #000000; color: white; outline: none; font-size: 14px;">
                                <option value="allowed">Manual scanning allowed without restrictions</option>
                                <option value="disabled">Manual scanning disabled (configured method required)</option>
                                <option value="reason">Manual scanning allowed with mandatory reason</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        `;

        document.body.appendChild(page);
        document.body.style.overflow = "hidden"; // Prevent scrolling of the background

        // UI Logic
        const scanRadios = page.querySelectorAll('input[name="cp-scan-type"]');
        const methods = {
            nfc: page.querySelector('#cp-method-nfc'),
            barcode: page.querySelector('#cp-method-barcode'),
            gps: page.querySelector('#cp-method-gps')
        };

        scanRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                Object.values(methods).forEach(div => div.style.display = 'none');
                methods[e.target.value].style.display = 'block';

                // Update styling of labels
                page.querySelectorAll('input[name="cp-scan-type"]').forEach(r => {
                    const l = r.closest('label');
                    if (r.checked) {
                        l.style.borderColor = '#ffffff';
                        l.style.background = 'rgba(255, 255, 255, 0.1)';
                    } else {
                        l.style.borderColor = '#262626';
                        l.style.background = '#1a1a1a';
                    }
                });
            });
        });

        const authRadios = page.querySelectorAll('input[name="cp-auth"]');
        const authRestricted = page.querySelector('#cp-auth-restricted');
        authRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                authRestricted.style.display = e.target.value === 'restricted' ? 'block' : 'none';
            });
        });

        const monitorType = page.querySelector('#cp-monitoring-type');
        const monitorInterval = page.querySelector('#cp-monitoring-interval');
        monitorType.addEventListener('change', (e) => {
            monitorInterval.style.display = e.target.value === 'interval' ? 'flex' : 'none';
        });

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

        // Close Logic
        const close = () => {
            page.style.opacity = "0";
            page.style.transition = "opacity 0.2s ease";
            setTimeout(() => {
                if (page.parentNode) page.parentNode.removeChild(page);
                document.body.style.overflow = "";
                if (onClose) onClose();
            }, 200);
        };

        page.querySelector('#cp-back-btn').addEventListener('click', close);
        page.querySelector('#cp-cancel-btn').addEventListener('click', close);
        page.querySelector('#cp-save-btn').addEventListener('click', () => {
            showToast("Checkpoint Created Successfully.");
            close();
        });
    };

    const enhance = () => {
        // Find "Create Checkpoint" or "Add Checkpoint" buttons on the page
        const addButtons = [...document.querySelectorAll("button")].filter(btn =>
            (btn.textContent.includes("Add Checkpoint") || btn.textContent.includes("Create Checkpoint") || btn.textContent.includes("New Checkpoint")) &&
            !btn.dataset.cpAddWired &&
            btn.offsetParent !== null
        );

        addButtons.forEach(btn => {
            btn.dataset.cpAddWired = "true";
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                createFullPageUI();
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
        }, 300);
    }).observe(document.body, { childList: true, subtree: true });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(enhance, 500);
        });
    } else {
        setTimeout(enhance, 500);
    }
})();
