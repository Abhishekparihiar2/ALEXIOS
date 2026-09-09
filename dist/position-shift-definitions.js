/*
 * Create Position / Job Type -> Service & Scheduling.
 *
 * Adds a repeatable "Shift Definitions" list directly under the Service
 * Duration field: each row takes a shift name, a duration and start/end
 * timings, with a + to add another and a bin to drop one.
 *
 * The dialog is rendered by the app bundle, so the block is inserted after the
 * Service Duration grid and re-rendered from local state if React replaces it
 * (which keeps whatever has been typed). State resets when the dialog closes.
 */
(function () {
    'use strict';

    var MODAL_TITLE = 'create position / job type';

    // [{ name, duration, start, end, autoDuration }]
    var shifts = [];
    var seeded = false;

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    var ICON_PLUS = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>';
    var ICON_BIN = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>';

    var blankShift = function () {
        return { name: '', duration: '', start: '', end: '', autoDuration: true };
    };

    // "22:00" -> "06:00" spans midnight, so wrap into the next day.
    var spanBetween = function (start, end) {
        var a = /^(\d{1,2}):(\d{2})$/.exec(start || '');
        var b = /^(\d{1,2}):(\d{2})$/.exec(end || '');
        if (!a || !b) return '';

        var from = (+a[1]) * 60 + (+a[2]);
        var to = (+b[1]) * 60 + (+b[2]);
        var mins = to - from;
        if (mins <= 0) mins += 24 * 60;

        var hours = Math.floor(mins / 60);
        var rest = mins % 60;
        if (!rest) return hours + 'h';
        return hours ? hours + 'h ' + rest + 'm' : rest + 'm';
    };

    // ------------------------------------------------------------- page lookup

    var findTitle = function () {
        var nodes = [].slice.call(document.querySelectorAll('h2, h3, h4, div, span, p'));
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].children.length === 0 &&
                nodes[i].textContent.trim().toLowerCase() === MODAL_TITLE) {
                return nodes[i];
            }
        }
        return null;
    };

    // The grid holding Service Duration + Begin Date, inside the create dialog
    // only (the view/edit position forms carry their own fields).
    var findAnchorGrid = function () {
        var title = findTitle();
        if (!title) return null;

        var node = title;
        for (var i = 0; i < 14 && node.parentElement; i++) {
            node = node.parentElement;
            var labels = [].slice.call(node.querySelectorAll('label'));
            for (var j = 0; j < labels.length; j++) {
                if (labels[j].textContent.trim().toLowerCase() === 'service duration') {
                    var grid = labels[j].closest('div.grid');
                    if (grid) return grid;
                }
            }
        }
        return null;
    };

    // ----------------------------------------------------------------- render

    var rowHtml = function (shift, index) {
        return '<div class="psd-row" data-row="' + index + '">' +
            '<input type="text" data-k="name" placeholder="e.g. Day Shift" value="' + esc(shift.name) + '" />' +
            '<input type="text" data-k="duration" placeholder="8h" value="' + esc(shift.duration) + '" />' +
            '<input type="time" data-k="start" value="' + esc(shift.start) + '" />' +
            '<input type="time" data-k="end" value="' + esc(shift.end) + '" />' +
            '<button type="button" class="psd-del" data-del="' + index + '" title="Remove shift">' +
            ICON_BIN + '</button>' +
            '</div>';
    };

    var render = function (block) {
        var body = shifts.length
            ? '<div class="psd-cols">' +
              '<span>Shift name</span><span>Duration</span><span>Start</span><span>End</span><span></span>' +
              '</div>' +
              shifts.map(rowHtml).join('')
            : '<div class="psd-empty">No shifts defined yet. Use <strong>Add Shift</strong> to define a shift name, its duration and timings.</div>';

        block.innerHTML =
            '<div class="psd-head">' +
            '<span class="psd-title">Shift Definitions</span>' +
            (shifts.length ? '<span class="psd-count">' + shifts.length + '</span>' : '') +
            '<button type="button" class="psd-add" data-add>' + ICON_PLUS + 'Add Shift</button>' +
            '</div>' +
            '<div class="psd-table">' + body + '</div>' +
            '<p class="psd-hint">Add a row per shift this position covers. Duration fills in from the timings, ' +
            'and can be overwritten.</p>';
    };

    var wire = function (block) {
        block.addEventListener('input', function (e) {
            var input = e.target;
            if (!input.dataset || !input.dataset.k) return;

            var row = input.closest('.psd-row');
            if (!row) return;
            var shift = shifts[Number(row.dataset.row)];
            if (!shift) return;

            input.classList.remove('is-bad');
            shift[input.dataset.k] = input.value;

            // Typing a duration by hand stops it being derived from the timings.
            if (input.dataset.k === 'duration') shift.autoDuration = false;

            if ((input.dataset.k === 'start' || input.dataset.k === 'end') && shift.autoDuration) {
                var span = spanBetween(shift.start, shift.end);
                if (span) {
                    shift.duration = span;
                    var box = row.querySelector('[data-k="duration"]');
                    if (box) box.value = span;
                }
            }
        });

        block.addEventListener('click', function (e) {
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn || !block.contains(btn)) return;

            if (btn.hasAttribute('data-add')) {
                e.preventDefault();
                shifts.push(blankShift());
                render(block);
                var rows = block.querySelectorAll('.psd-row');
                var last = rows[rows.length - 1];
                if (last) last.querySelector('[data-k="name"]').focus();
                return;
            }

            if (btn.hasAttribute('data-del')) {
                e.preventDefault();
                shifts.splice(Number(btn.getAttribute('data-del')), 1);
                render(block);
            }
        });
    };

    // ------------------------------------------------------------------- tick

    var tick = function () {
        var grid = findAnchorGrid();

        if (!grid) {
            // Dialog closed - start clean next time it opens.
            shifts = [];
            seeded = false;
            return;
        }

        if (!seeded) {
            shifts = [blankShift()];
            seeded = true;
        }

        // Already mounted in the right place?
        var existing = document.getElementById('psd-block');
        if (existing && existing.previousElementSibling === grid) return;
        if (existing) existing.remove();

        var block = document.createElement('div');
        block.id = 'psd-block';
        block.className = 'psd-block';
        render(block);
        wire(block);
        grid.parentNode.insertBefore(block, grid.nextSibling);
    };

    setInterval(tick, 400);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
