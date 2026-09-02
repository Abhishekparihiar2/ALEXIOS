(() => {
    // ─── Inject Leaflet CSS + JS ───────────────────────────────────────────────
    const injectLeaflet = () => new Promise(resolve => {
        if (window.L) return resolve();
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = resolve;
        document.head.appendChild(script);
    });

    // ─── Detect the "Add Site Locations" modal ────────────────────────────────
    const isLocationModal = (el) => {
        const text = el.textContent || "";
        return text.includes("Add Site Location") && text.includes("Select Site") && text.includes("Save Location");
    };

    let modalEnhanced = false;
    let mapInstance = null;
    let markerInstance = null;

    const enhanceModal = async (modal) => {
        if (modal.dataset.mapEnhanced === "true") return;
        modal.dataset.mapEnhanced = "true";
        modalEnhanced = true;

        await injectLeaflet();

        // Find the "Select a site..." container inside the modal
        const selectSiteContainer = [...modal.querySelectorAll("div")].find(d =>
            d.textContent.includes("Select Site") && !d.querySelector(".location-map-wrapper")
        );

        if (!selectSiteContainer) return;

        // Create the map + fields wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "location-map-wrapper";
        wrapper.style.cssText = `
            margin-top: 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-bottom: 8px;
        `;

        // ── Search bar ────────────────────────────────────────────────────────
        const searchWrapper = document.createElement("div");
        searchWrapper.style.cssText = "position: relative;";

        const searchInput = document.createElement("input");
        searchInput.placeholder = "🔍  Search location (like Google Maps)...";
        searchInput.className = "location-search-input";
        searchInput.style.cssText = `
            width: 100%;
            box-sizing: border-box;
            padding: 10px 14px;
            border: 1px solid #3b3b3b;
            border-radius: 10px;
            background: #111;
            color: #f5f5f5;
            font-size: 13px;
            outline: none;
        `;
        searchInput.addEventListener("focus", () => searchInput.style.borderColor = "#3b82f6");
        searchInput.addEventListener("blur", () => searchInput.style.borderColor = "#3b3b3b");

        const suggestionBox = document.createElement("div");
        suggestionBox.style.cssText = `
            position: absolute;
            top: calc(100% + 4px);
            left: 0; right: 0;
            background: #1a1a1a;
            border: 1px solid #333;
            border-radius: 10px;
            overflow: hidden;
            display: none;
            z-index: 9999;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
        `;

        let searchTimeout;
        searchInput.addEventListener("input", () => {
            clearTimeout(searchTimeout);
            const q = searchInput.value.trim();
            if (q.length < 3) { suggestionBox.style.display = "none"; return; }
            searchTimeout = setTimeout(async () => {
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6`);
                    const data = await res.json();
                    suggestionBox.innerHTML = "";
                    if (!data.length) { suggestionBox.style.display = "none"; return; }
                    data.forEach(place => {
                        const item = document.createElement("div");
                        item.style.cssText = `
                            padding: 10px 14px;
                            font-size: 12px;
                            color: #d1d5db;
                            cursor: pointer;
                            border-bottom: 1px solid #262626;
                            display: flex;
                            align-items: flex-start;
                            gap: 8px;
                        `;
                        item.innerHTML = `
                            <svg width="14" height="14" style="flex-shrink:0;margin-top:2px;color:#6b7280" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>${place.display_name}</span>
                        `;
                        item.addEventListener("mouseenter", () => item.style.background = "#222");
                        item.addEventListener("mouseleave", () => item.style.background = "transparent");
                        item.addEventListener("click", () => {
                            const lat = parseFloat(place.lat);
                            const lon = parseFloat(place.lon);
                            searchInput.value = place.display_name;
                            suggestionBox.style.display = "none";
                            placePin(lat, lon, true);
                        });
                        suggestionBox.appendChild(item);
                    });
                    suggestionBox.style.display = "block";
                } catch (e) { suggestionBox.style.display = "none"; }
            }, 400);
        });

        document.addEventListener("click", (e) => {
            if (!searchWrapper.contains(e.target)) suggestionBox.style.display = "none";
        }, true);

        searchWrapper.appendChild(searchInput);
        searchWrapper.appendChild(suggestionBox);

        // ── Map container ─────────────────────────────────────────────────────
        const mapEl = document.createElement("div");
        mapEl.style.cssText = `
            width: 100%;
            height: 180px;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #2a2a2a;
            position: relative;
            flex-shrink: 0;
        `;

        const mapHint = document.createElement("div");
        mapHint.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.75);
            color: #d1d5db;
            font-size: 11px;
            padding: 5px 12px;
            border-radius: 20px;
            pointer-events: none;
            z-index: 1000;
            white-space: nowrap;
        `;
        mapHint.textContent = "📍 Click anywhere on the map to pin location";
        mapEl.appendChild(mapHint);

        // ── Lat / Lng fields ──────────────────────────────────────────────────
        const coordRow = document.createElement("div");
        coordRow.style.cssText = "display: grid; grid-template-columns: 1fr 1fr; gap: 10px;";

        const fieldStyle = `
            width: 100%;
            box-sizing: border-box;
            padding: 9px 12px;
            border: 1px solid #3b3b3b;
            border-radius: 10px;
            background: #111;
            color: #f5f5f5;
            font-size: 13px;
            outline: none;
            font-family: monospace;
        `;

        const createField = (label, id) => {
            const wrap = document.createElement("div");
            const lbl = document.createElement("label");
            lbl.textContent = label;
            lbl.style.cssText = "display:block;font-size:11px;color:#9ca3af;margin-bottom:4px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;";
            const inp = document.createElement("input");
            inp.id = id;
            inp.readOnly = true;
            inp.placeholder = "—";
            inp.style.cssText = fieldStyle;
            wrap.appendChild(lbl);
            wrap.appendChild(inp);
            return { wrap, inp };
        };

        const { wrap: latWrap, inp: latInput } = createField("Latitude", "loc-lat");
        const { wrap: lngWrap, inp: lngInput } = createField("Longitude", "loc-lng");
        coordRow.appendChild(latWrap);
        coordRow.appendChild(lngWrap);

        // ── Address display field ─────────────────────────────────────────────
        const addrWrap = document.createElement("div");
        const addrLabel = document.createElement("label");
        addrLabel.textContent = "Resolved Address";
        addrLabel.style.cssText = "display:block;font-size:11px;color:#9ca3af;margin-bottom:4px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;";
        const addrInput = document.createElement("input");
        addrInput.id = "loc-address";
        addrInput.readOnly = true;
        addrInput.placeholder = "Will be auto-filled after pinning";
        addrInput.style.cssText = fieldStyle + "color:#9ca3af;";
        addrWrap.appendChild(addrLabel);
        addrWrap.appendChild(addrInput);

        // ── Assemble wrapper ──────────────────────────────────────────────────
        wrapper.appendChild(searchWrapper);
        wrapper.appendChild(mapEl);
        wrapper.appendChild(coordRow);
        wrapper.appendChild(addrWrap);

        // Insert before the footer buttons so it stays in the scrollable content area
        const buttons = [...modal.querySelectorAll("button")];
        const cancelBtn = buttons.find(b => b.textContent.trim().toLowerCase() === "cancel");
        
        if (cancelBtn && cancelBtn.parentElement) {
            cancelBtn.parentElement.parentNode.insertBefore(wrapper, cancelBtn.parentElement);
        } else {
            const innerModal = modal.querySelector("[class*='rounded'], [class*='bg-']") || modal.firstElementChild;
            if (innerModal) innerModal.appendChild(wrapper);
            else modal.appendChild(wrapper);
        }

        // ── Init Leaflet map after next frame ─────────────────────────────────
        requestAnimationFrame(() => {
            if (mapInstance) { mapInstance.remove(); mapInstance = null; }

            // scrollWheelZoom disabled by default so the modal can scroll
            mapInstance = L.map(mapEl, {
                center: [20.5937, 78.9629],
                zoom: 5,
                zoomControl: true,
                scrollWheelZoom: false
            });

            // Enable scroll zoom only when mouse is hovering over the map
            mapEl.addEventListener("mouseenter", () => {
                mapInstance.scrollWheelZoom.enable();
                mapHint.textContent = "🖱️ Scroll to zoom · Click to pin";
                mapHint.style.display = "block";
            });
            mapEl.addEventListener("mouseleave", () => {
                mapInstance.scrollWheelZoom.disable();
                if (!markerInstance) {
                    mapHint.textContent = "📍 Click anywhere on the map to pin location";
                    mapHint.style.display = "block";
                } else {
                    mapHint.style.display = "none";
                }
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
                maxZoom: 19
            }).addTo(mapInstance);

            mapInstance.on("click", (e) => {
                placePin(e.latlng.lat, e.latlng.lng, false);
            });
        });

        // ── Place pin and reverse geocode ─────────────────────────────────────
        const placePin = async (lat, lng, flyTo) => {
            if (!mapInstance) return;

            if (markerInstance) markerInstance.remove();

            const icon = L.divIcon({
                className: "",
                html: `<div style="
                    width:32px;height:32px;
                    background:#ef4444;
                    border:3px solid #fff;
                    border-radius:50% 50% 50% 0;
                    transform:rotate(-45deg);
                    box-shadow:0 2px 8px rgba(0,0,0,0.4);
                "></div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });

            markerInstance = L.marker([lat, lng], { icon, draggable: true }).addTo(mapInstance);

            markerInstance.on("drag", (e) => {
                updateCoords(e.latlng.lat, e.latlng.lng);
            });
            markerInstance.on("dragend", async (e) => {
                const pos = markerInstance.getLatLng();
                updateCoords(pos.lat, pos.lng);
                await reverseGeocode(pos.lat, pos.lng);
            });

            if (flyTo) mapInstance.flyTo([lat, lng], 15, { duration: 1 });
            else mapInstance.setView([lat, lng], 15);

            mapHint.style.display = "none";
            updateCoords(lat, lng);
            await reverseGeocode(lat, lng);
        };

        const updateCoords = (lat, lng) => {
            latInput.value = lat.toFixed(7);
            lngInput.value = lng.toFixed(7);
            latInput.style.color = "#34d399";
            lngInput.style.color = "#34d399";
        };

        const reverseGeocode = async (lat, lng) => {
            addrInput.value = "Resolving address...";
            addrInput.style.color = "#6b7280";
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
                const data = await res.json();
                addrInput.value = data.display_name || "Address not found";
                addrInput.style.color = "#d1d5db";
            } catch {
                addrInput.value = "Could not resolve address";
                addrInput.style.color = "#ef4444";
            }
        };
    };

    // ─── Watch for the modal ──────────────────────────────────────────────────
    const observer = new MutationObserver(() => {
        const dialogs = [...document.querySelectorAll("div[role='dialog'], div[class*='modal'], div[class*='overlay'], div[class*='fixed']")]
            .filter(d => isLocationModal(d));

        if (dialogs.length) {
            dialogs.forEach(d => enhanceModal(d));
        } else {
            // Modal closed — reset for next open
            modalEnhanced = false;
            if (mapInstance) { mapInstance.remove(); mapInstance = null; markerInstance = null; }
            document.querySelectorAll(".location-map-wrapper").forEach(el => el.remove());
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
