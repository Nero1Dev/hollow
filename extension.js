// hollow: instala e ativa o layout (janelas separadas, rótulos, borda no hover, foco segue o mouse)
// o layout é injetado pela extensão Custom UI Style; aqui só configuramos ela.
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const CUSTOM_UI = 'subframe7536.custom-ui-style';
const LAYOUT_FILES = ['hollow.css', 'hollow-focus.js'];
const FONT = "'DM Mono', Consolas, 'Courier New', monospace";
const GLOBAL = vscode.ConfigurationTarget.Global;

// entradas de import que são nossas (pra não mexer nas do usuário)
const isOurs = (entry) => typeof entry === 'string' && /\/(hollow\.css|hollow-focus\.js)$/.test(entry);

// copia o css/js pra uma pasta fixa (a pasta da extensão muda a cada versão)
async function copyLayout(context) {
    const dir = context.globalStorageUri.fsPath;
    await fs.promises.mkdir(dir, { recursive: true });
    const urls = [];
    for (const file of LAYOUT_FILES) {
        const target = path.join(dir, file);
        await fs.promises.copyFile(path.join(context.extensionPath, 'layout', file), target);
        urls.push(pathToFileURL(target).href);
    }
    return urls;
}

async function ensureCustomUiStyle() {
    if (vscode.extensions.getExtension(CUSTOM_UI)) return true;
    const choice = await vscode.window.showInformationMessage(
        'The hollow layout needs the "Custom UI Style" extension to change the VS Code interface. Install it now?',
        { modal: true },
        'Install'
    );
    if (choice !== 'Install') return false;
    await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: 'Installing Custom UI Style...' },
        () => vscode.commands.executeCommand('workbench.extensions.installExtension', CUSTOM_UI)
    );
    return true;
}

async function reloadLayout() {
    try {
        await vscode.commands.executeCommand('custom-ui-style.reload');
    } catch {
        vscode.window.showWarningMessage('Run "Custom UI Style: Reload" from the command palette to apply the hollow layout.');
    }
}

async function enable(context) {
    if (!(await ensureCustomUiStyle())) return;

    try {
        const urls = await copyLayout(context);
        const config = vscode.workspace.getConfiguration();
        const current = config.inspect('custom-ui-style.external.imports')?.globalValue ?? [];

        await config.update('workbench.colorTheme', 'hollow', GLOBAL);
        await config.update('workbench.experimental.modernUI', true, GLOBAL);
        await config.update('custom-ui-style.external.imports', [...current.filter((e) => !isOurs(e)), ...urls], GLOBAL);
        await config.update('custom-ui-style.reloadWithoutPrompting', true, GLOBAL);

        // fonte mono só se o usuário ainda não escolheu uma
        for (const key of ['custom-ui-style.font.sansSerif', 'custom-ui-style.font.monospace']) {
            if (!config.inspect(key)?.globalValue) await config.update(key, FONT, GLOBAL);
        }

        await context.globalState.update('layoutEnabled', true);
        await context.globalState.update('layoutVersion', context.extension.packageJSON.version);
    } catch (err) {
        vscode.window.showErrorMessage(`hollow: could not configure the layout (${err.message}). Try reloading the window and running "Hollow: Enable layout" again.`);
        return;
    }

    vscode.window.showInformationMessage('hollow: layout enabled. VS Code will reload to apply it. If it shows a "corrupt installation" warning, that is expected; choose "Don\'t show again".');
    await reloadLayout();
}

async function disable(context) {
    const config = vscode.workspace.getConfiguration();
    const current = config.inspect('custom-ui-style.external.imports')?.globalValue ?? [];
    const remaining = current.filter((e) => !isOurs(e));

    await config.update('custom-ui-style.external.imports', remaining.length ? remaining : undefined, GLOBAL);
    await context.globalState.update('layoutEnabled', false);

    if (!vscode.extensions.getExtension(CUSTOM_UI)) return;
    try {
        // sem nenhum outro estilo do usuário, desfaz a modificação do VS Code por completo
        await vscode.commands.executeCommand(remaining.length ? 'custom-ui-style.reload' : 'custom-ui-style.rollback');
    } catch {
        vscode.window.showWarningMessage('Run "Custom UI Style: Rollback" from the command palette to finish removing the hollow layout.');
    }
}

async function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('hollow.enableLayout', () => enable(context)),
        vscode.commands.registerCommand('hollow.disableLayout', () => disable(context))
    );

    // depois de atualizar a extensão, copia o layout novo e oferece aplicar
    const version = context.extension.packageJSON.version;
    if (context.globalState.get('layoutEnabled') && context.globalState.get('layoutVersion') !== version) {
        await copyLayout(context);
        await context.globalState.update('layoutVersion', version);
        const choice = await vscode.window.showInformationMessage('hollow was updated. Reload to apply the new layout?', 'Reload');
        if (choice === 'Reload') await reloadLayout();
    }
}

function deactivate() {}

module.exports = { activate, deactivate };
