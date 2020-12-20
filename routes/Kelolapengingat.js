//import library dan module
const router = require('express').Router();
const validasiToken = require('../validasiToken/validasiToken');
const Pengingat = require('../model/Pengingat');
const { validasiInputanpengingat } = require('../validasi/Validasiinputan');
const Pengguna = require('../model/Pengguna');

//inisialisasi routes kelola pengguna dengan middleware validasiToken
router.get('/', validasiToken, async (req, res) => {
    //mencari data pengguna dengan id yang diinputkan
    const cekpengguna = await Pengguna.findOne({
        _id: req.pengguna._id
    });

    //jika pengguna ditemukan
    if (cekpengguna) {
        const datapengingat = await Pengingat.find({
            idpengguna: req.pengguna._id
        });

        return res.status(200).send({
            'berhasil': true,
            'pesan': "Berhasil Mendapatkan Data Pengingat",
            'pengingat': datapengingat
        });
        //jika pengguna tidak ditemukan
    } else {
        return res.status(400).send({
            'berhasil': false,
            'pesan': "Pengguna Tidak Ditemukan"
        });
    }
});

router.post('/tambahpengingat', validasiToken, async (req, res) => {
    //inisialisasi error dari skema validasi pengingat
    const { error } = validasiInputanpengingat(req.body);

    //jika inputan sesuai
    if (!error) {
        //mencari data pengguna dengan id yang diinputkan
        const cekpengguna = await Pengguna.findOne({
            _id: req.pengguna._id
        });

        //jika data pengguna ditemukan
        if (cekpengguna) {
            //inisialisasi data pengingat pengguna
            const datapengingat = new Pengingat({
                idpengguna: req.pengguna._id,
                judul: req.body.judul,
                isi: req.body.isi
            });

            //proses pengecekan error
            try {
                //proses penyimpanan data pengingat
                const simpanpengingat = await datapengingat.save();

                //jika data penginga berhasil disimpan
                if (simpanpengingat) {
                    return res.status(200).send({
                        'berhasil': true,
                        'pesan': "Berhasil Menyimpan Pengingat"
                    });
                } else {
                    return res.status(400).send({
                        'berhasil': false,
                        'pesan': "Gagal Menyimpan Pengingat"
                    });
                }
                //jika error
            } catch (error) {
                return res.status(400).send({
                    'berhasil': false,
                    'pesan': "Gagal Menyimpan Pengingat"
                });
            }
            //jika data pengguna tidak ditemukan
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': "Email Tidak Terdaftar"
            });
        }
        //jika inputan tidak sesuai
    } else {
        return res.status(400).send({
            'berhasil': false,
            'pesan': 'Pastikan Inputan Sesuai Standar'
        });
    }
});

//export module
module.exports = router;