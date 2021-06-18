import logo from './logo.svg';
import './App.css';

function App() {

    function verifyAge() {

    }

  return (
    <div className="App">
   <p>You must be over 18 to continue</p>
      <button onClick={verifyAge}>Verify age</button>
    </div>
  );
}

export default App;
