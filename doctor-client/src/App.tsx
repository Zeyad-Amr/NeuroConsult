import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RouterClass from "./core/routes/router";
import { LoadingProvider } from "./core/services/loading-service";
import LoadingOverlay from "./core/components/loading/OverlapLoading";
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <Router>
          <Routes>{RouterClass.getRoutes()}</Routes>
        </Router>
        <LoadingOverlay />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
