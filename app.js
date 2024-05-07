

// module.exports = app;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('req-flash');

//Tambahkan modul jsonwebtoken
const jwt = require("jsonwebtoken");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var kelasRouter = require('./routes/kelas');
var sessionRouter = require('./routes/session')
var productsRouter = require('./routes/products');
var siswaRouter = require('./routes/siswa');


// Definisi lokasi untuk auth
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');


var app = express();
const port = 3030;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'iniadalahrahasiamu',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(flash());

// Setting folder views
app.set('views',path.join(__dirname,'./views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kelas', kelasRouter);
app.use('/siswa', siswaRouter);
app.use('/session', sessionRouter);
// Gunakan routes yang telah didefinisikan untuk auth
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

app.use('/products', productsRouter);

//Auth JWT
app.post("/api/login", (req, res) => {
  const user = {
    id: Date.now(),
		userEmail: "m.arimahfudho@gmail.com",
		password: "123456",
	};
	//Untuk generate token user
	jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
			token,
		});
	});
});

app.get("/api/profile", verifyToken, (req, res) => {
	jwt.verify(req.token, "secretkey", (err, authData) => {
		if (err) res.sendStatus(403);
		else {
			res.json({
				message: "Selamat Datang di Gamelab Indonesia",
				userData: authData,
			});
		}
	});
});

//Verifikasi Token
function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	//cek jika bearer kosong/tidak ada
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		//Get token
		const bearerToken = bearer[1];

		//set the token
		req.token = bearerToken;
    
		//next middleware
		next();
	} else {
		//Jika tidak bisa akses mengarahkan ke halaman forbidden
		res.sendStatus(403);
	}
}


app.listen(port,() => {
    console.log(`Server berjalan pada http://localhost:${port}`)
} )

    // var express = require('express');
    // var path = require('path');
    // var cookieParser = require('cookie-parser');
    // var logger = require('morgan');
    // var session = require('express-session');
    // var bodyParser = require('body-parser');
    // var flash = require('req-flash');
    
    // const app = express();
    // const port = 3030;
    
    // var indexRouter = require('./routes/index');
    // var usersRouter = require('./routes/users');
    // var kelasRouter = require('./routes/kelas'); //tambahkan panggil routes kelas
    // var sessionRouter =  require('./routes/session'); //tambahkan panggil routes session
    
    // //definisi lokasi untuk auth
    // const loginRoutes =  require('./routes/login');
    // const registerRoutes =  require('./routes/register');
    
    // app.use(logger('dev'));
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: false }));
    // app.use(cookieParser());
    
    
    // //midelware express-session
    // app.use(session( {
    //     secret: "rahasia",
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: { maxAge: 60 * 60 * 1000}
    // }));
    
    // app.use(flash());
    
    // //setting folder views
    // app.set('views',path.join(__dirname, './views'));
    // app.set('views engine', 'ejs');
    
    // app.use('/', indexRouter);
    // app.use('/users', usersRouter);
    // app.use('/kelas', kelasRouter); //Tambahkan kelasRouter
    // app.use("/session", sessionRouter);
    
    // //gunakan routes yang telah didefinisikan untuk auth
    // app.use('/login', loginRoutes);
    // app.use('/register', registerRoutes);
    
    // app.listen(port,() => {
    //     console.log(`Server berjalan pada http://localhost:${port}`)
    // } )
module.exports = app;