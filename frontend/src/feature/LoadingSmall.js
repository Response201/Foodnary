import React from "react";
import Lottie from "lottie-react";
import small from "../assets/lotties/loading-small.json"


export const LoadingSmall = () => {


  

    

  return (
     <> 
     <p >( </p><Lottie
        animationData={small}
        loop={true}
        style={{
          whiteSpace:'nowrap',
       
          height: "75%",
       
         
        }}
      />
  <p  > ) </p>
    </>
  );
};
