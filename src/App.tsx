import "./App.css";
import { Page } from "./components/Page";
import { AppStateProvider } from "./context/AppStateProvider";
import { createPage } from "./utils/misc";

const initialState = createPage();

function App() {
  return (
    <AppStateProvider initialState={initialState}>
      <div className="border-2 border-slate-500 rounded-lg py-6 px-4">
        <Page />
      </div>
    </AppStateProvider>
  );
}

export default App;
