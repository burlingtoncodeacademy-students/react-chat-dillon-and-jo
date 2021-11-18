//Imports CSS 
import "./App.css";
//Imports BrowserRouter, Route, and Routes from react-router-dom to be used in component
import { BrowserRouter, Route, Routes } from "react-router-dom";
//Imports the Home component
import Home from "./components/Home.js"
//Imports the Dog chat room component
import DogRoom from "./components/DogRoom.js"
//Imports the Cat chat room component
import CatRoom from "./components/CatRoom.js"
//Imports the Bird chat room component
import BirdRoom from "./components/BirdRoom.js"

//Function for main app
function App() {
  //Returns various routes within BrowserRouter
  return (
    <div>
      {/* BrowserRouter is used for client side routing with URL segments*/}
      <BrowserRouter>
      {/* Routes contains all of the routes */}
      <Routes>
        {/* Route is each individual route - utilizes the path and element prop. 
          Path reflects the URL path, element is where component is rendered */}
          {/* Routes to Home Component */}
          <Route path="/" element={<Home />} />
          {/* Routes to DogRoom Component */}
          <Route path="/dog-room" element={<DogRoom />} />
          {/* Routes to CatRoom Component */}
          <Route path="/cat-room" element={<CatRoom />} />
          {/* Routes to BirdRoom Component */}
          <Route path="/bird-room" element={<BirdRoom />} />
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

//Exports App to index.js file
export default App;
