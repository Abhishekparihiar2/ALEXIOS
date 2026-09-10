(() => {
  // Weekly staffing requirement for the sites in view. Mock config: the build has
  // no source for required coverage, so this stands in for the position demand.
  const FIXED_REQUIRED_HOURS = 72;

  const exactText = (selector, text) =>
    [...document.querySelectorAll(selector)].find(
      (el) => el.textContent.trim().toLowerCase() === text.toLowerCase()
    );

  const addFieldLabel = (inputEl, labelText) => {
    if (!inputEl) return;
    const parent = inputEl.parentElement;
    if (!parent || parent.classList.contains("schedule-labeled-field")) return;
    parent.classList.add("schedule-labeled-field");
    const label = document.createElement("span");
    label.className = "schedule-field-label";
    label.textContent = labelText;
    parent.insertBefore(label, inputEl);
  };

  // Hours between two "HH:MM" stamps, wrapping past midnight for night shifts.
  const spanHours = (from, to) => {
    const a = /^(\d{1,2}):(\d{2})$/.exec(from);
    const b = /^(\d{1,2}):(\d{2})$/.exec(to);
    if (!a || !b) return 0;
    let mins = ((+b[1]) * 60 + (+b[2])) - ((+a[1]) * 60 + (+a[2]));
    if (mins <= 0) mins += 24 * 60;
    return mins / 60;
  };

  const round1 = (n) => Math.round(n * 10) / 10;

  // Read the week's real shift cards rather than guessing from container classes.
  const calculateScheduleStats = (calendarEl) => {
    let assignedHours = 0;   // published and attached to a named employee
    let draftHours = 0;      // unpublished drafts
    let openHours = 0;       // open / unassigned shifts
    let shiftCount = 0;

    if (calendarEl) {
      calendarEl.querySelectorAll("div.cursor-grab").forEach((card) => {
        const text = (card.textContent || "").replace(/\s+/g, " ");
        const range = text.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
        if (!range) return; // nested handles and chrome carry no time range

        const hours = spanHours(range[1], range[2]);
        if (!hours) return;

        const cls = String(card.className);
        const isDraft = /border-dashed/.test(cls) || /\bDraft\b/.test(text);
        const isOpen = /open shift/i.test(text);
        const isTour = /tour/i.test(text);
        const isTimeOff = /time off/i.test(text);

        if (isTour || isTimeOff) return; // neither fills a staffing requirement

        shiftCount++;
        if (isOpen) openHours += hours;
        else if (isDraft) draftHours += hours;
        else assignedHours += hours;
      });
    }

    const requiredHours = FIXED_REQUIRED_HOURS;
    const pct = requiredHours > 0
      ? Math.round((assignedHours / requiredHours) * 100)
      : 100;

    return {
      required: requiredHours,
      assigned: round1(assignedHours),
      draft: round1(draftHours),
      open: round1(openHours),
      unfilled: round1(Math.max(0, requiredHours - assignedHours)),
      pct: pct,
      shiftCount: shiftCount
    };
  };

  // One line describing the make-up, used as the widget's tooltip.
  const summaryTitle = (stats) =>
    stats.assigned + "h assigned to employees · " + stats.draft + "h in draft · " +
    stats.open + "h open / unassigned · " + stats.unfilled + "h still to schedule";

  const updateSummaryDOM = (container, stats) => {
    if (!container) return;
    const reqVal = container.querySelector(".schedule-summary-value-req");
    const assignedVal = container.querySelector(".schedule-summary-value-assigned");
    const subtext = container.querySelector(".schedule-summary-subtext");
    const pill = container.querySelector(".schedule-summary-pill");
    const progressFill = container.querySelector(".schedule-summary-progress-fill");
    const dot = container.querySelector(".schedule-summary-dot");

    const filled = stats.assigned >= stats.required;

    if (reqVal) reqVal.textContent = stats.required + 'h';
    if (assignedVal) assignedVal.textContent = stats.assigned + 'h';
    if (subtext) subtext.textContent = stats.unfilled + 'h to fill';
    if (pill) {
      pill.textContent = stats.pct + '%';
      pill.classList.toggle("is-filled", filled);
    }
    if (progressFill) {
      progressFill.style.width = Math.min(100, stats.pct) + '%';
      progressFill.style.backgroundColor = filled ? "#22c55e" : "#3b82f6";
    }
    if (dot) {
      dot.style.backgroundColor = filled ? "#22c55e" : "#3b82f6";
      dot.style.boxShadow = filled ? "0 0 8px rgba(34, 197, 94, 0.6)" : "0 0 8px rgba(59, 130, 246, 0.6)";
    }
    if (container.classList.contains("schedule-summary-widget")) {
      container.setAttribute("title", summaryTitle(stats));
    } else {
      const widget = container.querySelector(".schedule-summary-widget");
      if (widget) widget.setAttribute("title", summaryTitle(stats));
    }
  };

  const enhanceSchedule = () => {
    const currentView = exactText("button", "User View") || exactText("button", "Employee View") || exactText("button", "Job View");
    if (!currentView) return;
    if (currentView.textContent.trim() === "User View") currentView.textContent = "Employee View";
    
    const moduleRoot = currentView.closest(".flex-1.flex.flex-col.overflow-hidden.relative")
      || currentView.closest(".flex-1.flex.flex-col")
      || currentView.parentElement?.parentElement?.parentElement;
    if (!moduleRoot) return;
    moduleRoot.classList.add("schedule-design-fixed");

    moduleRoot.querySelectorAll("p,span").forEach((node) => {
      if (node.childElementCount === 0 && node.textContent.trim() === "Unassigned Draft") node.textContent = "Open / Unassigned Shifts";
    });

    const viewButton = exactText("button", "Employee View") || exactText("button", "Job View");
    const toolbar = viewButton?.closest(".p-4.rounded-xl") || viewButton?.parentElement?.parentElement;
    toolbar?.classList.add("schedule-toolbar-fixed");

    // Remove old standalone legends if present
    const oldLegends = moduleRoot.querySelectorAll(".schedule-legend");
    oldLegends.forEach(lg => {
      if (!lg.closest(".schedule-legend-summary-row")) {
        lg.remove();
      }
    });

    const calendar = toolbar?.parentElement
      ? [...toolbar.parentElement.children].find((node) => node !== toolbar && !node.classList.contains("schedule-legend") && !node.classList.contains("schedule-legend-summary-row") && (node.matches("div.overflow-x-auto") || node.querySelector("table")))
      : moduleRoot.querySelector("table")?.closest(".overflow-x-auto") || moduleRoot.querySelector("table")?.parentElement;

    if (calendar) {
      calendar.classList.add("schedule-calendar-fixed");
      let rowContainer = moduleRoot.querySelector(".schedule-legend-summary-row");

      if (!rowContainer) {
        const stats = calculateScheduleStats(calendar);
        const rowHTML = '<div class="schedule-legend-summary-row" aria-label="Schedule legend and summary row">' +
          '<section class="schedule-legend" aria-label="Schedule legend">' +
            '<strong>Schedule legend</strong>' +
            '<span><i class="is-published"></i>Published shift</span>' +
            '<span><i class="is-draft"></i>Draft shift</span>' +
            '<span><i class="is-tour"></i>Tour</span>' +
            '<span><i class="is-open"></i>Open shift</span>' +
            '<span><i class="is-conflict"></i>Conflict</span>' +
            '<span><i class="is-timeoff"></i>Time off</span>' +
          '</section>' +

          '<section class="schedule-summary-widget" aria-label="Schedule Summary" title="' + summaryTitle(stats) + '">' +
            '<div class="schedule-summary-badge">' +
              '<span class="schedule-summary-dot" style="background-color: ' + (stats.assigned >= stats.required ? '#22c55e' : '#3b82f6') + '; box-shadow: 0 0 8px ' + (stats.assigned >= stats.required ? 'rgba(34,197,94,0.6)' : 'rgba(59,130,246,0.6)') + ';"></span>' +
              '<strong>Schedule Summary</strong>' +
            '</div>' +

            '<div class="schedule-summary-item">' +
              '<span class="schedule-summary-label">Required</span>' +
              '<span class="schedule-summary-value-req">' + stats.required + 'h</span>' +
            '</div>' +

            '<div class="schedule-summary-item">' +
              '<span class="schedule-summary-label">Assigned</span>' +
              '<span class="schedule-summary-value-assigned">' + stats.assigned + 'h</span>' +
            '</div>' +

            '<div class="schedule-summary-item">' +
              '<span class="schedule-summary-subtext">' + stats.unfilled + 'h to fill</span>' +
              '<div class="schedule-summary-progress-track">' +
                '<div class="schedule-summary-progress-fill" style="width: ' + Math.min(100, stats.pct) + '%; background-color: ' + (stats.pct >= 100 ? '#22c55e' : '#3b82f6') + ';"></div>' +
              '</div>' +
              '<span class="schedule-summary-pill ' + (stats.pct >= 100 ? 'is-filled' : '') + '">' + stats.pct + '%</span>' +
            '</div>' +
          '</section>' +
        '</div>';

        calendar.insertAdjacentHTML("beforebegin", rowHTML);
        rowContainer = moduleRoot.querySelector(".schedule-legend-summary-row");
      } else {
        const stats = calculateScheduleStats(calendar);
        updateSummaryDOM(rowContainer, stats);
      }
    }
  };

  const enhancePanels = () => {
    const panelTitles = {
      "Create Shift": "shift-editor", "Edit Shift": "shift-editor",
      "Scheduling Conflicts": "schedule-conflicts", "Schedule Requests": "schedule-requests",
      "Publish Drafts": "schedule-publish", "Create Tour": "schedule-tour",
      "Edit Tour": "schedule-tour", "Duplicate Shift": "schedule-duplicate",
      "Duplicate Tour": "schedule-duplicate"
    };
    document.querySelectorAll("h2,h3").forEach((heading) => {
      const normalized = heading.textContent.replace(/\s+/g, " ").trim();
      const match = Object.keys(panelTitles).find((name) => normalized === name || normalized.startsWith(name + " A"));
      if (!match) return;
      const panel = heading.closest(".fixed") || heading.closest("[class*='max-w-']");
      panel?.classList.add("schedule-panel-fixed", panelTitles[match]);
    });

    const editor = document.querySelector(".schedule-panel-fixed.shift-editor");
    if (!editor) return;
    addFieldLabel(editor.querySelector('input[type="date"]'), "Shift date");
    const times = editor.querySelectorAll('input[type="time"]');
    addFieldLabel(times[0], "Start time");
    addFieldLabel(times[1], "End time");
    addFieldLabel(editor.querySelector('input[placeholder="Shift title (optional)"]'), "Shift title");
    const selects = editor.querySelectorAll("select");
    addFieldLabel(selects[0], "Position / job");
    addFieldLabel(selects[1], "Assigned employee");
    addFieldLabel(selects[2], "Site / location");
    addFieldLabel(editor.querySelector("textarea"), "Description / instructions");
  };

  let queued = false;
  const update = () => { enhanceSchedule(); enhancePanels(); };
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  });
  const start = () => { update(); observer.observe(document.body, { childList: true, subtree: true }); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
  setInterval(update, 1000);
})();
