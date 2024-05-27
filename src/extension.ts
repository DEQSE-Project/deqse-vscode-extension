import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import { Constants } from "./constants";

import { getUri } from "./utilities/getUri";
import ProjectTemplatesPlugin from "./utilities/projectTemplatesPlugin";

import * as OpenTemplatesFolderCommand from "./contributions/commands/openTemplatesFolderCommand";
import * as SaveProjectAsTemplateCommand from "./contributions/commands/saveProjectAsTemplateCommand";
import * as DeleteTemplateCommand from "./contributions/commands/deleteTemplateCommand";
import * as CreateProjectFromTemplateCommand from "./contributions/commands/createProjectFromTemplateCommand";

import { ProjectCreatorProvider } from "./contributions/views/projectCreatorWebviewView";
import { CodeRunnerProvider } from "./contributions/views/codeRunnerWebviewView";
import { CodeConverterProvider } from "./contributions/views/codeConverterWebviewView";
import { CircuitDesignerProvider } from "./contributions/views/circuitDesignerWebviewView";

export function activate(context: vscode.ExtensionContext) {
    /*
     * INITIALIZATION
     */

    const projectTemplatesPlugin = new ProjectTemplatesPlugin(context, vscode.workspace.getConfiguration("deqse.projectCreator"));
    projectTemplatesPlugin.createTemplatesDirIfNotExists();

    /*
     * REGISTATION OF COMMANDS
     */

    context.subscriptions.push(
        vscode.commands.registerCommand("deqse.openTemplatesFolder", OpenTemplatesFolderCommand.run.bind(undefined, projectTemplatesPlugin))
    );
    
    context.subscriptions.push(
        vscode.commands.registerCommand("deqse.saveProjectAsTemplate", SaveProjectAsTemplateCommand.run.bind(undefined, projectTemplatesPlugin))
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("deqse.deleteTemplate", DeleteTemplateCommand.run.bind(undefined, projectTemplatesPlugin))
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("deqse.createProjectFromTemplate", CreateProjectFromTemplateCommand.run.bind(undefined, projectTemplatesPlugin))
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("deqse.openCircuitDesigner", () => {
            switch (vscode.workspace.getConfiguration("deqse").get("circuitDesigner.offlineMode")) {
                case true:
                    const panel = vscode.window.createWebviewPanel("circuitDesigner", "Circuit Designer", vscode.ViewColumn.One, { enableScripts: true });

                    let circuitDesignerOfflinePath = getUri(context.extensionUri, Constants.circuitDesignerOfflinePathList).path;
                    if(process.platform === "win32") {
                        circuitDesignerOfflinePath = path.win32.normalize(circuitDesignerOfflinePath).slice(1);
                    }

                    panel.webview.html = fs.readFileSync(circuitDesignerOfflinePath, "utf-8");
                    break;
                case false:
                    vscode.commands.executeCommand("simpleBrowser.api.open", vscode.Uri.parse(Constants.circuitDesignerOnlineUrl));
                    break;
            }
        })
    );

    /*
     * REGISTRATION OF VIEWS
     */

    const projectCreatorProvider = new ProjectCreatorProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "deqse.projectCreator",
            projectCreatorProvider
        )
    );

    const codeRunnerProvider = new CodeRunnerProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "deqse.codeRunner",
            codeRunnerProvider,
            { webviewOptions: { retainContextWhenHidden: true } }
        )
    );

    const codeConverterProvider = new CodeConverterProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "deqse.codeConverter",
            codeConverterProvider,
            { webviewOptions: { retainContextWhenHidden: true } }
        )
    );

    const circuitDesignerProvider = new CircuitDesignerProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "deqse.circuitDesigner",
            circuitDesignerProvider
        )
    );

    /*
     * REGISTRATION OF TEMPLATES
     */

    let qiskitHelloWorldPath = getUri(context.extensionUri, ["out", "project-templates", "qiskit-hello-world"]).path;
    if(process.platform === "win32") {
        qiskitHelloWorldPath = path.win32.normalize(qiskitHelloWorldPath).slice(1);
    }
    projectTemplatesPlugin.saveAsTemplate(qiskitHelloWorldPath, true);
}

export function deactivate() {}
