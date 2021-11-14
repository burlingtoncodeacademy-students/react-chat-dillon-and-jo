//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";
//Imports useEffect and useState to be used in component
import { useState, useEffect } from "react";

//Function for bird room chat page
function BirdRoom(props) {
  //Sets the chat message
  const [message, setMessage] = useState("");

  //useEffect hook to pull in info from the database
  useEffect(() => {
    fetch("/api/bird-chat")
      .then((res) => res.json())
      .then((birdData) => {
        let chatLog = birdData.map((item) => {
          return (
            <li>
              {item.username}: {item.message} {item.timestamp}
            </li>
          );
        });
        setMessage(chatLog);
        refreshChat();
      });
  }, []);

  function refreshChat() {
    setInterval(tick, 10000);

    function tick() {
      console.log(`refreshing chat`);
      fetch("/api/main-chat")
        .then((res) => res.json())
        .then((homeData) => {
          let chatLog = homeData.map((item) => {
            return (
              <li>
                {item.username}: {item.message} {item.timestamp}
              </li>
            );
          });
          setMessage(chatLog);
        });
    }
  }

  //Returns chat room page
  return (
    <div>
      <h1 className="greeting">Caw-caw! Welcome to the Bird Chat Room!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          {/* Section where posted chats live */}
          <h2>Bird 🦜 Room</h2>
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
          {/* Link redirects to Dog Room page */}
          <Link to="/dog-room" add style={{ textDecoration: "none" }}>
            <h3>Dog 🐶 Room</h3>
          </Link>
          {/* Link redirects to Cat Room page */}
          <Link to="/cat-room" add style={{ textDecoration: "none" }}>
            <h3>Cat 😸 Room</h3>
          </Link>
        </div>
      </div>
      {/* Form for user name and message inputs */}
      <div className="form-container">
        <form action="/bird-chat" method="post">
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
        {/* Refresh button, refreshes the chat */}
        <form method="get" action="api/bird-chat">
          <input name="button" type="button" value="Refresh" />
        </form>
      </div>
    </div>
  );
}

//Exports BirdRoom to be used by other components
export default BirdRoom;
