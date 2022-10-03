import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PasswordForm } from "../components/PasswordForm";
import { useFetchUser } from "../hooks/useFetchUser";
import { ui } from "../reducers/ui";
import { user } from "../reducers/user";
import "./resetPassword.scss";
export const ResetPassword = () => {
  const [code, setCode] = useState(null);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const message = useSelector((store) => store.ui.message);
  const next = useSelector((store) => store.ui.next);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useFetchUser({ url });

  useEffect(() => {
    if (next === true) {
      navigate("/change");
      dispatch(ui.actions.setMessage(""));
    } else {
      navigate("/reset");
    }
  }, [next, navigate,dispatch]);

  useEffect(() => {
    if (message.includes("_id")) {
      dispatch(ui.actions.setMessage("Email-adress & code don't match"));
    }

    if (message)
      setTimeout(() => {
        dispatch(ui.actions.setMessage(""));
      }, 5000);
  }, [message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (code.length >= 5) {
      dispatch(ui.actions.setCode(parseInt(code)));
      dispatch(user.actions.setEmail(email));
      setUrl(`${process.env.REACT_APP_URL}/validate`);
    } else {
      dispatch(
        ui.actions.setMessage("Please check that you enter correct code")
      );
    }
  };

  return (
    <article className="reset___container">
      <PasswordForm
        onSubmit={onSubmit}
        Title="Code verification"
        description="Please enter the code that been sent to your email"
        inputOne="Email"
        inputTwo="Enter your code here"
        valueOne={email}
        setValueOne={setEmail}
        valueTwo={code}
        setValueTwo={setCode}
      />
    </article>
  );
};
