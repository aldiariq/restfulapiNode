//import library dan module
const jsonwebtoken = require('jsonwebtoken');

//export module validasi
module.exports = function (req, res, next) {
    //menampung auth-token dari header
    const token = req.header('auth-token');

    //proses pengecekan error
    try {
        //jika token ditemukan
        if (token) {
            //proses validasi token pengguna
            const cektoken = jsonwebtoken.verify(token, process.env.JWT_TOKEN);
            req.pengguna = cektoken;
            next();
            //jika token tidak ditemukan
        } else {
            return res.status(400).send({
                'berhasil': false,
                'pesan': 'Token Tidak Valid'
            });
        }
    } catch (error) {
        return res.status(400).send({
            'berhasil': false,
            'pesan': 'Token Tidak Valid'
        });
    }
}