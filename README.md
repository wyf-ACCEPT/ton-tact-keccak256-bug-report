# TON Tact Keccak256 Bug Report

## Description

This repository contains a bug report for the TON Tact library. The bug is related to the `keccak256` function.

We found that the `keccak256` function will return a wrong result when the input message is longer than about 128 bytes.

## Build & Test

Run the following commands to build and test the code.

```bash
yarn install
yarn build
yarn test
```

And you can see the test result in the terminal:

```log
$ jest
  console.log
    Keccak256 from ethers: [12345] -> [0x1841d653f9c4edda9d66a7e7737b39763d6bd40f569a3ec6859d3305b72310e6]

      at compare (test/keccak256.spec.ts:22:15)

  console.log
    Keccak256 from tact  : [12345] -> [0x1841d653f9c4edda9d66a7e7737b39763d6bd40f569a3ec6859d3305b72310e6]

      at compare (test/keccak256.spec.ts:23:15)

  console.log
    Keccak256 from ethers: [12345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345] -> [0x536aa8a81eb92ae5bcf6de47bfe77479589f41bfb9fab371e410c672d659f77b]

      at compare (test/keccak256.spec.ts:22:15)

  console.log
    Keccak256 from tact  : [12345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345] -> [0x536aa8a81eb92ae5bcf6de47bfe77479589f41bfb9fab371e410c672d659f77b]

      at compare (test/keccak256.spec.ts:23:15)

  console.log
    Keccak256 from ethers: [123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345] -> [0xbc27ee931824565c08b4df98d55b757239595b486615bb0ff73ea163e946e021]

      at compare (test/keccak256.spec.ts:22:15)

  console.log
    Keccak256 from tact  : [123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345] -> [0xa64a48cef34814209f0bb70d07e9234d5034ef0a7f20cbf7dd8281f1f8ebda40]

      at compare (test/keccak256.spec.ts:23:15)
```