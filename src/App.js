import Home from "./components/Home";
import { useEffect } from "react";

function App() {
  useEffect(()=>{
    document.body.style.backgroundColor = "#ff6600";
    document.body.style.overflow = 'hidden';
  })

  return (
    <>
      <Home/>
    </>
  );
}

export default App;
