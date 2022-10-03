import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignInorUp } from "../components/SignInorUpComponent";
import { ui } from "../reducers/ui";
import { user } from "../reducers/user";
import "./signInOrUp.scss";
/*eslint-disable */
export const SignInOrUp = () => {
  const [show, setShow] = useState(false);
  const [btn, setBtn] = useState("Create account");
  const [title, setTitle] = useState("Sign In");
  const [urlRout, setUrlRout] = useState("signin");
  const message = useSelector((store) => store.ui.message);
  const accessToken = useSelector((store) => store.user.token);
  const veri = useSelector((store) => store.user.verified);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message.includes("registration successful!"))
      setTimeout(() => {
        onClick();
      }, 8000);
  }, [message]);

  const onClick = () => {
    if (show) {
      setShow(false);
      setBtn("Create account");
      setTitle("Sign in");
      setUrlRout("signin");
      dispatch(ui.actions.setMessage(""));
    } else {
      setShow(true);
      setBtn("Sing in");
      setTitle("Create account");
      setUrlRout("signup");
      dispatch(ui.actions.setMessage(""));
      dispatch(user.actions.setEmail(""));
    }
  };

  useEffect(() => {
    if (accessToken && veri) {
      navigate("/profile");
     
    } else {
      navigate("/signin");
    }
  }, [accessToken, veri, navigate]);






  return (
    <article className="signInorUp___Container">
    
        <section className="signInOrup___content">
          <SignInorUp
            title={title}
            showExtraInput={show}
            onClick={onClick}
            btnText={btn}
            urlRout={urlRout}
          />
        </section>
   
    </article>
  );
};
