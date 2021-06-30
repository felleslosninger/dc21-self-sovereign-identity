import logo from './logo.svg';
import './App.css';
import React from "react";
import Landing from '.pages/Landing'
function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Landing}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
