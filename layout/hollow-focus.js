// hollow: foco segue o mouse (carregado pelo Custom UI Style)
// quando o mouse entra numa janela, o teclado passa a digitar nela.
(() => {
    // não rouba o foco com menu, busca rápida (ctrl+p) ou diálogo abertos
    const busy = () => {
        const quick = document.querySelector('.quick-input-widget');
        if (quick && quick.offsetParent !== null && getComputedStyle(quick).display !== 'none') return true;
        if (document.querySelector('.context-view .monaco-menu, .monaco-dialog-box')) return true;
        return false;
    };

    const inside = (el, x, y) => {
        const r = el.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    // webviews (chat do Claude, preview de markdown...) ficam numa camada por cima,
    // fora da árvore da janela; acha a janela pela posição do mouse
    const windowUnder = (x, y) => {
        for (const el of document.querySelectorAll('.part.editor .editor-group-container, .part.sidebar, .part.auxiliarybar, .part.panel')) {
            if (el.offsetParent !== null && inside(el, x, y)) {
                if (el.classList.contains('part') && el.classList.contains('editor')) continue;
                return el;
            }
        }
        return null;
    };

    // pede pro VS Code focar o editor da aba ativa (mesmo que apertar Enter na aba):
    // é o caminho que ele usa pra mandar o foco pra dentro de um webview
    const focusViaTab = (group) => {
        const tab = group.querySelector('.tabs-container > .tab.active');
        if (!tab) return false;
        tab.focus({ preventScroll: true });
        const init = { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, cancelable: true };
        const ev = new KeyboardEvent('keyup', init);
        Object.defineProperty(ev, 'keyCode', { get: () => 13 });
        Object.defineProperty(ev, 'which', { get: () => 13 });
        tab.dispatchEvent(ev);
        return true;
    };

    // acha o elemento que recebe o teclado dentro da janela
    const inputOf = (win) => {
        if (win.classList.contains('editor-group-container')) {
            const editors = win.querySelectorAll('.editor-container .monaco-editor');
            const editor = editors[editors.length - 1]; // no diff, pega o lado modificado
            return editor ? editor.querySelector('.native-edit-context, textarea.inputarea, textarea') : null;
        }
        if (win.classList.contains('panel')) {
            return win.querySelector('.terminal-wrapper.active .xterm-helper-textarea')
                || win.querySelector('.xterm-helper-textarea')
                || win.querySelector('.monaco-list[tabindex]');
        }
        return win.querySelector('.monaco-list[tabindex]');
    };

    // borda de "mouse em cima" pra quando o mouse está num webview (o :hover do css não pega)
    let hovered = null;
    const setHover = (win) => {
        if (hovered === win) return;
        if (hovered) hovered.classList.remove('hollow-hover');
        hovered = win;
        if (win) win.classList.add('hollow-hover');
    };

    document.addEventListener('mouseover', (e) => {
        const el = e.target;
        const webview = el.closest && (el.closest('.webview-overlay-content') || (el.tagName === 'IFRAME' && el.classList.contains('webview') ? el : null));

        const win = webview
            ? windowUnder(e.clientX, e.clientY)
            : el.closest('.part.editor .editor-group-container, .part.sidebar, .part.auxiliarybar, .part.panel');
        setHover(webview ? win : null);

        if (e.buttons || !win || busy()) return; // arrastando/selecionando: não mexe

        if (webview) {
            // já está digitando nesse webview
            if (webview.contains(document.activeElement) || document.activeElement === webview) return;
            if (win.classList.contains('editor-group-container') && focusViaTab(win)) return;
            const frame = webview.querySelector ? webview.querySelector('iframe') : null;
            (frame || webview).focus({ preventScroll: true });
            return;
        }

        // já está digitando nessa janela (inclui caixa de busca, renomear etc.)
        if (win.contains(document.activeElement)) return;
        const input = inputOf(win);
        if (input) input.focus({ preventScroll: true });
    }, true);

    document.addEventListener('mouseleave', () => setHover(null));
})();
