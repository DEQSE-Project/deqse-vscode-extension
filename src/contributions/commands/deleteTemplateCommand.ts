/*
 * MIT License
 *
 * Copyright (c) 2018 C. Antonio Sánchez
 * Copyright (c) 2024 University of Jyväskylä
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import * as vscode from "vscode";

import ProjectTemplatesPlugin from "../../utilities/projectTemplatesPlugin";

/**
 * Main command to delete an existing template.
 * This command can be invoked by the Command Palette or in a folder context menu on the explorer view.
 * @export
 * @param {ProjectTemplatesPlugin} templateManager
 * @param {*} args
 */
export async function run(templateManager: ProjectTemplatesPlugin, args: any) {

    // load latest configuration
    templateManager.updateConfiguration(vscode.workspace.getConfiguration('deqse.projectCreator'));

    // choose a template then delete
    templateManager.chooseTemplate().then( 
        template => {
            // no template chosen, simply exit
            if (!template) {
                return;
            }

            // delete template
            templateManager.deleteTemplate(template).then(
                (deleted : boolean) => { 
                    if (deleted) {
                        vscode.window.showInformationMessage("Deleted template '" + template + "'");
                    }
                },
                (reason : any) => { 
                    vscode.window.showErrorMessage("Failed to delete template '" + template + "': " + reason);
                }
            );
        }
    );
    
}
