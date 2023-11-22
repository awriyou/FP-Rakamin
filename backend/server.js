const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
require('dotenv/config');
const port = process.env.PORT
const db = require('./helpers/db')

app.use(cors())
app.options('*', cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
// app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler)


const indexRoute = require('./routers/indexRoute')


app.use(indexRoute)




app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});