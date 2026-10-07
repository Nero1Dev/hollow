// gera o tema hollow a partir de uma paleta oklch (inspirada no system24 de refact0r)
// rode: node gen.js
function oklch(L, C, H, a) {
  L /= 100;
  const h = (H * Math.PI) / 180;
  const A = C * Math.cos(h), B = C * Math.sin(h);
  const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
  const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
  const s_ = L - 0.0894841775 * A - 1.291485548 * B;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  let rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  rgb = rgb.map((x) => {
    x = Math.min(1, Math.max(0, x));
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
  });
  let hex = '#' + rgb.map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
  if (a !== undefined) hex += Math.round(a * 255).toString(16).padStart(2, '0');
  return hex;
}
const g = (L, a) => oklch(L, 0, 0, a);

// paleta
const c = {
  text1: g(95), text2: g(85), text3: g(75), text4: g(60), text5: g(40),
  bg1: g(31), bg2: g(27), bg3: g(23), bg4: g(19),
  hover: g(54, 0.1), active: g(54, 0.2),
  red1: oklch(75, 0.13, 0), red2: oklch(70, 0.13, 0),
  green1: oklch(75, 0.12, 170), green2: oklch(70, 0.12, 170),
  blue1: oklch(75, 0.11, 215), blue2: oklch(70, 0.11, 215), blue3: oklch(65, 0.11, 215),
  yellow1: oklch(80, 0.12, 90), yellow2: oklch(75, 0.12, 90),
  // acento ("purple" no seu css, na verdade vermelho escuro #721511)
  acc1: oklch(46, 0.128, 28.1), acc2: oklch(41, 0.128, 28.1), acc3: oklch(36.2, 0.128, 28.1), acc4: oklch(31, 0.128, 28.1),
  // versão clara do acento pra ser legível como texto
  accText: oklch(68, 0.13, 28.1),
};
const none = '#00000000';

