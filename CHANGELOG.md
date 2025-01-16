# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.1.0] - 2024-11-10

### Added

- Added Project Creator based on the [Project Templates](https://github.com/cantonios/vscode-project-templates) extension and one example project template `qiskit-hello-world`.
- Added Code Runner with two local backends `quantum-circuit` and `Qubit Toaster`.
- Added Code Converter that supports `IonQ (JSON)`, `OpenQASM 2.0`, `Qobj (JSON)`, `Qubit Toaster (JSON)`, `Quil 2.0`, and `quantum-circuit (JSON)` as input and `AQASM`, `Amazon Braket (Python)`, `Cirq (Python)`, `JavaScript`, `OpenQASM 2.0`, `Q#`, `Qiskit (Python)`, `Qobj (JSON)`, `Qubit Toaster (JSON)`, `QuEST (C/C++)`, `Quil`, `quantum-circuit (JSON)`, `TensorFlow Quantum (Python)`, `pyAQASM (Python)`, and `pyQuil (Python)` as output.
- Integrated [Quirk-E](https://github.com/DEQSE-Project/Quirk-E) Circuit Designer with online and offline mode.
