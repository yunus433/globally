const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cloudinary = require('cloudinary');
// const iyz = require('iyzipay');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/globally";

const indexRouteController = require('./routes/indexRoute');
const detailsRouteController = require('./routes/detailsRoute');
const basketRouteController = require('./routes/basketRoute');
const authRouteController = require('./routes/authRoute');
const agreementRouteController = require('./routes/agreementRoute');
const adminRouteController = require('./routes/adminRoute');
const buyRouteController = require('./routes/buyRoute');
const aboutusRouteController = require('./routes/aboutusRoute');
const payRouteController = require('./routes/payRoute');

dotenv.config({ path: path.join(__dirname, ".env") });

const {
  SESSION_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
  // IYZICO_API_KEY,
  // IYZICO_API_SECRET
} = process.env;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

mongoose.connect(mongoUri, { 
  useNewUrlParser: true, 
  auto_reconnect: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// const iyzipay = new iyz({
//   apiKey: IYZICO_API_KEY,
//   secretKey: IYZICO_API_SECRET,
//   uri: 'https://sandbox-api.iyzipay.com'
// });

app.use(express.static(path.join(__dirname, "public")));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(session);

app.use((req, res, next) => {
  req.cloudinary = cloudinary;
  // req.iyzipay = iyzipay;
  next();
});

app.use('/', indexRouteController);
app.use('/details', detailsRouteController);
app.use('/basket', basketRouteController);
app.use('/auth', authRouteController);
app.use('/admin', adminRouteController);
app.use('/buy', buyRouteController);
app.use('/aboutus', aboutusRouteController);
app.use('/pay', payRouteController);
app.use('/agreement', agreementRouteController);

server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
