# Visual Studio Code Extension for "Developer Experience in Iterative Quantum Software Engineering" (DEQSE)

![Node Version](https://img.shields.io/badge/DEQSE-v0.1.0-%23002957)
![Node Version](https://img.shields.io/badge/Node-v22-%235FA04E?logo=nodedotjs)

A Quantum IDE Extension tool for quantum software engineering developed as part of the DEQSE project at the University of Jyvaskyla.

**[Features](#features) - [Extension Settings](#extension-settings) - [Setup](#setup) | [Known Issues](#known-issues) - [Release Notes](#release-notes) | [Contributing](#contributing) | [Attribution](#attribution) - [Acknowledgements](#acknowledgements) | [Contributors](#contributors) - [Contact](#contact)**

## How to cite

DEQSE Quantum IDE Extension is free-to-use and to modify. However, you must add reference [1] in case of any publication/production/execution/etc.

[1] Haghparast, M., Heikkinen, R., Ovaskainen, S., Fuchs, J., Jokinen, J. P., & Mikkonen, T. (2025). DEQSE Quantum IDE Extension: Integrated Tool for Quantum Software Engineering. In 2025 IEEE International Conference on Quantum Computing and Engineering (QCE) (Vol. 3). IEEE. arXiv preprint arXiv:2507.22843.


## Features

- **Project Creator** to easily create projects from the following predefined quantum computing project templates:
  - `qiskit-hello-world`
  - *More to be added...*
- **Code Runner** to run quantum code on the following backends:
  - **Simulator (Local)**: quantum-circuit, Qubit Toaster
  - *More to be added...*
- **Code Converter** for code written in the following quantum computing languages:
  - **Input**: IonQ *(JSON)*, OpenQASM 2.0, Qobj *(JSON)*, Qubit Toaster *(JSON)*, Quil 2.0, quantum-circuit *(JSON)*
  - **Output**: AQASM, Amazon Braket *(Python)*, Cirq *(Python)*, JavaScript, OpenQASM 2.0, Q#, Qiskit *(Python)*, Qobj *(JSON)*, Qubit Toaster *(JSON)*, QuEST *(C/C++)*, Quil, quantum-circuit *(JSON)*, TensorFlow Quantum *(Python)*, pyAQASM *(Python)*, pyQuil *(Python)*
- **Circuit Designer** to create circuits in a visual designer

## Extension Settings

- `deqse.projectCreator.templatesDirectory`: Directory to read/store project template folders.
- `deqse.projectCreator.usePlaceholders`: Look for and replace placeholders in template (e. g. #{author}).
- `deqse.projectCreator.placeholderRegExp`: Regular expression for detecting placeholders (e. g. \"#{(\\w+?)}\").  The first capture group dictates the placeholder key.
- `deqse.projectCreator.placeholders`: List of placeholders, in key-value string pairs.
- `deqse.codeConverter.input.fromFile`: Specifies whether to use the currently open file as input instead of the input text area.
- `deqse.circuitDesigner.offlineMode`: Specifies whether the circuit designer should be started in offline mode, without requiring an internet connection. Might not use an up-to-date version of the circuit designer.

## Setup

To be able to use the Qubit Toaster quantum simulator, execute the following command to install it:

`curl https://quantastica.com/toaster/install | /bin/sh`

## Known Issues

Please report issues and bugs. The following are currently known:

- The Code Runner menu does **not support cloud backends**.
- **Live Convert** for the Code Converter is **not functional**.
- **Qubit Toaster has to be installed manually**, but **will be shown** in the dropdown menu **nevertheless**.
- The dependency `quantum-circuit` has a **vulnerable version** of `mathjs` as a sub-dependency.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for more details.

### v0.1.0

- Added Project Creator, Code Runner, Code Converter, and Circuit Designer with basic functionalities.
- **Note:** Not everything might be fully functional as of right now.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Attribution

The following npm packages are used:
- [Font Awesome (Free)](https://fontawesome.com/) <`@fortawesome/fontawesome-free`>
- [Quantum Circuit Simulator](https://github.com/quantastica/quantum-circuit) <`quantum-circuit`>
- [Visual Studio Code Codicons](https://github.com/microsoft/vscode-codicons) <`@vscode/codicons`>
- [Webview UI Toolkit for Visual Studio Code](https://github.com/microsoft/vscode-webview-ui-toolkit) <`@vscode/webview-ui-toolkit`>

The following additional tools are used or integrated:
- [Project Templates](https://github.com/cantonios/vscode-project-templates): A Visual Studio Code extension that allows to quickly create new projects based on custom templates.
- [Quirk-E](https://github.com/DEQSE-Project/Quirk-E): A drag-and-drop quantum circuit simulator that runs in the browser and extends the original [Quirk](https://github.com/Strilanc/Quirk) simulator.

In addition, some utilities and the general structure are based on examples from the [Visual Studio Code Extension Samples](https://github.com/microsoft/vscode-extension-samples) and the [Webview UI Toolkit for Visual Studio Code Extension Samples](https://github.com/microsoft/vscode-webview-ui-toolkit-samples).

Licenses are included in the source files where appropriate.

## Acknowledgements

This work was supported by the Research Council of Finland [grant number [349945](https://research.fi/en/results/funding/70030)].

## Contributors

- Julian Fuchs ([@julian-fuchs](https://github.com/julian-fuchs)) - *University of Jyvaskyla, Hasso Plattner Institute / University of Potsdam*
- Majid Haghparast ([@MajidHaghparast](https://github.com/MajidHaghparast)) - *University of Jyvaskyla*

## Contact

Majid Haghparast <<majid.m.haghparast@jyu.fi>>
