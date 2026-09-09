/*
 * Create Dispatch Task: let the admin require checkpoint scans and asset checks.
 *
 * Create page  -> new "Checkpoints & Assets" section: multi-select checkpoints,
 *                 and multi-select assets with the photo requirement set inline
 *                 beside each asset. The admin only declares what is required.
 * Task view    -> new "Required Checkpoints & Assets" card that reads back what
 *                 was required and shows the photos uploaded by the guard app.
 *
 * The configuration is persisted to localStorage so the view page reflects what
 * was just created (this build has no backend). Photos are captured in the guard
 * app, so the view page renders an upload slot per asset and displays the image
 * once one is present in the task data.
 */
(function () {
    'use strict';

    var STORE_KEY = 'alexios.dispatchTaskRequirements';

    // Mirrors the checkpoint records in the Checkpoints & Tours module.
    var CHECKPOINTS = [
        { id: 'CP-001', name: 'Main Entrance Gate', type: 'NFC', site: 'Westfield Mall Group' },
        { id: 'CP-002', name: 'North Perimeter Fence', type: 'NFC', site: 'Westfield Mall Group' },
        { id: 'CP-003', name: 'Server Room B', type: 'Barcode', site: 'Downtown Financial Center' },
        { id: 'CP-004', name: 'Loading Dock A', type: 'Barcode', site: 'Downtown Financial Center' },
        { id: 'CP-005', name: 'Parking Garage L3', type: 'NFC', site: 'Harbor District Authority' },
        { id: 'CP-006', name: 'Roof Access Door', type: 'NFC', site: 'Airport Terminal C Ops' },
        { id: 'CP-007', name: 'Emergency Exit C', type: 'Barcode', site: 'Harbor District Authority' },
        { id: 'CP-008', name: 'Reception Lobby', type: 'NFC', site: 'City Hall Security Post' }
    ];

    var ASSET_PRESETS = [
        { id: 'AS-FE', name: 'Fire Extinguisher', category: 'Fire' },
        { id: 'AS-FP', name: 'Fire Alarm Panel', category: 'Fire' },
        { id: 'AS-SR', name: 'Sprinkler Riser', category: 'Fire' },
        { id: 'AS-EX', name: 'Emergency Exit Door', category: 'Doors' },
        { id: 'AS-OH', name: 'Overhead Dock Door', category: 'Doors' },
        { id: 'AS-EP', name: 'Electrical Panel', category: 'Panels' },
        { id: 'AS-AC', name: 'Access Control Reader', category: 'Panels' },
        { id: 'AS-AE', name: 'AED Cabinet', category: 'Safety' },
        { id: 'AS-CC', name: 'CCTV Camera', category: 'Safety' }
    ];

    // ---------------------------------------------------------------- state

    // checkpoints: array of checkpoint ids
    // customs:     admin-defined assets added to the picker, [{ id, name }]
    // assets:      the assets this task requires, [{ id, name, category, custom, requirePhoto }]
    //              The guard app adds `photo` (image URL / data URL) when it uploads.
    var state = { checkpoints: [], customs: [], assets: [] };

    var read = function () {
        try {
            var raw = localStorage.getItem(STORE_KEY);
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.checkpoints) || !Array.isArray(parsed.assets)) return null;
            if (!Array.isArray(parsed.customs)) parsed.customs = [];
            return parsed;
        } catch (e) {
            return null;
        }
    };

    var persist = function () {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(state));
        } catch (e) {
            /* storage unavailable - the in-page UI still works for this session */
        }
    };

    var escapeHtml = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    var findCheckpoint = function (id) {
        for (var i = 0; i < CHECKPOINTS.length; i++) {
            if (CHECKPOINTS[i].id === id) return CHECKPOINTS[i];
        }
        return null;
    };

    var findAsset = function (id) {
        for (var i = 0; i < state.assets.length; i++) {
            if (state.assets[i].id === id) return state.assets[i];
        }
        return null;
    };

    // Presets plus whatever the admin added, in one pick list.
    var assetCatalog = function () {
        return ASSET_PRESETS.concat(state.customs.map(function (c) {
            return { id: c.id, name: c.name, category: 'Custom', custom: true };
        }));
    };

    var ICON_TRASH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>';

    var openLightbox = function (src) {
        var box = document.createElement('div');
        box.className = 'dtr-lightbox';
        box.innerHTML = '<img alt="Photo uploaded from the guard app" src="' + src + '" />';
        box.addEventListener('click', function () {
            if (box.parentNode) box.parentNode.removeChild(box);
        });
        document.body.appendChild(box);
    };

    // -------------------------------------------------------- create page UI

    var SECTION_CLS = 'space-y-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60';
    var HEADING_CLS = 'text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-2';

    var checkpointOptionsHtml = function (filter) {
        var needle = (filter || '').trim().toLowerCase();
        var rows = CHECKPOINTS.filter(function (cp) {
            if (!needle) return true;
            return (cp.name + ' ' + cp.id + ' ' + cp.site).toLowerCase().indexOf(needle) !== -1;
        });
        if (!rows.length) return '<div class="dtr-empty">No checkpoints match that search.</div>';
        return rows.map(function (cp) {
            var on = state.checkpoints.indexOf(cp.id) !== -1;
            return '<label class="dtr-option">' +
                '<input type="checkbox" data-cp="' + cp.id + '"' + (on ? ' checked' : '') + ' />' +
                '<span class="dtr-option-main">' +
                '<span class="dtr-option-name">' + escapeHtml(cp.name) + '</span>' +
                '<span class="dtr-option-meta">' + escapeHtml(cp.id + ' · ' + cp.site) + '</span>' +
                '</span>' +
                '<span class="dtr-badge">' + escapeHtml(cp.type) + '</span>' +
                '</label>';
        }).join('');
    };

    // The photo requirement lives on the asset row itself, shown once it is ticked.
    // Two sibling labels (never nested) so each checkbox stays independently clickable.
    var assetOptionsHtml = function () {
        return assetCatalog().map(function (as) {
            var picked = findAsset(as.id);
            var photoToggle = picked
                ? '<label class="dtr-toggle"><input type="checkbox" data-req-photo="' + as.id + '"' +
                  (picked.requirePhoto ? ' checked' : '') + ' /> Require photo</label>'
                : '';
            var drop = as.custom
                ? '<button type="button" class="dtr-remove" data-drop="' + as.id + '" title="Remove asset">' +
                  ICON_TRASH + '</button>'
                : '';
            return '<div class="dtr-option dtr-option-row">' +
                '<label class="dtr-option-pick">' +
                '<input type="checkbox" data-asset="' + as.id + '"' + (picked ? ' checked' : '') + ' />' +
                '<span class="dtr-option-main">' +
                '<span class="dtr-option-name">' + escapeHtml(as.name) + '</span>' +
                '<span class="dtr-option-meta">' + escapeHtml(as.category) + '</span>' +
                '</span>' +
                '</label>' + photoToggle + drop +
                '</div>';
        }).join('');
    };

    var renderCreateSection = function (section) {
        var search = section.querySelector('[data-cp-search]');
        var keptSearch = search ? search.value : '';
        var focusSearch = search && document.activeElement === search;

        section.innerHTML =
            '<h3 class="' + HEADING_CLS + '">Checkpoints &amp; Assets</h3>' +

            '<div class="dtr-sub">' +
            '<div class="dtr-label">Checkpoints to Scan' +
            '<span class="dtr-count" data-cp-count>' + state.checkpoints.length + ' selected</span>' +
            '<span class="dtr-actions">' +
            '<button type="button" class="dtr-link" data-cp-all>Select all</button>' +
            '<button type="button" class="dtr-link" data-cp-none' +
            (state.checkpoints.length ? '' : ' disabled') + '>Clear</button>' +
            '</span></div>' +
            '<input type="text" class="dtr-search" data-cp-search placeholder="Search checkpoints by name, ID or site..." />' +
            '<div class="dtr-list" data-cp-list>' + checkpointOptionsHtml(keptSearch) + '</div>' +
            '<p class="dtr-hint">The assigned guard must scan every selected checkpoint before this task can be completed.</p>' +
            '</div>' +

            '<div class="dtr-sub">' +
            '<div class="dtr-label">Assets to Verify' +
            '<span class="dtr-count">' + state.assets.length + ' selected</span>' +
            '</div>' +
            '<div class="dtr-list">' + assetOptionsHtml() + '</div>' +
            '<div class="dtr-add-row">' +
            '<input type="text" class="dtr-search" data-asset-new placeholder="Add a custom asset..." />' +
            '<button type="button" class="dtr-btn" data-asset-add>Add Asset</button>' +
            '</div>' +
            '<p class="dtr-hint">Tick the assets the guard must verify. Turn on <strong>Require photo</strong> to make a photo mandatory &mdash; it is taken in the guard app and appears on the task view page once uploaded.</p>' +
            '</div>';

        var restored = section.querySelector('[data-cp-search]');
        if (restored) {
            restored.value = keptSearch;
            if (focusSearch) restored.focus();
        }
    };

    var wireCreateSection = function (section) {
        section.addEventListener('change', function (e) {
            var t = e.target;

            if (t.dataset && t.dataset.cp) {
                var id = t.dataset.cp;
                var at = state.checkpoints.indexOf(id);
                if (t.checked && at === -1) state.checkpoints.push(id);
                if (!t.checked && at !== -1) state.checkpoints.splice(at, 1);
                persist();
                renderCreateSection(section);
                return;
            }

            if (t.dataset && t.dataset.asset) {
                var wanted = t.dataset.asset;
                var entry = null;
                assetCatalog().forEach(function (a) { if (a.id === wanted) entry = a; });
                if (!entry) return;
                if (t.checked && !findAsset(entry.id)) {
                    state.assets.push({
                        id: entry.id, name: entry.name, category: entry.category,
                        custom: !!entry.custom, requirePhoto: true
                    });
                } else if (!t.checked) {
                    state.assets = state.assets.filter(function (a) { return a.id !== entry.id; });
                }
                persist();
                renderCreateSection(section);
                return;
            }

            if (t.dataset && t.dataset.reqPhoto) {
                var ap = findAsset(t.dataset.reqPhoto);
                if (ap) { ap.requirePhoto = t.checked; persist(); }
            }
        });

        section.addEventListener('input', function (e) {
            if (e.target.dataset && 'cpSearch' in e.target.dataset) {
                var list = section.querySelector('[data-cp-list]');
                if (list) list.innerHTML = checkpointOptionsHtml(e.target.value);
            }
        });

        section.addEventListener('click', function (e) {
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn || !section.contains(btn)) return;

            if (btn.hasAttribute('data-cp-all')) {
                e.preventDefault();
                state.checkpoints = CHECKPOINTS.map(function (cp) { return cp.id; });
                persist();
                renderCreateSection(section);
                return;
            }

            if (btn.hasAttribute('data-cp-none')) {
                e.preventDefault();
                state.checkpoints = [];
                persist();
                renderCreateSection(section);
                return;
            }

            if (btn.hasAttribute('data-asset-add')) {
                e.preventDefault();
                var input = section.querySelector('[data-asset-new]');
                var name = input ? input.value.trim() : '';
                if (!name) {
                    if (input) input.focus();
                    return;
                }
                var dupe = assetCatalog().some(function (a) {
                    return a.name.toLowerCase() === name.toLowerCase();
                });
                if (!dupe) {
                    var newId = 'AS-C' + Date.now().toString(36);
                    state.customs.push({ id: newId, name: name });
                    // A freshly added asset is required by default.
                    state.assets.push({
                        id: newId, name: name, category: 'Custom',
                        custom: true, requirePhoto: true
                    });
                    persist();
                }
                renderCreateSection(section);
                return;
            }

            if (btn.dataset.drop) {
                e.preventDefault();
                var dropId = btn.dataset.drop;
                state.customs = state.customs.filter(function (c) { return c.id !== dropId; });
                state.assets = state.assets.filter(function (a) { return a.id !== dropId; });
                persist();
                renderCreateSection(section);
            }
        });
    };

    var injectCreateSection = function () {
        var headings = [].slice.call(document.querySelectorAll('h1'));
        var isCreateDispatch = headings.some(function (h) {
            return h.textContent.trim().toLowerCase() === 'create dispatch task';
        });
        if (!isCreateDispatch) return;

        if (document.getElementById('dtr-create-section')) return;

        // Anchor on the Subtasks block and drop our section right after it.
        var subtasks = [].slice.call(document.querySelectorAll('h3')).find(function (h) {
            return h.textContent.trim().toLowerCase() === 'subtasks';
        });
        if (!subtasks) return;
        var anchor = subtasks.parentElement;
        if (!anchor || !anchor.parentNode) return;

        var section = document.createElement('div');
        section.id = 'dtr-create-section';
        section.className = SECTION_CLS;

        var saved = read();
        state = saved
            ? {
                checkpoints: saved.checkpoints.slice(),
                customs: saved.customs.map(function (c) { return Object.assign({}, c); }),
                assets: saved.assets.map(function (a) { return Object.assign({}, a); })
            }
            : { checkpoints: [], customs: [], assets: [] };

        renderCreateSection(section);
        wireCreateSection(section);
        anchor.parentNode.insertBefore(section, anchor.nextSibling);
    };

    // ---------------------------------------------------------- task view UI

    var viewCardHtml = function (data) {
        var parts = ['<h3 class="text-sm font-bold text-[#1e3a6e] uppercase tracking-wider mb-4">Required Checkpoints &amp; Assets</h3>'];

        if (data.checkpoints.length) {
            var cpRows = data.checkpoints.map(function (id) {
                var cp = findCheckpoint(id) || { id: id, name: id, type: '', site: '' };
                return '<div class="dtr-view-row">' +
                    '<span class="dtr-view-main">' +
                    '<span class="dtr-view-name">' + escapeHtml(cp.name) + '</span>' +
                    '<span class="dtr-view-meta">' + escapeHtml(cp.id + (cp.site ? ' · ' + cp.site : '')) +
                    (cp.type ? '<span class="dtr-badge">' + escapeHtml(cp.type) + '</span>' : '') +
                    '</span></span>' +
                    '<span class="dtr-pill dtr-pill-pending">Pending Scan</span>' +
                    '</div>';
            }).join('');
            parts.push('<div class="dtr-view-group">' +
                '<div class="dtr-view-head">Checkpoints to Scan (' + data.checkpoints.length + ')</div>' +
                cpRows + '</div>');
        }

        if (data.assets.length) {
            var anyPhoto = false;
            var asRows = data.assets.map(function (as) {
                var pills = as.requirePhoto
                    ? '<span class="dtr-pill dtr-pill-req">Photo required</span>'
                    : '';

                // Photos come from the guard app; show the slot until one arrives.
                var photo = '';
                if (as.requirePhoto) {
                    anyPhoto = true;
                    photo = as.photo
                        ? '<span class="dtr-photo"><img alt="Guard photo of ' + escapeHtml(as.name) +
                          '" src="' + as.photo + '" data-view-photo="' + as.id + '" /></span>'
                        : '<span class="dtr-photo dtr-photo-empty">Awaiting guard upload</span>';
                }

                var status = as.photo
                    ? '<span class="dtr-pill dtr-pill-done">Photo Received</span>'
                    : '<span class="dtr-pill dtr-pill-pending">Pending</span>';

                return '<div class="dtr-view-row">' +
                    '<span class="dtr-view-main">' +
                    '<span class="dtr-view-name">' + escapeHtml(as.name) + '</span>' +
                    '<span class="dtr-view-meta">' + escapeHtml(as.category || 'Custom') + pills + '</span>' +
                    '</span>' + photo + status +
                    '</div>';
            }).join('');
            parts.push('<div class="dtr-view-group">' +
                '<div class="dtr-view-head">Assets to Verify (' + data.assets.length + ')</div>' +
                asRows +
                (anyPhoto ? '<p class="dtr-hint">Photos are captured and uploaded by the guard app. Tap a photo to view it full size.</p>' : '') +
                '</div>');
        }

        return parts.join('');
    };

    // Same surface treatment as the task view's other panels.
    var CARD_CLS = 'glass-panel p-6 rounded-2xl border border-slate-200/60 ' +
        'dark:border-slate-800/60 bg-white/80 dark:bg-[#1a1f2e]/80 shadow-sm';

    // The Overview / Subtasks / Activity tab strip on the task view page.
    var findTabBar = function () {
        var bars = [].slice.call(document.querySelectorAll('.flex.space-x-6.border-b'));
        for (var i = 0; i < bars.length; i++) {
            var btns = [].slice.call(bars[i].querySelectorAll('button'));
            var hasSubtasks = btns.some(function (b) {
                return /^subtasks/i.test(b.textContent.trim());
            });
            if (hasSubtasks) return bars[i];
        }
        return null;
    };

    // The selected tab is the one carrying the underline.
    var activeTabText = function (bar) {
        var btns = [].slice.call(bar.querySelectorAll('button'));
        for (var i = 0; i < btns.length; i++) {
            if (btns[i].className.indexOf('border-b-[3px]') !== -1) {
                return btns[i].textContent.trim();
            }
        }
        return '';
    };

    // All three tabs share one content container, so a card left in it would show
    // on every tab. Mount it only while Subtasks is selected, and pull it back out
    // as soon as it is not.
    var injectViewCard = function () {
        var existing = document.getElementById('dtr-view-card');
        var bar = findTabBar();

        if (!bar) {
            if (existing) existing.remove();
            return;
        }

        // React updates the tab classes on click; re-check without waiting for the poll.
        if (!bar.dataset.dtrWired) {
            bar.dataset.dtrWired = '1';
            bar.addEventListener('click', function () { setTimeout(tick, 60); });
        }

        if (!/^subtasks/i.test(activeTabText(bar))) {
            if (existing) existing.remove();
            return;
        }

        var data = read();
        if (!data || (!data.checkpoints.length && !data.assets.length)) {
            if (existing) existing.remove();
            return;
        }
        if (existing) return;

        var panel = bar.nextElementSibling;
        if (!panel) return;

        var card = document.createElement('div');
        card.id = 'dtr-view-card';
        card.className = CARD_CLS;
        card.style.marginTop = '24px';
        card.innerHTML = viewCardHtml(data);
        card.addEventListener('click', function (e) {
            var id = e.target.dataset && e.target.dataset.viewPhoto;
            if (!id) return;
            for (var i = 0; i < data.assets.length; i++) {
                if (data.assets[i].id === id && data.assets[i].photo) {
                    openLightbox(data.assets[i].photo);
                    return;
                }
            }
        });
        // After the subtask checklist.
        panel.appendChild(card);
    };

    // ------------------------------------------------------------------ boot

    var tick = function () {
        try {
            injectCreateSection();
            injectViewCard();
        } catch (e) {
            /* keep polling even if one render throws on a transitional DOM */
        }
    };

    setInterval(tick, 500);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
