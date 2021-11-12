require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const db = mongoose.connection;

const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

const url = `mongodb+srv://${process.env.user}:${process.env.password}@react-chat-dillon-jo.nfgg1.mongodb.net/react-chat`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("listening on port: " + port);
});

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
});

const Chat = mongoose.model("Chat", chatSchema);

app.get("/dog-room", (req, res) => {});

app.get("/cat-room", (req, res) => {});

app.get("/bird-room", (req, res) => {});

app.post("/main-chat", async (req, res) => {
  console.log(`post to chat`);

  let userObj = req.body;

  let newChat = new Chat(userObj);
  await newChat.save();
  res.redirect("/");
});

let temp;

app.get("/api/main-chat", async (req, res) => {
  let allChats = await Chat.find({});
  res.send(allChats);
});
