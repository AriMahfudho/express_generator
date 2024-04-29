var express = require('express');
var router = express.Router();
var kelas = require('../controller/kelasController')

router.get('/', kelas.getAllkelas); //get semua data
router.get('/:id', kelas.getKelasId); //get data berdasarkan ID
router.post('/', kelas.createKelas); //membuat data
router.put('/:id', kelas.updateKelas); //mengubah data
router.delete('/:id', kelas.deleteKelas); //menghapus data

module.exports  = router; //kode paling bawah

// var connection  = require('../library/database');

// //get
// router.get('/:id', function(req, res) { 
//     //dengan id ('/:id')

//     let id = req.params.id;


//     connection.query('SELECT * FROM kelas WHERE id ='+ id, function(err, rows) {
//         if (err) {
//             res.send('error', err);
//             res.json({
//                 data: ''
//             } );
//         } else {
//             //menampilkan hasil data kelas
//             res.json({
//                 data: rows // tampilan data kelas
//             } );
//         }
//     } );
// } );

// //post kelas
// router.post('/', function(req, res) { 

//     let nama_jurusan = req.body.nama_jurusan;
//     let Deskripsi = req.body.Deskripsi;
//     let errors = false;

//     if(!nama_jurusan ){
//         errors = true;
//         res.json({pesan : 'Field nama_jurusan belum diisi, Field harus diisi lengkap'} );
//     }
//     if(!Deskripsi ){
//         errors = true;
//         res.json({pesan : 'Field Deskripsi belum diisi, Field harus diisi lengkap'} );
//     }

//     //if no error
//     if(!errors) {
//         let formData = {
//             nama_jurusan: nama_jurusan,
//             Deskripsi: Deskripsi
//         }

//         //insert query
//         connection.query('INSERT INTO kelas SET ?', formData, function(err, result) {
//             if (err) {
//                 res.json({pesan :'Data gagal disimpan'});
//             } else {
//                 res.send('Data Berhasil Disimpan');
//             }
//         } )
//     }
// })

// //update kelas
// router.put('/', function(req, res) { 

//     let id = req.params.id;
//     let nama_jurusan = req.body.nama_jurusan;
//     let Deskripsi = req.body.Deskripsi;
//     let errors = false;

//     if(!nama_jurusan ){
//         errors = true;
//         res.json({pesan : 'Field nama_jurusan belum diisi, Field harus diisi lengkap'} );
//     }
//     if(!Deskripsi ){
//         errors = true;
//         res.json({pesan : 'Field Deskripsi belum diisi, Field harus diisi lengkap'} );
//     }

//     //if no error
//     if(!errors) {
//         let formData = {
//             nama_jurusan: nama_jurusan,
//             Deskripsi: Deskripsi
//         }

//         //insert query
//         connection.query('UPDATE kelas SET ? WHERE id = '+id, formData, function(err, result) {
//             //if (err)
//             if (err) {
//                 res.send('error', err);
//                 res.json({
//                     id: req.params.id,
//                     nama_jurusan: formData.nama_jurusan,
//                     Deskripsi: formData.Deskripsi
//                 });
//             } else {
//                 res.send('Data Berhasil Disimpan');
//             }
//         } )
//     }
// })

// //delete kelas
// router.delete('/:id', function(req, res) { 

//     let id = req.params.id;
    
//     connection.query('DELETE FROM kelas WHERE id = ' + id, formData, function(err, result) {
//         if (err) {
//             res.send('error', err)
//         } else {
//             res.send('Data Berhasil Dihapus')
//         }
//     } )
// } )

