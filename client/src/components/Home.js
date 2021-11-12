//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//Function for home page
function Home(props) {
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/main-chat")
      .then((res) => res.json())
      .then((homeData) => {
        let temp = homeData.map((item) => {
          return (
            <li>
              {item.username}: {item.message}
            </li>
          );
        });
        setMessage(temp);
      });
  }, []);

  function clickHandle(event) {
    event.preventDefault();
    setMessage(`hello`);
  }

  //Returns chat room page
  return (
    <div>
      <h1 className="greeting">Welcome to React Chat!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          <h2>Main Room</h2>
          {/* Eventually pushed up chats will go into the p tag (maybe append li instead?)*/}
          <p name="chat">{message}</p>
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
        <form method="post" action="/main-chat">
          <div className="inputs-wrapper">
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              className="username-field"
            />
            <textarea
              name="message"
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
            onClick={clickHandle}
          />
        </form>
      </div>
    </div>
  );
}

//Exports Home to be used by other components
export default Home;
