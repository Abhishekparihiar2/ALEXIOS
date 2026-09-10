/*
 * Employee Management -> employee detail -> Overview.
 *
 * The Reports Filed / Tours Completed / Shifts Worked / Skills Verified tiles are
 * rendered last in the Overview. This lifts them to the top, directly under the
 * card carrying the employee's name, by tagging the elements and letting CSS
 * order them — React keeps its own nodes where it put them.
 */
(function () {
    'use strict';

    // The Overview column, identified by carrying both the stat tiles and the
    // employee field grid (the Clients & Sites overview uses the same classes).
    var findOverview = function () {
        var wraps = [].slice.call(document.querySelectorAll('div.p-6.space-y-6'));
        for (var i = 0; i < wraps.length; i++) {
            var text = wraps[i].innerText || '';
            if (/Reports Filed/i.test(text) && /Employee ID/i.test(text)) return wraps[i];
        }
        return null;
    };

    var tick = function () {
        var wrap = findOverview();
        if (!wrap) return;

        wrap.classList.add('eos-wrap');

        [].slice.call(wrap.children).forEach(function (child) {
            var cls = String(child.className);
            var text = child.innerText || '';

            // Name card: the gradient header holding the employee's name.
            var isName = /bg-gradient-to-br/.test(cls) || /Edit Overview/.test(text);
            // Stat tiles: the grid of counters.
            var isStats = /\bgrid\b/.test(cls) && /Reports Filed/i.test(text);

            child.classList.toggle('eos-name', isName && !isStats);
            child.classList.toggle('eos-stats', isStats);
        });
    };

    setInterval(tick, 400);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
