import './App.css';
import React from "react";


function App() {

    function verifyAge() {
        fetch('/api/hello')
            .then(response=>response.text())
            .then(response => console.log(response))
    }


    return (
        <div className="App">
            <p>You must be over 18 to continue</p>
            <button onClick={verifyAge}>Verify age</button>
        </div>
    );
}

export default App;
