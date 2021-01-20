require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http').createServer(app);



// Connect to database
const db_uri = process.env.MONGODB_URI;
// const db_port = process.env.MONGODB_PORT || 5000;
const mongoose = require('mongoose');
mongoose.connect(db_uri, {
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false 
}).then(
  () => console.log("Mongo connected"), 
  err => console.log("Mongo Connection error")
);



// express init
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

// api routes
require('./routers/index.router')(app);




// web sockets
var io = require('socket.io')(http, {cors: {
  origin: '*',
}});

require('./sockets/index.socket')(io);




const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log('listening on *:' + port);
});
