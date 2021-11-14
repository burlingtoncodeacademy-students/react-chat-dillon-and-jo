//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";
//Imports useEffect and useState to be used in component
import { useState, useEffect } from "react";

//Function for dog room chat page
function DogRoom(props) {
  //Sets the chat message
  const [message, setMessage] = useState("");

  //useEffect hook to pull in info from the database
  useEffect(() => {
    //Fetches the posted chat from the server
    fetch("/api/dog-chat")
    //Takes the response and turns it into JSON
      .then((res) => res.json())
      //Then takes the data
      .then((dogData) => {
       //Maps over the data and stores it in a variable 
        let chatLog = dogData.map((item) => {
          //Returns an li with username, message, and time stamp
          return (
            <li>
              {item.username}: {item.message} {item.timestamp}
            </li>
          );
        });
        //Sets the chatLog message variable from state
        setMessage(chatLog);
      });
  }, []);

  //Returns dog chat room page
  return (
    <div id="dog-room">
      <h1 className="greeting">Woof! Welcome to the Dog Chat Room!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          {/* Section where dog room posted chats live */}
          <h2>Dog 🐶 Room</h2>
          {/* Posted chats will go into the p tag */}
          <p name="chat">{message}</p>
        </div>
        <div className="all-rooms">
          {/* Links to the other chat rooms */}
          <h2>All Rooms</h2>
          {/* Link redirects to Main Room page */}
          <Link to="/" add style={{ textDecoration: "none" }}>
            <h3>Main 🚪 Room</h3>
          </Link>
          {/* Link redirects to Cat Room page */}
          <Link to="/cat-room" add style={{ textDecoration: "none" }}>
            <h3>Cat 😸 Room</h3>
          </Link>
          {/* Link redirects to Bird Room page */}
          <Link to="/bird-room" add style={{ textDecoration: "none" }}>
            <h3>Bird 🦜 Room</h3>
          </Link>
        </div>
      </div>
      {/* Form for user name and message inputs */}
      <div className="form-container">
        <form action="/dog-chat" method="post">
          <div className="inputs-wrapper">
            {/* Username input */}
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              className="username-field"
            />
            {/* Message input */}
            <textarea
              type="text"
              placeholder="Enter message"
              name="message"
              className="message-field"
            />
            {/* Submit input (submits the username + message) */}
            <input type="submit" value="Send" className="button" />
          </div>
        </form>
      </div>
    </div>
  );
}

//Exports DogRoom to be used by other components
export default DogRoom;
