//import library dan module
const mongoose = require('mongoose');

//inisialisasi skema
const pengingatSchema = new mongoose.Schema({
    idpengguna: {
        type: String,
        required: true
    },
    judul: {
        type: String,
        required: true
    },
    isi: {
        type: String,
        required: true
    },
    tanggalInput: {
        type: Date,
        default: Date.now
    }
});

//export module
module.exports = mongoose.model('Pengingat', pengingatSchema);