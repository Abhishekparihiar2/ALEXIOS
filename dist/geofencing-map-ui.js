(() => {
    const isGeofencingActive = () => {
        return [...document.querySelectorAll("div, p, span")].some(d => {
            const t = d.textContent.toLowerCase();
            return t.includes("map view") && t.includes("boundary points") && t.includes("geo-fence");
        });
    };

    const enhance = () => {
        if (!isGeofencingActive()) return;

        // Find the deepest element containing the text
        const elements = [...document.querySelectorAll("div, p, span")].filter(d => {
            const t = d.textContent.toLowerCase();
            return t.includes("map view") && t.includes("boundary points") && t.includes("geo-fence");
        });
        
        if (elements.length === 0) return;
        
        const placeholder = elements[elements.length - 1];
        
        // Find the wrapper container that has the border/padding (usually the nearest parent div that is somewhat tall)
        let container = placeholder.closest("div.border") || placeholder.closest("div.rounded-xl") || placeholder.parentElement;
        
        // If it's just a tiny wrapper, go up
        while (container && container.parentElement && container.clientHeight < 50) {
            container = container.parentElement;
        }

        if (container.dataset.geofencingReady === "true") return;
        container.dataset.geofencingReady = "true";

        // Remove placeholder text and icon
        container.innerHTML = "";

        const mapContainer = document.createElement("div");
        mapContainer.className = "geofencing-map-container";
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "geofencing-map-svg");
        mapContainer.appendChild(svg);

        const controls = document.createElement("div");
        controls.className = "geo-controls";
        
        const clearBtn = document.createElement("button");
        clearBtn.className = "geo-btn";
        clearBtn.textContent = "Clear";
        
        const saveBtn = document.createElement("button");
        saveBtn.className = "geo-btn geo-btn-primary";
        saveBtn.textContent = "Save Boundary";
        
        controls.appendChild(clearBtn);
        controls.appendChild(saveBtn);
        mapContainer.appendChild(controls);

        const msgOverlay = document.createElement("div");
        msgOverlay.className = "geo-overlay-msg";
        msgOverlay.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg> Click on the map to place boundary points.`;
        mapContainer.appendChild(msgOverlay);

        let points = [];
        let isClosed = false;
        let currentMousePos = { x: 0, y: 0 };

        const render = () => {
            svg.innerHTML = "";
            
            if (points.length > 0) {
                if (isClosed) {
                    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                    polygon.setAttribute("class", "geo-polygon");
                    const pointsString = points.map(p => `${p.x},${p.y}`).join(" ");
                    polygon.setAttribute("points", pointsString);
                    svg.appendChild(polygon);
                } else {
                    if (points.length > 1) {
                        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                        polyline.setAttribute("class", "geo-polygon");
                        const pointsString = points.map(p => `${p.x},${p.y}`).join(" ");
                        polyline.setAttribute("points", pointsString);
                        polyline.style.fill = "none";
                        svg.appendChild(polyline);
                    }
                    
                    const activeLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    activeLine.setAttribute("class", "geo-line-active");
                    const last = points[points.length - 1];
                    activeLine.setAttribute("x1", last.x);
                    activeLine.setAttribute("y1", last.y);
                    activeLine.setAttribute("x2", currentMousePos.x || last.x);
                    activeLine.setAttribute("y2", currentMousePos.y || last.y);
                    svg.appendChild(activeLine);
                }

                points.forEach((p, index) => {
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circle.setAttribute("class", index === 0 ? "geo-point first-point" : "geo-point");
                    circle.setAttribute("cx", p.x);
                    circle.setAttribute("cy", p.y);
                    svg.appendChild(circle);
                });
            }
        };

        mapContainer.addEventListener("mousemove", (e) => {
            if (isClosed) return;
            const rect = mapContainer.getBoundingClientRect();
            currentMousePos = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            if (points.length > 0) render();
        });

        mapContainer.addEventListener("click", (e) => {
            if (isClosed) return;
            const rect = mapContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Check if clicking near the first point to close
            if (points.length > 2) {
                const firstPoint = points[0];
                const dx = x - firstPoint.x;
                const dy = y - firstPoint.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 15) { // 15px snap radius
                    isClosed = true;
                    msgOverlay.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Boundary closed successfully.`;
                    render();
                    return;
                }
            }
            
            points.push({ x, y });
            msgOverlay.innerHTML = `Click again to add point. Click the red starting point to close.`;
            render();
        });

        clearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            points = [];
            isClosed = false;
            msgOverlay.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg> Click on the map to place boundary points.`;
            render();
        });

        saveBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isClosed) {
                alert("Please complete the boundary by connecting back to the first point.");
                return;
            }
            const oldText = saveBtn.textContent;
            saveBtn.textContent = "Saved!";
            saveBtn.style.backgroundColor = "#16a34a";
            saveBtn.style.borderColor = "#22c55e";
            setTimeout(() => {
                saveBtn.textContent = oldText;
                saveBtn.style.backgroundColor = "";
                saveBtn.style.borderColor = "";
            }, 2000);
        });

        container.appendChild(mapContainer);
    };

    let queued = false; 
    new MutationObserver(() => { 
        if (queued) return; 
        queued = true; 
        setTimeout(() => { queued = false; enhance(); }, 150); 
    }).observe(document.body, { childList: true, subtree: true });
    
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", enhance, { once: true }); 
    } else {
        setTimeout(enhance, 300);
    }
})();
