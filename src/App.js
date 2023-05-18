import "./App.css";
import Editor from "./pages/Editor";
import {ContextProvider} from './components/ContextAPI.jsx';


function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Editor />
      </ContextProvider>
    </div>
  );
}

export default App;
