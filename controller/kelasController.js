
var connection  = require('../library/database');

//get all
const getAllkelas = function (req, res) { 

    connection.query('SELECT * FROM kelas ', function(err, rows) {
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
const getKelasId = function (req, res) { 
    let id = req.params.id;

    connection.query('SELECT * FROM kelas WHERE id ='+ id, function(err, rows) {
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

//post kelas
const createKelas = function (req, res) { 

    let nama_jurusan = req.body.nama_jurusan;
    let Deskripsi = req.body.Deskripsi;
    let errors = false;

    if(!nama_jurusan ){
        errors = true;
        res.json({pesan : 'Field nama_jurusan belum diisi, Field harus diisi lengkap'} );
    }
    if(!Deskripsi ){
        errors = true;
        res.json({pesan : 'Field Deskripsi belum diisi, Field harus diisi lengkap'} );
    }

    //if no error
    if(!errors) {
        let formData = {
            nama_jurusan: nama_jurusan,
            Deskripsi: Deskripsi
        }

        //insert query
        connection.query('INSERT INTO kelas SET ?', formData, function(err, result) {
            if (err) {
                res.json({pesan :'Data gagal disimpan'});
            } else {
                res.send('Data Berhasil Disimpan');
            }
        } )
    }
}

//update kelas
const updateKelas = function (req, res) { 

    let id = req.params.id;
    let nama_jurusan = req.body.nama_jurusan;
    let Deskripsi = req.body.Deskripsi;
    let errors = false;

    if(!nama_jurusan ){
        errors = true;
        res.json({pesan : 'Field nama_jurusan belum diisi, Field harus diisi lengkap'} );
    }
    if(!Deskripsi ){
        errors = true;
        res.json({pesan : 'Field Deskripsi belum diisi, Field harus diisi lengkap'} );
    }

    //if no error
    if(!errors) {
        let formData = {
            nama_jurusan: nama_jurusan,
            Deskripsi: Deskripsi
        }

        //insert query
        connection.query('UPDATE kelas SET ? WHERE id = '+id, formData, function(err, result) {
            //if (err)
            if (err) {
                res.send('error', err);
                res.json({
                    id: req.params.id,
                    nama_jurusan: formData.nama_jurusan,
                    Deskripsi: formData.Deskripsi
                });
            } else {
                res.send('Data Berhasil Disimpan');
            }
        } )
    }
}

//delete kelas
const deleteKelas = function (req, res) { 

    let id = req.params.id;
    
    connection.query('DELETE FROM kelas WHERE id = ' + id, function(err, result) {
        if (err) {
            res.send('error', err)
        } else {
            res.send('Data Berhasil Dihapus')
        }
    } )
}

module.exports  = {
    getAllkelas,
    getKelasId,
    createKelas,
    updateKelas,
    deleteKelas
}