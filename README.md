# Visual Studio Code Extension for "Developer Experience in Iterative Quantum Software Engineering" (DEQSE)

A tool for quantum computing developed as part of the DEQSE project at the University of Jyväskylä.

This work has been supported by the Academy of Finland (project DEQSE 349945).

## Features

- **Code Converter** for Code Written in Quantum Computing Languages
  <details>
    <summary>Supported source languages</summary>

    - IonQ *(JSON)*
    - OpenQASM 2.0
    - Qobj *(JSON)*
    - Qubit Toaster *(JSON)*
    - Quil 2.0
    - quantum-circuit *(JSON)*
  </details>
  <details>
    <summary>Supported target languages</summary>

    - AQASM
    - Amazon Braket *(Python)*
    - Cirq *(Python)*
    - JavaScript
    - OpenQASM 2.0
    - Q#
    - Qiskit *(Python)*
    - Qobj *(JSON)*
    - Qubit Toaster *(JSON)*
    - QuEST *(C/C++)*
    - Quil
    - quantum-circuit *(JSON)*
    - TensorFlow Quantum *(Python)*
    - pyAQASM *(Python)*
    - pyQuil *(Python)*
  </details>

## Extension Settings

## Setup

To be able to use the Qubit Toaster quantum simulator, execute the following command to install it:

`curl https://quantastica.com/toaster/install | /bin/sh`

## Known Issues

None so far. Please report issues and bugs.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for more details.

### Version 0.1.0

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Attribution

The following npm packages are used (*in alphabetical order*):
- [Font Awesome (Free)](https://fontawesome.com/) <`@fortawesome/fontawesome-free`>
- [Quantum Circuit Simulator](https://github.com/quantastica/quantum-circuit) <`quantum-circuit`>
- [Visual Studio Code Codicons](https://github.com/microsoft/vscode-codicons) <`@vscode/codicons`>
- [Webview UI Toolkit for Visual Studio Code](https://github.com/microsoft/vscode-webview-ui-toolkit) <`@vscode/webview-ui-toolkit`>

The following additional tools are used or partly integrated (*in alphabetical order*):
- [Project Templates](https://github.com/cantonios/vscode-project-templates): A Visual Studio Code extension that allows to quickly create new projects based on custom templates.
- [Quirk](https://github.com/Strilanc/Quirk): A drag-and-drop quantum circuit simulator that runs in the browser.

In addition, some utilities and the general structure are based on examples from the [Visual Studio Code Extension Samples](https://github.com/microsoft/vscode-extension-samples) and the [Webview UI Toolkit for Visual Studio Code Extension Samples](https://github.com/microsoft/vscode-webview-ui-toolkit-samples).

## Contributors

- Julian Fuchs ([@julian-fuchs](https://github.com/julian-fuchs)), *University of Jyväskylä*
- Majid Haghparast ([@MajidHaghparast](https://github.com/MajidHaghparast)), *University of Jyväskylä*

## Contact

Majid Haghparast <<majid.m.haghparast@jyu.fi>>
