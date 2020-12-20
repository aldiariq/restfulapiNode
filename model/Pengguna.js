//import library dan module
const mongoose = require('mongoose');

//inisialisasi skema
const penggunaSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    nama: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    tanggalDaftar: {
        type: Date,
        default: Date.now
    }
});

//export module
module.exports = mongoose.model('Pengguna', penggunaSchema);