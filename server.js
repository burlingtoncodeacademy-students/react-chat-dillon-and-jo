require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

const url = `mongodb+srv://${process.env.username}:${process.env.password}@react-chat-dillon-jo.nfgg1.mongodb.net/test`;


app.use(express.static(staticDir));



app.listen(port, () => {
  console.log('listening on port: ' + port) 
})