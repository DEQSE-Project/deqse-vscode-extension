# Contributing

This guide shows how to develop, test and package the extension.

***Note:** It is recommended to use a Linux-based operating system such as Ubuntu for development. Therefore, this guide focuses only on Linux.*

## Building the Extension Locally

1. Install [git](https://git-scm.com/download) and [Node.js](https://nodejs.org/en/download) (*recommended to use the nvm package manager*) if not already installed.

2. Clone this repository:

    `git clone https://github.com/DEQSE-Project/deqse-vscode-extension.git`

3. Install the dependencies:

    `cd deqse-vscode-extension`

    `npm install`

4. Build the extension:

    `npm run compile`

    **OR**

    `npm run package` for a production build

## Debugging and Testing the Extension

1. Follow the steps in the section ["Building the Extension Locally"](#building-the-extension-locally).

2. Install [Visual Studio Code](https://code.visualstudio.com/Download).

3. Open the project:

    `cd deqse-vscode-extension`

    `code .`

4. Run the extension:

    Select `Run > Start Debugging` in the menu bar or press `F5` to debug and test the extension.  
    To reload the extension once started, for example to apply changes, press `CTRL+SHIFT+F5`.

## Packaging the Extension

1. Install [vsce](https://github.com/microsoft/vscode-vsce):

    `npm install -g @vscode/vsce`

2. Package the extension:

    `cd deqse-vscode-extension`

    `vsce package`
