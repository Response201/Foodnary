import React from "react";
import { useSelector } from "react-redux";

import { Loading } from "../feature/Loading";

export const PasswordForm = ({
  onSubmit,
  Title,
  description,
  inputOne,
  inputTwo,
  valueOne,
  setValueOne,
  valueTwo,
  setValueTwo
}) => {
  const message = useSelector((store) => store.ui.message);
  const loading = useSelector((store) => store.ui.loading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit} className="reset___content">
          <h2> {Title} </h2>
          <section className="reset___input_container">
            <p> {description} </p>
            <input
              type="text"
              placeholder={inputOne}
              value={valueOne}
              minLength={5}
              onChange={(e) => setValueOne(e.target.value)}
            />
            <input
              type="text"
              placeholder={inputTwo}
              value={valueTwo}
              minLength={5}
              onChange={(e) => setValueTwo(e.target.value)}
            />
          </section>
          <section className="reset___message_container">
            <div className={message ? "text" : "noText"}> {message}</div>
          </section>
          <section className="reset___btn_container">
            <button type="submit"> Send </button>
          </section>
        </form>
      )}
    </>
  );
};
