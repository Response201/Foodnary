import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipes } from "../reducers/recipes";
import { ui } from "../reducers/ui";
/*eslint-disable */
export const useFetchRecipe = ({ url }) => {
  const [data, setData] = useState(null);
  const [next, setNext] = useState(false);
  const [urlUpload, setUrlUpload] = useState("");
  const token = useSelector((store) => store.user.token);
  const username = useSelector((store) => store.user.username);
  const role = useSelector((store) => store.user.role);
  const subCatergory = useSelector((store) => store.recipes.subCatergory);
  const mainCategory = useSelector((store) => store.recipes.mainCategory);
  const title = useSelector((store) => store.recipes.title);
  const description = useSelector((store) => store.recipes.description);
  const ingredients = useSelector((store) => store.recipes.ingredients);
  const image = useSelector((store) => store.recipes.image);
  const id = useSelector((store) => store.recipes.id);
  const value = useSelector((store) => store.recipes.rating);
  const path = useSelector((store) => store.ui.path);
  const update = useSelector((store) => store.ui.update);
  const seeProfile = useSelector((store) => store.ui.seeProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async ({ options }) => {
      try {
        /* if next=true  loading is never set to tru - sidan uppdateras utan att vyn ändras när användare gillar inlägg  */

        if (next || update) {
          const response = await fetch(url, options);
          const json = await response.json();
          dispatch(ui.actions.setLoading(false));
          setData(json);
          dispatch(ui.actions.setUpdate(false));
        } else {
          dispatch(ui.actions.setLoading(true));
          const response = await fetch(url, options);
          const json = await response.json();
          dispatch(ui.actions.setLoading(false));
          setData(json);
          if (json.response._id) {
            dispatch(recipes.actions.setId(json.response._id));
            dispatch(recipes.actions.setUploadFile(true));
          }
        }
      } catch (error) {
        dispatch(ui.actions.setUpdate(false));
        setNext(false);
        dispatch(ui.actions.setLoading(false));
        dispatch(ui.actions.setMessage(error.message));
      }
    };

    const fetchLike = async ({ options }) => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setNext(true);
        dispatch(ui.actions.setUpdate(true));
      } catch (error) {
        dispatch(ui.actions.setMessage(error.message));
        setNext(false);
      }
    };

    if (url.includes("userRecipe") && path === "profile") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username
        })
      };
      fetchData({ options });
    }

    if (url.includes("userRecipe") && path === "user") {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: seeProfile
        })
      };
      fetchData({ options });
    }

    if (url.includes("allRecipes")) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetchData({ options });
    }

    if (url.includes("newestRecipes") || next) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetchData({ options });
    }

    if (url.includes("followRecipts")) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username
        })
      };
      fetchData({ options });
    }

    if (url.includes("mainAndsub" || "mainCategory" || "subCatergory")) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subCatergory: subCatergory,
          mainCategory: mainCategory
        })
      };
      fetchData({ options });
    }

    if (
      url.includes("createRecipe") || url.includes("changeRecipe") && token
    ) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          role: role,
          title: title,
          description: description,
          ingredients: ingredients,
          mainCategory: mainCategory,
          subCatergory: subCatergory,
          image: image,
          username: username
        })
      };
      fetchData({ options });
    }

    if (url.includes("deleteRecipe") && token) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          role: role,
          title: title,
          description: description,
          ingredients: ingredients,
          mainCategory: mainCategory,
          subCatergory: subCatergory,
          image: image,
          username: username
        })
      };
      fetchData({ options });
    }

    if (url.includes("likeRecipe") && token) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username
        })
      };
      fetchLike({ options });
    }

    if (url.includes("ratingRecipe") && token) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username,
          value: value
        })
      };
      setNext(true);
      dispatch(ui.actions.setUpdate(true));
      fetchLike({ options });
    }

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
  }, [url, token, urlUpload]);

  return { data, next };
};
