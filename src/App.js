import './App.css';
import ProfileList from "./ProfileList.js";
import Navbar from "./Navbar.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProfileList />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
