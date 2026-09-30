(function () {
    'use strict';

    let isFormsModule = false;

    function checkIsFormsModule() {
        const hash = window.location.hash.toLowerCase();
        const path = window.location.pathname.toLowerCase();
        
        if (hash.includes('form') || path.includes('form')) return true;
        if (hash.includes('report') || path.includes('report')) return false;

        // Fallback: Check sidebar active text
        const activeElements = document.querySelectorAll('.active, [aria-current="page"], .bg-slate-800');
        for (const el of activeElements) {
            if (el.closest('aside, nav, .w-64')) {
                const txt = el.textContent.toLowerCase();
                if (txt.includes('form')) return true;
                if (txt.includes('report')) return false;
            }
        }
        
        // Also check if breadcrumbs say "Form"
        const breadcrumbs = document.querySelectorAll('nav ol li, .breadcrumb');
        for (const bc of breadcrumbs) {
            const txt = bc.textContent.toLowerCase();
            if (txt.includes('form')) return true;
            if (txt.includes('report')) return false;
        }

        return isFormsModule;
    }

    function updateTextNodes(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();
            if (tag === 'aside' || tag === 'nav' || node.getAttribute('role') === 'navigation') return;
            if (tag === 'script' || tag === 'style') return;
            if (node.className && typeof node.className === 'string' && node.className.toLowerCase().includes('sidebar')) return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (text.includes('Report') || text.includes('report')) {
                let newText = text;
                newText = newText.replace(/Create Report/g, 'Create Form');
                newText = newText.replace(/create report/gi, 'create form');
                newText = newText.replace(/\bReport\b/g, 'Form');
                newText = newText.replace(/\breport\b/g, 'form');
                newText = newText.replace(/\bReports\b/g, 'Forms');
                newText = newText.replace(/\breports\b/g, 'forms');

                if (newText !== text) {
                    node.textContent = newText;
                }
            }
        } else {
            for (let child of node.childNodes) {
                updateTextNodes(child);
            }
        }
    }

    function injectDateFields() {
        const headers = Array.from(document.querySelectorAll('h1, h2, h3'));
        const overviewHeader = headers.find(h => {
            const txt = h.textContent.toLowerCase();
            return txt.includes('forms overview') || txt === 'forms';
        });

        if (overviewHeader) {
            const container = overviewHeader.parentElement; 
            let nextEl = container.nextElementSibling;
            
            if (container.parentNode && !container.parentNode.hasAttribute('data-forms-dates-injected')) {
                container.parentNode.setAttribute('data-forms-dates-injected', 'true');
                
                const dateContainer = document.createElement('div');
                dateContainer.className = 'flex items-center gap-4 mt-4 mb-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl';
                dateContainer.innerHTML = `
                    <div class="flex flex-col">
                        <label class="text-xs font-semibold text-slate-400 mb-1.5">Start Date</label>
                        <input type="date" class="px-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div class="flex flex-col">
                        <label class="text-xs font-semibold text-slate-400 mb-1.5">End Date</label>
                        <input type="date" class="px-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-lg text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors" />
                    </div>
                `;
                
                container.parentNode.insertBefore(dateContainer, nextEl);
            }
        }
    }

    function onMutation() {
        isFormsModule = checkIsFormsModule();
        
        if (isFormsModule) {
            updateTextNodes(document.body);
            injectDateFields();
        }
    }

    let queued = false;
    const observer = new MutationObserver(() => {
        if (queued) return;
        queued = true;
        setTimeout(() => {
            queued = false;
            onMutation();
        }, 100);
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            onMutation();
            observer.observe(document.body, { childList: true, subtree: true });
        });
    } else {
        onMutation();
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
