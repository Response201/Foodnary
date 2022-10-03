import "./App.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "./feature/Navbar";
import { PageRoutes } from "./PageRoutes";
import { useSelector } from "react-redux";
import "./App.css"
import { WelcomePage } from "./pages/WelcomePage";

export const App = () => {

const [showWelcomePage, setShowWelcomePage] = useState(true)

  const themes = useSelector((store) => store.ui.theme);
  React.useEffect(() => {
    document.documentElement.className = themes;
  }, [themes]);

useEffect(() => {
   
  setTimeout(() => {
    setShowWelcomePage(false)
  },5000); 
 
}, [])






  return (
    <article body={themes} section className="appContainer" >
      <section className="navContainer">
        <Navbar />
        {showWelcomePage && <WelcomePage setShowWelcomePage={setShowWelcomePage} />}
        
        
      </section>
      <section className="pageContainer"> 
      <PageRoutes />
      </section>
    </article>
  );
};

export default App;
