
const fs = require('fs');

const requestHandler = (req,res)=>{

    const url = req.url;
    const method = req.method; 
    if(url==='/') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>')
    res.write('<head><title>Enter Form</title></head>')
    res.write('<body><form  action="/message" method="POST"><input type="text" name="sowmiya"><input type="submit" value="send"></form></body>')
    res.write('</html>')
    return res.end();
//form enctype="multipart/form-data" and <input type="file" name="file">
    }

    if(url==='/message' && method == 'POST'){

    const body = [];
    req.on('data', (chunk)=>{
        // console.log('chunk:');
        // console.log(chunk);
        body.push(chunk)
        console.log(chunk);
    })

    return req.on('end',()=>{ 
        console.log('End event received');
        const parsedBody =  Buffer.concat(body).toString();
        //console.log(parsedBody);
        const message = parsedBody.split('=');
       // fs.writeFileSync('hello.txt', message[1]); 
        fs.writeFile('hello.txt', message[1], (err)=>{

        console.log('Filewrite completed!');
        res.setHeader('Location','/')
        res.statusCode = 302;
        return res.end();

        }); 
        //fs.writeFileSync('hello.txt', 'Dummy');    
    })

    // res.setHeader('Location','/')
    // res.statusCode = 302;
    // return res.end();

    }


res.setHeader('Content-type', 'text/html');
res.write('<html>')
res.write('<head><title>Sowmiya</title></head>')
res.write('<body><h1>Hello From Node.Js Server<h1></body>')
res.write('</html>')
res.end();
};


//module.exports = requestHandler;

// module.exports = {
//     handler:requestHandler,
//     someText:'Printing some text'
// };


// exports.handler = requestHandler;
// exports.someText = 'Printing some text'


module.exports.handler = requestHandler;
module.exports.someText = 'Printing some text';
