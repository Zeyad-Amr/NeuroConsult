import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RouterClass from "./core/routes/router";
import { LoadingProvider } from "./core/services/loading-service";
import LoadingOverlay from "./core/components/loading/OverlapLoading";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Routes>{RouterClass.getRoutes()}</Routes>
      </Router>
      <LoadingOverlay />
    </LoadingProvider>
  );
}

export default App;
