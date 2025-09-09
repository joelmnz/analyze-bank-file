import React from "react";
import "./App.css";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import FileLoader from "./components/FileLoader";

function App() {
  return (
    <div className="App">
      <h1>Bank File Analyzer</h1>
      <FileLoader />
    </div>
  );
}

export default App;
