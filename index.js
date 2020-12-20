//import library dan modules
const express = require('express');
const app = express();
const Autentikasi = require('./routes/Autentikasi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Pengingat = require('./routes/Kelolapengingat');

//implementasi middleware penerima json
app.use(express.json());

//implementasi routes
app.get('/api', (req, res) => {
    res.status(200).send({
        'berhasil': true,
        'pesan': 'Route Utama Restfulapi'
    });
});

app.use('/api/autentikasi', Autentikasi);

app.use('/api/pengingat', Pengingat);

//koneksi database mongodb
mongoose.connect(
    process.env.DB_CONFIG,
    { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Koneksi MongoDB Berhasil');
    }
);

//menjalankan server
app.listen(3000, () => {
    console.log('Server Berjalan Pada Port 3000');
});