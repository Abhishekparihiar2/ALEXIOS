/*
 * Clients & Sites view page -> "Checklists" subsection.
 *
 * Adds a Checklists entry to the client view's left navigation. Its panel shows
 * two sections, Clock In and Clock Out, each listing the same four checklist
 * items with an on/off toggle and a positions dropdown (multi-select by
 * checkmark) so the admin can limit an item to specific job positions.
 *
 * Config is kept per client in localStorage (this build has no backend).
 */
(function () {
    'use strict';

    var STORE_KEY = 'alexios.clientChecklists.v1';
    var POS_KEY = 'alexios.clientChecklists.positions.v1';

    var ITEMS = [
        { id: 'daily-brief', name: 'Daily Brief Acknowledgement' },
        { id: 'shift-summary', name: 'Shift Summary Acknowledgement' },
        { id: 'firearms', name: 'Firearms & Duty Gear Log' },
        { id: 'uniform-ppe', name: 'Uniform & PPE Compliance Check' }
    ];

    var PHASES = [
        { key: 'clockIn', label: 'Clock In' },
        { key: 'clockOut', label: 'Clock Out' }
    ];

    // Used until the client's own Positions / Job Types table has been seen.
    var FALLBACK_POSITIONS = [
        { id: 'POS-001', name: 'Day Shift Guard' },
        { id: 'POS-002', name: 'Night Patrol Officer' },
        { id: 'POS-003', name: 'Weekend Supervisor' }
    ];

    var SECTION_LABEL_CLS = 'text-xs font-bold uppercase tracking-widest pb-2 mb-4 ' +
        'text-blue-800 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800';
    var CARD_CLS = 'p-5 rounded-2xl bg-white dark:bg-[#000000] ' +
        'border border-slate-200 dark:border-slate-800';
    var NAV_BASE_CLS = 'w-full flex items-center py-2.5 rounded-xl text-sm font-semibold ' +
        'transition-all px-3 gap-3 text-left';
    var NAV_ON_CLS = ' bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    var NAV_OFF_CLS = ' text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800';

    var ICON_CHEVRON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>';

    var active = false;
    var renderedFor = null;

    // ---------------------------------------------------------------- storage

    var readJson = function (key) {
        try {
            return JSON.parse(localStorage.getItem(key) || '{}') || {};
        } catch (e) {
            return {};
        }
    };

    var writeJson = function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            /* storage unavailable - the in-page UI still works for this session */
        }
    };

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    var positionsFor = function (siteId) {
        var cache = readJson(POS_KEY);
        var found = cache[siteId];
        return (found && found.length) ? found : FALLBACK_POSITIONS;
    };

    // Blank config: every item off, but pre-scoped to all positions so switching
    // one on reads "All positions" rather than an empty selection.
    var blankConfig = function (siteId) {
        var all = positionsFor(siteId).map(function (p) { return p.id; });
        var cfg = {};
        PHASES.forEach(function (phase) {
            cfg[phase.key] = {};
            ITEMS.forEach(function (item) {
                cfg[phase.key][item.id] = { on: false, positions: all.slice() };
            });
        });
        return cfg;
    };

    var configFor = function (siteId) {
        var store = readJson(STORE_KEY);
        var cfg = store[siteId];
        var blank = blankConfig(siteId);
        if (!cfg) return blank;
        // Fill any gaps so a stored config from an older shape still renders.
        PHASES.forEach(function (phase) {
            if (!cfg[phase.key]) cfg[phase.key] = {};
            ITEMS.forEach(function (item) {
                var row = cfg[phase.key][item.id];
                if (!row || typeof row !== 'object') {
                    cfg[phase.key][item.id] = blank[phase.key][item.id];
                } else {
                    if (typeof row.on !== 'boolean') row.on = false;
                    if (!Array.isArray(row.positions)) row.positions = blank[phase.key][item.id].positions;
                }
            });
        });
        return cfg;
    };

    var saveConfig = function (siteId, cfg) {
        var store = readJson(STORE_KEY);
        store[siteId] = cfg;
        writeJson(STORE_KEY, store);
    };

    // ------------------------------------------------------------ page lookup

    // The client view is a w-64 nav column beside a scrolling content column.
    var parts = function () {
        var list = document.querySelector('div.p-3.space-y-1.flex.flex-col');
        if (!list) return null;

        var buttons = [].slice.call(list.children).filter(function (c) {
            return c.tagName === 'BUTTON';
        });
        var hasOverview = buttons.some(function (b) {
            return b.textContent.trim() === 'Overview';
        });
        if (!hasOverview) return null;

        var navPanel = list.closest('div.w-64');
        if (!navPanel) return null;
        var content = navPanel.nextElementSibling;
        if (!content) return null;

        return { list: list, content: content };
    };

    // textContent, not innerText: while our panel is open the app's own content is
    // hidden with display:none, and innerText skips hidden nodes.
    var lastSiteId = null;
    var siteIdFrom = function (content) {
        // No \b anchors: textContent runs adjacent nodes together ("CenterCLT-001Regular").
        var match = (content.textContent || '').match(/CLT-\d{1,6}/);
        if (match) {
            lastSiteId = match[0];
            return match[0];
        }
        return lastSiteId || 'unknown-client';
    };

    // Pick up the client's real positions whenever its table is on screen.
    var scrapePositions = function (content, siteId) {
        if ((content.textContent || '').indexOf('POSITION TITLE') === -1) return;
        var found = [];
        [].slice.call(content.querySelectorAll('tr')).forEach(function (tr) {
            var cells = [].slice.call(tr.querySelectorAll('td'));
            if (cells.length < 2) return;
            var uid = cells[0].textContent.trim();
            var title = cells[1].textContent.trim();
            if (/^POS-\d+$/.test(uid) && title) found.push({ id: uid, name: title });
        });
        if (!found.length) return;

        var cache = readJson(POS_KEY);
        var prev = cache[siteId];
        if (prev && JSON.stringify(prev) === JSON.stringify(found)) return;
        cache[siteId] = found;
        writeJson(POS_KEY, cache);
    };

    // ------------------------------------------------------------------ render

    var summaryFor = function (row, positions) {
        if (!row.on) return { text: 'Not required', warn: false };
        var count = row.positions.length;
        if (!count) return { text: 'No positions', warn: true };
        if (count >= positions.length) return { text: 'All positions', warn: false };
        return { text: count + ' of ' + positions.length + ' positions', warn: false };
    };

    var rowHtml = function (phaseKey, item, row, positions) {
        var key = phaseKey + ':' + item.id;
        var sum = summaryFor(row, positions);

        var options = positions.map(function (p) {
            var on = row.positions.indexOf(p.id) !== -1;
            return '<label class="csc-opt">' +
                '<input type="checkbox" data-pick="' + key + '" value="' + esc(p.id) + '"' +
                (on ? ' checked' : '') + ' />' +
                '<span class="csc-opt-name">' + esc(p.name) + '</span>' +
                '<span class="csc-opt-uid">' + esc(p.id) + '</span>' +
                '</label>';
        }).join('');

        return '<div class="csc-row' + (row.on ? '' : ' is-off') + '">' +
            '<label class="csc-switch" title="' + esc(item.name) + '">' +
            '<input type="checkbox" data-toggle="' + key + '"' + (row.on ? ' checked' : '') + ' />' +
            '<span class="csc-track"></span>' +
            '</label>' +
            '<span class="csc-name">' + esc(item.name) + '</span>' +
            '<span class="csc-pos">' +
            '<button type="button" class="csc-pos-btn" data-menu="' + key + '"' +
            (row.on ? '' : ' disabled') + '>' +
            '<span' + (sum.warn ? ' class="csc-warn"' : '') + '>' + esc(sum.text) + '</span>' +
            ICON_CHEVRON +
            '</button>' +
            '<span class="csc-pos-menu" data-menu-for="' + key + '" hidden>' +
            '<span class="csc-pos-actions">' +
            '<button type="button" class="csc-link" data-pick-all="' + key + '">Select all</button>' +
            '<button type="button" class="csc-link" data-pick-none="' + key + '">Clear</button>' +
            '</span>' + options +
            '</span>' +
            '</span>' +
            '</div>';
    };

    var panelHtml = function (siteId, cfg) {
        var positions = positionsFor(siteId);
        var sections = PHASES.map(function (phase) {
            var rows = ITEMS.map(function (item) {
                return rowHtml(phase.key, item, cfg[phase.key][item.id], positions);
            }).join('');
            return '<div>' +
                '<div class="' + SECTION_LABEL_CLS + '">' + esc(phase.label) + '</div>' +
                '<div class="' + CARD_CLS + '">' +
                '<div class="csc-rows">' + rows + '</div>' +
                '</div></div>';
        }).join('');

        return '<div class="max-w-6xl mx-auto pb-12"><div class="p-6 space-y-6">' +
            sections +
            '<p class="csc-hint">Enabled items appear in the guard app at clock in or clock out. ' +
            'Use the positions dropdown to limit an item to specific job positions.</p>' +
            '</div></div>';
    };

    // ------------------------------------------------------------------ wiring

    var closeMenus = function (panel, except) {
        [].slice.call(panel.querySelectorAll('.csc-pos-menu')).forEach(function (menu) {
            if (menu !== except) menu.hidden = true;
        });
    };

    var wirePanel = function (panel, siteId) {
        var cfg = configFor(siteId);
        var positions = positionsFor(siteId);

        var rowFor = function (key) {
            var bits = key.split(':');
            return cfg[bits[0]] && cfg[bits[0]][bits[1]];
        };

        // Re-render just one row so an open menu elsewhere is not disturbed.
        var refresh = function (key) {
            var bits = key.split(':');
            var item = ITEMS.filter(function (i) { return i.id === bits[1]; })[0];
            var host = panel.querySelector('[data-toggle="' + key + '"]');
            if (!host || !item) return;
            var oldRow = host.closest('.csc-row');
            var wrap = document.createElement('div');
            wrap.innerHTML = rowHtml(bits[0], item, rowFor(key), positions);
            oldRow.parentNode.replaceChild(wrap.firstChild, oldRow);
        };

        panel.addEventListener('change', function (e) {
            var t = e.target;

            if (t.dataset && t.dataset.toggle) {
                var row = rowFor(t.dataset.toggle);
                if (!row) return;
                row.on = t.checked;
                saveConfig(siteId, cfg);
                refresh(t.dataset.toggle);
                return;
            }

            if (t.dataset && t.dataset.pick) {
                var key = t.dataset.pick;
                var picked = rowFor(key);
                if (!picked) return;
                var at = picked.positions.indexOf(t.value);
                if (t.checked && at === -1) picked.positions.push(t.value);
                if (!t.checked && at !== -1) picked.positions.splice(at, 1);
                saveConfig(siteId, cfg);
                // Keep the menu open; just update the button summary.
                var btn = panel.querySelector('[data-menu="' + key + '"] span');
                var sum = summaryFor(picked, positions);
                if (btn) {
                    btn.textContent = sum.text;
                    btn.className = sum.warn ? 'csc-warn' : '';
                }
            }
        });

        panel.addEventListener('click', function (e) {
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.dataset.menu) {
                e.preventDefault();
                var menu = panel.querySelector('[data-menu-for="' + btn.dataset.menu + '"]');
                if (!menu) return;
                var willOpen = menu.hidden;
                closeMenus(panel, menu);
                menu.hidden = !willOpen;
                return;
            }

            if (btn.dataset.pickAll || btn.dataset.pickNone) {
                e.preventDefault();
                var k = btn.dataset.pickAll || btn.dataset.pickNone;
                var target = rowFor(k);
                if (!target) return;
                target.positions = btn.dataset.pickAll
                    ? positions.map(function (p) { return p.id; })
                    : [];
                saveConfig(siteId, cfg);
                refresh(k);
                var reopened = panel.querySelector('[data-menu-for="' + k + '"]');
                if (reopened) reopened.hidden = false;
            }
        });

        // Clicking anywhere else closes any open dropdown.
        if (!panel.dataset.cscOutside) {
            panel.dataset.cscOutside = '1';
            document.addEventListener('click', function (e) {
                if (!panel.isConnected) return;
                if (panel.contains(e.target) && e.target.closest('.csc-pos')) return;
                closeMenus(panel, null);
            }, true);
        }
    };

    var buildPanel = function (content, siteId) {
        var panel = document.createElement('div');
        panel.id = 'csc-panel';
        panel.innerHTML = panelHtml(siteId, configFor(siteId));
        wirePanel(panel, siteId);
        content.appendChild(panel);
        renderedFor = siteId;
        return panel;
    };

    // -------------------------------------------------------------------- tick

    var tick = function () {
        var p = parts();

        if (!p) {
            active = false;
            renderedFor = null;
            var stray = document.getElementById('csc-panel');
            if (stray) stray.remove();
            return;
        }

        var siteId = siteIdFrom(p.content);
        scrapePositions(p.content, siteId);

        // Our nav entry; React re-renders the list, so re-add when missing.
        var navBtn = document.getElementById('csc-nav-btn');
        if (!navBtn) {
            navBtn = document.createElement('button');
            navBtn.id = 'csc-nav-btn';
            navBtn.type = 'button';
            navBtn.title = 'Checklists';
            navBtn.textContent = 'Checklists';
            navBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                active = true;
                tick();
            });
            p.list.appendChild(navBtn);
        } else if (navBtn.parentElement !== p.list) {
            p.list.appendChild(navBtn);
        }
        navBtn.className = NAV_BASE_CLS + (active ? NAV_ON_CLS : NAV_OFF_CLS);

        // Any of the app's own nav entries takes over again.
        if (!p.list.dataset.cscWired) {
            p.list.dataset.cscWired = '1';
            p.list.addEventListener('click', function (e) {
                var b = e.target.closest ? e.target.closest('button') : null;
                if (!b || b.id === 'csc-nav-btn') return;
                active = false;
                setTimeout(tick, 0);
            }, true);
        }

        var panel = document.getElementById('csc-panel');

        if (!active) {
            p.content.classList.remove('csc-active');
            p.list.classList.remove('csc-nav-active');
            if (panel) panel.remove();
            renderedFor = null;
            return;
        }

        p.content.classList.add('csc-active');
        p.list.classList.add('csc-nav-active');

        if (panel && (renderedFor !== siteId || panel.parentElement !== p.content)) {
            panel.remove();
            panel = null;
        }
        if (!panel) buildPanel(p.content, siteId);
    };

    setInterval(tick, 400);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
