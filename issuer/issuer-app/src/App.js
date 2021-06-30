import './App.css';
import React from "react";
import Landing from './pages/Landing'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Mainpage from "./pages/Mainpage";
function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Mainpage}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
