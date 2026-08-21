# TypeScript 7 WASM

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Release][release-src]][release-href]

**Unofficial** WebAssembly (WASM) distribution of [TypeScript 7](https://github.com/microsoft/TypeScript), automatically built daily via GitHub Actions.

Use this version if your operating system or architecture is not supported by the native build, or if you need to run it in browsers.

Download the latest binaries from the [Releases page](https://github.com/sxzz/tsgo-wasm/releases).

Read more about the TypeScript 7 [here](https://devblogs.microsoft.com/typescript/typescript-native-port/)!

> [!WARNING]
> This is **NOT** an official distribution from the TypeScript official team, but all binaries are built directly from the official source code without any modifications via GitHub Actions.

## Usage

```bash
npm install tsgo-wasm

npx tsgo-wasm -v
# Version 7.0.0-dev.20250519
```

## 🧯 Safety

The binaries are built through GitHub Actions using source code directly from the official TypeScript repository.
Our automated build process preserves the code integrity without any modifications.
The complete build workflow is transparent and open-source, available for inspection [here](./.github/workflows/release.yml).

We understand security concerns regarding unofficial binaries.
For additional peace of mind, you're welcome to fork this repository and execute the build workflow yourself.

## Credits

Thanks to Claude 3.7 Sonnet for helping me build the GitHub Actions workflow.

## License

The TypeScript project and this project both are licensed under the [Apache License 2.0](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/tsgo-wasm.svg
[npm-version-href]: https://npmjs.com/package/tsgo-wasm
[npm-downloads-src]: https://img.shields.io/npm/dm/tsgo-wasm
[npm-downloads-href]: https://www.npmcharts.com/compare/tsgo-wasm?interval=30
[release-src]: https://github.com/sxzz/tsgo-wasm/actions/workflows/release.yml/badge.svg
[release-href]: https://github.com/sxzz/tsgo-wasm/actions/workflows/release.yml
