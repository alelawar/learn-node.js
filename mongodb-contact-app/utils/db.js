const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/wpu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Koneksi MongoDB berhasil');
}).catch((err) => {
    console.error('Koneksi MongoDB gagal:', err);
});
