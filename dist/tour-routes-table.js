(function () {
    'use strict';

    var ICON_VIEW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    var ICON_EDIT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>';
    var CLOSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    var isToursTab = function () {
        var headingText = document.body.textContent || '';
        var active = [].slice.call(document.querySelectorAll('button')).filter(function (button) {
            return button.textContent.trim() === 'Tour Routes' &&
                /bg-blue|text-blue|border-blue/.test(String(button.className));
        })[0];
        return /Checkpoints & Tour Routes/.test(headingText || '') && !!active;
    };

    var readCard = function (card, index) {
        var buttons = [].slice.call(card.querySelectorAll('button'));
        var updateButton = buttons.filter(function (button) {
            return /\bUpdate\b/i.test(button.textContent || '');
        })[0];
        var manageButton = buttons.filter(function (button) {
            return /\bManage\b/i.test(button.textContent || '');
        })[0];
        if (!updateButton || !manageButton) return null;

        var detail = {};
        [].slice.call(card.querySelectorAll('div')).forEach(function (node) {
            var labelNode = node.querySelector('span');
            if (!labelNode) return;
            var label = labelNode.textContent.trim();
            if (!/^(Site|Assigned|Duration|Grace|Recurrence|Schedule|Checkpoints)$/i.test(label)) return;
            var valueNode = [].slice.call(node.children).filter(function (child) {
                return child !== labelNode && child.textContent.trim();
            }).pop();
            if (valueNode) detail[label] = valueNode.textContent.trim();
        });

        var name = (card.querySelector('.font-bold.text-lg') || card.querySelector('span.font-bold') || {}).textContent || 'Tour Route';
        var id = (card.querySelector('.font-mono') || {}).textContent || 'TOUR-' + (index + 1);
        var status = [].slice.call(card.querySelectorAll('span')).map(function (node) {
            return node.textContent.trim();
        }).filter(function (text) {
            return text === 'Active' || text === 'Inactive' || text === 'Draft';
        })[0] || 'Active';

        return {
            name: name.trim(),
            id: id.trim(),
            status: status,
            site: detail.Site || '-',
            assigned: detail.Assigned || '-',
            duration: detail.Duration || '-',
            grace: detail.Grace || '-',
            recurrence: detail.Recurrence || '-',
            schedule: detail.Schedule || '-',
            checkpoints: detail.Checkpoints || '-',
            updateButton: updateButton
        };
    };

    var cell = function (label, value) {
        return '<div class="trv-field"><span>' + esc(label) + '</span><strong>' + esc(value || '-') + '</strong></div>';
    };

    var openView = function (route) {
        var overlay = document.createElement('div');
        overlay.className = 'trv-modal';
        overlay.innerHTML =
            '<div class="trv-dialog" role="dialog" aria-modal="true">' +
            '<div class="trv-head"><div><h3>' + esc(route.name) + '</h3><p>' + esc(route.id) + ' · ' + esc(route.status) + '</p></div>' +
            '<button type="button" class="trv-close" title="Close">' + CLOSE + '</button></div>' +
            '<div class="trv-body">' +
            '<section><h4>Basic Details</h4><div class="trv-grid">' +
            cell('Tour Name', route.name) + cell('Tour ID', route.id) + cell('Site', route.site) + cell('Status', route.status) +
            '</div></section>' +
            '<section><h4>Assignment</h4><div class="trv-grid">' +
            cell('Assigned To', route.assigned) + cell('Assignment Type', route.assigned === 'All Qualified Guards' ? 'All Qualified Guards' : 'Configured Assignee') +
            '</div></section>' +
            '<section><h4>Timing & Instructions</h4><div class="trv-grid">' +
            cell('Estimated Duration', route.duration) + cell('Grace Period', route.grace) + cell('Special Instructions', '-') +
            '</div></section>' +
            '<section><h4>Checkpoints</h4><div class="trv-grid">' +
            cell('Route Stops', route.checkpoints) + cell('Route Order', 'Fixed Order') +
            '</div></section>' +
            '<section><h4>Schedule & Review</h4><div class="trv-grid">' +
            cell('Recurrence Type', route.recurrence) + cell('Tour Schedule', route.schedule) +
            '</div></section>' +
            '</div></div>';

        overlay.addEventListener('click', function (event) {
            if (event.target === overlay || (event.target.closest && event.target.closest('.trv-close'))) {
                overlay.remove();
            }
        });
        document.body.appendChild(overlay);
    };

    var buildTable = function (grid, routes) {
        var wrap = document.createElement('div');
        wrap.className = 'trv-table-wrap';
        wrap.innerHTML =
            '<table class="trv-table"><thead><tr>' +
            ['Tour Route', 'Site / Account', 'Assigned To', 'Duration', 'Grace', 'Recurrence', 'Schedule', 'Checkpoints', 'Status', 'Actions']
                .map(function (head) { return '<th>' + head + '</th>'; }).join('') +
            '</tr></thead><tbody></tbody></table>';

        var body = wrap.querySelector('tbody');
        routes.forEach(function (route, index) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td><strong>' + esc(route.name) + '</strong><small>' + esc(route.id) + '</small></td>' +
                '<td>' + esc(route.site) + '</td>' +
                '<td>' + esc(route.assigned) + '</td>' +
                '<td>' + esc(route.duration) + '</td>' +
                '<td>' + esc(route.grace) + '</td>' +
                '<td>' + esc(route.recurrence) + '</td>' +
                '<td>' + esc(route.schedule) + '</td>' +
                '<td>' + esc(route.checkpoints) + '</td>' +
                '<td><span class="trv-status">' + esc(route.status) + '</span></td>' +
                '<td><div class="trv-actions"><button type="button" data-view="' + index + '" title="View">' + ICON_VIEW + '<span>View</span></button><button type="button" data-edit="' + index + '" title="Edit">' + ICON_EDIT + '</button></div></td>';
            body.appendChild(tr);
        });

        wrap.addEventListener('click', function (event) {
            var button = event.target.closest ? event.target.closest('button') : null;
            if (!button) return;
            var route = routes[Number(button.getAttribute('data-view') || button.getAttribute('data-edit'))];
            if (!route) return;
            if (button.hasAttribute('data-view')) openView(route);
            if (button.hasAttribute('data-edit')) route.updateButton.click();
        });

        grid.parentElement.insertBefore(wrap, grid);
        grid.dataset.trvSource = '1';
        grid.style.display = 'none';
    };

    var enhance = function () {
        if (!isToursTab()) return;
        if (document.querySelector('.trv-table-wrap')) return;

        var candidates = [].slice.call(document.querySelectorAll('div.grid'));
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i].dataset.trvSource === '1') continue;
            var cards = [].slice.call(candidates[i].children).filter(function (child) {
                return child.textContent && /\bUpdate\b/i.test(child.textContent) && /\bManage\b/i.test(child.textContent);
            });
            if (!cards.length) continue;

            var routes = cards.map(readCard).filter(Boolean);
            if (routes.length) buildTable(candidates[i], routes);
            return;
        }
    };

    setInterval(enhance, 500);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhance);
    } else {
        enhance();
    }
})();
