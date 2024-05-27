/*
 * MIT License
 *
 * Copyright (c) Microsoft Corporation
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

const { build } = require("esbuild");
const { copy } = require("esbuild-plugin-copy");

//@ts-check
/** @typedef {import("esbuild").BuildOptions} BuildOptions **/

/** @type BuildOptions */
const baseConfig = {
    bundle: true,
    minify: process.env.NODE_ENV === "production",
    sourcemap: process.env.NODE_ENV !== "production",
};

// Config for extension source code (to be run in a Node-based context)
/** @type BuildOptions */
const extensionConfig = {
    ...baseConfig,
    platform: "node",
    mainFields: ["module", "main"],
    format: "cjs",
    entryPoints: ["./src/extension.ts"],
    outfile: "./out/extension.js",
    external: ["vscode"],
    plugins: [
        // Copy `assets` to `out` directory unaltered
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./src/assets/**/*"],
                to: ["./out/assets/"],
            },
        }),
        // Copy relevant `codicon` files to `out` directory unaltered
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./node_modules/@vscode/codicons/dist/codicon.css", "./node_modules/@vscode/codicons/dist/codicon.ttf"],
                to: ["./out/assets/fonts/codicon/"],
            },
        }),
        // Copy relevant `fontawesome/css` files to `out` directory unaltered
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css", "./node_modules/@fortawesome/fontawesome-free/css/solid.min.css"],
                to: ["./out/assets/fonts/fontawesome/"],
            },
        }),
        // Copy relevant `fontawesome/webfonts` files to `out` directory unaltered
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf", "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2"],
                to: ["./out/assets/fonts/fontawesome/"],
            },
        }),
        // Copy `quantum-circuit` dist file to `out` directory unaltered
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./node_modules/quantum-circuit/dist/quantum-circuit.min.js"],
                to: ["./out/assets/scripts/"],
            },
        }),
        // Copy `project-templates` to `out` directory unaltered
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./src/project-templates/**/*"],
                to: ["./out/project-templates/"],
            },
        }),
    ],
};

// Config for webview source code (to be run in a web-based context)
/** @type BuildOptions */
const webviewConfig = {
    ...baseConfig,
    target: "es2020",
    format: "esm",
    entryPoints: ["./src/webview/main.ts"],
    outfile: "./out/webview.js",
};

// This watch config adheres to the conventions of the esbuild-problem-matchers
// extension (https://github.com/connor4312/esbuild-problem-matchers#esbuild-via-js)
/** @type BuildOptions */
const watchConfig = {
    watch: {
        onRebuild(error, result) {
            console.log("[watch] build started");
            if (error) {
                error.errors.forEach((error) =>
                    console.error(
                        `> ${error.location.file}:${error.location.line}:${error.location.column}: error: ${error.text}`
                    )
                );
            } else {
                console.log("[watch] build finished");
            }
        },
    },
};

// Build script
(async () => {
    const args = process.argv.slice(2);
    try {
        if (args.includes("--watch")) {
            // Build and watch extension and webview code
            console.log("[watch] build started");
            await build({
                ...extensionConfig,
                ...watchConfig,
            });
            await build({
                ...webviewConfig,
                ...watchConfig,
            });
            console.log("[watch] build finished");
        } else {
            // Build extension and webview code
            await build(extensionConfig);
            await build(webviewConfig);
            console.log("build complete");
        }
    } catch (err) {
        process.stderr.write(err.stderr);
        process.exit(1);
    }
})();
