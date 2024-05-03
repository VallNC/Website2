const fs = require('fs');
const textFile = fs.readFileSync('../1-node-farm/starter/txt/input.txt', 'utf-8' );


const hello = 'Hello World!';
console.log(hello);
console.log(textFile);
const textOut = `This is what we know about the avocado: ${textFile}.\nCreated on ${1+3},${Date.now()}`;
fs.writeFileSync('../1-node-farm/starter/txt/output.txt',textOut);
console.log("File Written")