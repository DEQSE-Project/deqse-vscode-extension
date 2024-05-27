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

import * as child_process from "child_process";

/**
 * Helper funcion to open a folder in the user's file manager
 * @export
 * @param {string} folder folder to open
 */
export function openFolderInExplorer(folder: string) {
    let command = "";
    switch (process.platform) {
        case "linux":
            command = "xdg-open";
            break;
        case "darwin":
            command = "open";
            break;
        case "win32":
            command = "explorer.exe";
            break;
    }

    // Execute open folder command
    if (command) {
        child_process.spawn(command, [folder]);
    }
}
