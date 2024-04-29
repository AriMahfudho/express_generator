var express = require('express');
var router = express.Router();

//get session listing
router.get('/', (req, res) => {
    req.session.counter = req.session.counter ? req.session.counter + 1 : 1;
    res.send(`Kamu telah mengunjungi halaman ini sebanyak ${req.session.counter} kali`);
});

var sessionData
router.get('/set_session', function(req, res) {
    sessionData =  req.session;
    sessionData.user =  {};
    let username =  "Ari";
    sessionData.user.username =  username;
    sessionData.user.id =  4000000;
    console.log("Setting session data:username=%s and salary=%s", username, sessionData.user.id)
    res.json(sessionData.user)
});

router.get('/get_session', function(req, res) {
    sessionData =  req.session;
    let userObj =  {};
    if(sessionData.user){
        userObj = sessionData.user;
    }
    console.log("Get data pada : username", userObj)
    res.json(userObj)
});

router.get('/destroy_session', function(req, res) {
    sessionData =  req.session;
    
    sessionData.destroy(function(err) {
        if (err) {
            msg = 'Ada kesalah dalam destroy session';
            res.json(msg);
        } else {
            msg = 'Session destroy berhasil';
            console.log(msg)
            res.json(msg);
        }
    })
});

module.exports =  router;