const colors = {
  focusBorder: c.acc2, foreground: c.text3, descriptionForeground: c.text4, errorForeground: c.red2,
  'widget.border': c.bg1, 'widget.shadow': none, 'selection.background': c.acc3 + '99',
  'textLink.foreground': c.accText, 'textLink.activeForeground': c.red1, 'icon.foreground': c.text4,
  'sash.hoverBorder': c.acc2,
  // layout novo (cartões flutuantes)
  'surface.background': c.bg4, 'surface.foreground': c.text3, 'surface.border': '#2e2e2e',
  'editor.border': '#2e2e2e', 'modernPanel.border': '#2e2e2e', 'modernActivityBar.border': '#2e2e2e', 'modernUI.shellBackground': '#0f0f0f',

  // fundo bg3 como o "gap" entre painéis, painéis em bg4
  'titleBar.activeBackground': c.bg4, 'titleBar.activeForeground': c.text3, 'titleBar.inactiveBackground': c.bg4,
  'titleBar.inactiveForeground': c.text5, 'titleBar.border': c.bg4,
  'activityBar.background': c.bg4, 'activityBar.foreground': c.text2, 'activityBar.inactiveForeground': c.text5,
  'activityBar.border': c.bg4, 'activityBar.activeBorder': c.acc1, 'activityBar.activeBackground': c.hover,
  'activityBarBadge.background': c.acc3, 'activityBarBadge.foreground': c.text1,
  'sideBar.background': c.bg4, 'sideBar.foreground': c.text4, 'sideBar.border': c.bg4, 'sideBarTitle.foreground': c.text4,
  'sideBarSectionHeader.background': c.bg4, 'sideBarSectionHeader.foreground': c.text3, 'sideBarSectionHeader.border': c.bg2,
  'list.hoverBackground': c.hover, 'list.hoverForeground': c.text2,
  'list.activeSelectionBackground': c.active, 'list.activeSelectionForeground': c.text1,
  'list.inactiveSelectionBackground': c.hover, 'list.inactiveSelectionForeground': c.text2,
  'list.focusOutline': c.acc2, 'list.focusBackground': c.active, 'list.highlightForeground': c.accText,
  'list.errorForeground': c.red2, 'list.warningForeground': c.yellow2, 'tree.indentGuidesStroke': c.bg1,

  'editor.background': c.bg4, 'editor.foreground': c.text3,
  'editorLineNumber.foreground': c.text5, 'editorLineNumber.activeForeground': c.text2,
  'editorCursor.foreground': c.red1,
  'editor.selectionBackground': c.acc3 + '88', 'editor.inactiveSelectionBackground': c.acc3 + '44',
  'editor.selectionHighlightBackground': c.active, 'editor.wordHighlightBackground': c.hover,
  'editor.wordHighlightStrongBackground': c.active,
  'editor.findMatchBackground': c.acc2 + 'aa', 'editor.findMatchHighlightBackground': c.acc3 + '55',
  'editor.lineHighlightBackground': g(54, 0.05), 'editor.lineHighlightBorder': none,
  'editorIndentGuide.background1': c.bg2, 'editorIndentGuide.activeBackground1': c.text5,
  'editorWhitespace.foreground': c.bg1, 'editorRuler.foreground': c.bg2,
  'editorBracketMatch.background': c.active, 'editorBracketMatch.border': c.acc1,
  'editorBracketHighlight.foreground1': c.text3, 'editorBracketHighlight.foreground2': c.blue2,
  'editorBracketHighlight.foreground3': c.yellow2, 'editorBracketHighlight.foreground4': c.green2,
  'editorBracketHighlight.foreground5': c.red2, 'editorBracketHighlight.foreground6': c.text4,
  'editorError.foreground': c.red2, 'editorWarning.foreground': c.yellow2,
  'editorInfo.foreground': c.blue2, 'editorHint.foreground': c.text4,
  'editorGutter.addedBackground': c.green2, 'editorGutter.modifiedBackground': c.blue2, 'editorGutter.deletedBackground': c.red2,
  'editorOverviewRuler.border': c.bg4,
  'editorGroup.border': c.bg2, 'editorGroupHeader.tabsBackground': c.bg4, 'editorGroupHeader.tabsBorder': c.bg4,
  'editorWidget.background': c.bg3, 'editorWidget.border': c.bg1,
  'editorSuggestWidget.background': c.bg3, 'editorSuggestWidget.border': c.bg1,
  'editorSuggestWidget.selectedBackground': c.active, 'editorSuggestWidget.highlightForeground': c.accText,
  'editorHoverWidget.background': c.bg3, 'editorHoverWidget.border': c.bg1,
  'editorStickyScroll.background': c.bg4, 'editorStickyScrollHover.background': c.bg3,

  'tab.activeBackground': c.bg4, 'tab.activeForeground': c.text1,
  'tab.inactiveBackground': c.bg4, 'tab.inactiveForeground': c.text5,
  'tab.border': c.bg4, 'tab.activeBorderTop': c.acc1, 'tab.activeBorder': c.bg4,
  'tab.hoverBackground': c.bg4, 'tab.hoverForeground': c.text3,
  'tab.unfocusedActiveBorderTop': c.text5, 'tab.unfocusedActiveForeground': c.text3, 'tab.unfocusedInactiveForeground': c.text5,
  'breadcrumb.foreground': c.text5, 'breadcrumb.focusForeground': c.text3,
  'breadcrumb.activeSelectionForeground': c.text2, 'breadcrumbPicker.background': c.bg3,

  'panel.background': c.bg4, 'panel.border': c.bg4,
  'panelTitle.activeForeground': c.text2, 'panelTitle.inactiveForeground': c.text5, 'panelTitle.activeBorder': c.acc1,
  'terminal.background': c.bg4, 'terminal.foreground': c.text3, 'terminalCursor.foreground': c.red1,
  'terminal.selectionBackground': c.acc3 + '88',
  'terminal.ansiBlack': c.bg2, 'terminal.ansiBrightBlack': c.text5,
  'terminal.ansiWhite': c.text3, 'terminal.ansiBrightWhite': c.text1,
  'terminal.ansiRed': c.red2, 'terminal.ansiBrightRed': c.red1,
  'terminal.ansiGreen': c.green2, 'terminal.ansiBrightGreen': c.green1,
  'terminal.ansiYellow': c.yellow2, 'terminal.ansiBrightYellow': c.yellow1,
  'terminal.ansiBlue': c.blue2, 'terminal.ansiBrightBlue': c.blue1,
  'terminal.ansiMagenta': c.accText, 'terminal.ansiBrightMagenta': c.red1,
  'terminal.ansiCyan': c.blue3, 'terminal.ansiBrightCyan': c.blue1,

  'statusBar.background': c.bg4, 'statusBar.foreground': c.text4, 'statusBar.border': c.bg4,
  'statusBar.noFolderBackground': c.bg4, 'statusBar.debuggingBackground': c.acc3, 'statusBar.debuggingForeground': c.text1,
  'statusBarItem.hoverBackground': c.hover, 'statusBarItem.remoteBackground': c.acc3,
  'statusBarItem.remoteForeground': c.text1, 'statusBarItem.prominentBackground': c.acc3,

  'button.background': c.acc3, 'button.foreground': c.text1, 'button.hoverBackground': c.acc4, 'button.border': '#ffffff1a',
  'button.secondaryBackground': c.bg2, 'button.secondaryForeground': c.text2, 'button.secondaryHoverBackground': c.bg1,
  'badge.background': c.acc3, 'badge.foreground': c.text1, 'progressBar.background': c.acc1,
  'input.background': c.bg3, 'input.foreground': c.text2, 'input.border': c.bg1, 'input.placeholderForeground': c.text5,
  'inputOption.activeBorder': c.acc1, 'inputOption.activeBackground': c.acc3 + '66',
  'dropdown.background': c.bg3, 'dropdown.border': c.bg1, 'checkbox.background': c.bg3, 'checkbox.border': c.bg1,
  'quickInput.background': c.bg3, 'quickInputList.focusBackground': c.active, 'quickInputTitle.background': c.bg2,
  'menu.background': c.bg3, 'menu.foreground': c.text3, 'menu.selectionBackground': c.active,
  'menu.selectionForeground': c.text1, 'menu.border': c.bg1, 'menu.separatorBackground': c.bg1,
  'menubar.selectionBackground': c.hover,
  'notifications.background': c.bg3, 'notifications.border': c.bg1, 'notificationCenterHeader.background': c.bg2,
  'scrollbar.shadow': none, 'scrollbarSlider.background': g(54, 0.15),
  'scrollbarSlider.hoverBackground': g(54, 0.25), 'scrollbarSlider.activeBackground': c.acc2,

  'gitDecoration.modifiedResourceForeground': c.blue2, 'gitDecoration.addedResourceForeground': c.green2,
  'gitDecoration.untrackedResourceForeground': c.green1, 'gitDecoration.deletedResourceForeground': c.red2,
  'gitDecoration.ignoredResourceForeground': c.text5, 'gitDecoration.conflictingResourceForeground': c.yellow2,
  'diffEditor.insertedTextBackground': c.green2 + '22', 'diffEditor.removedTextBackground': c.red2 + '22',
  'peekView.border': c.acc1, 'peekViewEditor.background': c.bg3, 'peekViewResult.background': c.bg3, 'peekViewTitle.background': c.bg2,
  'minimap.background': c.bg4, 'minimapSlider.background': g(54, 0.1),
  'textCodeBlock.background': c.bg3, 'textBlockQuote.background': c.bg3, 'textBlockQuote.border': c.acc1,
  'welcomePage.tileBackground': c.bg3,
};

