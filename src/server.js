//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const helmet = require('helmet');
var cors = require('cors')

const port = process.env.PORT || 1337;

//Mongoose set up
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

const mongooseOptions = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, 
    connectTimeoutMS: 10000
}
const mongooseUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(mongooseUrl, mongooseOptions).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// enable all CORS requests
app.use(cors());

// use bodyParser to parse application/json content-type
//Body Parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//routing definition
var router = express.Router();
app.use('/user', router);
require(__dirname + '/controllers/userController')(router);

app.get('/admin', function(req, res) {
    res.render('admin.ejs');
});

//Activate Listening port
app.listen(port, () => console.log(`Listening on port ${port}`));