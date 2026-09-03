(function() {
    'use strict';

    // State for recurrence
    let recurrenceType = 'Weekly';
    let recurrenceInterval = 1;
    let recurrenceDays = [];
    let recurrenceMonthlyType = 'date';
    let recurrenceEnd = 'Never';

    function injectRecurrenceUI(assignTaskContainer) {
        if (!assignTaskContainer || assignTaskContainer.hasAttribute('data-recurrence-injected')) return;
        assignTaskContainer.setAttribute('data-recurrence-injected', 'true');

        // Create the recurrence section wrapper
        const recurrenceSection = document.createElement('div');
        recurrenceSection.className = 'space-y-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60';
        recurrenceSection.id = 'alexios-recurrence-section';
        
        // Initial render
        renderRecurrenceUI(recurrenceSection);

        // Insert before Assign Task
        assignTaskContainer.parentNode.insertBefore(recurrenceSection, assignTaskContainer);
    }

    function renderRecurrenceUI(container) {
        container.innerHTML = `
            <h3 class="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2">Recurrence Configuration</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                        Update Recurrence <span class="text-red-500">*</span>
                    </label>
                    <select id="recurrence-type" class="w-full px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e] transition-colors">
                        <option value="Hourly" ${recurrenceType === 'Hourly' ? 'selected' : ''}>Hourly</option>
                        <option value="Daily" ${recurrenceType === 'Daily' ? 'selected' : ''}>Daily</option>
                        <option value="Weekly" ${recurrenceType === 'Weekly' ? 'selected' : ''}>Weekly</option>
                        <option value="Monthly" ${recurrenceType === 'Monthly' ? 'selected' : ''}>Monthly</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                        Repeat Every <span class="text-red-500">*</span>
                    </label>
                    <div class="flex items-center gap-2">
                        <input type="number" min="1" id="recurrence-interval" value="${recurrenceInterval}" class="w-24 px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e] transition-colors" />
                        <span id="recurrence-suffix" class="text-sm font-medium text-slate-600 dark:text-slate-400">
                            ${getSuffix(recurrenceType, recurrenceInterval)}
                        </span>
                    </div>
                </div>
            </div>

            <div id="recurrence-advanced-options" class="mt-4">
                ${getAdvancedOptionsHTML()}
            </div>
            
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                <label class="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                    Ends
                </label>
                <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="recurrence_end" value="Never" ${recurrenceEnd === 'Never' ? 'checked' : ''} class="w-4 h-4 text-blue-600" />
                        <span class="text-sm text-slate-600 dark:text-slate-400">Never</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="recurrence_end" value="On Date" ${recurrenceEnd === 'On Date' ? 'checked' : ''} class="w-4 h-4 text-blue-600" />
                        <span class="text-sm text-slate-600 dark:text-slate-400">On Date</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="recurrence_end" value="After Occurrences" ${recurrenceEnd === 'After Occurrences' ? 'checked' : ''} class="w-4 h-4 text-blue-600" />
                        <span class="text-sm text-slate-600 dark:text-slate-400">After occurrences</span>
                    </label>
                </div>
            </div>
        `;

        // Attach event listeners
        const typeSelect = container.querySelector('#recurrence-type');
        const intervalInput = container.querySelector('#recurrence-interval');
        const suffixSpan = container.querySelector('#recurrence-suffix');
        const advancedContainer = container.querySelector('#recurrence-advanced-options');
        const endRadios = container.querySelectorAll('input[name="recurrence_end"]');

        typeSelect.addEventListener('change', (e) => {
            recurrenceType = e.target.value;
            suffixSpan.textContent = getSuffix(recurrenceType, recurrenceInterval);
            advancedContainer.innerHTML = getAdvancedOptionsHTML();
            attachAdvancedListeners(advancedContainer);
        });

        intervalInput.addEventListener('input', (e) => {
            let val = parseInt(e.target.value, 10);
            if (isNaN(val) || val < 1) val = 1;
            recurrenceInterval = val;
            suffixSpan.textContent = getSuffix(recurrenceType, recurrenceInterval);
        });

        endRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                recurrenceEnd = e.target.value;
            });
        });
        
        attachAdvancedListeners(advancedContainer);
    }

    function getSuffix(type, interval) {
        const isPlural = interval > 1;
        switch(type) {
            case 'Hourly': return isPlural ? 'Hours' : 'Hour';
            case 'Daily': return isPlural ? 'Days' : 'Day';
            case 'Weekly': return isPlural ? 'Weeks' : 'Week';
            case 'Monthly': return isPlural ? 'Months' : 'Month';
            default: return '';
        }
    }

    function getAdvancedOptionsHTML() {
        if (recurrenceType === 'Weekly') {
            const days = [
                { id: 'sun', label: 'S' },
                { id: 'mon', label: 'M' },
                { id: 'tue', label: 'T' },
                { id: 'wed', label: 'W' },
                { id: 'thu', label: 'T' },
                { id: 'fri', label: 'F' },
                { id: 'sat', label: 'S' }
            ];
            
            return `
                <label class="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                    Repeat On
                </label>
                <div class="flex items-center gap-2">
                    ${days.map(d => `
                        <button type="button" data-day="${d.id}" class="recurrence-day-btn w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center transition-colors ${recurrenceDays.includes(d.id) ? 'bg-[#1e3a6e] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}">
                            ${d.label}
                        </button>
                    `).join('')}
                </div>
            `;
        }
        
        if (recurrenceType === 'Monthly') {
            return `
                <label class="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                    Repeat By
                </label>
                <select id="recurrence-monthly-type" class="w-full max-w-xs px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm outline-none focus:border-[#1e3a6e] transition-colors">
                    <option value="date" ${recurrenceMonthlyType === 'date' ? 'selected' : ''}>Same day of the month</option>
                    <option value="weekday" ${recurrenceMonthlyType === 'weekday' ? 'selected' : ''}>Same week day</option>
                </select>
            `;
        }

        return '';
    }
    
    function attachAdvancedListeners(container) {
        if (recurrenceType === 'Weekly') {
            const btns = container.querySelectorAll('.recurrence-day-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const day = btn.getAttribute('data-day');
                    if (recurrenceDays.includes(day)) {
                        recurrenceDays = recurrenceDays.filter(d => d !== day);
                        btn.className = "recurrence-day-btn w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center transition-colors bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700";
                    } else {
                        recurrenceDays.push(day);
                        btn.className = "recurrence-day-btn w-9 h-9 rounded-full text-sm font-bold flex items-center justify-center transition-colors bg-[#1e3a6e] text-white";
                    }
                });
            });
        }
        
        if (recurrenceType === 'Monthly') {
            const select = container.querySelector('#recurrence-monthly-type');
            if (select) {
                select.addEventListener('change', (e) => {
                    recurrenceMonthlyType = e.target.value;
                });
            }
        }
    }

    function checkAndInject() {
        const h1s = document.querySelectorAll('h1');
        let isRecurringTask = false;
        
        for (const h1 of h1s) {
            const text = h1.textContent.trim().toLowerCase();
            if (text.includes('recurring task') || text.includes('edit task')) {
                isRecurringTask = true;
                break;
            }
        }
        
        const headings = Array.from(document.querySelectorAll('h3'));
        const scheduleHeading = headings.find(h => h.textContent.trim().toLowerCase() === 'schedule') || headings.find(h => h.textContent.trim().toLowerCase() === 'assign task');
        
        if (scheduleHeading) {
            const targetContainer = scheduleHeading.parentElement;
            
            if (isRecurringTask) {
                // Ensure it's injected
                if (targetContainer && !targetContainer.hasAttribute('data-recurrence-injected')) {
                    injectRecurrenceUI(targetContainer);
                } else if (targetContainer) {
                    const injected = document.getElementById('alexios-recurrence-section');
                    if (injected) injected.style.display = 'block';
                }
            } else {
                // Remove or hide if it's not a recurring task
                if (targetContainer && targetContainer.hasAttribute('data-recurrence-injected')) {
                    const injected = document.getElementById('alexios-recurrence-section');
                    if (injected) {
                        injected.remove();
                    }
                    targetContainer.removeAttribute('data-recurrence-injected');
                }
            }
        }
    }

    // Run periodically to catch React renders
    setInterval(checkAndInject, 500);
})();
