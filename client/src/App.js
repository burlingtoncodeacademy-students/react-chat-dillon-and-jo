import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 id="greeting">Welcome to React Chat!</h1>
      <div id="room-wrapper">
        <div id="main-room">
          <h2>Main Room</h2>
          <p>Chats will go here</p>
          <p>Chats will go here</p>
          <p>Chats will go here</p>
        </div>
        <div id="all-rooms">
          <h2>All Rooms</h2>
          <h3>Dog Room</h3>
          <h3>Cat Room</h3>
          <h3>Bird Room</h3>
        </div>
      </div>
      <div id="form-container">
        <form method="post">
          <div id="inputs-wrapper">
          <input type="text" placeholder="Enter username" id="username-field" />
          <textarea type="text" placeholder="Enter message"  id="message-field" />
          </div>
          <input type="submit" value="Send" className="button" />
          <input type="submit" value="Refresh" className="button" />
          
        </form>
      </div>
    </div>
  );
}

export default App;
