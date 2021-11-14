//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";
//Imports useEffect and useState to be used in component
import { useState, useEffect } from "react";

//Function for home page
function Home(props) {
  //Sets the chat message
  const [message, setMessage] = useState("");

  //useEffect hook to pull in info from the database
  useEffect(() => {
    fetch("/api/main-chat")
      .then((res) => res.json())
      .then((homeData) => {
        let chatLog = homeData.map((item) => {
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
    <div>
      <h1 className="greeting">Welcome to React Chat!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          {/* Section where posted chats live */}
          <h2>Main 🚪 Room</h2>
          {/* Posted chats will go into the p tag */}
          <p name="chat">{message}</p>
        </div>
        <div className="all-rooms">
          {/* Links to the other chat rooms */}
          <h2>All Rooms</h2>
          {/* Link redirects to Dog Room page */}
          <Link to="/dog-room" add style={{ textDecoration: "none" }}>
            <h3>Dog 🐶 Room</h3>
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
        <form method="post" action="/main-chat">
          <div className="inputs-wrapper">
            {/* Username input */}
            <input
              name="username"
              type="text"
              name="username"
              placeholder="Enter username"
              className="username-field"
            />
            {/* Message input */}
            <textarea
              name="message"
              type="text"
              name="message"
              placeholder="Enter message"
              className="message-field"
            />
            {/* Submit input (submits the username + message) */}
            <input type="submit" value="Send" className="button" />
          </div>
        </form>
        {/* Refresh button, refreshes the chat */}
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

//Exports Home to be used by other components
export default Home;
