import * as vscode from "vscode";

import { Constants } from "../../constants";
import { getNonce } from "../../utilities/getNonce";
import { getWebviewUri } from "../../utilities/getUri";

export class CircuitDesignerProvider implements vscode.WebviewViewProvider {
    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this._extensionUri, "out"),
            ],
        };

        const nonce = getNonce();

        const mainCssUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.mainCssPathList
        );

        const webviewJsUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.webviewJsPathList
        );

        webviewView.webview.html = /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webviewView.webview.cspSource}; style-src ${webviewView.webview.cspSource}; script-src 'nonce-${nonce}';">

                <title>Circuit Designer</title>

                <link href="${mainCssUri}" rel="stylesheet" />
            </head>
            <body>
                <div>
                    <vscode-button class="full-width" id="open-circuit-designer-button">Open Circuit Designer</vscode-button>
                </div>
                <div>
                    Use <vscode-link href="${Constants.circuitDesignerOnlineUrl}">Quirk</vscode-link> to design and simulate circuits. Toggle <vscode-link id="offline-mode-link">Offline Mode</vscode-link> in the settings.
                </div>
                <script type="module" nonce="${nonce}" src="${webviewJsUri}"></script>
                <script type="text/javascript" nonce="${nonce}">
                    const vscode = acquireVsCodeApi();

                    document.getElementById("open-circuit-designer-button").addEventListener("click", () => {
                        vscode.postMessage({ type: "openCircuitDesigner" });
                    });

                    document.getElementById("offline-mode-link").addEventListener("click", () => {
                        vscode.postMessage({ type: "openOfflineModeConfiguration" });
                    });

                    /* Show content only when everything is loaded */
                    window.addEventListener("load", () => {
                        document.getElementsByTagName("html")[0].style.visibility = "visible";
                    });
                </script>
            </body>
        </html>
        `;

        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.type) {
                case "openCircuitDesigner":
                    vscode.commands.executeCommand("deqse.openCircuitDesigner");
                    break;
            }
            switch (message.type) {
                case "openOfflineModeConfiguration":
                    vscode.commands.executeCommand("workbench.action.openSettings", "deqse.circuitDesigner.offlineMode");
                    break;
            }
        });
    }
}
