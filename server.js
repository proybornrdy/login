const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//setting express

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
const publicDir = require('path').join(__dirname,'/images')
app.use('/images', express.static(publicDir))

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
}

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`);
});

//setting mongoose
const uri = process.env.MONGO_URI;
mongoose.connect(
    uri, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}
);
const connection = mongoose.connection;
connection.once(
    'open', () => {
        console.log("mongoDB connection successful");
    }
);