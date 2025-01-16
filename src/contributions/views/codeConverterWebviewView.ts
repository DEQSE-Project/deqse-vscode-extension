import * as vscode from "vscode";

import { Constants } from "../../constants";
import { getNonce } from "../../utilities/getNonce";
import { getWebviewUri } from "../../utilities/getUri";

export class CodeConverterProvider implements vscode.WebviewViewProvider {
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

        const codeConverterWebviewViewCssUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.codeConverterWebviewViewCssPathList
        );

        const codiconCssUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.codiconCssPathList
        );

        const fontawesomeCssUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.fontawesomeCssPathList
        );

        const solidCssUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.solidCssPathList
        );

        const webviewJsUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.webviewJsPathList
        );

        const quantumCircuitJsUri = getWebviewUri(
            webviewView.webview,
            this._extensionUri,
            Constants.quantumCircuitJsPathList
        );

        webviewView.webview.html = /*html*/ `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webviewView.webview.cspSource}; style-src ${webviewView.webview.cspSource}; script-src 'nonce-${nonce}';">

                    <title>Code Converter</title>

                    <link href="${mainCssUri}" rel="stylesheet" />
                    <link href="${codeConverterWebviewViewCssUri}" rel="stylesheet" />
                    <link href="${codiconCssUri}" rel="stylesheet" />
                    <link href="${fontawesomeCssUri}" rel="stylesheet" />
                    <link href="${solidCssUri}" rel="stylesheet" />
                </head>
                <body>
                    <div>
                        <label for="source-language-dropdown">Source Language</label>
                        <vscode-dropdown class="full-width" id="source-language-dropdown">
                            <vscode-option value="ionq">IonQ <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option selected value="openqasm">OpenQASM 2.0</vscode-option>
                            <vscode-option value="qobj">Qobj <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option value="qubit-toaster">Qubit Toaster <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option value="quil">Quil 2.0</vscode-option>
                            <vscode-option value="quantum-circuit">quantum-circuit <small><i>(JSON)</i></small></vscode-option>
                        </vscode-dropdown>
                    </div>
                    <div>
                        <label for="input-text-area">Input</label>
                        <vscode-button data-title="Input Settings" appearance="icon" class="settings-button tooltip left" id="input-settings-button"><span class="codicon codicon-settings"></span></vscode-button>
                        <vscode-text-area placeholder="Enter code..." rows="10" resize="vertical" class="full-width code" id="input-text-area"></vscode-text-area>
                        <div id="error-label-container">
                            <p class="error-text" id="error-label"></p>
                            <p class="error-text" id="error-extended-label"></p>
                        </div>
                    </div>
                    <vscode-divider role="separator"></vscode-divider>
                    <div>
                        <label for="target-language-dropdown">Target Language</label>
                        <vscode-dropdown class="full-width" id="target-language-dropdown">
                            <vscode-option value="aqasm">AQASM</vscode-option>
                            <vscode-option value="amazon-braket">Amazon Braket <small><i>(Python)</i></small></vscode-option>
                            <vscode-option value="cirq">Cirq <small><i>(Python)</i></small></vscode-option>
                            <vscode-option disabled value="ionq">IonQ <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option value="javascript">JavaScript</vscode-option>
                            <vscode-option value="openqasm">OpenQASM 2.0</vscode-option>
                            <vscode-option value="qsharp">Q#</vscode-option>
                            <vscode-option selected value="qiskit">Qiskit <small><i>(Python)</i></small></vscode-option>
                            <vscode-option value="qobj">Qobj <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option value="qubit-toaster">Qubit Toaster <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option value="quest">QuEST <small><i>(C/C++)</i></small></vscode-option>
                            <vscode-option value="quil">Quil</vscode-option>
                            <vscode-option value="quirk">Quirk <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option value="quantum-circuit">quantum-circuit <small><i>(JSON)</i></small></vscode-option>
                            <vscode-option value="tensorflow-quantum">TensorFlow Quantum <small><i>(Python)</i></small></vscode-option>
                            <vscode-option value="pyaqasm">pyAQASM <small><i>(Python)</i></small></vscode-option>
                            <vscode-option value="pyquil">pyQuil <small><i>(Python)</i></small></vscode-option>
                        </vscode-dropdown>
                    </div>
                    <div>
                        <label for="output-text-area">Output<i class="icon codicon codicon-loading codicon-modifier-spin" id="loading-icon"></i></label>
                        <!-- TODO: Add output settings  -->
                        <vscode-button hidden disabled data-title="Output Settings" appearance="icon" class="settings-button tooltip left" id="output-settings-button"><span class="codicon codicon-settings"></span></vscode-button>
                        <vscode-text-area rows="10" resize="vertical" readonly class="full-width code" id="output-text-area"></vscode-text-area>
                        <div id="output-button-container">
                            <vscode-button appearance="secondary" id="open-button"><i class="icon codicon codicon-empty-window" id="open-icon"></i> Open in Circuit Designer</vscode-button>
                            <vscode-button appearance="secondary" id="copy-button"><i class="icon codicon codicon-copy" id="copy-icon"></i> Copy to Clipboard</vscode-button>
                        </div>
                    </div>
                    <vscode-divider role="separator"></vscode-divider>
                    <div>
                        <vscode-button disabled class="full-width" id="convert-button"><i class="icon codicon codicon-sync" id="convert-icon"></i> Convert</vscode-button>
                    </div>
                    <script type="module" nonce="${nonce}" src="${webviewJsUri}"></script>
                    <script type="text/javascript" nonce="${nonce}" src="${quantumCircuitJsUri}"></script>
                    <script type="text/javascript" nonce="${nonce}">
                        const vscode = acquireVsCodeApi();

                        /* Initialize variables */
                        var circuit = null;

                        /* Initialize fields */
                        document.getElementById("error-extended-label").style.display = "none";
                        document.getElementById("loading-icon").style.display = "none";
                        reset();

                        function resetErrorLabel() {
                            document.getElementById("error-label-container").style.display = "none";
                            document.getElementById("error-label").innerHTML = "";
                            document.getElementById("error-extended-label").innerHTML = "";
                        }

                        function resetOutputTextArea() {
                            document.getElementById("output-text-area").value = "";
                        }

                        /* Reset fields that may have values by clearing them */
                        function reset() {
                            circuit = null;
                            resetErrorLabel();
                            resetOutputTextArea();
                        }

                        /* Disable regular input field and use current file instead */
                        function toggleConvertFromCurrentFile() {
                            var inputTextArea = document.getElementById("input-text-area");

                            if(document.getElementById("from-current-file-checkbox").checked === true) {
                                inputTextArea.setAttribute("disabled", "");
                            } else {
                                inputTextArea.removeAttribute("disabled");
                            }
                            reset();
                        }

                        /* Format and beautify error message for display */
                        function getErrorMessageString(error) {
                            if(Object.hasOwn(error, "msg")) {
                                var errorMessage = error.msg;

                                /* Make first character upper case for consistency */
                                errorMessage = errorMessage[0].toUpperCase() + errorMessage.slice(1);

                                /* Remove trailing dot for consistency */
                                if(errorMessage[errorMessage.length-1] === ".") {
                                            errorMessage = errorMessage.slice(0,-1);
                                }

                                if(error.line >= 0 && error.col >= 0) {
                                    return "<i>" + errorMessage + "</i>" + " (at line " + error.line + ", column " + error.col + ")";
                                }
                            } else {
                                var errorMessage = error.message;

                                /* Make first character upper case for consistency */
                                errorMessage = errorMessage[0].toUpperCase() + errorMessage.slice(1);

                                errorMessage = errorMessage.replace("line", "at line");
                                errorMessage = errorMessage.replace(" column", ", column");
                            }

                            return "<i>" + errorMessage + "</i>";
                        }

                        /* Read out all error messages and show first one */
                        function handleErrors(errors) {
                            if(errors && errors.length) {
                                var iconString = "";
                                if(document.getElementById("error-extended-label").style.display === "none") {
                                    iconString = "codicon-triangle-right";
                                } else {
                                    iconString = "codicon-triangle-down";
                                }

                                var errorLabelString = "<i class='icon codicon " + iconString + "' id='error-icon'></i><b>Error:</b> " + getErrorMessageString(errors[0]);
                                
                                var errorLabelExtendedString = "";
                                for(let i = 1; i < errors.length; i++) {
                                    errorLabelExtendedString += getErrorMessageString(errors[i]) + "<br>";
                                }

                                document.getElementById("error-label-container").style.display = "";
                                document.getElementById("error-label").innerHTML = errorLabelString;
                                document.getElementById("error-extended-label").innerHTML = errorLabelExtendedString;

                                showOutputLabelLoadingIcon(false);
                                process.exit(1);
                            }
                        }

                        /* Toggle visibility of all further error messages */
                        function toggleErrorLabelExtended() {
                            var errorExtendedLabel = document.getElementById("error-extended-label");
                            var errorLabelIcon = document.getElementById("error-icon");

                            if(errorExtendedLabel.style.display === "none") {
                                errorExtendedLabel.style.display = "";
                                errorLabelIcon.setAttribute("class", "icon codicon codicon-triangle-down");
                            } else {
                                errorExtendedLabel.style.display = "none";
                                errorLabelIcon.setAttribute("class", "icon codicon codicon-triangle-right");
                            }
                        }

                        /* Show loading icon to indicate running background process */
                        function showOutputLabelLoadingIcon(show) {
                            var loadingIcon = document.getElementById("loading-icon");
                            var convertIcon = document.getElementById("convert-icon");

                            if(show === true) {
                                loadingIcon.style.display = "";
                                convertIcon.setAttribute("class", "icon codicon codicon-sync codicon-modifier-spin");
                            } else {
                                loadingIcon.style.display = "none";
                                convertIcon.setAttribute("class", "icon codicon codicon-sync");
                            }
                        }

                        /* Parse JSON content from some input */
                        function parseJson(input) {
                            try {
                                var json = JSON.parse(input);
                                return json;
                            } catch(error) {
                                handleErrors([error]);
                            }   
                        }

                        /* Main callback function for converting specified source language input to target language output */
                        function convert() {
                            if(document.getElementById("input-text-area").value != "") {
                                showOutputLabelLoadingIcon(true);

                                resetOutputTextArea();

                                /* setTimeout function is needed to correctly show loading icon */
                                setTimeout(() => {
                                    resetErrorLabel();

                                    circuit = new QuantumCircuit();

                                    var input = document.getElementById("input-text-area").value;

                                    switch(document.getElementById("source-language-dropdown").value) {
                                        case "ionq":
                                            circuit.importIonq(parseJson(input), function(errors) {
                                                handleErrors(errors);
                                            });
                                            break;
                                        case "openqasm":
                                            circuit.importQASM(input, function(errors) {
                                                handleErrors(errors);
                                            });
                                            break;
                                        case "qobj":
                                            circuit.importQobj(parseJson(input), function(errors) {
                                                handleErrors(errors);
                                            });
                                            break;
                                        case "qubit-toaster":
                                            circuit.importRaw(parseJson(input), function(errors) {
                                                handleErrors(errors);
                                            });
                                            break;
                                        case "quil":
                                            circuit.importQuil(input, function(errors) {
                                                handleErrors(errors);
                                            });
                                            break;
                                        case "quantum-circuit":
                                            try {
                                                circuit.load(parseJson(input));
                                            } catch(error) {
                                                handleErrors([error]);
                                            }
                                            break;
                                    }

                                    var output = "";

                                    switch(document.getElementById("target-language-dropdown").value) {
                                        case "aqasm":
                                            output = circuit.exportToAQASM({comment: "", decompose: false, asJupyter: false, shots: null, hybrid: false}, false, false, null);
                                            break;
                                        case "amazon-braket":
                                            output = circuit.exportToBraket({comment: "", decompose: false, versionStr: "", asJupyter: false, shots: null, hybrid: false, indentDepth: null}, false);
                                            break;
                                        case "cirq":
                                            output = circuit.exportToCirq({comment: "", decompose: false, versionStr: "", asJupyter: false, shots: null, exportTfq: false}, false);
                                            break;
                                        case "ionq":
                                            output = JSON.stringify(circuit.exportToIonq({}, false), null, 4);
                                            break;
                                        case "javascript":
                                            output = circuit.exportJavaScript("", false, null, false);
                                            break;
                                        case "openqasm":
                                            output = circuit.exportToQASM({comment: "", decompose: false, compatibilityMode: false}, false, false, false);
                                            break;
                                        case "qsharp":
                                            output = circuit.exportToQSharp({comment: "", decompose: false, versionStr: "", asJupyter: false, circuitName: null, indentDepth: null}, false);
                                            break;
                                        case "qiskit":
                                            output = circuit.exportToQiskit({comment: "", decompose: false, versionStr: "", providerName: "", backendName: "", asJupyter: false, shots: null, hybrid: false}, false, false, false);
                                            break;
                                        case "qobj":
                                            output = JSON.stringify(circuit.exportToQobj({circuitName: null, experimentName: null, numShots: null}, false), null, 4);
                                            break;
                                        case "qubit-toaster":
                                            output = JSON.stringify(circuit.exportRaw(), null, 4);
                                            break;
                                        case "quest":
                                            output = circuit.exportToQuEST({comment: "", decompose: false}, false, null);
                                            break;
                                        case "quil":
                                            output = circuit.exportToQuil({comment: "", decompose: false, versionStr: ""}, false);
                                            break;
                                        case "quirk":
                                            output = JSON.stringify(circuit.exportQuirk(true), null, 4);
                                            break;
                                        case "quantum-circuit":
                                            output = JSON.stringify(circuit.save(), null, 4);
                                            break;
                                        case "tensorflow-quantum":
                                            output = circuit.exportToTFQ({comment: "", decompose: false, versionStr: "", asJupyter: false, shots: null}, false);
                                            break;
                                        case "pyaqasm":
                                            output = circuit.exportToPyAQASM({comment: "", decompose: false, asJupyter: false, shots: null, hybrid: false}, false);
                                            break;
                                        case "pyquil":
                                            output = circuit.exportToPyquil({comment: "", decompose: false, versionStr: "", lattice: "", asQVM: false, asJupyter: false, shots: null, hybrid: false}, false);
                                            break;
                                    }

                                    /* Remove leading and trailing newlines that may be added during conversion */
                                    output = output.trim();

                                    document.getElementById("output-text-area").value = output;

                                    showOutputLabelLoadingIcon(false);
                                });

                                /* TODO: Implement better solution for placing cursor at the start after setting output */
                                setTimeout(() => {
                                    document.getElementById("output-text-area").shadowRoot.getElementById("control").selectionEnd = 0;
                                }, 100);
                            } else {
                                reset();
                            }
                        }

                        /* Callback functions for user interaction */
                        /* document.getElementById("from-current-file-checkbox").addEventListener("change", toggleConvertFromCurrentFile); */
                        document.getElementById("source-language-dropdown").addEventListener("change", convert);
                        document.getElementById("input-settings-button").addEventListener("click", () => {
                            vscode.postMessage({ type: "openInputSettings" });
                        });
                        document.getElementById("input-text-area").addEventListener("input", convert);
                        document.getElementById("error-label").addEventListener("click", toggleErrorLabelExtended);
                        document.getElementById("target-language-dropdown").addEventListener("change", convert);
                        document.getElementById("output-settings-button").addEventListener("click", () => {
                            vscode.postMessage({ type: "openOutputSettings" });
                        });
                        document.getElementById("open-button").addEventListener("click", () => {
                            if (document.getElementById("output-text-area").value != "") {
                                vscode.postMessage({ type: "openInCircuitDesigner", circuit: JSON.stringify(circuit.exportQuirk(true)) });
                            }
                        });
                        document.getElementById("copy-button").addEventListener("click", () => {
                            navigator.clipboard.writeText(document.getElementById("output-text-area").value);
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
                case "openInputSettings":
                    vscode.commands.executeCommand("workbench.action.openSettings", "deqse.codeConverter.input");
                    break;
                case "openOutputSettings":
                    vscode.commands.executeCommand("workbench.action.openSettings", "deqse.codeConverter.output");
                    break;
                case "openInCircuitDesigner":
                    vscode.commands.executeCommand("simpleBrowser.api.open", vscode.Uri.parse(Constants.circuitDesignerOnlineUrl + "#circuit=" + message.circuit));
                    break;
            }
        });
    }
}
