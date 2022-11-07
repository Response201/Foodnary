import "./header.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useMove = () => {
  const [state, setState] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    e.persist();
    setState((state) => ({ ...state, x: e.clientX, y: e.clientY }));
  };
  return {
    x: state.x,
    y: state.y,
    handleMouseMove
  };
};

const Header_background = () => {
  const { x, y, handleMouseMove } = useMove();
  const [valueX, setvalueX] = useState(0);
  const [valueY, setvalueY] = useState(0);
  const theme = useSelector((store) => store.ui.theme);
  useEffect(() => {
    setvalueX((4 * x) / 170 - 10);
    setvalueY((4 * y) / 170 + 40);
  }, [x, y]);



  return (
    <div className="mouseArea" onMouseMove={handleMouseMove}>
      <div
        className={theme === 'root' ? 'background' : 'background-dark'}
        style={{ backgroundPositionX: valueX, backgroundPositionY: valueY }}
      >
     
     
        
      </div>
   
       
      <div
        className="title"
      
        
      >
       <h2>  Foodnary </h2>
        <p> All your favorite meals!</p>
        <p>____________</p>
       
        
      </div>
 
    </div>
  );
};

export default Header_background;
