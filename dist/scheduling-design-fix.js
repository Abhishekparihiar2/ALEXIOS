(() => {
  const exactText = (selector, text) => [...document.querySelectorAll(selector)]
    .find((node) => node.textContent.replace(/\s+/g, " ").trim() === text);

  const addFieldLabel = (control, text) => {
    if (!control || control.dataset.scheduleLabeled) return;
    control.dataset.scheduleLabeled = "true";
    const wrap = control.parentElement;
    if (!wrap || wrap.querySelector(":scope > .schedule-field-label")) return;
    wrap.classList.add("schedule-labeled-field");
    wrap.insertAdjacentHTML("afterbegin", `<span class="schedule-field-label">${text}</span>`);
  };

  const enhanceSchedule = () => {
    const currentView = exactText("button", "User View") || exactText("button", "Employee View");
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
    const toolbar = viewButton?.closest(".p-4.rounded-xl");
    toolbar?.classList.add("schedule-toolbar-fixed");

    moduleRoot.querySelector(".schedule-legend")?.classList.remove("schedule-calendar-fixed");
    const calendar = toolbar?.parentElement
      ? [...toolbar.parentElement.children].find((node) => node !== toolbar && !node.classList.contains("schedule-legend") && (node.matches("div.overflow-x-auto") || node.querySelector("table")))
      : null;
    if (calendar) {
      calendar.classList.add("schedule-calendar-fixed");
      if (!moduleRoot.querySelector(".schedule-legend")) {
        calendar.insertAdjacentHTML("beforebegin", `<section class="schedule-legend" aria-label="Schedule legend">
          <strong>Schedule legend</strong>
          <span><i class="is-published"></i>Published shift</span>
          <span><i class="is-draft"></i>Draft shift</span>
          <span><i class="is-tour"></i>Tour</span>
          <span><i class="is-open"></i>Open shift</span>
          <span><i class="is-conflict"></i>Conflict</span>
          <span><i class="is-timeoff"></i>Time off</span>
        </section>`);
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
      const match = Object.keys(panelTitles).find((name) => normalized === name || normalized.startsWith(`${name} ·`));
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
})();
