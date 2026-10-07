# hollow tui

A dark, TUI-style theme for VS Code: every panel becomes a framed window with a label on its border, separated by small gaps, with a red border on the window under the mouse.

## Features

- **Color theme**: neutral grays with a deep red accent, square corners everywhere
- **Framed windows**: sidebar, editor groups and panel each get their own border and label (`nav`, `explorer`, `editor`, `panel`...)
- **Red border on hover**: the window under the mouse lights up
- **Focus follows mouse**: the keyboard types in whatever window the mouse is over, including webviews like chat panels

## Installation

1. Install **hollow** from the Marketplace.
2. Open the command palette (`Ctrl+Shift+P`) and run **Hollow: Enable layout**.
3. Done. It installs [Custom UI Style](https://marketplace.visualstudio.com/items?itemName=subframe7536.custom-ui-style) if needed, configures everything and reloads VS Code.

Just want the colors? Pick **hollow** in `Preferences: Color Theme` and skip step 2.

> VS Code may show a **"your installation appears to be corrupt"** warning after enabling the layout. This is expected, since the layout is injected into VS Code's interface. Click the gear and choose **Don't show again**.

### Recommended font

hollow looks best with [DM Mono](https://fonts.google.com/specimen/DM+Mono) (free). Install it on your system; the layout uses it automatically and falls back to Consolas otherwise.

## Uninstalling the layout

Run **Hollow: Disable layout**. This removes the injected styles and restores VS Code's original interface.

## Customization

The layout lives in two files inside VS Code's storage folder for this extension (`globalStorage/nairon.hollow`): `hollow.css` and `hollow-focus.js`. The variables at the top of `hollow.css` control colors, border thickness and gap size. After editing, run **Custom UI Style: Reload**.

Note: updating the extension overwrites these files.

## Credits

Inspired by [system24](https://github.com/refact0r/system24) by **refact0r**, a TUI-style Discord theme. hollow is an independent project and is not affiliated with system24.

---

## Português

Tema escuro estilo TUI para VS Code: cada painel vira uma janela com borda e rótulo, com espaço entre elas, borda vermelha na janela embaixo do mouse e foco que segue o mouse.

**Instalação:** instale o **hollow**, abra a paleta de comandos (`Ctrl+Shift+P`) e rode **Hollow: Enable layout**. O comando instala o Custom UI Style se precisar, configura tudo e recarrega o VS Code. Se aparecer o aviso de "instalação corrompida", é normal: clique na engrenagem e escolha "Não mostrar novamente".

**Só as cores:** escolha **hollow** em `Preferências: Tema de Cores` e não rode o comando.

**Remover o layout:** rode **Hollow: Disable layout**.

**Créditos:** inspirado no [system24](https://github.com/refact0r/system24) de **refact0r**, um tema estilo TUI para Discord.
