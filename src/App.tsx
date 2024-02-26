import "./App.css";
import { Auth } from "./components/Auth";
import { Page } from "./components/Page";
import { PrivateRoute } from "./components/PrivateRoute";
import { AppStateProvider } from "./context/AppStateProvider";
import { createPage } from "./utils/misc";
import { Routes, Route } from "react-router-dom";

const initialState = createPage();

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <PrivateRoute
            component={
              <AppStateProvider initialState={initialState}>
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
              <AppStateProvider initialState={initialState}>
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
