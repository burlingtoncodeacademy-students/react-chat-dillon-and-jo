//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";
//Imports useEffect and useState to be used in component
import { useState, useEffect } from "react";

//Function for cat room chat page
function CatRoom(props) {
  //Sets the chat message
  const [message, setMessage] = useState("");

  //useEffect hook to pull in info from the database
  useEffect(() => {
    //Fetches the posted chat from the server
    fetch("/api/cat-chat")
      //Takes the response and turns it into JSON
      .then((res) => res.json())
      //Then takes the data
      .then((catData) => {
        //Maps over the data and stores it in a variable
        let chatLog = catData.map((item) => {
          //Returns an li with username, message, and time stamp
          return (
            <li>
              {item.username}: {item.message} {item.timestamp}
            </li>
          );
        });
        //Sets the chatLog message variable in state
        setMessage(chatLog);
        refreshChat();
      });
  }, []);

  //refresh function
  function refreshChat() {
    //begins interval to refresh page every 10 seconds
    setInterval(tick, 10000);
    //tick function to send fetch request
    function tick() {
      fetch("/api/main-chat")
        .then((res) => res.json())
        .then((catData) => {
          let chatLog = catData.map((item) => {
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
      <h1 className="greeting">Meow! Welcome to the Cat Chat Room!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          {/* Section where dog room posted chats live */}
          <h2>Cat 😸 Room</h2>
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
          {/* Link redirects to Bird Room page */}
          <Link to="/bird-room" add style={{ textDecoration: "none" }}>
            <h3>Bird 🦜 Room</h3>
          </Link>
        </div>
      </div>
      {/* Form for user name and message inputs */}
      <div className="form-container">
        <form action="/cat-chat" method="post">
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

//Exports CatRoom to be used by other components
export default CatRoom;
