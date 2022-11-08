import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignInorUp } from "../components/SignInorUpComponent";
import { ui } from "../reducers/ui";
import { user } from "../reducers/user";
import "./signInOrUp.scss";
/*eslint-disable */
export const SignInOrUp = () => {
  const [btn, setBtn] = useState("Create account");
  const [title, setTitle] = useState("Sign In");
  const [urlRout, setUrlRout] = useState("signin");
  const message = useSelector((store) => store.ui.message);
  const accessToken = useSelector((store) => store.user.token);
  const veri = useSelector((store) => store.user.verified);
  const signInOrUp = useSelector((store) => store.ui.signInOrUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message.includes("registration successful!"))
      dispatch(ui.actions.setSignInOrUp(false));
    setTimeout(() => {
      onClick();
    }, 8000);
  }, [message]);

  const onClick = () => {
    if (signInOrUp) {
      dispatch(ui.actions.setSignInOrUp(false));
    } else {
      dispatch(ui.actions.setSignInOrUp(true));
    }
  };

  useEffect(() => {
    if (!signInOrUp) {
      setBtn("Create account");
      setTitle("Sign in");
      setUrlRout("signin");
      dispatch(ui.actions.setMessage(""));
    } else if (signInOrUp) {
      setBtn("Sing in");
      setTitle("Create account");
      setUrlRout("signup");
      dispatch(ui.actions.setMessage(""));
      dispatch(user.actions.setEmail(""));
    }
  }, [signInOrUp]);

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
          onClick={onClick}
          btnText={btn}
          urlRout={urlRout}
        />
      </section>
    </article>
  );
};
