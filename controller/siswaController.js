
var connection  = require('../library/database');

//get all
const getAllSiswa = function (req, res) { 

    connection.query('SELECT * FROM siswa ', function(err, rows) {
        if (err) {
            res.send('error', err);
            res.json({
                data: ''
            } );
        } else {
            //menampilkan hasil data kelas
            res.json({
                data: rows // tampilan data kelas
            } );
        }
    } );
}

//get dengan id ('/:id')
const getSiswaId = function (req, res) { 
    let id = req.params.id;

    connection.query('SELECT * FROM siswa WHERE id ='+ id, function(err, rows) {
        if (err) {
            res.send('error', err);
            res.json({
                data: ''
            } );
        } else {
            //menampilkan hasil data siswa
            res.json({
                data: rows // tampilan data siswa
            } );
        }
    } );
}

//post siswa
const createSiswa = function (req, res) { 

    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let errors = false;

    if(!nama){
        errors = true;
        res.json({pesan : 'Field nama belum diisi, Field harus diisi lengkap'} );
    }
    if(!alamat ){
        errors = true;
        res.json({pesan : 'Field alamat belum diisi, Field harus diisi lengkap'} );
    }

    //if no error
    if(!errors) {
        let formData = {
            nama: nama,
            alamat: alamat
        }

        //insert query
        connection.query('INSERT INTO siswa SET ?', formData, function(err, result) {
            if (err) {
                res.json({pesan :'Data gagal disimpan'});
            } else {
                res.send('Data Berhasil Disimpan');
            }
        } )
    }
}

//update siswa
const updateSiswa = function (req, res) { 

    let id = req.params.id;
    let nama = req.body.nama;
    let alamat = req.body.alamat;
    let errors = false;

    if(!nama ){
        errors = true;
        res.json({pesan : 'Field nama belum diisi, Field harus diisi lengkap'} );
    }
    if(!alamat ){
        errors = true;
        res.json({pesan : 'Field alamat belum diisi, Field harus diisi lengkap'} );
    }

    //if no error
    if(!errors) {
        let formData = {
            nama: nama,
            alamat: alamat
        };

        //insert query
        connection.query('UPDATE siswa SET ? WHERE id = '+id, formData, function(err, result) {
            //if (err)
            if (err) {
                res.send('error', err);
                res.json({
                    id: req.params.id,
                    nama: nama,
                    alamat: alamat
                });
            } else {
                res.send('Data Berhasil Disimpan');
            }
        } )
    }
}

//delete siswa
const deleteSiswa = function (req, res) { 

    let id = req.params.id;
    
    connection.query('DELETE FROM siswa WHERE id = ' + id, function(err, result) {
        if (err) {
            res.send('error', err)
        } else {
            res.send('Data Berhasil Dihapus')
        }
    } )
}

module.exports  = {
    getAllSiswa,
    getSiswaId,
    createSiswa,
    updateSiswa,
    deleteSiswa
}