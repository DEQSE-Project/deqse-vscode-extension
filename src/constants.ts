export const Constants = {
    /*
     * STYLE FILE PATHS
     */
    mainCssPathList: ["out", "assets", "styles", "main.css"],
    codeConverterWebviewViewCssPathList: ["out", "assets", "styles", "code-converter-webview-view.css"],

    /*
     * FONT FILE PATHS
     */
    codiconCssPathList: ["out", "assets", "fonts", "codicon", "codicon.css"],
    fontawesomeCssPathList: ["out", "assets", "fonts", "fontawesome", "fontawesome.min.css"],
    solidCssPathList: ["out", "assets", "fonts", "fontawesome", "solid.min.css"],

    /*
     * JAVASCRIPT FILE PATHS
     */
    webviewJsPathList: ["out", "webview.js"],
    quantumCircuitJsPathList: ["out", "assets", "scripts", "quantum-circuit.min.js"],

    /*
     * CIRCUIT DESIGNER PATH & URL
     */
    circuitDesignerOfflinePathList: ["out", "ext", "quirk.html"],
    circuitDesignerOnlineUrl: "https://algassert.com/quirk",
} as const;
