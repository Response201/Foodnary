/*eslint-disable */
import "./App.css";
import React, { useEffect } from "react";
import { Navbar } from "./feature/Navbar";
import { PageRoutes } from "./PageRoutes";
import { useDispatch, useSelector } from "react-redux";
import "./App.css"
import { WelcomePage } from "./pages/WelcomePage";
import { ui } from "./reducers/ui";

export const App = () => {
const dispatch = useDispatch()

const showWelcomePage = useSelector((store) => store.ui.showWelcomePage);
  const themes = useSelector((store) => store.ui.theme);
  React.useEffect(() => {
    document.documentElement.className = themes;
  }, [themes]);

useEffect(() => {
   
  setTimeout(() => {
    dispatch(ui.actions.setShowWelcomePage(false));

  },5000); 
 
}, [])






  return (
    <article body={themes} section className="appContainer" >     
      <section className="navContainer">
        <Navbar />
        {showWelcomePage && <WelcomePage  />}
        
        
      </section>
      <section className="pageContainer"> 
      <PageRoutes />
      </section>

    </article>
  );
};

export default App;
