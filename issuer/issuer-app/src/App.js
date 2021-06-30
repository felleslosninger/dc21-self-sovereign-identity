import './App.css';
import React from "react";
import Landing from './pages/Landing'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Wait from "./pages/Wait";
function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/Wait' component={Wait}/>
            <Route exact path='/Mainpage' component={Mainpage}/>
            <Route exact path='/Landing' component={Landing}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
