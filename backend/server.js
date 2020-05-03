const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//use to connect with Mongo via username
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ userNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfuly")
})

//if in browsers is typed /users it will load usersRouter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port,() => {
    console.log('Server is running on port: ${port}');
});
