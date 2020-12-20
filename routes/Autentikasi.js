//import library dan module
const router = require('express').Router();
const Pengguna = require('../model/Pengguna');
const { validasiDaftar, validasiMasuk } = require('../validasi/Validasiinputan');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

//inisialisasi routes autentikasi
router.post('/daftar', async (req, res) => {
    //inisialisasi error dari skema validasi daftar
    const { error } = validasiDaftar(req.body);

    //jika inputan sesuai
    if (!error) {
        //pencarian pengguna dengan email yang diinputkan
        const cekpengguna = await Pengguna.findOne({
            email: req.body.email
        });

        //jika pengguna tidak ada/belum terdaftar
        if (!cekpengguna) {
            //inisialisasi salt dan hashing menggunakan bcrypt
            const salt = await bcrypt.genSalt(10);
            const passwordenkripsi = await bcrypt.hash(req.body.password, salt);

            //inisialisasi data daftar pengguna
            const datapengguna = new Pengguna({
                email: req.body.email,
                nama: req.body.nama,
                password: passwordenkripsi
            });

            //proses pengecekan error
            try {
                //menyimpan pengguna ke basis data
                const simpanpengguna = await datapengguna.save();

                //jika proses penyimpanan berhasil
                if (simpanpengguna) {
                    return res.status(200).send({
                        'berhasil': true,
                        'pesan': 'Berhasil Menyimpan Data Pengguna'
                    });
                    //jika proses penyimpanan gagal
                } else {
                    return res.status(400).send({
                        'berhasil': false,
                        'pesan': 'Gagal Menyimpan Data Pengguna'
                    });
                }
                //jika error
            } catch (error) {
                return res.status(400).send({
                    'berhasil': false,
                    'pesan': 'Gagal Menyimpan Data Pengguna'
                });
            }
            //jika email pengguna sudah ada/terdaftar
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': 'Email Sudah Terdaftar'
            });
        }
        //jika data yang diinputkan tidak sesuai
    } else {
        return res.status(400).send({
            'berhasil': false,
            'pesan': 'Pastikan Inputan Memenuhi Standar'
        });
    }
});

router.post('/masuk', async (req, res) => {
    //inisialisasi error dari skema validasi masuk
    const { error } = validasiMasuk(req.body);

    //jika inputan sesuai
    if (!error) {
        //pencarian data pengguna dengan email yang diinputkan
        const datamasuk = await Pengguna.findOne({
            email: req.body.email
        });

        //jika data pengguna ditemukan
        if (datamasuk) {
            //proses komparasi/perbandingan password yang diinputkan dengan password
            //yang ada di basis data
            const cekpassword = await bcrypt.compare(req.body.password, datamasuk.password);

            //jika password benar
            if (cekpassword) {
                //proses inisialisasi token pengguna
                const token = jsonwebtoken.sign({
                    _id: datamasuk._id
                }, process.env.JWT_TOKEN);

                return res.status(200).header({
                    'auth-token': token
                }).send({
                    'berhasil': true,
                    'pesan': 'Berhasil Masuk'
                });
                //jika password salah
            } else {
                return res.status(400).send({
                    'berhasil': false,
                    'pesan': 'Pastikan Password Benar'
                });
            }
            //jika data pengguna tidak ditemukan
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': 'Pastikan Email Sudah Terdaftar'
            });
        }
        //jika inputan tidak sesuai
    } else {
        return res.status(400).send({
            'berhasil': false,
            'pesan': 'Pastikan Inputan Memenuhi Standar'
        });
    }
});

//export module
module.exports = router;