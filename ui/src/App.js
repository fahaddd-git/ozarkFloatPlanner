// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <MapPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
