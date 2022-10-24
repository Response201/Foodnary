import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ui } from "../reducers/ui";

export const useFetchRecipe = ({ url }) => {
  const [data, setData] = useState(null);
  const id = useSelector((store) => store.recipes.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async ({ options }) => {
      try {
        /* if next=true  loading is never set to tru - sidan uppdateras utan att vyn ändras när användare gillar inlägg  */

        const response = await fetch(url, options);
        const json = await response.json();

        setData(json);
      } catch (error) {
        dispatch(ui.actions.setMessage(error.message));
      }
    };

    if (url.includes("oneRecipe")) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id
        })
      };

      fetchData({ options });
    }
  }, [url, id]);

  return { data };
};
