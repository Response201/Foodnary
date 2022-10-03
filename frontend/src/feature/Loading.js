import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import taco from "../assets/lotties/63272-walking-taco.json";
import broccoli from "../assets/lotties/walking-broccoli.json";
import avocado from "../assets/lotties/63272-walking-avocado.json";
import mushroom from "../assets/lotties/mushroom-bros.json";
import orange from "../assets/lotties/walking-orange.json";
import fries from "../assets/lotties/62450-french-fries.json";
export const Loading = () => {
  const [animation, setAnimation] = useState("");
  

  useEffect(() => {
    const array = [taco, broccoli, avocado, mushroom, orange, fries];

    let random = Math.floor(Math.random() * array.length);

    setAnimation(array[random]);

  
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Lottie
        animationData={animation}
        loop={true}
        style={{
          width: "100%",
          minWidth: "300px",
          maxWidth: "600px",
          marginBottom: "-120px"
        }}
      />
      <h1
        style={{
          height: "30px",
          fontSize: "2em",
          color: "var(--primary-one)"
        }}
      >
        Loading...
      </h1>
    </div>
  );
};
