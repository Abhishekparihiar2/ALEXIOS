(() => {
  const inputValueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  ).set;

  const parseDate = (value) => {
    if (!value) return null;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatValue = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const sameDay = (first, second) =>
    first && second &&
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const updateReactInput = (input, date) => {
    inputValueSetter.call(input, formatValue(date));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const enhancePicker = (popover) => {
    if (popover.dataset.rangeCalendarEnhanced) return;

    const heading = [...popover.querySelectorAll("h4")]
      .find((item) => item.textContent.trim() === "Select Date Range");
    const inputs = popover.querySelectorAll('input[type="date"]');
    if (!heading || inputs.length !== 2) return;

    popover.dataset.rangeCalendarEnhanced = "true";
    popover.classList.add("alexios-range-popover");

    const originalFields = inputs[0].closest(".space-y-3");
    if (originalFields) originalFields.hidden = true;

    let start = parseDate(inputs[0].value);
    let end = parseDate(inputs[1].value);
    let choosingEnd = false;
    let visibleMonth = new Date(
      (start || new Date()).getFullYear(),
      (start || new Date()).getMonth(),
      1,
    );

    const calendar = document.createElement("div");
    calendar.className = "alexios-range-calendar";
    heading.insertAdjacentElement("afterend", calendar);

    const render = () => {
      const year = visibleMonth.getFullYear();
      const month = visibleMonth.getMonth();
      const firstWeekday = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const rangeStart = start?.getTime();
      const rangeEnd = end?.getTime();
      const status = choosingEnd
        ? "Now choose the To date"
        : "Choose the From date";

      calendar.innerHTML = `
        <div class="alexios-range-summary">
          <span><small>FROM</small>${start ? start.toLocaleDateString() : "Select"}</span>
          <b>→</b>
          <span><small>TO</small>${end ? end.toLocaleDateString() : "Select"}</span>
        </div>
        <div class="alexios-calendar-header">
          <button type="button" data-month="previous" aria-label="Previous month">‹</button>
          <strong>${visibleMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</strong>
          <button type="button" data-month="next" aria-label="Next month">›</button>
        </div>
        <div class="alexios-calendar-grid alexios-calendar-weekdays">
          ${["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => `<span>${day}</span>`).join("")}
        </div>
        <div class="alexios-calendar-grid alexios-calendar-days">
          ${Array.from({ length: firstWeekday }, () => "<span></span>").join("")}
          ${Array.from({ length: daysInMonth }, (_, index) => {
            const date = new Date(year, month, index + 1);
            const time = date.getTime();
            const selected = sameDay(date, start) || sameDay(date, end);
            const inRange = rangeStart && rangeEnd && time > rangeStart && time < rangeEnd;
            return `<button type="button" data-day="${index + 1}" class="${selected ? "is-selected" : ""} ${inRange ? "is-in-range" : ""}">${index + 1}</button>`;
          }).join("")}
        </div>
        <p class="alexios-range-help">${status}</p>
      `;

      calendar.querySelector('[data-month="previous"]').onclick = () => {
        visibleMonth = new Date(year, month - 1, 1);
        render();
      };
      calendar.querySelector('[data-month="next"]').onclick = () => {
        visibleMonth = new Date(year, month + 1, 1);
        render();
      };
      calendar.querySelectorAll("[data-day]").forEach((button) => {
        button.onclick = () => {
          const selected = new Date(year, month, Number(button.dataset.day));
          if (!choosingEnd) {
            start = selected;
            end = null;
            choosingEnd = true;
            updateReactInput(inputs[0], start);
          } else {
            if (selected < start) {
              end = start;
              start = selected;
            } else {
              end = selected;
            }
            choosingEnd = false;
            updateReactInput(inputs[0], start);
            updateReactInput(inputs[1], end);
          }
          render();
        };
      });
    };

    render();
  };

  const observer = new MutationObserver(() => {
    document.querySelectorAll("div.absolute").forEach(enhancePicker);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
