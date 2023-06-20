const express = require('express');
const apiRouter = require('./router/api');
const cors = require('cors');
const connectToDatabase = require('./db')


const app = express();
app.use(cors())
app.use(express.json())
connectToDatabase()
app.use('/api', apiRouter);


app.listen(process.env.port || 4000, function(){
  console.log('now listening for requests on 4000');
});