const fs = require('fs');
const http = require('http');
const url = require('url');
//Testing


//////////////////////////////
///////FILES

// const hello = 'Hello World!';
// console.log(hello);
//Blocking, Synchronous way
// const textFile = fs.readFileSync('../1-node-farm/starter/txt/input.txt', 'utf-8' );
// console.log(textFile);
// const textOut = `This is what we know about the avocado: ${textFile}.\nCreated on ${1+3},${Date.now()}`;
// fs.writeFileSync('../1-node-farm/starter/txt/output.txt',textOut);
// console.log("File Written")

//Non Blocking, Asynchronous way
// fs.readFile('../1-node-farm/starter/txt/input.txt','utf-8', (err, data)=>{
//     console.log(data);
// })
// //Next line goes before the readFile
// console.log('Reading file.')
//
// fs.readFile('../1-node-farm/starter/txt/start.txt','utf-8', (err, data1)=>{
//     if(err) return console.log('ERROR💫💫💫');
//     fs.readFile(`../1-node-farm/starter/txt/${data1}.txt`,'utf-8', (err, data2)=>{
//         console.log(data2);
//         fs.readFile(`../1-node-farm/starter/txt/append.txt`,'utf-8', (err, data3)=>{
//             console.log(data3);
//             fs.writeFile(`../1-node-farm/starter/txt/final.txt`,`${data2}\n${data3}`,'utf-8', err =>{
//                 console.log('Your file has been written finally❤️');
//             })
//         })
//     })
// })


//////////////////////////////
///////SERVER

//Formatting JSON file
const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}
//
const tempOverview = fs.readFileSync('../1-node-farm/starter/templates/template-overview.html', 'utf8');
const tempCard = fs.readFileSync('../1-node-farm/starter/templates/template-card.html', 'utf8');
const tempProduct = fs.readFileSync('../1-node-farm/starter/templates/template-product.html', 'utf8');

const data = fs.readFileSync('../1-node-farm/starter/dev-data/data.json', 'utf8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    //console.log(req);
    console.log(req.url);
    const {query, pathname} = (url.parse(req.url, true));
    //////////Overview
    if(pathname === '/'||pathname === '/overview')
    {
        //////////Overview
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
        //console.log(cardHtml);
        res.end(output);
    } else
    if(pathname === '/product')
    {
        //////////Product
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        console.log(query);
        res.end(output);
    }else
    if(pathname === '/API')
    {
        /////////////////API
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
    }
    else{
        ///////No Page found
        res.writeHead(404, {'Content-type': 'text/html','my-own-header':'hello-world'});
        res.end('<h1>Page not found  :( </h1> ');
    }
})
server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to requests on port 8000.')
});
