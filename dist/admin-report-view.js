/*
 * Reports & Incidents -> Completed Reports: the row View action.
 *
 * The table's per-row View button had no behaviour. This opens the submitted
 * report in a full detail view built from the admin panel's own task-detail
 * markup, with a Download PDF action using the same generator the Client Portal
 * uses (client-portal-pdf.js).
 *
 * Row facts (name, ID, kind, officer, site, timestamp, status) are read off the
 * table so the view cannot drift from the list. Report bodies are mocked per
 * report ID, since this build carries no submitted-report content.
 */
(function () {
    'use strict';

    var BODIES = {
        'SR-001': {
            summary: 'Routine daily activity log for the Downtown Financial Center day shift. All scheduled patrols completed, no exceptions raised.',
            detail: 'Day shift ran 08:00–16:30 with full coverage across Tower B and the parking structure. Four interior patrols were completed on schedule, each with all checkpoints scanned. The perimeter was walked twice; fence line intact and vehicle gates locked between movements.\n\nVisitor management processed 34 badges against the register with no discrepancies. Loading dock door 4 was checked physically on every patrol in line with the standing instruction on the faulty contact sensor; found closed and latched each time.\n\nNo incidents, no access denials and no maintenance faults were identified during the shift. Keys and radios were returned and signed in at 16:25.'
        },
        'SR-002': {
            summary: 'Smoke reported in the service corridor behind the food court. Fire panel activated, area evacuated as a precaution, no fire found.',
            detail: 'At 14:02 a tenant reported the smell of smoke in the service corridor behind the food court. Patrol attended within two minutes and confirmed a light haze with no visible flame.\n\nThe fire alarm panel was showing a zone fault for that area. The corridor and adjacent loading bay were cleared as a precaution at 14:06 and the fire service was called at 14:07. Mall management were notified in parallel.\n\nThe fire service attended at 14:19 and traced the haze to an overheating extraction motor in the kitchen plant space. No fire had taken hold. The motor was isolated and the area ventilated. The corridor was handed back at 14:52.\n\nNo injuries were reported. The extraction unit remains isolated pending a contractor inspection; a maintenance item has been raised against the mall facilities team.'
        },
        'SR-003': {
            summary: 'Scheduled inspection of the site vehicle. Roadworthy with two cosmetic defects noted.',
            detail: 'Vehicle inspection carried out on unit 1 at the City Hall Security Post at 09:00. Odometer reading recorded and cross-checked against the mileage log.\n\nTyres, lights, indicators, horn, wipers and washer fluid all checked and serviceable. Brake response normal on the yard test. Fluid levels within tolerance. First aid kit and fire extinguisher present, both in date.\n\nTwo cosmetic defects noted: a scuff to the rear offside bumper and a chip to the windscreen outside the swept area. Neither affects roadworthiness. Both were photographed and added to the vehicle record.\n\nVehicle returned to service at 09:35.'
        },
        'SR-004': {
            summary: 'Reported theft from a tenant suite on level 6. Report rejected for insufficient detail and resubmission requested.',
            detail: 'A tenant reported that a laptop was missing from a desk in suite 604 when they returned at 22:30. Patrol attended and secured the suite.\n\nThis report was rejected by the reviewing supervisor for insufficient detail. The following are required before resubmission: the exact time the item was last seen, the badge log extract for the level 6 lift lobby covering that window, CCTV review timestamps for the lift lobby and stair core, the serial number of the missing item, and confirmation of whether a police reference was raised.\n\nThe suite remains secured and the tenant has been advised that a follow-up report will be submitted once the above have been gathered.'
        },
        'SR-005': {
            summary: 'Hourly security report for the Westfield Mall afternoon patrol. All areas clear.',
            detail: 'Hourly patrol completed between 14:30 and 15:00. Mall concourse, service corridors, loading bay and stair cores all walked and found secure.\n\nCar park levels P1 and P2 checked; lighting fully operational and no unauthorised vehicles observed. All fire exits clear of obstruction and correctly latched.\n\nThe food court extraction area was noted as isolated following the earlier incident, with contractor signage in place. No further action taken at this patrol.\n\nNo incidents to report for this hour.'
        }
    };

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    // ------------------------------------------------------- app class strings

    var CARD = 'glass-panel p-6 rounded-2xl border border-slate-200/60 ' +
        'dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm mb-6';
    var CARD_HEAD = 'text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-4';
    var FIELD_K = 'text-xs font-bold text-slate-400 uppercase tracking-wider mb-1';
    var FIELD_V = 'font-medium text-slate-800 dark:text-slate-200 text-sm';
    var STRIP_K = 'text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400';
    var STRIP_V = 'font-bold text-slate-900 dark:text-white';
    var PILL_BASE = 'px-2.5 py-1 text-xs font-semibold rounded-full border border-transparent ';
    var PILLS = {
        Approved: PILL_BASE + 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400',
        Pending: PILL_BASE + 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
        Rejected: PILL_BASE + 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400'
    };
    var PILL_MUTED = 'px-2.5 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 ' +
        'rounded-md text-xs font-semibold';

    var ICON_BACK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-5 h-5"><path d="m15 18-6-6 6-6"></path></svg>';
    var ICON_DL = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>';

    var current = null;

    // --------------------------------------------------------- table + parsing

    var findTable = function () {
        var tables = [].slice.call(document.querySelectorAll('table'));
        for (var i = 0; i < tables.length; i++) {
            var heads = [].slice.call(tables[i].querySelectorAll('th'))
                .map(function (th) { return th.textContent.trim(); });
            if (heads.indexOf('Report Details') !== -1 && heads.indexOf('Submitted By') !== -1) {
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

    // Read one row's facts straight off the table.
    var parseRow = function (tr) {
        var cells = [].slice.call(tr.children);
        if (cells.length < 5) return null;

        var first = (cells[0].innerText || '').split('\n')
            .map(function (l) { return l.trim(); }).filter(Boolean);
        var name = first[0] || 'Report';
        var idLine = first[1] || '';
        var bits = idLine.split('•').map(function (s) { return s.trim(); });
        var id = bits[0] || '';
        var kind = bits[1] || '';

        var by = (cells[1].innerText || '').split('\n')
            .map(function (l) { return l.trim(); }).filter(Boolean).pop() || '';
        var site = (cells[2].innerText || '').trim();
        var when = (cells[3].innerText || '').trim();
        var status = (cells[4].innerText || '').trim();

        return {
            id: id, name: name, kind: kind, by: by,
            site: site, when: when, status: status
        };
    };

    // ------------------------------------------------------------------ render

    var pageHtml = function (r) {
        var body = BODIES[r.id] || {
            summary: 'No report content is held for this submission in this build.',
            detail: ''
        };
        var pill = PILLS[r.status] || PILL_MUTED;

        return '<div class="flex flex-col p-6 max-w-5xl mx-auto">' +

            '<div class="flex items-center mb-6">' +
            '<button class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl mr-4 transition-colors" data-arv-back>' +
            ICON_BACK + '</button>' +
            '<div><div class="flex items-center gap-3">' +
            '<h1 class="text-2xl font-bold text-slate-900 dark:text-white">' + esc(r.name) + '</h1>' +
            (r.kind ? '<span class="' + PILL_MUTED + '">' + esc(r.kind) + '</span>' : '') +
            '</div>' +
            '<p class="text-sm text-slate-500 mt-1 dark:text-slate-400">' +
            esc(r.id + ' · submitted by ' + r.by + ' · ' + r.when) + '</p></div>' +
            '<div class="ml-auto flex items-center gap-3">' +
            '<button class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors" data-arv-pdf>' +
            ICON_DL + ' Download PDF</button>' +
            '</div></div>' +

            '<div class="glass-panel p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm backdrop-blur-md mb-6 grid grid-cols-2 md:grid-cols-4 gap-6">' +
            '<div><div class="' + STRIP_K + '">Status</div><div class="' + STRIP_V + '">' +
            '<span class="' + pill + '">' + esc(r.status) + '</span></div></div>' +
            '<div><div class="' + STRIP_K + '">Submitted By</div><div class="' + STRIP_V + '">' +
            esc(r.by) + '</div><div class="text-xs text-slate-400 mt-1">Field officer</div></div>' +
            '<div><div class="' + STRIP_K + '">Location</div><div class="' + STRIP_V + '">' +
            esc(r.site) + '</div></div>' +
            '<div><div class="' + STRIP_K + '">Date &amp; Time</div><div class="' + STRIP_V + '">' +
            esc(r.when) + '</div></div>' +
            '</div>' +

            '<div class="' + CARD + '">' +
            '<div class="' + CARD_HEAD + '">Report Details</div>' +
            '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-8">' +
            '<div><div class="' + FIELD_K + '">Report ID</div><div class="' + FIELD_V + '">' + esc(r.id) + '</div></div>' +
            '<div><div class="' + FIELD_K + '">Report Name</div><div class="' + FIELD_V + '">' + esc(r.name) + '</div></div>' +
            '<div><div class="' + FIELD_K + '">Report Type</div><div class="' + FIELD_V + '">' + esc(r.kind || '—') + '</div></div>' +
            '<div><div class="' + FIELD_K + '">Submitted By</div><div class="' + FIELD_V + '">' + esc(r.by) + '</div></div>' +
            '<div><div class="' + FIELD_K + '">Site / Location</div><div class="' + FIELD_V + '">' + esc(r.site) + '</div></div>' +
            '<div><div class="' + FIELD_K + '">Submitted</div><div class="' + FIELD_V + '">' + esc(r.when) + '</div></div>' +
            '</div></div>' +

            '<div class="' + CARD + '">' +
            '<div class="' + CARD_HEAD + '">Summary</div>' +
            '<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">' +
            esc(body.summary) + '</p></div>' +

            (body.detail
                ? '<div class="' + CARD + '">' +
                  '<div class="' + CARD_HEAD + '">Report Content</div>' +
                  '<p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm" style="white-space:pre-wrap">' +
                  esc(body.detail) + '</p></div>'
                : '') +

            '</div>';
    };

    var downloadPdf = function (r) {
        if (!window.AlexiosPDF) return;
        var body = BODIES[r.id] || { summary: '', detail: '' };
        var sections = [{ heading: 'Summary', body: body.summary }];
        if (body.detail) sections.push({ heading: 'Report Content', body: body.detail });

        var bytes = window.AlexiosPDF.save(
            r.id + '-' + r.name.replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') + '.pdf',
            {
                title: r.name,
                subtitle: r.site + ' · ' + r.when,
                meta: [
                    ['Report ID', r.id],
                    ['Report Type', r.kind || '—'],
                    ['Submitted By', r.by],
                    ['Status', r.status]
                ],
                sections: sections,
                footer: 'Generated from the ALEXIOS admin portal'
            }
        );

        var note = document.createElement('div');
        note.className = 'arv-toast';
        note.textContent = 'PDF generated — ' + r.id + ' (' + Math.round(bytes / 1024) + ' KB)';
        document.body.appendChild(note);
        setTimeout(function () {
            note.style.opacity = '0';
            setTimeout(function () { note.remove(); }, 300);
        }, 3400);
    };

    var closeView = function () {
        var page = document.getElementById('arv-page');
        if (page) {
            var host = page.parentElement;
            page.remove();
            if (host) host.classList.remove('arv-host');
        }
        current = null;
    };

    var openView = function (report, host) {
        current = report;
        host.classList.add('arv-host');

        var page = document.createElement('div');
        page.id = 'arv-page';
        page.className = 'w-full h-full overflow-y-auto animate-in fade-in';
        page.innerHTML = pageHtml(report);

        page.addEventListener('click', function (e) {
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;
            if (btn.hasAttribute('data-arv-back')) {
                e.preventDefault();
                closeView();
                return;
            }
            if (btn.hasAttribute('data-arv-pdf')) {
                e.preventDefault();
                downloadPdf(report);
            }
        });

        host.appendChild(page);
    };

    // -------------------------------------------------------------------- tick

    var tick = function () {
        var table = findTable();

        if (!table) {
            // Left Completed Reports entirely.
            if (document.getElementById('arv-page')) closeView();
            return;
        }

        var host = hostFor(table);
        if (!host) return;

        // Re-attach the view page if React re-rendered the module underneath it.
        if (current && !document.getElementById('arv-page')) {
            openView(current, host);
            return;
        }

        // Wire each row's View button once.
        [].slice.call(table.querySelectorAll('tbody tr')).forEach(function (tr) {
            var btn = tr.querySelector('button[title="View"]');
            if (!btn || btn.dataset.arvWired) return;
            btn.dataset.arvWired = '1';
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var report = parseRow(tr);
                if (report) openView(report, hostFor(table) || host);
            }, true);
        });
    };

    setInterval(tick, 400);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
