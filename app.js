const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cloudinary = require('cloudinary');

// create server
const app = express();
const server = http.createServer(app);

// define local variables
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/globally";

// require local route controllers
const indexRouteController = require('./routes/indexRoute');
const detailsRouteController = require('./routes/detailsRoute');
const basketRouteController = require('./routes/basketRoute');
const authRouteController = require('./routes/authRoute');
const adminRouteController = require('./routes/adminRoute');
const buyRouteController = require('./routes/buyRoute');

// config dotenv files
dotenv.config({ path: path.join(__dirname, ".env") });

// require variables from dotenv file
const {
  SESSION_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

// add pug as views to server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// connect mongoose to server
mongoose.connect(mongoUri, { 
  useNewUrlParser: true, 
  auto_reconnect: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// config cloudinary upload route
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

// add public folder to server
app.use(express.static(path.join(__dirname, "public")));

// add favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// set body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set express session
const session = expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

// use express session
app.use(session);

// add request object for controllers
app.use((req, res, next) => {
  req.cloudinary = cloudinary;
  next();
});

// add route controllers
app.use('/', indexRouteController);
app.use('/details', detailsRouteController);
app.use('/basket', basketRouteController);
app.use('/auth', authRouteController);
app.use('/admin', adminRouteController);
app.use('/buy', buyRouteController);

// start server
server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
