import "./App.css";
import { Auth } from "./components/Auth";
import { Page } from "./components/Page";
import { PrivateRoute } from "./components/PrivateRoute";
import { AppStateProvider } from "./context/AppStateProvider";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <PrivateRoute
            component={
              <AppStateProvider>
                <div className="border-2 border-blue-500 rounded-lg py-6 px-4">
                  <Page />
                </div>
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute
            component={
              <AppStateProvider >
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
}

export default App;
