//import library dan module
const router = require('express').Router();
const validasiToken = require('../validasiToken/validasiToken');

//inisialisasi routes kelola pengguna dengan middleware validasiToken
router.get('/', validasiToken, (req, res) => {
    return res.status(200).send({
        pengingat: {
            judul: 'tes judul pengingat',
            isi: 'tes isi judul pengingat'
        }
    })
});

//export module
module.exports = router;