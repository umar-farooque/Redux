import logo from "./logo.svg";
import "./App.css";
import Bugs from "./components/bugs";
import StoreContext from "./contexts/storeContext";
import store from "./store/store";

function App() {
  return (
    <StoreContext.Provider value={store()}>
      <Bugs />
    </StoreContext.Provider>
  );
}

export default App;
