/*
 * Clients & Sites view page -> "Site Assets" subsection.
 *
 * Lists everything a site holds, grouped by category, with photos and
 * descriptions. Assets can be added, edited and removed; "Other" lets the admin
 * name a new category, which then behaves like the built-in ones.
 *
 * Stored per client in localStorage (this build has no backend). Uploaded
 * pictures are downscaled on a canvas before being kept as data URLs, since
 * full-resolution photos would exhaust the storage quota after a couple of files.
 */
(function () {
    'use strict';

    var STORE_KEY = 'alexios.siteAssets.v1';

    var CATEGORIES = [
        'Fire Extinguishers',
        'Checkpoints',
        'Gates',
        'Keys',
        'Fire Panels',
        'Access Control Panels',
        'Vehicles',
        'Radios',
        'First Aid/AED',
        'Other'
    ];

    var CONDITIONS = ['Operational', 'Needs Service', 'Out of Service', 'Missing'];

    var MAX_PHOTOS = 4;
    var MAX_EDGE = 1200;

    // Sample set so the section demonstrates itself on a fresh client.
    var SEED = [
        { category: 'Fire Extinguishers', name: 'Extinguisher — Lobby L1', ref: 'FE-101', location: 'Lobby / L1', condition: 'Operational', qty: 1, lastChecked: '2026-08-03', description: 'ABC dry chemical, 10 lb. Wall-mounted beside the elevator bank. Monthly visual check logged on the tag.' },
        { category: 'Checkpoints', name: 'Main Entrance Gate', ref: 'CP-001', location: 'Main entrance', condition: 'Operational', qty: 1, lastChecked: '2026-09-08', description: 'NFC checkpoint, scanned on every patrol round.' },
        { category: 'Gates', name: 'Gate B — Vehicle Entry', ref: 'GT-002', location: 'East drive', condition: 'Needs Service', qty: 1, lastChecked: '2026-09-01', description: 'Motorised sliding gate. Intermittent fault on the safety loop — vendor call open.' },
        { category: 'Keys', name: 'Master Key Set', ref: 'KEY-A12', location: 'Guard office key box', condition: 'Operational', qty: 3, lastChecked: '2026-09-07', description: 'Three sets stamped DFC-MASTER. Signed out at shift start and returned at handover.' },
        { category: 'Fire Panels', name: 'Main Fire Alarm Panel', ref: 'FP-01', location: 'Fire control room', condition: 'Operational', qty: 1, lastChecked: '2026-09-05', description: 'Trouble log reviewed weekly. Zone map is posted inside the cabinet door.' },
        { category: 'Access Control Panels', name: 'ACP — Server Room B', ref: 'ACP-07', location: 'Level 3', condition: 'Operational', qty: 1, lastChecked: '2026-08-28', description: 'Controls the Server Room B card reader and door strike.' },
        { category: 'Vehicles', name: 'Patrol Vehicle 1', ref: 'VEH-01', location: 'Parking P1', condition: 'Operational', qty: 1, lastChecked: '2026-09-06', description: 'White SUV, unit 1. Fuel and mileage logged against the vehicle module.' },
        { category: 'Radios', name: 'Handheld Radios', ref: 'RAD-04', location: 'Guard office charging bank', condition: 'Operational', qty: 6, lastChecked: '2026-09-08', description: 'Six handhelds on the charging bank. Channel 3 is the site net.' },
        { category: 'First Aid/AED', name: 'AED Cabinet — Lobby', ref: 'AED-01', location: 'Lobby / L1', condition: 'Operational', qty: 1, lastChecked: '2026-08-20', description: 'Pad expiry 03/2027. Battery check due with the quarterly inspection.' }
    ];

    var active = false;
    var renderedFor = null;
    var filter = 'all';
    var search = '';

    // ---------------------------------------------------------------- storage

    var readStore = function () {
        try {
            return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
        } catch (e) {
            return {};
        }
    };

    var writeStore = function (data) {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    };

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    var newId = function () {
        return 'A-' + Date.now().toString(36) + Math.floor(Math.random() * 1e3).toString(36);
    };

    var recordFor = function (siteId) {
        var store = readStore();
        var rec = store[siteId];
        if (!rec) {
            rec = {
                customCategories: [],
                assets: SEED.map(function (s) {
                    return Object.assign({ id: newId(), photos: [] }, s);
                })
            };
            store[siteId] = rec;
            writeStore(store);
        }
        if (!Array.isArray(rec.assets)) rec.assets = [];
        if (!Array.isArray(rec.customCategories)) rec.customCategories = [];
        return rec;
    };

    var saveRecord = function (siteId, rec) {
        var store = readStore();
        store[siteId] = rec;
        return writeStore(store);
    };

    var categoriesFor = function (rec) {
        return CATEGORIES.concat(rec.customCategories.filter(function (c) {
            return CATEGORIES.indexOf(c) === -1;
        }));
    };

    var ICONS = {
        plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>',
        close: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
        image: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>'
    };

    // ------------------------------------------------------------ page lookup

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

    // textContent, not innerText: our panel hides the app's content with
    // display:none, and innerText skips hidden nodes. No \b anchors either -
    // textContent runs adjacent nodes together ("CenterCLT-001Regular").
    var lastSiteId = null;
    var siteIdFrom = function (content) {
        var match = (content.textContent || '').match(/CLT-\d{1,6}/);
        if (match) {
            lastSiteId = match[0];
            return match[0];
        }
        return lastSiteId || 'unknown-client';
    };

    // ------------------------------------------------------------------ render

    var SECTION_LABEL_CLS = 'text-xs font-bold uppercase tracking-widest pb-2 mb-4 ' +
        'text-blue-800 dark:text-blue-400 border-b border-slate-200 dark:border-slate-800';
    var CARD_CLS = 'p-5 rounded-2xl bg-white dark:bg-[#000000] ' +
        'border border-slate-200 dark:border-slate-800';
    var NAV_BASE_CLS = 'w-full flex items-center py-2.5 rounded-xl text-sm font-semibold ' +
        'transition-all px-3 gap-3 text-left';
    var NAV_ON_CLS = ' bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    var NAV_OFF_CLS = ' text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800';

    var conditionClass = function (condition) {
        if (condition === 'Operational') return 'sas-pill sas-pill-ok';
        if (condition === 'Needs Service') return 'sas-pill sas-pill-warn';
        return 'sas-pill sas-pill-bad';
    };

    var matches = function (asset) {
        if (filter !== 'all' && asset.category !== filter) return false;
        if (!search) return true;
        var hay = [asset.name, asset.ref, asset.location, asset.description, asset.category]
            .join(' ').toLowerCase();
        return hay.indexOf(search.toLowerCase()) !== -1;
    };

    var cardHtml = function (asset) {
        var photo = asset.photos && asset.photos.length
            ? '<img alt="' + esc(asset.name) + '" src="' + asset.photos[0] +
              '" data-photo="' + esc(asset.id) + '" />' +
              (asset.photos.length > 1
                  ? '<span class="sas-photo-more">+' + (asset.photos.length - 1) + '</span>'
                  : '')
            : '<span class="sas-photo-empty">No photo</span>';

        return '<div class="sas-card">' +
            '<div class="sas-photo">' + photo + '</div>' +
            '<div class="sas-card-body">' +
            '<button type="button" class="sas-name sas-name-btn" data-view="' + esc(asset.id) +
            '" title="View all details">' + esc(asset.name) + '</button>' +
            '<div class="sas-meta">' +
            (asset.ref ? '<span class="sas-ref">' + esc(asset.ref) + '</span>' : '') +
            (asset.location ? '<span>' + esc(asset.location) + '</span>' : '') +
            '<span class="' + conditionClass(asset.condition) + '">' + esc(asset.condition) + '</span>' +
            '</div>' +
            (asset.description ? '<p class="sas-desc">' + esc(asset.description) + '</p>' : '') +
            '</div>' +
            '<div class="sas-card-foot">' +
            '<button type="button" class="sas-link" data-edit="' + esc(asset.id) + '">Edit</button>' +
            '<button type="button" class="sas-link sas-link-danger" data-remove="' + esc(asset.id) + '">Remove</button>' +
            (Number(asset.qty) > 1 ? '<span class="sas-qty">Qty ' + esc(asset.qty) + '</span>' : '') +
            '</div>' +
            '</div>';
    };

    // Listing only, so a keystroke in the search box never replaces the input
    // itself (which would drop the caret position mid-word).
    var listHtml = function (rec) {
        var cats = categoriesFor(rec);
        var shown = rec.assets.filter(matches);

        if (!shown.length) {
            return '<div class="sas-empty">' +
                (rec.assets.length
                    ? 'No assets match this filter or search.'
                    : 'No site assets recorded yet.<br>Use <strong>Add Asset</strong> to log extinguishers, gates, keys, panels, vehicles, radios and anything else held on site.') +
                '</div>';
        }

        return cats.filter(function (c) {
            return shown.some(function (a) { return a.category === c; });
        }).map(function (c) {
            var inGroup = shown.filter(function (a) { return a.category === c; });
            return '<div class="sas-group">' +
                '<div class="sas-group-head">' + esc(c) +
                '<span class="sas-group-n">' + inGroup.length + '</span></div>' +
                '<div class="sas-grid">' + inGroup.map(cardHtml).join('') + '</div>' +
                '</div>';
        }).join('');
    };

    var panelHtml = function (rec) {
        var cats = categoriesFor(rec);

        var counts = {};
        rec.assets.forEach(function (a) {
            counts[a.category] = (counts[a.category] || 0) + 1;
        });

        var chips = '<button type="button" class="sas-chip' + (filter === 'all' ? ' is-on' : '') +
            '" data-filter="all">All<span class="sas-chip-n">' + rec.assets.length + '</span></button>' +
            cats.map(function (c) {
                return '<button type="button" class="sas-chip' + (filter === c ? ' is-on' : '') +
                    '" data-filter="' + esc(c) + '">' + esc(c) +
                    '<span class="sas-chip-n">' + (counts[c] || 0) + '</span></button>';
            }).join('');

        var groups = listHtml(rec);

        return '<div class="max-w-6xl mx-auto pb-12"><div class="p-6 space-y-6">' +
            '<div>' +
            '<div class="' + SECTION_LABEL_CLS + '">Site Assets</div>' +
            '<div class="' + CARD_CLS + '">' +
            '<div class="sas-bar">' +
            '<input type="text" class="sas-search" data-search placeholder="Search assets by name, ID, location or description..." />' +
            '<button type="button" class="sas-btn sas-btn-primary sas-btn-icon" data-add>' +
            ICONS.plus + 'Add Asset</button>' +
            '</div>' +
            '<div class="sas-chips">' + chips + '</div>' +
            '<p class="sas-hint">' + rec.assets.length + ' asset' +
            (rec.assets.length === 1 ? '' : 's') + ' recorded across ' +
            Object.keys(counts).length + ' categor' +
            (Object.keys(counts).length === 1 ? 'y' : 'ies') +
            '. Each asset holds photos, an ID, a location, a condition and a description.</p>' +
            '</div></div>' +
            '<div data-list>' + groups + '</div>' +
            '</div></div>';
    };

    // ------------------------------------------------------------ photo intake

    // Shrink to MAX_EDGE and re-encode, so several photos still fit in storage.
    var shrink = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = function () { reject(new Error('read failed')); };
            reader.onload = function () {
                var img = new Image();
                img.onerror = function () { reject(new Error('decode failed')); };
                img.onload = function () {
                    var scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
                    var w = Math.max(1, Math.round(img.width * scale));
                    var h = Math.max(1, Math.round(img.height * scale));
                    var canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                    resolve(canvas.toDataURL('image/jpeg', 0.75));
                };
                img.src = String(reader.result);
            };
            reader.readAsDataURL(file);
        });
    };

    // ------------------------------------------------------------------ dialog

    var openLightbox = function (src) {
        var box = document.createElement('div');
        box.className = 'sas-lightbox';
        box.innerHTML = '<img alt="Asset photo" src="' + src + '" />';
        box.addEventListener('click', function () {
            if (box.parentNode) box.parentNode.removeChild(box);
        });
        document.body.appendChild(box);
    };

    var prettyDate = function (value) {
        if (!value) return '';
        var parts = String(value).split('-');
        if (parts.length !== 3) return value;
        // Build in UTC so the stored yyyy-mm-dd never shifts a day by timezone.
        var when = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
        if (isNaN(when.getTime())) return value;
        return when.toLocaleDateString(undefined, {
            timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    // Read-only detail view, opened from the asset title.
    var openViewer = function (asset, onEdit) {
        var overlay = document.createElement('div');
        overlay.className = 'sas-modal';

        var value = function (v) {
            return v
                ? '<span class="sas-dl-v">' + esc(v) + '</span>'
                : '<span class="sas-dl-v is-empty">Not recorded</span>';
        };

        var photos = asset.photos || [];
        var gallery = photos.length
            ? '<div class="sas-view-hero"><img alt="' + esc(asset.name) +
              '" src="' + photos[0] + '" data-hero /></div>' +
              (photos.length > 1
                  ? '<div class="sas-view-thumbs">' + photos.map(function (src, i) {
                        return '<button type="button" class="sas-view-thumb' + (i === 0 ? ' is-on' : '') +
                            '" data-pick-photo="' + i + '"><img alt="Picture ' + (i + 1) +
                            '" src="' + src + '" /></button>';
                    }).join('') + '</div>'
                  : '')
            : '<div class="sas-view-hero"><span class="sas-photo-empty">No pictures</span></div>';

        overlay.innerHTML = '<div class="sas-dialog" role="dialog" aria-modal="true">' +
            '<div class="sas-dialog-head">' +
            '<div style="flex:1;min-width:0">' +
            '<h3 style="margin:0">' + esc(asset.name) + '</h3>' +
            '<span class="sas-view-cat">' + esc(asset.category) + '</span>' +
            '</div>' +
            '<button type="button" class="sas-dialog-close" data-cancel>' + ICONS.close + '</button>' +
            '</div>' +
            '<div class="sas-dialog-body">' +
            gallery +
            '<div class="sas-dl">' +
            '<div><span class="sas-dl-k">Asset ID / serial</span>' + value(asset.ref) + '</div>' +
            '<div><span class="sas-dl-k">Location on site</span>' + value(asset.location) + '</div>' +
            '<div><span class="sas-dl-k">Condition</span>' +
            '<span class="sas-dl-v"><span class="' + conditionClass(asset.condition) + '">' +
            esc(asset.condition) + '</span></span></div>' +
            '<div><span class="sas-dl-k">Quantity</span>' + value(String(asset.qty || 1)) + '</div>' +
            '<div><span class="sas-dl-k">Last checked</span>' + value(prettyDate(asset.lastChecked)) + '</div>' +
            '<div><span class="sas-dl-k">Pictures</span>' +
            '<span class="sas-dl-v' + (photos.length ? '' : ' is-empty') + '">' +
            (photos.length ? photos.length + (photos.length === 1 ? ' picture' : ' pictures') : 'None') +
            '</span></div>' +
            '</div>' +
            '<div class="sas-view-desc">' +
            '<span class="sas-dl-k">Description</span>' +
            (asset.description
                ? '<p>' + esc(asset.description) + '</p>'
                : '<p style="color:#475569">No description recorded.</p>') +
            '</div>' +
            '</div>' +
            '<div class="sas-dialog-foot">' +
            '<button type="button" class="sas-btn" data-cancel>Close</button>' +
            '<button type="button" class="sas-btn sas-btn-primary" data-edit-from-view>Edit Asset</button>' +
            '</div></div>';
        document.body.appendChild(overlay);

        var close = function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        };

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { close(); return; }

            var hero = overlay.querySelector('[data-hero]');
            if (e.target === hero) { openLightbox(hero.getAttribute('src')); return; }

            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.hasAttribute('data-pick-photo')) {
                var at = Number(btn.getAttribute('data-pick-photo'));
                if (hero) hero.setAttribute('src', photos[at]);
                [].slice.call(overlay.querySelectorAll('.sas-view-thumb')).forEach(function (t) {
                    t.classList.toggle('is-on', t === btn);
                });
                return;
            }

            if (btn.hasAttribute('data-cancel')) { close(); return; }

            if (btn.hasAttribute('data-edit-from-view')) {
                close();
                onEdit();
            }
        });
    };

    var openEditor = function (siteId, rec, existing, onDone) {
        var draft = existing
            ? Object.assign({}, existing, { photos: (existing.photos || []).slice() })
            : {
                id: newId(), category: CATEGORIES[0], name: '', ref: '', location: '',
                condition: 'Operational', qty: 1, lastChecked: '', description: '', photos: []
            };

        var cats = categoriesFor(rec);
        // An asset saved under a category that no longer exists keeps its own option.
        if (cats.indexOf(draft.category) === -1 && draft.category) cats = cats.concat(draft.category);

        var overlay = document.createElement('div');
        overlay.className = 'sas-modal';
        overlay.innerHTML = '<div class="sas-dialog" role="dialog" aria-modal="true">' +
            '<div class="sas-dialog-head">' +
            '<h3>' + (existing ? 'Edit Asset' : 'Add Site Asset') + '</h3>' +
            '<button type="button" class="sas-dialog-close" data-cancel>' + ICONS.close + '</button>' +
            '</div>' +
            '<div class="sas-dialog-body">' +

            '<div class="sas-field"><label class="sas-label">Category <span class="sas-req">*</span></label>' +
            '<select class="sas-select" data-f="category">' +
            cats.map(function (c) {
                return '<option value="' + esc(c) + '"' +
                    (c === draft.category ? ' selected' : '') + '>' + esc(c) + '</option>';
            }).join('') +
            '</select></div>' +

            '<div class="sas-field"><label class="sas-label">Asset name <span class="sas-req">*</span></label>' +
            '<input type="text" class="sas-input" data-f="name" placeholder="e.g. Extinguisher — Lobby L1" ' +
            'value="' + esc(draft.name) + '" /></div>' +

            '<div class="sas-row">' +
            '<div><label class="sas-label">Asset ID / serial</label>' +
            '<input type="text" class="sas-input" data-f="ref" placeholder="e.g. FE-101" value="' + esc(draft.ref) + '" /></div>' +
            '<div><label class="sas-label">Location on site</label>' +
            '<input type="text" class="sas-input" data-f="location" placeholder="e.g. Lobby / L1" value="' + esc(draft.location) + '" /></div>' +
            '</div>' +

            '<div class="sas-row">' +
            '<div><label class="sas-label">Condition</label>' +
            '<select class="sas-select" data-f="condition">' +
            CONDITIONS.map(function (c) {
                return '<option value="' + esc(c) + '"' +
                    (c === draft.condition ? ' selected' : '') + '>' + esc(c) + '</option>';
            }).join('') +
            '</select></div>' +
            '<div><label class="sas-label">Quantity</label>' +
            '<input type="number" min="1" class="sas-input" data-f="qty" value="' + esc(draft.qty || 1) + '" /></div>' +
            '</div>' +

            '<div class="sas-field"><label class="sas-label">Last checked</label>' +
            '<input type="date" class="sas-input" data-f="lastChecked" value="' + esc(draft.lastChecked) + '" /></div>' +

            '<div class="sas-field"><label class="sas-label">Description</label>' +
            '<textarea class="sas-textarea" data-f="description" ' +
            'placeholder="Make, model, capacity, servicing notes, anything a guard should know...">' +
            esc(draft.description) + '</textarea></div>' +

            '<div class="sas-field"><label class="sas-label">Pictures</label>' +
            '<div class="sas-drop">' +
            '<span style="color:#475569">' + ICONS.image + '</span>' +
            '<span class="sas-drop-text">Up to ' + MAX_PHOTOS +
            ' pictures. Large images are resized before saving.</span>' +
            '<button type="button" class="sas-btn" data-pick>Choose Pictures</button>' +
            '<input type="file" accept="image/*" multiple hidden data-file />' +
            '</div>' +
            '<div class="sas-thumbs" data-thumbs></div>' +
            '<div data-warn></div>' +
            '</div>' +

            '</div>' +
            '<div class="sas-dialog-foot">' +
            '<span class="sas-dialog-note" data-note></span>' +
            '<button type="button" class="sas-btn" data-cancel>Cancel</button>' +
            '<button type="button" class="sas-btn sas-btn-primary" data-save>' +
            (existing ? 'Save Changes' : 'Add Asset') + '</button>' +
            '</div></div>';
        document.body.appendChild(overlay);

        var field = function (name) { return overlay.querySelector('[data-f="' + name + '"]'); };
        var thumbs = overlay.querySelector('[data-thumbs]');
        var warn = overlay.querySelector('[data-warn]');
        var fileInput = overlay.querySelector('[data-file]');

        var close = function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        };

        var setWarn = function (message) {
            warn.innerHTML = message ? '<p class="sas-warn">' + esc(message) + '</p>' : '';
        };

        var drawThumbs = function () {
            thumbs.innerHTML = draft.photos.map(function (src, i) {
                return '<span class="sas-thumb"><img alt="Picture ' + (i + 1) + '" src="' + src + '" />' +
                    '<button type="button" data-drop-photo="' + i + '" title="Remove picture">&times;</button></span>';
            }).join('');
        };
        drawThumbs();

        overlay.addEventListener('change', function (e) {
            if (e.target === fileInput) {
                var files = [].slice.call(fileInput.files || []);
                fileInput.value = '';
                if (!files.length) return;

                var room = MAX_PHOTOS - draft.photos.length;
                if (room <= 0) {
                    setWarn('Up to ' + MAX_PHOTOS + ' pictures per asset. Remove one to add another.');
                    return;
                }
                var taking = files.slice(0, room);
                setWarn(files.length > room
                    ? 'Only the first ' + room + ' picture' + (room === 1 ? '' : 's') + ' were added (limit ' + MAX_PHOTOS + ').'
                    : '');

                Promise.all(taking.map(shrink)).then(function (urls) {
                    draft.photos = draft.photos.concat(urls);
                    drawThumbs();
                }).catch(function () {
                    setWarn('One of those files could not be read as an image.');
                });
            }
        });

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { close(); return; }
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.hasAttribute('data-cancel')) { close(); return; }
            if (btn.hasAttribute('data-pick')) { fileInput.click(); return; }

            // hasAttribute, not dataset: index 0 reads as a falsy "0"
            if (btn.hasAttribute('data-drop-photo')) {
                draft.photos.splice(Number(btn.getAttribute('data-drop-photo')), 1);
                drawThumbs();
                setWarn('');
                return;
            }

            if (btn.hasAttribute('data-save')) {
                var chosen = field('category').value;
                var name = field('name').value.trim();
                if (!name) {
                    field('name').classList.add('is-bad');
                    field('name').focus();
                    return;
                }

                draft.category = chosen;
                draft.name = name;
                draft.ref = field('ref').value.trim();
                draft.location = field('location').value.trim();
                draft.condition = field('condition').value;
                draft.qty = Math.max(1, parseInt(field('qty').value, 10) || 1);
                draft.lastChecked = field('lastChecked').value;
                draft.description = field('description').value.trim();

                if (existing) {
                    rec.assets = rec.assets.map(function (a) {
                        return a.id === draft.id ? draft : a;
                    });
                } else {
                    rec.assets.unshift(draft);
                }

                if (!saveRecord(siteId, rec)) {
                    setWarn('Could not save — browser storage is full. Remove a picture and try again.');
                    return;
                }
                close();
                onDone();
            }
        });

        overlay.addEventListener('input', function (e) {
            if (e.target.classList) e.target.classList.remove('is-bad');
        });
    };

    // ------------------------------------------------------------------ wiring

    var buildPanel = function (content, siteId) {
        var rec = recordFor(siteId);

        var panel = document.createElement('div');
        panel.id = 'sas-panel';
        panel.innerHTML = panelHtml(rec);

        // Swap just the listing: the toolbar and its live search input stay put.
        var renderList = function () {
            var host = panel.querySelector('[data-list]');
            if (host) host.innerHTML = listHtml(recordFor(siteId));
        };

        // Full rebuild, for changes that move the counts and category chips.
        var rerender = function () {
            var box = panel.querySelector('[data-search]');
            var focused = box && document.activeElement === box;
            panel.innerHTML = panelHtml(recordFor(siteId));
            var restored = panel.querySelector('[data-search]');
            if (restored) {
                restored.value = search;
                if (focused) restored.focus();
            }
        };

        panel.addEventListener('input', function (e) {
            if (e.target.hasAttribute && e.target.hasAttribute('data-search')) {
                search = e.target.value;
                renderList();
            }
        });

        panel.addEventListener('click', function (e) {
            var img = e.target;
            if (img.dataset && img.dataset.photo) {
                var shot = recordFor(siteId).assets.filter(function (a) {
                    return a.id === img.dataset.photo;
                })[0];
                if (shot && shot.photos && shot.photos.length) openLightbox(shot.photos[0]);
                return;
            }

            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.dataset.filter) {
                filter = btn.dataset.filter;
                [].slice.call(panel.querySelectorAll('.sas-chip')).forEach(function (chip) {
                    chip.classList.toggle('is-on', chip.dataset.filter === filter);
                });
                renderList();
                return;
            }

            if (btn.hasAttribute('data-add')) {
                openEditor(siteId, recordFor(siteId), null, rerender);
                return;
            }

            if (btn.dataset.view) {
                var seen = recordFor(siteId).assets.filter(function (a) {
                    return a.id === btn.dataset.view;
                })[0];
                if (!seen) return;
                openViewer(seen, function () {
                    var live = recordFor(siteId);
                    var fresh = live.assets.filter(function (a) { return a.id === seen.id; })[0];
                    if (fresh) openEditor(siteId, live, fresh, rerender);
                });
                return;
            }

            if (btn.dataset.edit) {
                var current = recordFor(siteId);
                var target = current.assets.filter(function (a) { return a.id === btn.dataset.edit; })[0];
                if (target) openEditor(siteId, current, target, rerender);
                return;
            }

            if (btn.dataset.remove) {
                var live = recordFor(siteId);
                var doomed = live.assets.filter(function (a) { return a.id === btn.dataset.remove; })[0];
                if (!doomed) return;
                if (!window.confirm('Remove "' + doomed.name + '" from this site’s assets?')) return;
                live.assets = live.assets.filter(function (a) { return a.id !== btn.dataset.remove; });
                saveRecord(siteId, live);
                rerender();
            }
        });

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
            var stray = document.getElementById('sas-panel');
            if (stray) stray.remove();
            return;
        }

        var siteId = siteIdFrom(p.content);

        var navBtn = document.getElementById('sas-nav-btn');
        if (!navBtn) {
            navBtn = document.createElement('button');
            navBtn.id = 'sas-nav-btn';
            navBtn.type = 'button';
            navBtn.title = 'Site Assets';
            navBtn.textContent = 'Site Assets';
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

        // Any other nav entry (including the Checklists one) takes over again.
        if (!p.list.dataset.sasWired) {
            p.list.dataset.sasWired = '1';
            p.list.addEventListener('click', function (e) {
                var b = e.target.closest ? e.target.closest('button') : null;
                if (!b || b.id === 'sas-nav-btn') return;
                active = false;
                setTimeout(tick, 0);
            }, true);
        }

        var panel = document.getElementById('sas-panel');

        if (!active) {
            p.content.classList.remove('sas-active');
            p.list.classList.remove('sas-nav-active');
            if (panel) panel.remove();
            renderedFor = null;
            return;
        }

        p.content.classList.add('sas-active');
        p.list.classList.add('sas-nav-active');

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
