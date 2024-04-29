var express = require('express');
var router = express.Router();
var siswa = require('../controller/siswaController')
var connection  = require('../library/database');

router.get('/', siswa.getAllSiswa); //get semua data
router.get('/:id', siswa.getSiswaId); //get data berdasarkan ID
router.post('/', siswa.createSiswa); //membuat data
router.put('/:id', siswa.updateSiswa); //mengubah data
router.delete('/:id', siswa.deleteSiswa); //menghapus data


module.exports  = router; //kode paling bawah

