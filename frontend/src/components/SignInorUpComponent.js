import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../pages/signInOrUp.scss";
import { UseSignIn } from "../hooks/UseSignIn";
import { ReSendVerificationOrPassword } from "../feature/ReSendVerification";
import { ui } from "../reducers/ui";

/*eslint-disable */
export const SignInorUp = ({
  title,
  onClick,
  btnText,
  urlRout
}) => {
  const [oneInput, setOneInput] = useState("");
  const [twoInput, setTwoInput] = useState("");
  const [threeInput, setThreeInput] = useState("");
  const [fourInput, setFourInput] = useState("");
  const [fiveInput, setFiveInput] = useState("");
  const [url, setUrl] = useState("");
  const signInOrUp = useSelector((store) => store.ui.signInOrUp);
  const email = useSelector((store) => store.user.email);
  const message = useSelector((store) => store.ui.message);
  const dispatch = useDispatch();

  UseSignIn({ url, oneInput, twoInput, threeInput, fourInput, fiveInput });

  useEffect(() => {
    setUrl("");
    setOneInput(email);

    if (message.includes("Log in")) {
      setOneInput("");
      setTwoInput("");
      dispatch(ui.actions.setMessage(""));
    }
    if (message.includes("successful")) {
      setTimeout(() => {
        setOneInput("");
        setTwoInput("");
        setThreeInput("");
        setFourInput("");
        setFiveInput("");
        dispatch(ui.actions.setMessage(""));
      }, 8000);
    }

    if (message.includes("_id" || message.includes('Cannot'))) {
      dispatch(ui.actions.setMessage(""));
    }

    setTimeout(() => {
      dispatch(ui.actions.setMessage(""));
    }, 10000);
  }, [message, dispatch, email]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (urlRout === "signin") {
      {
        oneInput.length <= 5 || twoInput.length <= 5
          ? dispatch(
              ui.actions.setMessage("Please fill out email/password correct")
            )
          : setUrl(`${process.env.REACT_APP_URL}/${urlRout}`);
      }
    } else {
      {
        oneInput.length <= 5 ||
        twoInput.length <= 5 ||
        threeInput.length <= 1 ||
        fourInput.length <= 1 ||
        fiveInput.length <= 1
          ? dispatch(
              ui.actions.setMessage("Please fill out all infromation correct")
            )
          : setUrl(`${process.env.REACT_APP_URL}/${urlRout}`);
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="SignInorUp___Form">
        <h2>{title}</h2>

        <section className="SignInorUp___inputContainer">
          <input
           className="SignInorUp___input"
            type="text"
            placeholder="Email"
            value={oneInput}
            onChange={(e) => setOneInput(e.target.value.toLocaleLowerCase())}
            minLength={5}
          />
          <input
           className="SignInorUp___input"
            type="password"
            placeholder="Password"
            value={twoInput}
            onChange={(e) => setTwoInput(e.target.value)}
            minLength={6}
          />
          <>
            {signInOrUp ? (
              <>
                <input
                className="SignInorUp___input"
                  type="text"
                  placeholder="Username"
                  value={threeInput}
                  onChange={(e) =>
                    setThreeInput(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
                  }
                  minLength={2}
                />
                <input
                className="SignInorUp___input"
                  type="text"
                  placeholder="Firstname"
                  value={fourInput}
                  onChange={(e) => setFourInput(e.target.value)}
                  minLength={2}
                />
                <input
                className="SignInorUp___input"
                  type="text"
                  placeholder="Lastname"
                  value={fiveInput}
                  onChange={(e) => setFiveInput(e.target.value)}
                  minLength={2}
                />
              </>
            ) : (
              ""
            )}
          </>
        </section>
        <section className="btnText_password_verification___container">
          <div>
            <span>
              <div className={message ? "text" : "noText"}> {message} </div>
            </span>
            <span>
              {" "}
              {message.includes("Account not verified") && (
                <ReSendVerificationOrPassword urlEnd="reSendVerification" />
              )}
              {message.includes("Password is incorrect") && (
                <ReSendVerificationOrPassword urlEnd="reset" />
              )}{" "}
            </span>
          </div>
          <div onClick={onClick} className="text_create_signIn">
            
            {btnText}
          </div>
        </section>
        <section className="SignInorUp___btn_container">
        <button className="SignInorUp___btn" type="submit">{title}</button>
        </section>
      </form>
    </>
  );
};
