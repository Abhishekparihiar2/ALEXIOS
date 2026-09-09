/*
 * Clients & Sites -> Create Position / Job Type -> Requirements section.
 *
 * Adds two checkboxes below the Conditional / Soft Requirements fields:
 *   - Is Static Position
 *   - Requires Continuous Coverage
 *
 * The dialog is rendered by the app bundle, so the row is appended to the
 * existing Requirements card and re-added if React re-renders it.
 */
(function () {
    'use strict';

    var MODAL_TITLE = 'create position / job type';

    var FLAGS = [
        { id: 'prf-static', label: 'Is Static Position' },
        { id: 'prf-coverage', label: 'Requires Continuous Coverage' }
    ];

    // The lone text node carrying the dialog's title.
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

    // The card whose header reads "Requirements", searched within one subtree.
    var requirementsCardIn = function (root) {
        var divs = [].slice.call(root.querySelectorAll('div'));
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].children.length === 0 &&
                divs[i].textContent.trim().toLowerCase() === 'requirements') {
                return divs[i].parentElement;
            }
        }
        return null;
    };

    // Climb from the title until an ancestor contains the Requirements card, so
    // we only ever touch the create dialog (the view/edit forms have one too).
    var findRequirementsCard = function () {
        var title = findTitle();
        if (!title) return null;

        var node = title;
        for (var i = 0; i < 14 && node.parentElement; i++) {
            node = node.parentElement;
            var card = requirementsCardIn(node);
            if (card) return card;
        }
        return null;
    };

    var buildRow = function () {
        var row = document.createElement('div');
        row.id = 'prf-row';
        row.className = 'grid grid-cols-2 gap-4';
        row.innerHTML = FLAGS.map(function (flag) {
            return '<label class="prf-check">' +
                '<input type="checkbox" id="' + flag.id + '" />' +
                '<span>' + flag.label + '</span>' +
                '</label>';
        }).join('');

        // Highlight the row while it is ticked.
        row.addEventListener('change', function (e) {
            var box = e.target;
            if (!box || box.type !== 'checkbox') return;
            var host = box.closest('.prf-check');
            if (host) host.classList.toggle('is-on', box.checked);
        });

        return row;
    };

    var tick = function () {
        var card = findRequirementsCard();
        if (!card) return;
        if (card.querySelector('#prf-row')) return;
        card.appendChild(buildRow());
    };

    setInterval(tick, 400);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
