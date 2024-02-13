/*
 * Run this file to regenerate the resume pdf.
 *
 * Example run command from repo root:
 * `node ./src/pdf/makePdf.js`
 *
 * This file initializes babel to transpile the rest of the node script.
 */

require('@babel/register')({
  ignore: [/(node_modules)/]
})

require('./pdfRenderer')
