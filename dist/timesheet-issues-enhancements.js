(() => {
  const issueTimes = {
    "08-04|geofence": "08:30 AM – 04:30 PM",
    "08-06|missing punch": "07:55 AM – Clock-out missing",
    "08-03|no show": "No clock activity",
  };

  const getIssuesPanel = () => {
    const heading = [...document.querySelectorAll("h3")]
      .find((element) => element.textContent.trim() === "Timesheet Issues");
    return heading?.closest(".fixed.top-0.right-0") || null;
  };

  const formatDate = (shortDate) => {
    const [month, day] = shortDate.split("-").map(Number);
    return new Date(2026, month - 1, day).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const addDateAndTime = (card) => {
    if (card.dataset.dateTimeAdded) return;
    const dateLabel = [...card.querySelectorAll("span")]
      .find((span) => /^\d{2}-\d{2}$/.test(span.textContent.trim()));
    const typeLabel = [...card.querySelectorAll("span")]
      .find((span) => /^(missing punch|geofence|late|no show)$/i.test(span.textContent.trim()));
    if (!dateLabel || !typeLabel) return;

    card.dataset.dateTimeAdded = "true";
    const shortDate = dateLabel.textContent.trim();
    const type = typeLabel.textContent.trim().toLowerCase();
    const details = document.createElement("div");
    details.className = "alexios-issue-date-time";
    details.innerHTML = `
      <span><small>DATE</small>${formatDate(shortDate)}</span>
      <span><small>TIME</small>${issueTimes[`${shortDate}|${type}`] || "Shift time unavailable"}</span>
    `;
    const description = [...card.querySelectorAll("p")]
      .find((item) => !item.textContent.trim().startsWith("Note:"));
    description?.insertAdjacentElement("afterend", details);
    dateLabel.remove();
  };

  const openApprovalDialog = (card) => {
    if (document.querySelector(".alexios-issue-approval-modal")) return;
    const modal = document.createElement("div");
    modal.className = "alexios-issue-approval-modal";
    modal.innerHTML = `
      <div class="alexios-issue-approval-dialog" role="dialog" aria-modal="true" aria-labelledby="issue-approval-title">
        <h3 id="issue-approval-title">Approve & Resolve Issue</h3>
        <p>Add an optional internal note explaining this approval.</p>
        <label for="issue-admin-note">Admin notes <span>(optional)</span></label>
        <textarea id="issue-admin-note" rows="4" maxlength="500" placeholder="Add context for the audit trail..."></textarea>
        <div><button type="button" data-action="cancel">Cancel</button><button type="button" data-action="approve">Approve & Resolve</button></div>
      </div>
    `;
    document.body.appendChild(modal);
    const textarea = modal.querySelector("textarea");
    setTimeout(() => textarea.focus(), 0);
    const close = () => modal.remove();
    modal.querySelector('[data-action="cancel"]').onclick = close;
    modal.onclick = (event) => { if (event.target === modal) close(); };
    modal.querySelector('[data-action="approve"]').onclick = () => {
      const note = textarea.value.trim();
      const actions = [...card.querySelectorAll("div")]
        .find((div) => div.className.includes("mt-3") && div.querySelector("button"));
      actions?.remove();
      if (note) {
        const noteElement = document.createElement("p");
        noteElement.className = "alexios-admin-note";
        noteElement.textContent = `Admin note: ${note}`;
        card.appendChild(noteElement);
      }
      const topRow = card.firstElementChild;
      const resolved = document.createElement("span");
      resolved.className = "alexios-resolved-label";
      resolved.textContent = "✓ Resolved";
      topRow?.appendChild(resolved);
      card.classList.remove("bg-red-900/10", "border-red-800/30");
      card.classList.add("bg-slate-800/40", "border-slate-700/50");
      close();
    };
  };

  const enhancePanel = () => {
    const panel = getIssuesPanel();
    if (!panel) return;
    [...panel.querySelectorAll("button")].forEach((button) => {
      const label = button.textContent.trim();
      if (label === "View Details") button.remove();
      if (label === "Approve & Resolve" && !button.dataset.notesEnabled) {
        button.dataset.notesEnabled = "true";
        button.classList.add("alexios-approve-issue");
        button.addEventListener("click", () => openApprovalDialog(button.closest(".rounded-xl")));
      }
    });
    panel.querySelectorAll(".flex-1.overflow-y-auto > div").forEach(addDateAndTime);
  };

  const removeCompareToSchedule = () => {
    [...document.querySelectorAll("label")]
      .find((label) => label.textContent.trim() === "Compare to Schedule")
      ?.remove();
  };

  const removeTimesheetExportOptions = () => {
    const removableLabels = new Set(["Export to PDF", "Export for ADP Payroll"]);
    [...document.querySelectorAll("button")]
      .filter((button) => removableLabels.has(button.textContent.trim()))
      .forEach((button) => button.remove());
  };

  const applyEnhancements = () => {
    enhancePanel();
    removeCompareToSchedule();
    removeTimesheetExportOptions();
  };

  new MutationObserver(applyEnhancements).observe(document.body, { childList: true, subtree: true });
  removeCompareToSchedule();
  removeTimesheetExportOptions();
  enhancePanel();
})();
