import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PasswordForm } from "../components/PasswordForm";
import { useFetchUser } from "../hooks/useFetchUser";
import { ui } from "../reducers/ui";
export const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [url, setUrl] = useState("");
  const message = useSelector((store) => store.ui.message);
  const next = useSelector((store) => store.ui.next);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useFetchUser({ url, password });

  useEffect(() => {
    if (next === true) {
      navigate("/change");
    } else {
      navigate("/reset");
    }
  }, [next, navigate]);

  useEffect(() => {
    if (message.includes("password have been change")) {
      setTimeout(() => {
        dispatch(ui.actions.setMessage(""));
        navigate("/signin");
        dispatch(ui.actions.setNext(false));
      }, 5000);
    }

    if (message)
      setTimeout(() => {
        dispatch(ui.actions.setMessage(""));
      }, 5000);
  }, [message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password.length <= 5) {
      dispatch(
        ui.actions.setMessage(
          "Password needs to be at least 6 charachters long"
        )
      );
    } else {
      if (password === checkPassword) {
        setUrl(`${process.env.REACT_APP_URL}/change`);
      } else {
        dispatch(
          ui.actions.setMessage("Please type same password in the inputs")
        );
      }
    }
  };

  return (
    <article className="reset___container">
      <PasswordForm
        onSubmit={onSubmit}
        Title="Change Password"
        description="Please enter a new password"
        inputOne="Password"
        inputTwo="Check the password"
        valueOne={password}
        setValueOne={setPassword}
        valueTwo={checkPassword}
        setValueTwo={setCheckPassword}
      />
    </article>
  );
};
