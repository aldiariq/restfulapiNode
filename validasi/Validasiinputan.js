//import libary dan module
const Joi = require('@hapi/joi');

//inisialisai skema validasi inputan
const validasiDaftar = data => {
    const skemavalidasiDaftar = Joi.object({
        email: Joi.string().required().email(),
        nama: Joi.string().required(),
        password: Joi.string().required()
    });

    return skemavalidasiDaftar.validate(data);
}

const validasiMasuk = data => {
    const skemavalidasiMasuk = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    return skemavalidasiMasuk.validate(data);
}

const validasiInputanpengingat = data => {
    const skemavalidasiInputanpengingat = Joi.object({
        judul: Joi.string().required(),
        isi: Joi.string().required()
    });

    return skemavalidasiInputanpengingat.validate(data);
}

//export module
module.exports.validasiDaftar = validasiDaftar;
module.exports.validasiMasuk = validasiMasuk;
module.exports.validasiInputanpengingat = validasiInputanpengingat;