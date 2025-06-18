const mongoose = require('mongoose')
// Membuat schema
const Contact = mongoose.model('Contact', {
    nama: {
        type: String,
        required: true
    },
    nohp: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});

// Tambahin satu data
// const contact1 = new Contact({
//     nama: "kiki",
//     nohp: '0812345697',
//     email: "kiki@gmail.com"
// })

// contact1.save().then((res) => console.log(res)
// );

module.exports = Contact