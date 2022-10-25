import { useEffect } from "react";
import { useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import { ui } from "../reducers/ui";
/*eslint-disable */
export const  UseSignIn = ({
  url,
  oneInput,
  twoInput,
  threeInput,
  fourInput,
  fiveInput
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: oneInput,
        password: twoInput,
        username: threeInput,
        firstname: fourInput,
        lastname: fiveInput
      })
    };
    if (!url) {
    } else {
     
      fetch(url, options)
        .then((res) => {
          
          if (!res.ok) {
            // error coming back from server

            console.log("no response");
          }
          return res.json();
        })
        .then((data) => {
          if (data.response) {
            batch(() => {
              dispatch(user.actions.setFirstname(data.response.firstname));
              dispatch(user.actions.setLastname(data.response.lastname));
              dispatch(user.actions.setUsername(data.response.username));
              dispatch(user.actions.setEmail(data.response.email));
              dispatch(user.actions.setToken(data.response.token));
              dispatch(user.actions.setVerified(data.response.verified));
              dispatch(ui.actions.setMessage(data.response.message));
              dispatch(user.actions.setRole(data.response.role));
              dispatch(user.actions.setFollow(data.response.follow));
              dispatch(user.actions.setFollowers(data.response.followers));
              navigate("/signin");
            });
          } else {
            batch(() => {
              dispatch(user.actions.setFirstname(data.firstname));
              dispatch(user.actions.setLastname(""));
              dispatch(user.actions.setUsername(""));
              dispatch(user.actions.setEmail(data.email));
              dispatch(user.actions.setToken(data.token));
              dispatch(user.actions.setVerified(false));
              dispatch(ui.actions.setMessage(data.message));
              dispatch(user.actions.setRole(""));
              dispatch(user.actions.setFollow([]));
              dispatch(user.actions.setFollowers([]));
            });
          }
        })

        .catch((err) => {
         console.log('error')
        });
    }
  }, [dispatch, navigate, url]);
};
