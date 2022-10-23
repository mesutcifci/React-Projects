import React from "react";
import FormRenderer from "./components/FormRenderer";
import data from "./data.json";

function App() {
  return (
    <div className="App">
      <FormRenderer data={data} />
    </div>
  );
}

export default App;
