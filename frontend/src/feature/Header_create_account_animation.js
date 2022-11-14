import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation from "../assets/lotties/menu-create-account.json";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { ui } from "../reducers/ui";

export const Header_create_account_animation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* to sign up */

  const onClickToSignUp = () => {
    dispatch(ui.actions.setSignInOrUp(true));
    navigate("/signin");
  };

  return (
    <div
      onClick={() => onClickToSignUp()}
      style={{
        width: "120px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderRadius: "50%"
      }}
    >
      <Lottie
        animationData={animation}
        loop={true}
        style={{
          width: "140px"
        }}
      />
      <h1
        style={{
          width: "120px",
          height: "20px",
          position: "absolute",
          color: "black",
          fontWeight: "700"
        }}
      >
        Create account
      </h1>
    </div>
  );
};
