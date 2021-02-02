#!/usr/bin/env node
const fs = require('fs');
const process = require('process');
const path = require('path');

const parseOptions = () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return null;
  }

  let outputFile = null;

  if (args[0] === '-o' || args[0] === '--output') {
    if (args[1] === undefined) {
      args[1] = '.editorconfig';
    } else if (!args[1].trim()) {
      throw new Error('Missing output file path');
    }

    outputFile = path.resolve(args[1]);
  }

  return outputFile;
};

const outputFile = parseOptions();

const editorconfig = fs.readFileSync(path.join(__dirname, '.editorconfig'), 'utf-8');

if (outputFile !== null) {
  console.log(`Writing editorconfig settings to: ${outputFile} ...`);
  fs.writeFileSync(outputFile, editorconfig);
  console.log('Done!');
} else {
  console.log(editorconfig);
}
