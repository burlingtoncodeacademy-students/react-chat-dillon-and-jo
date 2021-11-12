//Imports dotenv into file
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

//creates a variable to initialize port
const port = process.env.PORT || 8000;
//Express server setup
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

//
const url = `mongodb+srv://${process.env.user}:${process.env.password}@react-chat-dillon-jo.nfgg1.mongodb.net/react-chat`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
});

const Chat = mongoose.model("Chat", chatSchema);

//CREATE - send messages on the home route to the chat box
app.post("/main-chat", async (req, res) => {
  let userObj = req.body
  let newChat = new Chat(userObj);
  await newChat.save();
  res.redirect("/");
});

app.get("/api/main-chat", async (req, res) => {
  let allChats = await Chat.find({})
  res.send(allChats)
})

//sets a 10 second timeout on the chat
setTimeout(() => {
  
}, 10000);

app.listen(port, () => {
  console.log("listening on port: " + port);
});
