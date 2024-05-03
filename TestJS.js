const fs = require('fs');



const hello = 'Hello World!';
console.log(hello);
//Blocking, Synchronous way
// const textFile = fs.readFileSync('../1-node-farm/starter/txt/input.txt', 'utf-8' );
// console.log(textFile);
// const textOut = `This is what we know about the avocado: ${textFile}.\nCreated on ${1+3},${Date.now()}`;
// fs.writeFileSync('../1-node-farm/starter/txt/output.txt',textOut);
// console.log("File Written")

//Non Blocking, Asynchronous way
fs.readFile('../1-node-farm/starter/txt/input.txt','utf-8', (err, data)=>{
    console.log(data);
})
//Next line goes before the readFile
console.log('Reading file.')

fs.readFile('../1-node-farm/starter/txt/start.txt','utf-8', (err, data1)=>{
    if(err) return console.log('ERROR💫💫💫');
    fs.readFile(`../1-node-farm/starter/txt/${data1}.txt`,'utf-8', (err, data2)=>{
        console.log(data2);
        fs.readFile(`../1-node-farm/starter/txt/append.txt`,'utf-8', (err, data3)=>{
            console.log(data3);
            fs.writeFile(`../1-node-farm/starter/txt/final.txt`,`${data2}\n${data3}`,'utf-8', err =>{
                console.log('Your file has been written finally❤️');
            })
        })
    })
})

