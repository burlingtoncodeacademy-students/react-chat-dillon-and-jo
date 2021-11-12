//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";
//Imports useEffect and useState to be used in component
import { useState, useEffect } from "react";

//Function for home page
function Home(props) {
  //Sets the chat username
  const [username, setUserName] = useState("");
  //Sets the chat message
  const [message, setMessage] = useState("");

  //useEffect hook to pull in info from the database (json?)
  useEffect(() => {
    fetch("/api/main-chat")
      .then((res) => res.json())
      .then((homeData) => {
        homeData.forEach((doc) => {
          setUserName(doc.username);
          setMessage(doc.message);
        });
      });
  }, []);

  //Returns chat room page
  return (
    <div>
      <h1 className="greeting">Welcome to React Chat!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          <h2>Main Room</h2>
          {/* Eventually pushed up chats will go into the li tags */}
          <ul>
            <li>
              {username} : {message}
            </li>
          </ul>
        </div>
        <div className="all-rooms">
          <h2>All Rooms</h2>
          {/* Link redirects to Dog Room page */}
          <Link to="/dog-room" add style={{ textDecoration: "none" }}>
            <h3>Dog Room</h3>
          </Link>
          {/* Link redirects to Cat Room page */}
          <Link to="/cat-room" add style={{ textDecoration: "none" }}>
            <h3>Cat Room</h3>
          </Link>
          {/* Link redirects to Bird Room page */}
          <Link to="/bird-room" add style={{ textDecoration: "none" }}>
            <h3>Bird Room</h3>
          </Link>
        </div>
      </div>
      {/* Form for user name and message inputs */}
      <div className="form-container">
        <form action="/main-chat" method="post">
          <div className="inputs-wrapper">
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="username-field"
            />
            <textarea
              type="text"
              name="message"
              placeholder="Enter message"
              className="message-field"
            />
            {/* Send button linked to server */}
            <input type="submit" value="Send" className="button" />
          </div>
        </form>
      </div>
    </div>
  );
}

//Exports Home to be used by other components
export default Home;
