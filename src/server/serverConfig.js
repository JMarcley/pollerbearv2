var https = require('https');
var fs = require('fs');
// import https from 'https';
// import fs from 'fs';

module.exports = {
  //HTTPS imports
  options: {
      key: fs.readFileSync('./certs/server.key'),
      cert: fs.readFileSync('./certs/server.crt'),
      requestCert: false,
      rejectUnauthorized: false
  }

  // delete this line for CA signed cert
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
};
