/*
 * Security Team -> late guard cards: coverage dispatch actions.
 *
 * Adds a "Dispatch Coverage" button to any guard card flagged LATE (both the
 * dashboard Security Team quadrant and the Security Team module page). The
 * button opens a two-option flow:
 *
 *   1. Direct Standby Dispatch  - on-call guards filtered by eligibility;
 *      Dispatch assigns the shift and sends an SMS + push asking the guard to
 *      confirm they are en route.
 *   2. Emergency Broadcast Blast - converts the shift into an Emergency Open
 *      Shift and alerts every eligible off-duty guard by SMS + push.
 *
 * Nothing is actually transmitted: this is the interface for the flow, and the
 * delivery log is rendered from local state. Outcomes persist to localStorage
 * so a dispatched card keeps its status across re-renders.
 */
(function () {
    'use strict';

    var STORE_KEY = 'alexios.lateCoverage.v1';

    // On-call standby pool. `blocked` carries the eligibility reason, which is
    // what keeps a guard out of the dispatchable list.
    var STANDBY = [
        { id: 'S-102', name: 'C. Nakamura', role: 'Access Ctrl', eta: '12 min', distance: '4.2 mi', phone: '+1 (555) ••• ••42' },
        { id: 'S-118', name: 'P. Osei', role: 'Patrol / Access Ctrl', eta: '18 min', distance: '7.1 mi', phone: '+1 (555) ••• ••18' },
        { id: 'S-131', name: 'M. Delgado', role: 'Access Ctrl', eta: '24 min', distance: '9.6 mi', phone: '+1 (555) ••• ••77' },
        { id: 'S-127', name: 'H. Byrne', role: 'Access Ctrl', eta: '15 min', distance: '5.4 mi', phone: '+1 (555) ••• ••03', blocked: 'Rest period — 5h 40m remaining' },
        { id: 'S-140', name: 'V. Radich', role: 'Patrol', eta: '9 min', distance: '3.1 mi', phone: '+1 (555) ••• ••61', blocked: 'Missing cert — Access Control' },
        { id: 'S-153', name: 'E. Kowalski', role: 'Access Ctrl', eta: '21 min', distance: '8.3 mi', phone: '+1 (555) ••• ••29', blocked: 'Overtime cap reached this week' }
    ];

    var eligible = function () {
        return STANDBY.filter(function (g) { return !g.blocked; });
    };

    var blocked = function () {
        return STANDBY.filter(function (g) { return !!g.blocked; });
    };

    // ---------------------------------------------------------------- helpers

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

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
        } catch (e) {
            /* storage unavailable - the flow still works for this session */
        }
    };

    var statusFor = function (guardId) {
        return readStore()[guardId] || null;
    };

    var saveStatus = function (guardId, status) {
        var store = readStore();
        store[guardId] = status;
        writeStore(store);
    };

    var clearStatus = function (guardId) {
        var store = readStore();
        delete store[guardId];
        writeStore(store);
    };

    var initials = function (name) {
        return String(name || '').split(/[\s.]+/).filter(Boolean)
            .map(function (part) { return part[0]; }).join('').slice(0, 2).toUpperCase();
    };

    var ICONS = {
        siren: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18v-6a5 5 0 1 1 10 0v6"></path><path d="M5 21h14"></path><path d="M12 3v1"></path><path d="M4.6 6.6 4 6"></path><path d="M19.4 6.6 20 6"></path></svg>',
        user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
        radio: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2a5.9 5.9 0 0 1 0-8.4"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8a5.9 5.9 0 0 1 0 8.4"></path><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"></path></svg>',
        back: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>',
        close: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
    };

    // ------------------------------------------------------------- card lookup

    // A late card is one whose LATE badge sits inside a rounded container that
    // also carries the guard's S-id and a Sched. figure.
    var lateCards = function () {
        var found = [];
        var nodes = [].slice.call(document.querySelectorAll('span, div, p'));

        nodes.forEach(function (node) {
            if (node.children.length !== 0) return;
            if (node.textContent.trim().toUpperCase() !== 'LATE') return;

            var host = node.parentElement;
            for (var i = 0; i < 8 && host; i++) {
                var text = host.innerText || '';
                if (/rounded/.test(host.className || '') &&
                    /S-\d{3}/.test(text) && /sched/i.test(text)) {
                    if (found.indexOf(host) === -1) found.push(host);
                    return;
                }
                host = host.parentElement;
            }
        });

        return found;
    };

    // Read the shift context straight off the card so this works for any guard.
    var guardFrom = function (card) {
        var text = (card.innerText || '').split('\n')
            .map(function (l) { return l.trim(); }).filter(Boolean);

        var idMatch = (card.innerText || '').match(/S-\d{3}/);
        var id = idMatch ? idMatch[0] : '';

        var name = '';
        for (var i = 0; i < text.length; i++) {
            if (text[i] === id && i > 0) { name = text[i - 1]; break; }
        }
        if (!name) {
            var h = card.querySelector('h3, p.font-bold, .font-bold');
            name = h ? h.textContent.trim() : 'Unknown guard';
        }

        var schedMatch = (card.innerText || '').match(/sched\.?\s*\n?\s*([0-9:]+\s*(?:AM|PM)?)/i);
        var sched = schedMatch ? schedMatch[1].trim() : '';

        // Post + location only exist on the detailed card; fall back gracefully.
        var post = '';
        var location = '';
        var pin = card.querySelector('svg.lucide-map-pin');
        if (pin && pin.parentElement) {
            location = pin.parentElement.textContent.trim();
            var block = pin.closest('div');
            if (block && block.parentElement) {
                var first = block.parentElement.querySelector('p');
                if (first) post = first.textContent.trim();
            }
        }

        return { id: id, name: name, sched: sched, post: post, location: location };
    };

    // ------------------------------------------------------------------ modal

    var closeModal = function () {
        var open = document.getElementById('lca-modal');
        if (open) open.remove();
    };

    var openModal = function (guard) {
        closeModal();

        var overlay = document.createElement('div');
        overlay.id = 'lca-modal';
        overlay.className = 'lca-modal';
        overlay.innerHTML = '<div class="lca-dialog" role="dialog" aria-modal="true">' +
            '<div class="lca-head">' +
            '<button type="button" class="lca-back" data-back hidden>' + ICONS.back + '</button>' +
            '<div class="lca-head-main">' +
            '<h3 class="lca-title" data-title>Dispatch Coverage</h3>' +
            '<p class="lca-sub" data-sub></p>' +
            '</div>' +
            '<button type="button" class="lca-close" data-close>' + ICONS.close + '</button>' +
            '</div>' +
            '<div class="lca-body" data-body></div>' +
            '<div class="lca-foot" data-foot></div>' +
            '</div>';
        document.body.appendChild(overlay);

        var elTitle = overlay.querySelector('[data-title]');
        var elSub = overlay.querySelector('[data-sub]');
        var elBody = overlay.querySelector('[data-body]');
        var elFoot = overlay.querySelector('[data-foot]');
        var elBack = overlay.querySelector('[data-back]');

        var contextLine = function () {
            var bits = [guard.name];
            if (guard.id) bits.push(guard.id);
            if (guard.post) bits.push(guard.post);
            if (guard.location) bits.push(guard.location);
            if (guard.sched) bits.push('Sched. ' + guard.sched);
            return bits.join(' · ') + ' · no check-in recorded';
        };

        var goBackTo = null;

        var setStep = function (opts) {
            elTitle.textContent = opts.title;
            elSub.innerHTML = opts.sub;
            elBody.innerHTML = opts.body;
            elFoot.innerHTML = opts.foot || '';
            goBackTo = opts.back || null;
            elBack.hidden = !opts.back;
        };

        // ---- step: pick a method

        var stepChoose = function () {
            setStep({
                title: 'Dispatch Coverage',
                sub: esc(contextLine()),
                body:
                    '<button type="button" class="lca-option" data-go="dispatch">' +
                    '<span class="lca-option-head">' +
                    '<span class="lca-icon lca-icon-blue">' + ICONS.user + '</span>' +
                    '<span class="lca-option-name">Direct Standby Dispatch</span>' +
                    '</span>' +
                    '<span class="lca-option-desc">Displays available on-call guards filtered by eligibility. ' +
                    'Tapping <strong>Dispatch</strong> assigns the shift immediately and triggers an automated ' +
                    'SMS and push notification to that guard to confirm they are en route.</span>' +
                    '</button>' +
                    '<button type="button" class="lca-option" data-go="blast">' +
                    '<span class="lca-option-head">' +
                    '<span class="lca-icon lca-icon-red">' + ICONS.radio + '</span>' +
                    '<span class="lca-option-name">Emergency Broadcast Blast</span>' +
                    '</span>' +
                    '<span class="lca-option-desc">Instantly converts the shift into an <strong>Emergency Open Shift</strong> ' +
                    'and blasts an SMS/push alert to all eligible, off-duty guards.</span>' +
                    '</button>',
                foot: '<span class="lca-foot-note">' + eligible().length + ' of ' + STANDBY.length +
                    ' on-call guards currently eligible</span>' +
                    '<button type="button" class="lca-btn" data-close>Cancel</button>'
            });
        };

        // ---- step: standby list

        var guardRow = function (g) {
            var chips = g.blocked
                ? '<span class="lca-chip lca-chip-block">' + esc(g.blocked) + '</span>'
                : '<span class="lca-chip lca-chip-ok">Eligible</span>' +
                  '<span class="lca-chip">ETA ' + esc(g.eta) + '</span>' +
                  '<span class="lca-chip">' + esc(g.distance) + '</span>';

            return '<div class="lca-guard' + (g.blocked ? ' is-blocked' : '') + '">' +
                '<span class="lca-avatar">' + esc(initials(g.name)) + '</span>' +
                '<span class="lca-guard-main">' +
                '<span class="lca-guard-name">' + esc(g.name) + '</span>' +
                '<span class="lca-guard-meta">' + esc(g.id + ' · ' + g.role) + chips + '</span>' +
                '</span>' +
                (g.blocked ? '' : '<button type="button" class="lca-btn lca-btn-primary" data-dispatch="' +
                    esc(g.id) + '">Dispatch</button>') +
                '</div>';
        };

        var showBlocked = false;

        var stepDispatchList = function () {
            var rows = eligible().map(guardRow).join('');
            var blockedRows = showBlocked
                ? '<div class="lca-section-head" style="margin-top:18px">Not eligible' +
                  '<span class="lca-count">' + blocked().length + '</span></div>' +
                  blocked().map(guardRow).join('')
                : '';

            setStep({
                title: 'Direct Standby Dispatch',
                sub: 'Assigning coverage for ' + esc(guard.name) +
                     (guard.location ? ' · ' + esc(guard.location) : '') +
                     (guard.sched ? ' · ' + esc(guard.sched) : ''),
                body:
                    '<div class="lca-section-head">On-call standby' +
                    '<span class="lca-count">' + eligible().length + ' eligible</span>' +
                    '<button type="button" class="lca-link" data-toggle-blocked>' +
                    (showBlocked ? 'Hide' : 'Show') + ' ineligible (' + blocked().length + ')' +
                    '</button></div>' +
                    rows + blockedRows,
                foot: '<span class="lca-foot-note">Filtered by certification, rest period and overtime cap</span>' +
                    '<button type="button" class="lca-btn" data-close>Cancel</button>',
                back: stepChoose
            });
        };

        // ---- step: confirm one guard

        var stepConfirmDispatch = function (g) {
            setStep({
                title: 'Confirm Dispatch',
                sub: esc(g.name + ' · ' + g.id + ' · ETA ' + g.eta),
                body:
                    '<div class="lca-panel">' +
                    '<div class="lca-panel-title">Assign this shift to ' + esc(g.name) + '?</div>' +
                    '<p class="lca-panel-text">The shift is assigned immediately. ' +
                    'An automated SMS and push notification asks ' + esc(g.name) +
                    ' to confirm they are en route.</p>' +
                    '<div class="lca-kv"><span>Shift</span><span>' +
                    esc([guard.post, guard.location, guard.sched].filter(Boolean).join(' · ') || 'Uncovered shift') +
                    '</span></div>' +
                    '<div class="lca-kv"><span>Replacing</span><span>' + esc(guard.name + ' · ' + guard.id) + '</span></div>' +
                    '<div class="lca-kv"><span>Notify</span><span>' + esc(g.phone) + ' · push</span></div>' +
                    '</div>',
                foot: '<button type="button" class="lca-btn" data-back-list>Back</button>' +
                    '<button type="button" class="lca-btn lca-btn-primary" data-confirm-dispatch="' +
                    esc(g.id) + '">Confirm Dispatch</button>',
                back: stepDispatchList
            });
        };

        // ---- step: dispatch result

        var stepDispatched = function (g) {
            setStep({
                title: 'Coverage Dispatched',
                sub: esc(g.name + ' · ' + g.id + ' · assigned to ' + (guard.location || 'the open shift')),
                body:
                    '<div class="lca-panel lca-panel-ok">' +
                    '<div class="lca-panel-title">Shift assigned to ' + esc(g.name) + '</div>' +
                    '<div class="lca-kv"><span>Shift</span><span>' +
                    esc([guard.post, guard.location, guard.sched].filter(Boolean).join(' · ') || 'Uncovered shift') +
                    '</span></div>' +
                    '<div class="lca-kv"><span>ETA</span><span>' + esc(g.eta) + ' · ' + esc(g.distance) + '</span></div>' +
                    '</div>' +
                    '<ul class="lca-log">' +
                    '<li><span class="lca-log-mark is-sent">SMS</span><span>Sent to ' + esc(g.phone) +
                    '<span class="lca-quote">You have been dispatched to ' +
                    esc([guard.location, guard.sched].filter(Boolean).join(', ') || 'an open shift') +
                    '. Reply Y to confirm you are en route.</span></span></li>' +
                    '<li><span class="lca-log-mark is-sent">PUSH</span><span>Delivered to the guard app — ' +
                    'tap to confirm en route</span></li>' +
                    '<li><span class="lca-log-mark is-wait">WAIT</span><span>Awaiting en-route confirmation ' +
                    'from ' + esc(g.name) + '</span></li>' +
                    '</ul>',
                foot: '<span class="lca-foot-note">Supervisor is notified when the guard confirms</span>' +
                    '<button type="button" class="lca-btn lca-btn-primary" data-close>Done</button>'
            });
        };

        // ---- step: blast confirm + result

        var stepConfirmBlast = function () {
            var list = eligible();
            setStep({
                title: 'Emergency Broadcast Blast',
                sub: esc(contextLine()),
                body:
                    '<div class="lca-panel lca-panel-warn">' +
                    '<div class="lca-panel-title">' + ICONS.siren + ' Convert to Emergency Open Shift?</div>' +
                    '<p class="lca-panel-text">This releases the shift to <strong>' + list.length +
                    ' eligible off-duty guards</strong> at once by SMS and push. The first to accept is assigned. ' +
                    blocked().length + ' ineligible guards are excluded.</p>' +
                    '<div class="lca-kv"><span>Shift</span><span>' +
                    esc([guard.post, guard.location, guard.sched].filter(Boolean).join(' · ') || 'Uncovered shift') +
                    '</span></div>' +
                    '<div class="lca-kv"><span>Recipients</span><span>' + list.length + ' guards</span></div>' +
                    '<div class="lca-recipients">' + list.map(function (g) {
                        return '<span class="lca-chip">' + esc(g.name) + '</span>';
                    }).join('') + '</div>' +
                    '</div>',
                foot: '<button type="button" class="lca-btn" data-back-choose>Back</button>' +
                    '<button type="button" class="lca-btn lca-btn-danger" data-confirm-blast>Send Emergency Blast</button>',
                back: stepChoose
            });
        };

        var stepBlasted = function () {
            var list = eligible();
            setStep({
                title: 'Emergency Blast Sent',
                sub: esc('Emergency Open Shift · ' +
                    ([guard.post, guard.location, guard.sched].filter(Boolean).join(' · ') || 'uncovered shift')),
                body:
                    '<div class="lca-panel lca-panel-ok">' +
                    '<div class="lca-panel-title">Emergency Open Shift created</div>' +
                    '<p class="lca-panel-text">The shift is open to all eligible off-duty guards. ' +
                    'The first to accept is assigned automatically.</p>' +
                    '</div>' +
                    '<ul class="lca-log">' +
                    '<li><span class="lca-log-mark is-sent">SMS</span><span>Blasted to ' + list.length +
                    ' eligible off-duty guards' +
                    '<span class="lca-quote">EMERGENCY OPEN SHIFT — ' +
                    esc([guard.location, guard.sched].filter(Boolean).join(', ') || 'coverage needed now') +
                    '. Reply A to accept. First to accept is assigned.</span></span></li>' +
                    '<li><span class="lca-log-mark is-sent">PUSH</span><span>Alert delivered to ' +
                    list.length + ' guard apps</span></li>' +
                    '<li><span class="lca-log-mark is-wait">WAIT</span><span>Awaiting first acceptance</span></li>' +
                    '</ul>' +
                    '<div class="lca-recipients">' + list.map(function (g) {
                        return '<span class="lca-chip">' + esc(g.name + ' · ' + g.id) + '</span>';
                    }).join('') + '</div>',
                foot: '<span class="lca-foot-note">' + blocked().length + ' ineligible guards excluded</span>' +
                    '<button type="button" class="lca-btn lca-btn-primary" data-close>Done</button>'
            });
        };

        // ---- step: already actioned

        var stepExisting = function (status) {
            var isBlast = status.mode === 'blast';
            setStep({
                title: isBlast ? 'Emergency Open Shift' : 'Coverage Dispatched',
                sub: esc(contextLine()),
                body:
                    '<div class="lca-panel lca-panel-ok">' +
                    '<div class="lca-panel-title">' +
                    (isBlast ? 'Shift released to eligible off-duty guards' :
                        'Assigned to ' + esc(status.guardName)) + '</div>' +
                    '<div class="lca-kv"><span>Method</span><span>' +
                    (isBlast ? 'Emergency Broadcast Blast' : 'Direct Standby Dispatch') + '</span></div>' +
                    '<div class="lca-kv"><span>Sent</span><span>' + esc(status.at) + '</span></div>' +
                    '<div class="lca-kv"><span>State</span><span>' +
                    (isBlast ? 'Awaiting first acceptance' : 'Awaiting en-route confirmation') +
                    '</span></div>' +
                    '</div>',
                foot: '<button type="button" class="lca-btn" data-reset>Cancel Coverage</button>' +
                    '<button type="button" class="lca-btn lca-btn-primary" data-close>Done</button>'
            });
        };

        // ---- events

        var stamp = function () {
            var now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { closeModal(); return; }

            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.hasAttribute('data-close')) { closeModal(); return; }

            if (btn.hasAttribute('data-back')) {
                if (goBackTo) goBackTo();
                return;
            }
            if (btn.hasAttribute('data-back-list')) { stepDispatchList(); return; }
            if (btn.hasAttribute('data-back-choose')) { stepChoose(); return; }

            if (btn.dataset.go === 'dispatch') { stepDispatchList(); return; }
            if (btn.dataset.go === 'blast') { stepConfirmBlast(); return; }

            if (btn.hasAttribute('data-toggle-blocked')) {
                showBlocked = !showBlocked;
                stepDispatchList();
                return;
            }

            if (btn.dataset.dispatch) {
                var picked = STANDBY.filter(function (g) { return g.id === btn.dataset.dispatch; })[0];
                if (picked) stepConfirmDispatch(picked);
                return;
            }

            if (btn.dataset.confirmDispatch) {
                var chosen = STANDBY.filter(function (g) { return g.id === btn.dataset.confirmDispatch; })[0];
                if (!chosen) return;
                saveStatus(guard.id, {
                    mode: 'dispatch', guardName: chosen.name, guardId: chosen.id,
                    eta: chosen.eta, at: stamp()
                });
                stepDispatched(chosen);
                return;
            }

            if (btn.hasAttribute('data-confirm-blast')) {
                saveStatus(guard.id, {
                    mode: 'blast', recipients: eligible().length, at: stamp()
                });
                stepBlasted();
                return;
            }

            if (btn.hasAttribute('data-reset')) {
                clearStatus(guard.id);
                closeModal();
            }
        });

        var existing = statusFor(guard.id);
        if (existing) stepExisting(existing);
        else stepChoose();
    };

    // ------------------------------------------------------------------- cards

    var decorate = function (card) {
        var guard = guardFrom(card);
        if (!guard.id) return;

        var status = statusFor(guard.id);
        var wanted = status ? 'status:' + status.mode + ':' + (status.guardId || status.recipients) : 'action';
        if (card.dataset.lcaState === wanted) return;

        // Rebuild our block whenever the desired state changes.
        [].slice.call(card.querySelectorAll('.lca-action, .lca-status')).forEach(function (n) {
            n.remove();
        });
        card.dataset.lcaState = wanted;

        // The dashboard quadrant cards are much smaller than the module page's.
        var compact = card.getBoundingClientRect().width < 240;

        if (status) {
            var strip = document.createElement('div');
            strip.className = 'lca-status';
            strip.innerHTML = status.mode === 'blast'
                ? '<span class="lca-status-label">Emergency Open Shift</span>' +
                  '<span class="lca-status-detail">' + status.recipients +
                  ' guards alerted · ' + esc(status.at) + '</span>'
                : '<span class="lca-status-label">Coverage Dispatched</span>' +
                  '<span class="lca-status-detail">' + esc(status.guardName) +
                  ' · ETA ' + esc(status.eta) + '</span>';
            card.appendChild(strip);
        }

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'lca-action' + (compact ? ' is-compact' : '');
        button.innerHTML = ICONS.siren + '<span>' +
            (status ? 'View Coverage Status' : 'Dispatch Coverage') + '</span>';
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openModal(guardFrom(card));
        });
        card.appendChild(button);
    };

    var tick = function () {
        try {
            lateCards().forEach(decorate);
        } catch (e) {
            /* keep polling even if one card throws on a transitional DOM */
        }
    };

    setInterval(tick, 500);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
