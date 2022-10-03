import React, { useState } from "react";
import { useFetchUser } from "../hooks/useFetchUser";
/*eslint-disable */
export const ReSendVerificationOrPassword = ({ urlEnd }) => {
  const [url, setUrl] = useState("");

  useFetchUser({ url });

  const ReSend = () => {
    setUrl(`${process.env.REACT_APP_URL}/${urlEnd}`);
  };

  return (
    <div>
      <a onClick={ReSend}>
        click here to send{" "}
        {urlEnd === "reset" ? "reset password" : "verification"} link
      </a>
    </div>
  );
};
