import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ui } from "../reducers/ui";
import { user } from "../reducers/user";

export const useFetchUser = ({ url, password }) => {
  const token = useSelector((store) => store.user.token);
  const email = useSelector((store) => store.user.email);
  const firstname = useSelector((store) => store.user.firstname);
  const username = useSelector((store) => store.user.username);
  const code = useSelector((store) => store.ui.code);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async ({ options }) => {
      try {
        dispatch(ui.actions.setLoading(true));
        const response = await fetch(url, options);
        const json = await response.json();
        dispatch(ui.actions.setLoading(false));
        if (json.message.includes("ok")) {
          dispatch(ui.actions.setNext(json.next));
        }
        if (json.Following) {
          dispatch(user.actions.setFollow(json.Following.follow));
        } else {
          dispatch(ui.actions.setMessage(json.message));
        }
      } catch (error) {
        dispatch(ui.actions.setLoading(false));
        dispatch(ui.actions.setMessage(error.message));
        dispatch(ui.actions.setNext(error.next));
      }
    };

    if (url.includes("reSendVerification") && token) {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      fetchData({ options });
    }

    if (url.includes("reset")) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          firstname: firstname
        })
      };
      fetchData({ options });
    }

    if (url.includes("validate")) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
          code: code
        })
      };

      fetchData({ options });
    }

    if (url.includes("change")) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      };

      fetchData({ options });
    }

    if (url.includes("follow")) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username, 
          
        })
      };

      fetchData({ options });
    }
  }, [url, token, dispatch, code, email, firstname, password, username]);
};
