//import library dan module
const router = require('express').Router();
const validasiToken = require('../validasiToken/validasiToken');
const Pengingat = require('../model/Pengingat');
const { validasiInputanpengingat } = require('../validasi/Validasiinputan');
const Pengguna = require('../model/Pengguna');

//inisialisasi routes kelola pengguna dengan middleware validasiToken
router.get('/', validasiToken, async (req, res) => {
    //proses pengecekan error
    try {
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
    } catch (error) {
        res.status(400).send({
            'berhasil': false,
            'pesan': "Operasi Gagal Dijalankan"
        });
    }
});

router.get('/:_id', validasiToken, async (req, res) => {
    //proses pengecekan error
    try {
        //mencari data pengguna dengan id yang diinputkan
        const cekpengguna = await Pengguna.findOne({
            _id: req.pengguna._id
        });

        //jika pengguna ditemukan
        if (cekpengguna) {
            const datapengingat = await Pengingat.findOne({
                _id: req.params._id,
                idpengguna: req.pengguna._id
            });

            if (datapengingat) {
                return res.status(200).send({
                    'berhasil': true,
                    'pesan': "Berhasil Mendapatkan Data Pengingat",
                    'pengingat': datapengingat
                });
            } else {
                return res.status(400).send({
                    'berhasil': false,
                    'pesan': "Pengingat Tidak Ditemukan"
                });
            }
            //jika pengguna tidak ditemukan
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': "Pengguna Tidak Ditemukan"
            });
        }
    } catch (error) {
        res.status(400).send({
            'berhasil': false,
            'pesan': "Operasi Gagal Dijalankan"
        });
    }
});

router.post('/', validasiToken, async (req, res) => {
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
                    'pesan': "Operasi Gagal Dijalankan"
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

router.delete('/', validasiToken, async (req, res) => {
    //proses pengecekan error
    try {
        //mencari data pengguna dengan id yang diinputkan
        const cekpengguna = await Pengguna.findOne({
            _id: req.pengguna._id
        });

        //jika pengguna ditemukan
        if (cekpengguna) {
            const hapussemuapengingat = await Pengingat.deleteMany({
                idpengguna: req.pengguna._id
            });

            if (hapussemuapengingat) {
                return res.status(200).send({
                    'berhasil': true,
                    'pesan': "Berhasil Menghapus Pengingat"
                });
            } else {
                return res.status(400).send({
                    'berhasil': false,
                    'pesan': "Gagal Menghapus Pengingat"
                });
            }
            //jika pengguna tidak ditemukan
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': "Pengguna Tidak Ditemukan"
            });
        }
    } catch (error) {
        res.status(400).send({
            'berhasil': false,
            'pesan': "Operasi Gagal Dijalankan"
        });
    }
});

router.delete('/:_id', validasiToken, async (req, res) => {
    //proses pengecekan error
    try {
        //mencari data pengguna dengan id yang diinputkan
        const cekpengguna = await Pengguna.findOne({
            _id: req.pengguna._id
        });

        //jika pengguna ditemukan
        if (cekpengguna) {
            const datapengingat = await Pengingat.findOne({
                _id: req.params._id,
                idpengguna: req.pengguna._id
            });

            if (datapengingat) {
                const hapuspengingat = await Pengingat.deleteOne({
                    _id: req.params._id,
                    idpengguna: req.pengguna._id
                });

                if (hapuspengingat) {
                    return res.status(200).send({
                        'berhasil': true,
                        'pesan': "Pengingat Berhasil Dihapus"
                    });
                } else {
                    return res.status(400).send({
                        'berhasil': true,
                        'pesan': "Pengingat Gagal Dihapus"
                    });
                }
            } else {
                return res.status(400).send({
                    'berhasil': false,
                    'pesan': "Pengingat Tidak Ditemukan"
                });
            }
            //jika pengguna tidak ditemukan
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': "Pengguna Tidak Ditemukan"
            });
        }
    } catch (error) {
        res.status(400).send({
            'berhasil': false,
            'pesan': "Operasi Gagal Dijalankan"
        });
    }
});

router.put('/:_id', validasiToken, async (req, res) => {
    //proses pengecekan error
    try {
        //mencari data pengguna dengan id yang diinputkan
        const cekpengguna = await Pengguna.findOne({
            _id: req.pengguna._id
        });

        //jika pengguna ditemukan
        if (cekpengguna) {
            const datapengingat = await Pengingat.findOne({
                _id: req.params._id,
                idpengguna: req.pengguna._id
            });

            if (datapengingat) {
                const ubahpengingat = await Pengingat.updateOne(
                    {_id: req.params._id, idpengguna: req.pengguna._id},
                    {
                        judul: req.body.judul,
                        isi: req.body.isi
                    }
                );

                if (ubahpengingat) {
                    return res.status(200).send({
                        'berhasil': true,
                        'pesan': "Pengingat Berhasil Diubah"
                    });
                } else {
                    return res.status(400).send({
                        'berhasil': false,
                        'pesan': "Pengingat Gagal Diubah"
                    })
                }
            } else {
                return res.status(400).send({
                    'berhasil': false,
                    'pesan': "Pengingat Tidak Ditemukan"
                });
            }
            //jika pengguna tidak ditemukan
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': "Pengguna Tidak Ditemukan"
            });
        }
    } catch (error) {
        res.status(400).send({
            'berhasil': false,
            'pesan': "Operasi Gagal Dijalankan"
        });
    }
});

//export module
module.exports = router;