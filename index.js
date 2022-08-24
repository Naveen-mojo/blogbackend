const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

// create express app
const app = express();

const corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));

// do something when app is closing
// see http://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
// process.stdin.resume()
// process.on('exit', exitHandler.bind(null, { shutdownDb: true } ));

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse request data content type application/json
app.use(bodyParser.json({limit:'1000mb'}));

app.use('/upload', express.static('upload'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, Content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// create blog routes
require('./src/routes/auth.routes')(app);
require('./src/routes/user.routes')(app);

app.use((req, res, next) => {
    res.status(404).json({
        Error: "Bad Request Check Url Or Bad Method, Try Again......."
    })
})

// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port http://localhost:${port}`);
});