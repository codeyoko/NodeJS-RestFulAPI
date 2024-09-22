const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const path = require('path');

//call DB
const db = require('./modeles/bd/connectDB');
db.connect();

//cal roters
const router = require('./apiRouter');
const routerAPI = require('./routers/RestFulAPI');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// show public
app.use(express.static(path.join(__dirname,'public')));


app.use('/', router);
app.use('/api', routerAPI);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

