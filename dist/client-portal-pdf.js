/*
 * Minimal PDF writer — enough to export a text report as a real PDF file.
 *
 * Hand-rolled rather than pulling in a library, so the build stays offline and
 * dependency-free. Text only (Helvetica / Helvetica-Bold, WinAnsi), with real
 * line wrapping from the Helvetica width metrics and automatic page breaks.
 *
 *   AlexiosPDF.save("report.pdf", {
 *     title: "...", subtitle: "...",
 *     meta: [["Label", "Value"], ...],
 *     sections: [{ heading: "...", body: "..." | ["...", "..."] }]
 *   });
 */
(function () {
    'use strict';

    // Helvetica advance widths per 1000 em, ASCII 32..126.
    var W = [
        278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
        556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
        1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
        667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
        333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
        556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584
    ];

    // Characters outside ASCII that the reports actually use, mapped to WinAnsi.
    var WINANSI = {
        '–': 150, '—': 151, '‘': 145, '’': 146,
        '“': 147, '”': 148, '•': 149, '·': 183,
        '°': 176, '©': 169, '®': 174, '…': 133
    };

    var toWinAnsi = function (text) {
        var out = '';
        for (var i = 0; i < text.length; i++) {
            var ch = text[i];
            var code = ch.charCodeAt(0);
            if (code >= 32 && code <= 126) out += ch;
            else if (WINANSI[ch] !== undefined) out += String.fromCharCode(WINANSI[ch]);
            else if (code >= 160 && code <= 255) out += ch;
            else if (ch === '\t') out += '    ';
            else out += ' ';
        }
        return out;
    };

    var charWidth = function (code, bold) {
        var w = (code >= 32 && code <= 126) ? W[code - 32] : 556;
        // Helvetica-Bold runs a little wider; close enough for wrapping.
        return bold ? w * 1.06 : w;
    };

    var textWidth = function (text, size, bold) {
        var total = 0;
        for (var i = 0; i < text.length; i++) {
            total += charWidth(text.charCodeAt(i), bold);
        }
        return total * size / 1000;
    };

    var wrap = function (text, size, bold, maxWidth) {
        var lines = [];
        String(text).split(/\n/).forEach(function (para) {
            var words = para.split(/\s+/).filter(function (w) { return w.length; });
            if (!words.length) { lines.push(''); return; }
            var line = '';
            words.forEach(function (word) {
                var next = line ? line + ' ' + word : word;
                if (textWidth(next, size, bold) <= maxWidth) {
                    line = next;
                } else {
                    if (line) lines.push(line);
                    // A single word longer than the line gets hard-split.
                    while (textWidth(word, size, bold) > maxWidth && word.length > 1) {
                        var cut = word.length;
                        while (cut > 1 && textWidth(word.slice(0, cut), size, bold) > maxWidth) cut--;
                        lines.push(word.slice(0, cut));
                        word = word.slice(cut);
                    }
                    line = word;
                }
            });
            if (line) lines.push(line);
        });
        return lines;
    };

    var escapeStr = function (text) {
        return text.replace(/([\\()])/g, '\\$1');
    };

    // Page geometry, in points (A4).
    var PAGE_W = 595.28;
    var PAGE_H = 841.89;
    var MARGIN = 56;
    var CONTENT_W = PAGE_W - MARGIN * 2;

    var build = function (doc) {
        var pages = [];
        var ops = [];
        var y = PAGE_H - MARGIN;

        var newPage = function () {
            if (ops.length) pages.push(ops.join('\n'));
            ops = [];
            y = PAGE_H - MARGIN;
        };

        var need = function (space) {
            if (y - space < MARGIN) newPage();
        };

        var write = function (text, opts) {
            var size = opts.size || 10;
            var bold = !!opts.bold;
            var gap = opts.gap === undefined ? size * 1.45 : opts.gap;
            var indent = opts.indent || 0;
            var grey = opts.grey;

            wrap(toWinAnsi(text), size, bold, CONTENT_W - indent).forEach(function (line) {
                need(gap);
                ops.push('BT');
                ops.push('/' + (bold ? 'F2' : 'F1') + ' ' + size + ' Tf');
                ops.push(grey ? (grey + ' ' + grey + ' ' + grey + ' rg') : '0 0 0 rg');
                ops.push((MARGIN + indent).toFixed(2) + ' ' + (y - size).toFixed(2) + ' Td');
                ops.push('(' + escapeStr(line) + ') Tj');
                ops.push('ET');
                y -= gap;
            });
        };

        var rule = function () {
            need(14);
            y -= 6;
            ops.push('0.8 0.8 0.8 RG 0.7 w');
            ops.push(MARGIN + ' ' + y.toFixed(2) + ' m ' + (PAGE_W - MARGIN) + ' ' + y.toFixed(2) + ' l S');
            y -= 10;
        };

        // ---- document body

        if (doc.title) write(doc.title, { size: 18, bold: true, gap: 24 });
        if (doc.subtitle) write(doc.subtitle, { size: 10, grey: 0.35, gap: 16 });
        rule();

        (doc.meta || []).forEach(function (pair) {
            need(15);
            var label = toWinAnsi(String(pair[0]).toUpperCase());
            ops.push('BT /F2 7.5 Tf 0.45 0.45 0.45 rg ' +
                MARGIN.toFixed(2) + ' ' + (y - 8).toFixed(2) + ' Td (' + escapeStr(label) + ') Tj ET');
            y -= 11;
            write(String(pair[1]), { size: 10.5, bold: true, gap: 17 });
        });

        (doc.sections || []).forEach(function (section) {
            rule();
            if (section.heading) write(section.heading, { size: 11.5, bold: true, gap: 19 });
            var body = Array.isArray(section.body) ? section.body : [section.body];
            body.forEach(function (para) {
                if (para === undefined || para === null || para === '') return;
                write(String(para), { size: 10, gap: 15.5, grey: 0.15 });
                y -= 4;
            });
        });

        if (doc.footer) {
            rule();
            write(doc.footer, { size: 8, grey: 0.5, gap: 12 });
        }

        newPage();
        return pages;
    };

    var assemble = function (pages) {
        var objects = [];
        var pageIds = [];
        // 1 catalog, 2 pages, 3 F1, 4 F2, then page/content pairs.
        var nextId = 5;
        pages.forEach(function () {
            pageIds.push(nextId);
            nextId += 2;
        });

        objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
        objects[2] = '<< /Type /Pages /Count ' + pages.length + ' /Kids [' +
            pageIds.map(function (id) { return id + ' 0 R'; }).join(' ') + '] >>';
        objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
        objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';

        pages.forEach(function (content, i) {
            var pageId = pageIds[i];
            var contentId = pageId + 1;
            objects[pageId] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' +
                PAGE_W.toFixed(2) + ' ' + PAGE_H.toFixed(2) + '] ' +
                '/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> ' +
                '/Contents ' + contentId + ' 0 R >>';
            objects[contentId] = '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream';
        });

        var out = '%PDF-1.4\n';
        var offsets = [];
        for (var id = 1; id < objects.length; id++) {
            if (!objects[id]) continue;
            offsets[id] = out.length;
            out += id + ' 0 obj\n' + objects[id] + '\nendobj\n';
        }

        var xrefAt = out.length;
        var count = objects.length;
        out += 'xref\n0 ' + count + '\n0000000000 65535 f \n';
        for (var j = 1; j < count; j++) {
            var off = offsets[j] || 0;
            out += ('0000000000' + off).slice(-10) + ' 00000 n \n';
        }
        out += 'trailer\n<< /Size ' + count + ' /Root 1 0 R >>\nstartxref\n' + xrefAt + '\n%%EOF';
        return out;
    };

    var toBytes = function (doc) {
        var raw = assemble(build(doc));
        var bytes = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i) & 0xff;
        return bytes;
    };

    var save = function (filename, doc) {
        var bytes = toBytes(doc);
        var blob = new Blob([bytes], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
        return bytes.length;
    };

    window.AlexiosPDF = { save: save, bytes: toBytes };
})();
