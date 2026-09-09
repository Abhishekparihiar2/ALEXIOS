/*
 * Security Team page -> Tickets quadrant.
 *
 * Adds a Tickets panel beside Team Activity with All Tickets / My Tickets tabs
 * and a Type / Subject / Client / Priority / SLA list. Clicking a row opens the
 * ticket detail with a Resolve Ticket button, mirroring the Tickets & Exceptions
 * module. Shift Summary moves down to its own full-width row.
 *
 * The reflow is done with CSS ordering rather than by moving nodes, so React's
 * own panels are left where it put them. Resolved state persists to
 * localStorage (this build has no backend).
 */
(function () {
    'use strict';

    var STORE_KEY = 'alexios.securityTeamTickets.resolved.v1';
    var CURRENT_USER = 'James Morrison';

    // Mirrors the ticket records in the Tickets & Exceptions module.
    var TICKETS = [
        { id: '#1165', type: 'Shift Not Closed', subject: 'Guard shift remained open after scheduled end', client: 'Downtown Financial Center', assigned: 'James Morrison', priority: 'High', status: 'Open', created: 'Aug 4, 8:15 AM', age: '42 min' },
        { id: '#1166', type: 'Panic Alert', subject: 'Emergency distress signal triggered in sector 4', client: 'Westfield Mall', assigned: 'Sarah Chen', priority: 'Critical', status: 'Open', created: 'Aug 4, 8:45 AM', age: '12 min' },
        { id: '#1167', type: 'Geofence Violation', subject: 'Guard exited perimeter during active patrol', client: 'Harbor District', assigned: 'Derek Wilson', priority: 'Medium', status: 'In Progress', created: 'Aug 4, 7:30 AM', age: '1h 27min' },
        { id: '#1168', type: 'Inactive Mobile User Alert', subject: 'No movement detected for 30 minutes', client: 'Airport Terminal C', assigned: 'Priya Patel', priority: 'Medium', status: 'Open', created: 'Aug 4, 7:55 AM', age: '1h 02min' },
        { id: '#1170', type: 'Allow Unqualified Employee to Position with Hard Requirement', subject: 'Schedule conflict: First Aid/CPR required', client: 'Downtown Financial Center', assigned: 'System', priority: 'High', status: 'Pending', created: 'Aug 4, 5:00 AM', age: '3h 57min' },
        { id: '#1171', type: 'Panic Alert', subject: 'Manual panic button activated near Loading Dock', client: 'Harbor District', assigned: 'Mike Torres', priority: 'Critical', status: 'Open', created: 'Aug 4, 8:50 AM', age: '7 min' }
    ];

    // Assignee directory: roles come from the Help Desk module's user lists,
    // shifts from the Positions / Job Types vocabulary.
    var PEOPLE = {
        'James Morrison': {
            id: 'ADM-001', role: 'Portal Administrator', type: 'Administrator',
            contact: 'james@alexios.com',
            shift: 'Admin Core Hours', start: '08:00 AM', end: '05:00 PM', hours: '9h'
        },
        'Sarah Chen': {
            id: 'S-016', role: 'Patrol Supervisor', type: 'Employee',
            contact: 'sarah.chen@alexios.com',
            shift: 'Day Shift Supervisor', start: '06:00 AM', end: '06:00 PM', hours: '12h'
        },
        'Derek Wilson': {
            id: 'S-048', role: 'Mobile Patrol', type: 'Employee',
            contact: 'derek@alexios.com',
            shift: 'Night Patrol Officer', start: '10:00 PM', end: '06:00 AM', hours: '8h'
        },
        'Priya Patel': {
            id: 'S-071', role: 'Site Inspector', type: 'Employee',
            contact: 'priya@alexios.com',
            shift: 'Day Shift Guard', start: '06:00 AM', end: '02:00 PM', hours: '8h'
        },
        'Mike Torres': {
            id: 'S-085', role: 'Response Guard', type: 'Employee',
            contact: 'mike.torres@alexios.com',
            shift: 'Swing Shift Response', start: '02:00 PM', end: '10:00 PM', hours: '8h'
        },
        'System': {
            id: '—', role: 'Raised by automation', type: 'System',
            contact: '', shift: '', start: '', end: '', hours: ''
        }
    };

    var tab = 'all';

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    var readResolved = function () {
        try {
            var raw = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
            return Array.isArray(raw) ? raw : [];
        } catch (e) {
            return [];
        }
    };

    var markResolved = function (id) {
        var list = readResolved();
        if (list.indexOf(id) === -1) list.push(id);
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(list));
        } catch (e) {
            /* storage unavailable - the flow still works for this session */
        }
    };

    var isResolved = function (id) {
        return readResolved().indexOf(id) !== -1;
    };

    var openTickets = function () {
        return TICKETS.filter(function (t) { return !isResolved(t.id); });
    };

    var mine = function () {
        return openTickets().filter(function (t) { return t.assigned === CURRENT_USER; });
    };

    var visible = function () {
        return tab === 'mine' ? mine() : openTickets();
    };

    var priorityClass = function (priority) {
        return 'stq-pill stq-p-' + String(priority).toLowerCase();
    };

    var ICON_X = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';

    // The module's own button styling, so the actions look native.
    var BTN_PRIMARY = 'px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 ' +
        'rounded-lg shadow-sm transition-colors';
    var BTN_PLAIN = 'px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg ' +
        'transition-colors dark:text-slate-300 dark:hover:bg-slate-700';

    var initials = function (name) {
        return String(name || '').split(/[\s.]+/).filter(Boolean)
            .map(function (part) { return part[0]; }).join('').slice(0, 2).toUpperCase();
    };

    // Who the ticket sits with, plus the shift they are working.
    var assignedBlock = function (ticket) {
        var who = PEOPLE[ticket.assigned];
        var isSystem = !who || who.type === 'System';

        var meta = who
            ? [who.id, who.role].concat(who.contact ? [who.contact] : []).join(' · ')
            : 'No directory record';

        var shiftPairs = (who && who.shift)
            ? '<div><span class="stq-k">Shift Title</span>' +
              '<span class="stq-v stq-v-strong">' + esc(who.shift) + '</span></div>' +
              '<div><span class="stq-k">Shift Timings</span>' +
              '<span class="stq-v">' + esc(who.start + ' – ' + who.end) +
              '<span class="stq-emp-hours">' + esc(who.hours) + '</span></span></div>'
            : '<div><span class="stq-k">Shift Title</span>' +
              '<span class="stq-v stq-v-muted">Not shift-based</span></div>' +
              '<div><span class="stq-k">Shift Timings</span>' +
              '<span class="stq-v stq-v-muted">—</span></div>';

        return '<div class="stq-emp">' +
            '<span class="stq-k">Assigned Employee</span>' +
            '<div class="stq-emp-row">' +
            '<span class="stq-emp-avatar' + (isSystem ? ' is-system' : '') + '">' +
            esc(isSystem ? 'SYS' : initials(ticket.assigned)) + '</span>' +
            '<span class="stq-emp-main">' +
            '<span class="stq-emp-name">' + esc(ticket.assigned) +
            (who ? '<span class="stq-emp-badge">' + esc(who.type) + '</span>' : '') +
            '</span>' +
            '<span class="stq-emp-meta">' + esc(meta) + '</span>' +
            '</span></div>' +
            '<div class="stq-pairs stq-emp-pairs">' + shiftPairs + '</div>' +
            '</div>';
    };

    // ------------------------------------------------------------ detail modal

    var openTicket = function (ticket, onResolved) {
        var overlay = document.createElement('div');
        overlay.className = 'stq-modal';

        var draw = function (resolved) {
            overlay.innerHTML = '<div class="stq-dialog" role="dialog" aria-modal="true">' +
                '<div class="stq-dialog-head">' +
                '<h3>Ticket ' + esc(ticket.id) + '</h3>' +
                '<button type="button" class="stq-x" data-close>' + ICON_X + '</button>' +
                '</div>' +
                '<div class="stq-dialog-body">' +
                '<div><span class="stq-k">Subject</span>' +
                '<span class="stq-v stq-v-strong">' + esc(ticket.subject) + '</span></div>' +
                '<div class="stq-pairs">' +
                '<div><span class="stq-k">Category</span><span class="stq-v stq-v-strong">' +
                esc(ticket.type) + '</span></div>' +
                '<div><span class="stq-k">Priority</span><span class="stq-v">' +
                '<span class="' + priorityClass(ticket.priority) + '">' + esc(ticket.priority) +
                '</span></span></div>' +
                '<div><span class="stq-k">Client / Site</span><span class="stq-v">' +
                esc(ticket.client) + '</span></div>' +
                '<div><span class="stq-k">Assigned</span><span class="stq-v">' +
                esc(ticket.assigned) + '</span></div>' +
                '<div><span class="stq-k">Status</span><span class="stq-v">' +
                (resolved ? 'Resolved' : esc(ticket.status)) + '</span></div>' +
                '<div><span class="stq-k">SLA / Age</span><span class="stq-v">' +
                esc(ticket.age) + '</span></div>' +
                '</div>' +
                assignedBlock(ticket) +
                (resolved
                    ? '<div class="stq-resolved">Ticket ' + esc(ticket.id) +
                      ' has been resolved and removed from the open queue.</div>'
                    : '') +
                '</div>' +
                '<div class="stq-dialog-foot">' +
                '<button type="button" class="' + BTN_PLAIN + '" data-close>Close</button>' +
                (resolved
                    ? ''
                    : '<button type="button" class="' + BTN_PRIMARY + '" data-resolve>Resolve Ticket</button>') +
                '</div></div>';
        };

        draw(isResolved(ticket.id));
        document.body.appendChild(overlay);

        var close = function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        };

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { close(); return; }
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.hasAttribute('data-close')) { close(); return; }

            if (btn.hasAttribute('data-resolve')) {
                markResolved(ticket.id);
                draw(true);
                onResolved();
            }
        });
    };

    // ------------------------------------------------------------------ render

    var rowsHtml = function () {
        var list = visible();
        if (!list.length) {
            return '<tr><td colspan="5" class="stq-empty">' +
                (tab === 'mine'
                    ? 'No open tickets are assigned to you.'
                    : 'No open tickets.') +
                '</td></tr>';
        }
        return list.map(function (t) {
            return '<tr class="stq-row" data-ticket="' + esc(t.id) + '">' +
                '<td><span class="stq-type">' + esc(t.type) + '</span></td>' +
                '<td><span class="stq-subject" title="' + esc(t.subject) + '">' +
                esc(t.subject) + '</span></td>' +
                '<td><span class="stq-client">' + esc(t.client) + '</span></td>' +
                '<td><span class="' + priorityClass(t.priority) + '">' + esc(t.priority) + '</span></td>' +
                '<td><span class="stq-sla">' + esc(t.age) + '</span></td>' +
                '</tr>';
        }).join('');
    };

    var render = function (panel) {
        panel.innerHTML =
            '<h3 class="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">' +
            '<span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> TICKETS</h3>' +
            '<div class="stq-tabs">' +
            '<button type="button" class="stq-tab' + (tab === 'all' ? ' is-on' : '') +
            '" data-tab="all">All Tickets <b>' + openTickets().length + '</b></button>' +
            '<button type="button" class="stq-tab' + (tab === 'mine' ? ' is-on' : '') +
            '" data-tab="mine">My Tickets <b>' + mine().length + '</b></button>' +
            '</div>' +
            '<div class="stq-scroll"><table class="stq-table">' +
            '<thead><tr><th>Type</th><th>Subject</th><th>Client</th><th>Priority</th><th>SLA</th></tr></thead>' +
            '<tbody>' + rowsHtml() + '</tbody>' +
            '</table></div>';
    };

    var wire = function (panel) {
        panel.addEventListener('click', function (e) {
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (btn && btn.dataset.tab) {
                tab = btn.dataset.tab;
                render(panel);
                return;
            }

            var row = e.target.closest ? e.target.closest('.stq-row') : null;
            if (!row) return;
            var ticket = TICKETS.filter(function (t) { return t.id === row.dataset.ticket; })[0];
            if (ticket) {
                openTicket(ticket, function () { render(panel); });
            }
        });
    };

    // -------------------------------------------------------------------- tick

    // The two-panel row holding Team Activity and Shift Summary.
    var findRow = function () {
        var grids = [].slice.call(document.querySelectorAll('div.grid'));
        for (var i = 0; i < grids.length; i++) {
            var text = grids[i].innerText || '';
            if (/team activity/i.test(text) && /shift summary/i.test(text)) {
                // Take the innermost such grid.
                var inner = [].slice.call(grids[i].querySelectorAll('div.grid')).filter(function (g) {
                    var t = g.innerText || '';
                    return /team activity/i.test(t) && /shift summary/i.test(t);
                });
                return inner.length ? inner[inner.length - 1] : grids[i];
            }
        }
        return null;
    };

    var tick = function () {
        var row = findRow();
        if (!row) return;

        row.classList.add('stq-grid');

        // Tag the Shift Summary panel so CSS can drop it to its own row.
        [].slice.call(row.children).forEach(function (child) {
            if (child.id === 'stq-panel') return;
            var isShift = /shift summary/i.test(child.innerText || '');
            child.classList.toggle('stq-shift', isShift);
        });

        var panel = document.getElementById('stq-panel');
        if (panel && panel.parentElement === row) return;
        if (panel) panel.remove();

        panel = document.createElement('div');
        panel.id = 'stq-panel';
        // Same surface treatment as the sibling quadrants.
        panel.className = 'border border-neutral-800 bg-transparent rounded-2xl p-4 flex flex-col';
        render(panel);
        wire(panel);
        row.appendChild(panel);
    };

    setInterval(tick, 500);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
