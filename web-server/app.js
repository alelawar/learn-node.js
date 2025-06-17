const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })

    const url = req.url

    const htmlReq = (path, res) => {
        fs.readFile(path, (e, data) => {
            if (e) {
                res.writeHead(404);
                res.write('File tidak ditemukan')
            } else {
                res.write(data) 
            } 
            res.end()
        })
    }

    switch(url) {
        case 'about' :
            htmlReq('./abt.html', res)
            break;
        case 'contact' :
            htmlReq('./kntk.html', res)
            break;
        default :
        htmlReq('./index.html', res)
            break;
    }

    // if (url === '/about') {
    //     res.write('<h1> About Page </h>')
    //     res.end()
    // } else if (url === '/contact') {
    //     res.write('<h1> Contact Page </h>')
    //     res.end()
    // } else {
    //     htmlReq('./index.html', res)
    // }

}).listen(3000, () => {
    console.log('Server is listening in 3000');
}) 