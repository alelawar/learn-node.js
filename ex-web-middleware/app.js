const express = require('express');
const app = express();
const xLayout = require('express-ejs-layouts')
const morgan = require('morgan')
const port = 3000
// gunakan ejs

// builtin static
app.use(express.static('public'))

// Third party middleware
app.set('view engine', 'ejs')
app.use(xLayout)
app.use(morgan('dev'))



// app midleware
app.use((res, req, next) => {
    console.log('Time : ' + Date.now())
    next()
})

app.get('/', (req, res) => {
    // res.send('hello world')
    // res.sendFile('./index.html', { root: __dirname })
    const mahasiswa = [
        {
            nama: 'ale',
            nim: 22111
        },
        {
            nama: 'pry',
            nim: 22113
        },
        {
            nama: 'dlan',
            nim: 20922
        }
    ]
    res.render('index', { nama: 'ale', title: 'Home page', mahasiswa, layout: 'layouts/main' })

})

app.get('/about', (req, res) => {
    res.render('abt', {title: 'About Page',layout: 'layouts/main' })
})
app.get('/contact', (req, res) => {
    res.render('kntk', {title: 'Contact Page', layout: 'layouts/main'})
})
app.get('/produk/:id', (req, res) => {
    res.send(`Produk ID :  ${req.params.id} <br> Category ID : ${req.query.catId}`)
})
app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1> 404 </h1>')
})

app.listen(port, () => {
    console.log(`App listening in port http://localhost:${port}`) 
})