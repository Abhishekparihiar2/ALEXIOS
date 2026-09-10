/*
 * Tasks & Dispatch -> one "Shift Task" entry.
 *
 * Mock data for the case where a shift is created with tasks attached and those
 * tasks surface in the Tasks & Dispatch list. The row opens a shift detail view
 * built from the admin panel's own task-detail markup: header, status strip and
 * glass panels, carrying the shift fields, the instructions with their
 * attachment, and the shift task checklist.
 *
 * Checklist ticks persist to localStorage (this build has no backend).
 */
(function () {
    'use strict';

    var STORE_KEY = 'alexios.shiftTask.done.v1';

    var SHIFT = {
        site: 'Ritz-Carlton Tower B',
        siteSub: 'Floors 4–22 · Interior & Perimeter',
        // Task status uses the module's own vocabulary; the shift's duty state is
        // shown separately on the Shift Details card.
        status: 'In Progress',
        dutyStatus: 'On Duty',
        shiftDate: '09/10/2026',
        allDay: 'No',
        startTime: '09:00 AM',
        endTime: '06:00 PM',
        shiftTitle: 'Day Shift — Tower B',
        position: 'Armed Security Officer',
        employee: 'Michael Lambros · OFF-1024',
        employeeName: 'Michael Lambros',
        claimable: 'Yes',
        location: 'Ritz-Carlton Tower B · Floors 4–22',
        createdBy: 'James Morrison',
        createdOn: 'Sep 10, 2026',
        listDate: 'Sep 10, 2026',
        instructions: 'Maintain interior and perimeter coverage for Floors 4–22. ' +
            'Perimeter Tour A runs at 09:30 and the interior sweep at 14:00. Loading dock ' +
            'door 4 has a faulty contact sensor — check it physically on every tour until ' +
            'the contractor attends. Escalate any access-control alert to the control room ' +
            'before responding.',
        file: { name: 'Tower-B-Post-Orders-v4.pdf', meta: 'PDF · 1.2 MB' },
        tasks: [
            { id: 't1', name: 'Site opening walk-through', sub: 'All access points and alarms', time: '09:00', done: true },
            { id: 't2', name: 'Radio check with control room', sub: 'Confirm channel 4 clear', time: '09:15' },
            { id: 't3', name: 'Perimeter Tour A', sub: '12 checkpoints · exterior', time: '09:30' },
            { id: 't4', name: 'Visitor log reconciliation', sub: 'Match badges against register', time: '12:00' },
            { id: 't5', name: 'Interior sweep — Floors 4–22', sub: '8 checkpoints', time: '14:00' },
            { id: 't6', name: 'Loading dock door 4 physical check', sub: 'Sensor fault — check by hand', time: '16:00' },
            { id: 't7', name: 'End of shift summary', sub: 'Required before clock out', time: '17:45' }
        ]
    };

    var open = false;

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    // ---------------------------------------------------------------- storage

    var readDone = function () {
        try {
            var raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
            if (Array.isArray(raw)) return raw;
        } catch (e) {
            /* fall through to the seeded defaults */
        }
        return SHIFT.tasks.filter(function (t) { return t.done; }).map(function (t) { return t.id; });
    };

    var writeDone = function (list) {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(list));
        } catch (e) {
            /* storage unavailable - the view still works for this session */
        }
    };

    var isDone = function (id) {
        return readDone().indexOf(id) !== -1;
    };

    var toggleDone = function (id) {
        var list = readDone();
        var at = list.indexOf(id);
        if (at === -1) list.push(id);
        else list.splice(at, 1);
        writeDone(list);
    };

    var doneCount = function () {
        return SHIFT.tasks.filter(function (t) { return isDone(t.id); }).length;
    };

    // ------------------------------------------------------- app class strings

    var CARD = 'glass-panel p-6 rounded-2xl border border-slate-200/60 ' +
        'dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm mb-6';
    var CARD_HEAD = 'text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-4';
    var FIELD_K = 'text-xs font-bold text-slate-400 uppercase tracking-wider mb-1';
    var FIELD_V = 'font-medium text-slate-800 dark:text-slate-200 text-sm';
    var STRIP_K = 'text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400';
    var STRIP_V = 'font-bold text-slate-900 dark:text-white';
    // The module's own In Progress status pill, verbatim.
    var PILL_STATUS = 'px-2.5 py-1 text-xs font-semibold rounded-full border border-transparent ' +
        'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
    // Smaller duty badge for the shift header.
    var PILL_DUTY = 'px-2.5 py-1 text-xs font-semibold rounded-full border ' +
        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 ' +
        'dark:text-emerald-400 dark:border-emerald-800';
    var PILL_MUTED = 'px-2.5 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 ' +
        'rounded-md text-xs font-semibold';

    var ICON_BACK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-5 h-5"><path d="m15 18-6-6 6-6"></path></svg>';
    var ICON_DOC = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>';
    var ICON_DOWN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>';
    var ICON_PEN = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen w-4 h-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>';

    // ------------------------------------------------------------ page lookup

    // The Tasks & Dispatch table, identified by its own column set.
    var findTasksTable = function () {
        var tables = [].slice.call(document.querySelectorAll('table'));
        for (var i = 0; i < tables.length; i++) {
            var heads = [].slice.call(tables[i].querySelectorAll('th'))
                .map(function (th) { return th.textContent.trim(); });
            if (heads.indexOf('Task') !== -1 && heads.indexOf('Start Date') !== -1 &&
                heads.indexOf('Created By') !== -1) {
                return tables[i];
            }
        }
        return null;
    };

    var hostFor = function (node) {
        var host = node;
        while (host) {
            if (/overflow-y-auto/.test(String(host.className))) return host;
            host = host.parentElement;
        }
        return null;
    };

    // ------------------------------------------------------------------ row

    var buildRow = function () {
        var tr = document.createElement('tr');
        tr.id = 'ste-row';
        tr.className = 'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group';
        tr.innerHTML =
            '<td class="px-5 py-4">' +
            '<div class="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] xl:max-w-[300px]">' +
            esc(SHIFT.shiftTitle) + '</div>' +
            '<div class="text-xs text-slate-500 mt-0.5 flex gap-1.5 items-center dark:text-slate-400">' +
            '<span class="font-medium text-slate-600 dark:text-slate-400">Shift Task</span>' +
            '<span class="w-1 h-1 rounded-full bg-slate-300"></span>' +
            '<span class="truncate">' + esc(SHIFT.site) + '</span>' +
            '</div></td>' +
            '<td class="px-5 py-4 whitespace-nowrap">' + esc(SHIFT.listDate) + '</td>' +
            '<td class="px-5 py-4">' +
            '<div class="text-slate-900 dark:text-white font-medium truncate max-w-[140px]">' +
            esc(SHIFT.employeeName) + '</div>' +
            '<div class="text-xs text-slate-500 flex items-center gap-1 mt-0.5 dark:text-slate-400">Employee</div>' +
            '</td>' +
            '<td class="px-5 py-4 whitespace-nowrap font-medium text-slate-800 dark:text-slate-300">' +
            esc(SHIFT.createdBy) + '</td>' +
            '<td class="px-5 py-4 whitespace-nowrap"><span class="' + PILL_STATUS + '">' +
            esc(SHIFT.status) + '</span></td>' +
            '<td class="px-5 py-4 text-center"><div class="flex items-center justify-end gap-2">' +
            '<button class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 rounded-lg transition-colors" title="Edit">' +
            ICON_PEN + '</button></div></td>';

        tr.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            open = true;
            tick();
        });
        return tr;
    };

    // ---------------------------------------------------------------- detail

    var fieldHtml = function (label, value) {
        return '<div><div class="' + FIELD_K + '">' + esc(label) + '</div>' +
            '<div class="' + FIELD_V + '">' + esc(value) + '</div></div>';
    };

    var tasksHtml = function () {
        return SHIFT.tasks.map(function (t) {
            var done = isDone(t.id);
            return '<label class="ste-task' + (done ? ' is-done' : '') + '">' +
                '<input type="checkbox" data-task="' + esc(t.id) + '"' + (done ? ' checked' : '') + ' />' +
                '<span class="ste-task-main">' +
                '<span class="ste-task-name">' + esc(t.name) + '</span>' +
                '<span class="ste-task-sub">' + esc(t.sub) + '</span>' +
                '</span>' +
                '<span class="ste-task-time">' + esc(t.time) + '</span>' +
                '</label>';
        }).join('');
    };

    var pageHtml = function () {
        var done = doneCount();
        var total = SHIFT.tasks.length;
        var left = total - done;

        return '<div class="flex flex-col p-6 max-w-5xl mx-auto">' +

            // Header, matching the module's own task detail header.
            '<div class="flex items-center mb-6">' +
            '<button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl mr-4 transition-colors" data-back>' +
            ICON_BACK + '</button>' +
            '<div><div class="flex items-center gap-3">' +
            '<h1 class="text-2xl font-bold text-slate-900 dark:text-white">' + esc(SHIFT.shiftTitle) + '</h1>' +
            '<span class="' + PILL_MUTED + '">Shift Task</span></div>' +
            '<p class="text-sm text-slate-500 mt-1 dark:text-slate-400">Created by ' +
            esc(SHIFT.createdBy) + ' • ' + esc(SHIFT.createdOn) + '</p></div>' +
            '<div class="ml-auto flex items-center gap-3">' +
            '<button class="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" style="border:1.5px solid rgb(226,232,240)">Edit</button>' +
            '<button class="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm transition-colors shadow-sm font-semibold dark:border-slate-700">Change Status</button>' +
            '</div></div>' +

            // Status strip.
            '<div class="glass-panel p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm backdrop-blur-md mb-6 grid grid-cols-2 md:grid-cols-4 gap-6">' +
            '<div><div class="' + STRIP_K + '">Status</div><div class="' + STRIP_V + '">' +
            '<span class="' + PILL_STATUS + '">' + esc(SHIFT.status) + '</span></div></div>' +
            '<div><div class="' + STRIP_K + '">Assigned Employee</div><div class="' + STRIP_V + '">' +
            esc(SHIFT.employeeName) + '</div><div class="text-xs text-slate-400 mt-1">OFF-1024 · Employee</div></div>' +
            '<div><div class="' + STRIP_K + '">Start Time</div><div class="' + STRIP_V + '">' +
            esc(SHIFT.startTime) + '</div></div>' +
            '<div><div class="' + STRIP_K + '">End Time</div><div class="' + STRIP_V + '">' +
            esc(SHIFT.endTime) + '</div></div>' +
            '</div>' +

            // Shift details.
            '<div class="' + CARD + '">' +
            '<div class="' + CARD_HEAD + '">Shift Details</div>' +
            '<div class="ste-site">' +
            '<span class="ste-site-name">' + esc(SHIFT.site) + '</span>' +
            '<span class="ste-site-sub">' + esc(SHIFT.siteSub) + '</span>' +
            '<span class="ste-site-duty"><span class="' + PILL_DUTY + '">' +
            esc(SHIFT.dutyStatus) + '</span></span>' +
            '</div>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-8">' +
            fieldHtml('Shift Date', SHIFT.shiftDate) +
            fieldHtml('All Day', SHIFT.allDay) +
            fieldHtml('Start Time', SHIFT.startTime) +
            fieldHtml('End Time', SHIFT.endTime) +
            fieldHtml('Shift Title', SHIFT.shiftTitle) +
            fieldHtml('Position / Job', SHIFT.position) +
            fieldHtml('Assigned Employee', SHIFT.employee) +
            fieldHtml('Enable Users To Claim This Shift', SHIFT.claimable) +
            fieldHtml('Site / Location', SHIFT.location) +
            '</div></div>' +

            // Instructions + attachment.
            '<div class="' + CARD + '">' +
            '<div class="' + CARD_HEAD + '">Description / Instructions</div>' +
            '<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">' +
            esc(SHIFT.instructions) + '</p>' +
            '<div class="ste-file">' +
            '<span class="ste-file-icon">' + ICON_DOC + '</span>' +
            '<span class="ste-file-main">' +
            '<span class="ste-file-name">' + esc(SHIFT.file.name) + '</span>' +
            '<span class="ste-file-meta">' + esc(SHIFT.file.meta) + '</span>' +
            '</span>' +
            '<button type="button" class="ste-file-btn" data-file title="Download">' + ICON_DOWN + '</button>' +
            '</div>' +
            '<p class="ste-file-note" data-file-note hidden>Sample attachment — no file is bundled with this preview.</p>' +
            '</div>' +

            // Shift tasks.
            '<div class="' + CARD + '">' +
            '<div class="' + CARD_HEAD + '">Shift Tasks · ' + done + ' of ' + total + ' Complete</div>' +
            '<div class="ste-tasks">' + tasksHtml() + '</div>' +
            '<p class="ste-remaining">' +
            (left ? left + ' task' + (left === 1 ? '' : 's') + ' still to complete' : 'All shift tasks complete') +
            '</p>' +
            '</div>' +

            '</div>';
    };

    var buildPage = function (host) {
        var page = document.createElement('div');
        page.id = 'ste-page';
        page.className = 'w-full h-full overflow-y-auto animate-in fade-in';
        page.innerHTML = pageHtml();

        page.addEventListener('change', function (e) {
            if (!e.target.dataset || !e.target.dataset.task) return;
            toggleDone(e.target.dataset.task);
            page.innerHTML = pageHtml();
        });

        page.addEventListener('click', function (e) {
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.hasAttribute('data-back')) {
                e.preventDefault();
                open = false;
                tick();
                return;
            }

            if (btn.hasAttribute('data-file')) {
                e.preventDefault();
                var note = page.querySelector('[data-file-note]');
                if (note) note.hidden = false;
            }
        });

        host.appendChild(page);
        return page;
    };

    // ------------------------------------------------------------------ tick

    var tick = function () {
        var table = findTasksTable();

        if (!table) {
            // Left the module entirely.
            var strayPage = document.getElementById('ste-page');
            if (strayPage) {
                var host = strayPage.parentElement;
                strayPage.remove();
                if (host) host.classList.remove('ste-host');
            }
            open = false;
            return;
        }

        var host = hostFor(table);
        if (!host) return;

        // Keep our row at the top of the list.
        var body = table.querySelector('tbody');
        if (body) {
            var row = document.getElementById('ste-row');
            if (!row || row.parentElement !== body) {
                if (row) row.remove();
                body.insertBefore(buildRow(), body.firstChild);
            }
        }

        var page = document.getElementById('ste-page');

        if (!open) {
            if (page) page.remove();
            host.classList.remove('ste-host');
            return;
        }

        host.classList.add('ste-host');
        if (!page || page.parentElement !== host) {
            if (page) page.remove();
            buildPage(host);
        }
    };

    setInterval(tick, 400);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
