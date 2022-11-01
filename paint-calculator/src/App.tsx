import { useState } from "react";
import FormRenderer from "./components/FormRenderer";
import Footer from "./components/Footer";
import data from "./data.json";

function App() {
  return (
    <div className="App">
      <FormRenderer data={data} />
      <Footer />
    </div>
  );
}

export default App;
