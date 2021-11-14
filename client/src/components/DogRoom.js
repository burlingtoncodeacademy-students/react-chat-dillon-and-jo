//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";
//Imports useEffect and useState to be used in component
import { useState, useEffect } from "react";

//Function for dog room chat page
function DogRoom(props) {
  //Sets the chat username
  const [username, setUserName] = useState("");
  //Sets the chat message
  const [message, setMessage] = useState("");

  //useEffect hook to pull in info from the database (json?)
  useEffect(() => {
    fetch("/api/dog-chat")
      .then((res) => res.json())
      .then((dogData) => {
        let chatLog = dogData.map((item) => {
          return (
            <li>
              {item.username}: {item.message}
            </li>
          );
        });
        setMessage(chatLog);
      });
  }, []);

  //Returns chat room page
  return (
    <div id="dog-room">
      <h1 className="greeting">Woof! Welcome to the Dog Chat Room!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          <h2>Dog 🐶 Room</h2>
          {/* Eventually pushed up chats will go into the p tag (maybe append li instead?)*/}
          <p name="chat">{message}</p>
        </div>
        <div className="all-rooms">
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
        <form method="post">
          <div className="inputs-wrapper">
            <input
              type="text"
              placeholder="Enter username"
              className="username-field"
            />
            <textarea
              type="text"
              placeholder="Enter message"
              className="message-field"
            />
            <input type="submit" value="Send" className="button" />
          </div>
        </form>
        <form method="get" action="api/main-chat">
          <input
            name="button"
            type="button"
            value="Refresh"
          />
        </form>
      </div>
    </div>
  );
}

//Exports DogRoom to be used by other components
export default DogRoom;
