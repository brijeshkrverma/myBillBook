let express = require('express'),
  
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dbConfig = require('./database/db');
 var app = express();
// Routes to Handle Request
var userReg=require('./router/userLogin');
var company=require('./router/company');
var addParty=require('./router/addParty');
var items=require('./router/items');
var sendMail=require('./router/sendEmail');
var transection=require('./router/transection');
var resetPass=require('./router/resetPass');

// MongoDB Setup
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not be connected: ' + error)
  }
)

// Setup Express.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Make "public" Folder Publicly Available
app.use('/public', express.static('public'));

// API Route
app.use('/api',userReg);
app.use('/company',company);
app.use('/party',addParty);
app.use('/items',items);
app.use('/sendmail',sendMail);
app.use('/transection',transection);
app.use('/resetPass',resetPass);


// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Error
// app.use((req, res, next) => {
//   // Error goes via `next()` method
//   setImmediate(() => {
//     next(new Error('Something went wrong'));
//   });
// });
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});