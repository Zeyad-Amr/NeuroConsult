import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RouterClass from "./core/routes/router";

function App() {
  return (
    <Router>
      <Routes>{RouterClass.getRoutes()}</Routes>
    </Router>
  );
}

export default App;
