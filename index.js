#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'raw.githubusercontent.com',
  port: 443,
  path: 'saulmaldonado/editorconfig/main/.editorconfig',
  method: 'GET',
};

const req = https.request(options, (res) => {
  console.log('Fetching most recent .editorconfig file...');
  let configFile = '';

  res.on('data', (data) => {
    configFile += data.toString();
  });

  res.on('end', () => {
    fs.writeFileSync('./.editorconfig', configFile);
  });
});

req.on('error', (error) => {
  console.error(error);
  process.exitCode(1);
});

req.end();
