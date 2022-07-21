import { Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      MainApp
      <Link to="/main">layout</Link>
      <Link to="/devT">devTable</Link> |
      <Link to="/devC">devCard</Link>
    </div>
  );
}

export default App;
