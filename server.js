//Imports dotenv into file
require("dotenv").config();
//Imports express into file
const express = require("express");
const path = require("path");
//Imports mongoose into file
const mongoose = require("mongoose");
//Sets up connection to the database with mongoose
const db = mongoose.connection;

//Creates a variable to initialize port
const port = process.env.PORT || 8000;
//Express server setup
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

//Sets up a connection to MongoDB
const url = `mongodb+srv://${process.env.user}:${process.env.password}@react-chat-dillon-jo.nfgg1.mongodb.net/react-chat`;

//Connects Mongoose to the MongoDB database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//Sets up a static directory
app.use(express.static(staticDir));
//Sets up express middleware
app.use(express.urlencoded({ extended: true }));

//Sets up schema for chats
const chatSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

//Main Chat Room model
const Chat = mongoose.model("Chat", chatSchema);

//Dog Room Model
const DogChat = mongoose.model("DogChat", chatSchema);

//Cat Room Model
const CatChat = mongoose.model("CatChat", chatSchema);

//Bird Room Model
const BirdChat = mongoose.model("BirdChat", chatSchema);

//CREATE - enables user to create bird room chats
app.post("/bird-chat", async (req, res) => {
  let userObj = req.body;
  req.body.timestamp = timeStamp();
  let newBirdChat = new BirdChat(userObj);
  await newBirdChat.save();
  res.redirect("/bird-room");
});

//READ - grabs the bird room chats and posts them on the bird room page
app.get("/api/bird-chat", async (req, res) => {
  let birdChats = await BirdChat.find({});
  res.send(birdChats);
});

//CREATE - enables user to create cat room chats
app.post("/cat-chat", async (req, res) => {
  let userObj = req.body;
  req.body.timestamp = timeStamp();
  let newCatChat = new CatChat(userObj);
  await newCatChat.save();
  res.redirect("/cat-room");
});

//READ - grabs the cat room chats and posts them on the cat room page
app.get("/api/cat-chat", async (req, res) => {
  let catChats = await CatChat.find({});
  res.send(catChats);
});

//CREATE - enables user to create dog room chats
app.post("/dog-chat", async (req, res) => {
  let userObj = req.body;
  req.body.timestamp = timeStamp();
  if (userObj.username === `` || userObj.message === ``) {
    res.status(403).redirect("/dog-room");
  } else {
    let newDogChat = new DogChat(userObj);
    await newDogChat.save();
    res.redirect("/dog-room");
  }
});

//READ - grabs the dog room chats and posts them on the dog room page
app.get("/api/dog-chat", async (req, res) => {
  let dogChats = await DogChat.find({});
  res.send(dogChats);
});

//CREATE - enables user to create main chat room chats
app.post("/main-chat", async (req, res) => {
  let userObj = req.body;
  req.body.timestamp = timeStamp();
  let newChat = new Chat(userObj);
  await newChat.save();
  res.redirect("/");
});

//READ - grabs the main chat room chats and posts them on the main page
app.get("/api/main-chat", async (req, res) => {
  let allChats = await Chat.find({});
  res.send(allChats);
});

//sets a 10 second timeout on the chat
setTimeout(() => {}, 10000);

function timeStamp() {
  let date = new Date();
  let hour = date.getHours();
  let amPM;
  if (hour > 12) {
    hour = `${hour - 12}`;
    amPM = `PM`;
  } else if (hour === 12) {
    amPM = `PM`;
  } else {
    amPM = `AM`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let time = `${hour}:${minute}${amPM}`;

  let stamp = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  let timeStamp = `(${time} ${stamp})`;

  return timeStamp;
}

//Catch-all error route
app.get("*", (req, res) => {
  res.send("Uh-oh! Looks like what you're trying to find isn't here!");
});

//Sets up to locally listen on port
app.listen(port, () => {
  console.log("listening on port: " + port);
});
