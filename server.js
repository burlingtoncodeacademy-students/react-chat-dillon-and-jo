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
  //catches messages over 500 characters
  if (userObj.message.length > 500) {
    res.status(403).redirect("/bird-room");
  }
  if (userObj.username === `` || userObj.message === ``) {
    res.status(403).redirect("/bird-room");
  } else {
    let newDogChat = new BirdChat(userObj);
    await newDogChat.save();
    res.redirect("/bird-room");
  }
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
  //catches messages over 500 characters
  if (userObj.message.length > 500) {
    res.status(403).redirect("/cat-room");
  }

  if (userObj.username === `` || userObj.message === ``) {
    res.status(403).redirect("/cat-room");
  } else {
    let newDogChat = new CatChat(userObj);
    await newDogChat.save();
    res.redirect("/cat-room");
  }
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
  //catches messages over 500 characters
  if (userObj.message.length > 500) {
    res.status(403).redirect("/dog-room");
  }
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
  //catches messages over 500 characters
  if (userObj.message.length > 500) {
    res.status(403).redirect("/");
  }
  //catches empty username/message blocks
  if (userObj.username === `` || userObj.message === ``) {
    res.status(403).redirect("/");
  } else {
    let newDogChat = new Chat(userObj);
    await newDogChat.save();
    res.redirect("/");
  }
});

//READ - grabs the main chat room chats and posts them on the main page
app.get("/api/main-chat", async (req, res) => {
  let allChats = await Chat.find({});
  res.send(allChats);
});

//sets a 10 second timeout on the chat
setTimeout(() => {}, 10000);

//timestamp function
function timeStamp() {
  //creates new Date object at time
  let date = new Date();
  //gets Hour item from Date object
  let hour = date.getHours();
  //initiates AM/PM variable
  let amPM;
  //changes 24 hour time into 12 hour time, sets AM/PM accordingly
  if (hour > 12) {
    //Subtract 12 to do away with military time
    hour = `${hour - 12}`;
    //And puts PM on time stamp to denote it is after Noon
    amPM = `PM`;
    //If the hour equals noon exactly
  } else if (hour === 12) {
    //Set the am pm variable to PM
    amPM = `PM`;
  } else {
    //Otherwise set the hour as is to AM
    amPM = `AM`;
  }
  //get Minute item from Date object
  let minute = date.getMinutes();
  //handles '00'-'09' times
  if (minute < 10) {
    //Have the minute with a 0 in front (i.e. :06)
    minute = `0${minute}`;
  }
  //sets clock
  let time = `${hour}:${minute}${amPM}`;
  //sets mm/dd/yyyy
  let stamp = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  //sets full timestamp
  let timeStamp = `(${time} ${stamp})`;
  //sends timestamp
  return timeStamp;
}

//Catch-all error route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});

//Sets up to locally listen on port
app.listen(port, () => {
  console.log("listening on port: " + port);
});
