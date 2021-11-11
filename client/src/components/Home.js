//Imports Link from react-router-dom to allow for links in component
import { Link } from "react-router-dom";

//Function for home page
function Home(props) {
  //Returns chat room page
  return (
    <div>
      <h1 className="greeting">Welcome to React Chat!</h1>
      <div className="room-wrapper">
        <div className="main-room">
          <h2>Main Room</h2>
          {/* Eventually pushed up chats will go into the p tag (maybe append li instead?)*/}
          <p>Chats will go here</p>
          <p>Chats will go here</p>
          <p>Chats will go here</p>
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
          </div>
          {/* Send and refresh buttons linked to server */}
          <input type="submit" value="Send" className="button" />
          <input type="submit" value="Refresh" className="button" />
        </form>
      </div>
    </div>
  );
}

//Exports Home to be used by other components
export default Home;
