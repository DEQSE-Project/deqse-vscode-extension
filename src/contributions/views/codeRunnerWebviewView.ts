import * as vscode from "vscode";

import { exec } from "child_process";

import { Constants } from "../../constants";
import { getNonce } from "../../utilities/getNonce";
import { getWebviewUri } from "../../utilities/getUri";

export class CodeRunnerProvider implements vscode.WebviewViewProvider {
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
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webviewView.webview.cspSource}; style-src ${webviewView.webview.cspSource}; script-src 'nonce-${nonce}'; connect-src http://localhost:8001;">

                <title>Code Runner</title>

                <link href="${mainCssUri}" rel="stylesheet" />
            </head>
            <body>
                <div>
                    <label for="backend-type-dropdown">Backend Type</label>
                    <vscode-dropdown class="full-width" id="backend-type-dropdown">
                        <vscode-option selected value="simulator">Simulator <small><i>(Local)</i></small></vscode-option>
                        <!-- TODO: Add cloud backends-->
                        <vscode-option disabled value="cloud">Cloud <small><i>(Remote)</i></small></vscode-option>
                    </vscode-dropdown>
                </div>
                <div>
                    <label for="simulator-backend-name-dropdown" id="simulator-backend-name-dropdown-label">Backend Name</label>
                    <vscode-dropdown class="full-width" id="simulator-backend-name-dropdown">
                        <vscode-option selected value="quantum-circuit">quantum-circuit</vscode-option>
                        <vscode-option value="qubit-toaster">Qubit Toaster</vscode-option>
                    </vscode-dropdown>
                    <label for="cloud-backend-name-dropdown" id="cloud-backend-name-dropdown-label">Backend Name</label>
                    <vscode-dropdown class="full-width" id="cloud-backend-name-dropdown">
                    </vscode-dropdown>
                </div>
                <div>
                    <label for="language-dropdown">Language</label>
                    <vscode-dropdown class="full-width" id="language-dropdown">
                        <vscode-option value="ionq">IonQ <small><i>(JSON)</i></small></vscode-option>
                        <vscode-option selected value="openqasm">OpenQASM 2.0</vscode-option>
                        <vscode-option value="qobj">Qobj <small><i>(JSON)</i></small></vscode-option>
                        <vscode-option value="qubit-toaster">Qubit Toaster <small><i>(JSON)</i></small></vscode-option>
                        <vscode-option value="quil">Quil 2.0</vscode-option>
                        <vscode-option value="quantum-circuit">quantum-circuit <small><i>(JSON)</i></small></vscode-option>
                    </vscode-dropdown>
                </div>
                <vscode-divider role="separator"></vscode-divider>
                <div>
                    <label for="output-data-grid">Output</label>
                    <vscode-data-grid id="output-data-grid" generate-header="none">
                        <vscode-data-grid-row row-type="sticky">
                            <vscode-data-grid-cell cell-type="columnheader" grid-column="1">Qubit</vscode-data-grid-cell>
                            <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Probability</vscode-data-grid-cell>
                            <vscode-data-grid-cell cell-type="columnheader" grid-column="3">Measurement</vscode-data-grid-cell>
                        </vscode-data-grid-row>
                    </vscode-data-grid>
                </div>
                <vscode-divider role="separator"></vscode-divider>
                <vscode-button class="full-width" id="run-button">Run</vscode-button>
                <script type="module" nonce="${nonce}" src="${webviewJsUri}"></script>
                <script type="text/javascript" nonce="${nonce}" src="${quantumCircuitJsUri}"></script>
                <script type="text/javascript" nonce="${nonce}">
                    const vscode = acquireVsCodeApi();

                    /* Initialize fields */
                    document.getElementById("cloud-backend-name-dropdown-label").style.display = "none";
                    document.getElementById("cloud-backend-name-dropdown").style.display = "none";

                    /* Switch name dropdown menus */
                    function switchNameDropdown() {
                        var simulatorNameDropdownLabel = document.getElementById("simulator-backend-name-dropdown-label");
                        var simulatorNameDropdown = document.getElementById("simulator-backend-name-dropdown");
                        var cloudNameDropdownLabel = document.getElementById("cloud-backend-name-dropdown-label");
                        var cloudNameDropdown = document.getElementById("cloud-backend-name-dropdown");

                        switch(document.getElementById("backend-type-dropdown").value) {
                            case "simulator":
                                cloudNameDropdownLabel.style.display = "none";
                                cloudNameDropdown.style.display = "none";
                                simulatorNameDropdownLabel.style.display = "";
                                simulatorNameDropdown.style.display = "";
                                break;
                            case "cloud":
                                simulatorNameDropdownLabel.style.display = "none";
                                simulatorNameDropdown.style.display = "none";
                                cloudNameDropdownLabel.style.display = "";
                                cloudNameDropdown.style.display = "";
                                break;
                        }
                    }

                    /* Read out all error messages and show first one */
                    function handleErrors(errors) {
                        if(errors && errors.length) {
                            process.exit(1);
                        }
                    }

                    function clearOutput() {
                        const outputDataGrid = document.getElementById("output-data-grid");
                        while (outputDataGrid.children.length > 1) {
                            outputDataGrid.removeChild(outputDataGrid.lastChild);
                        }
                    }

                    function setOutput(columns, rows, probabilities, measurements) {
                        clearOutput();
                        for (let row = 0; row < rows; row++) {
                            const dataGridRow = document.createElement("vscode-data-grid-row");
                            for (let column = 0; column < columns; column++) {
                                const dataGridCell = document.createElement("vscode-data-grid-cell");
                                dataGridCell.gridColumn = column+1;
                                switch(column) {
                                    case 0:
                                        dataGridCell.innerHTML = "q<sub>" + row + "</sub>";
                                        break;
                                    case 1:
                                        dataGridCell.innerHTML = probabilities[row];
                                        break;
                                    case 2:
                                        dataGridCell.innerHTML = measurements[row];
                                        break;
                                }
                                dataGridRow.appendChild(dataGridCell);
                            }
                            document.getElementById("output-data-grid").appendChild(dataGridRow);
                        }
                    }

                    /* Main callback function for converting specified source language input to target language output */
                    async function run(input) {
                        if(input != "") {
                            circuit = new QuantumCircuit();

                            switch(document.getElementById("language-dropdown").value) {
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

                            switch(document.getElementById("simulator-backend-name-dropdown").value) {
                                case "quantum-circuit":
                                    circuit.run();
                                    setOutput(3, circuit.probabilities().length, circuit.probabilities(), circuit.measureAll());
                                    break;
                                case "qubit-toaster":
                                    vscode.postMessage({ type: "runQubitToaster", json: JSON.stringify(circuit.exportRaw()) });
                                    break;
                            }
                        } else {
                            clearOutput();
                        }
                    }

                    /* Callback functions for user interaction */
                    document.getElementById("backend-type-dropdown").addEventListener("change", switchNameDropdown);
                    document.getElementById("run-button").addEventListener("click", () => {
                        vscode.postMessage({ type: "readFile" });
                    });

                    const handleMessage = (message) => {
                        switch (message.data.type) {
                            case "fileContent":
                                run(message.data.fileContent);
                                break;
                            case "noFileOpen":
                                clearOutput();
                                break;
                            case "postQubitToasterResult":
                                console.log(message.data.json);
                                setOutput(3, message.data.json.probabilites.length, message.data.json.probabilites, Object.keys(message.data.json.counts)[0].split(""));
                                break;
                        }
                    }
                    window.addEventListener("message", handleMessage);

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
                case "readFile":
                    const editor = vscode.window.activeTextEditor;

                    if (editor) {
                        let file = editor.document;
                        const fileContent = file.getText();

                        webviewView.webview.postMessage({
                            type: "fileContent",
                            fileContent: fileContent,
                        });
                    } else {
                        webviewView.webview.postMessage({
                            type: "noFileOpen",
                        });
                    }
                    break;
                case "runQubitToaster":
                    let command = "";

                    switch (process.platform) {
                        case "linux":
                            command = `echo '${message.json}' | qubit-toaster - -r probabilities -r measure_all`;
                            break;
                        case "win32":
                            command = `echo ${message.json} | qubit-toaster - -r probabilities -r measure_all`;
                            break;
                    }

                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error executing command: ${error.message}`);
                            return;
                        }

                        if (stderr) {
                            console.error(`stderr: ${stderr}`);
                            return;
                        }

                        webviewView.webview.postMessage({
                            type: "postQubitToasterResult",
                            json: JSON.parse(stdout),
                        });
                    });
                    break;
            }
        });
    }
}