const tc = (scope, foreground, fontStyle) => ({ scope, settings: fontStyle ? { foreground, fontStyle } : { foreground } });
const tokenColors = [
  tc(['comment', 'punctuation.definition.comment'], c.text5, 'italic'),
  tc(['keyword', 'storage.type', 'storage.modifier', 'keyword.control'], c.red2),
  tc(['keyword.operator', 'punctuation', 'meta.brace'], c.text4),
  tc(['string', 'string.quoted', 'string.template'], c.green2),
  tc(['constant.character.escape', 'string.regexp'], c.green1),
  tc(['constant.numeric', 'constant.language', 'constant.other', 'support.constant'], c.yellow2),
  tc(['entity.name.function', 'support.function', 'meta.function-call entity.name.function'], c.blue1),
  tc(['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class'], c.yellow1),
  tc(['variable', 'meta.definition.variable'], c.text2),
  tc(['variable.parameter'], c.text3, 'italic'),
  tc(['variable.language', 'variable.other.this'], c.red1, 'italic'),
  tc(['variable.other.property', 'meta.property-name', 'support.type.property-name', 'entity.other.attribute-name'], c.blue2),
  tc(['entity.name.tag', 'meta.tag'], c.red2),
  tc(['meta.decorator', 'entity.name.function.decorator', 'punctuation.decorator'], c.accText),
  tc(['markup.heading', 'entity.name.section'], c.accText, 'bold'),
  tc(['markup.bold'], c.text1, 'bold'),
  tc(['markup.italic'], c.text2, 'italic'),
  tc(['markup.inline.raw', 'markup.fenced_code'], c.green2),
  tc(['markup.underline.link'], c.blue2),
  tc(['markup.inserted'], c.green2),
  tc(['markup.deleted'], c.red2),
  tc(['markup.changed'], c.blue2),
  tc(['invalid'], c.red1),
];

const theme = {
  name: 'hollow',
  type: 'dark',
  semanticHighlighting: true,
  colors,
  tokenColors,
  semanticTokenColors: {
    parameter: { foreground: c.text3, italic: true },
    property: c.blue2, function: c.blue1, method: c.blue1,
    type: c.yellow1, class: c.yellow1, enumMember: c.yellow2, 'variable.readonly': c.yellow2,
  },
};

require('fs').mkdirSync(__dirname + '/themes', { recursive: true });
require('fs').writeFileSync(__dirname + '/themes/hollow-color-theme.json', JSON.stringify(theme, null, 2));
console.log(c);
