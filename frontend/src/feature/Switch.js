import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ui } from "../reducers/ui";
import "./switch.scss";

export const Switch = () => {
  const theme = useSelector((store) => store.ui.theme);
  const [color, setColor] = useState(theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (color === "root") {
      dispatch(ui.actions.setTheme("dark"));
      setColor("dark");
    } else {
      dispatch(ui.actions.setTheme("root"));
      setColor("root");
    }
  };



  return (
   
<div className="con">
  <label class="switch">
    <input type="checkbox" onClick={toggleTheme} />    <div></div>
  </label>
</div>













  );
};
