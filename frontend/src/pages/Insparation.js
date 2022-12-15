/*eslint-disable */
import React, { useEffect, useState } from "react";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import { RecipeLayout } from "../components/RecipeLayout";
import "./insparation.scss";

export const Insparation = () => {
  const [url, setUrl] = useState("");
  const { data, next } = useFetchRecipe({ url });
  const [response, setResponse] = useState([]);
  const [sub, setSub] = useState("sub");
  const [main, setMain] = useState("main");
  const [updateUrl, setUpdateUrl] = useState("");
  const [options, setOptions] = useState();
  /* {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    subCatergory: sub,
    mainCategory: main
  })
} */

  useEffect(() => {
    setUpdateUrl(`${process.env.REACT_APP_URL}/newestRecipes`);
    setOptions({ method: "GET" });
  }, []);

  useEffect(() => {
    if (main === "main") {
      setSub("sub");
      setUpdateUrl(`${process.env.REACT_APP_URL}/newestRecipes`);
      setOptions({ method: "GET" });
    } else if (main !== "main" && sub === "sub") {
      setUpdateUrl(`${process.env.REACT_APP_URL}/mainCategory`);
      setOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mainCategory: main
        })
      });
    } else if (main !== "main" && sub !== "sub") {
      setUpdateUrl(`${process.env.REACT_APP_URL}/mainAndsub`);
      setOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mainCategory: main,
          subCatergory: sub
        })
      });
    }
  }, [main, sub]);

  useEffect(() => {
    setSub("sub");
  }, [main]);

  useEffect(() => {
    fetch(updateUrl, options)
      .then((response) => response.json())
      .then((json) => setResponse(json))
      .catch((err) => {
        console.log("error");
      });
  }, [data, options]);

  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/userRecipe`);
  }, [next]);

  return (
    <article className="insparation_container">
      <section className="insparation_filter_container">
        <section className="insparation_filter_content">
          <h1> Filter </h1>

          <select
            value={main}
            onChange={(e) => {
              setMain(e.target.value);
            }}
            placeholder={main}
          >
            <option value="main">Main </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            placeholder={sub}
          >
            {main === "main" ||
            (response.message && updateUrl.includes("mainCategory")) ? (
              <option>Select main</option>
            ) : (
              <>
                {main === "Breakfast" ? (
                  <>
                    <option value="sub">Sub</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Eggs">Eggs</option>
                    <option value="Smoothies">Smoothies</option>
                    <option value="Others">Others</option>
                  </>
                ) : (
                  <></>
                )}
                {main === "Dinner" ? (
                  <>
                    {" "}
                    <option value="sub">Sub</option>
                    <option value="Steak">Steak</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Fish/Seafood">Fish/Seafood</option>
                    <option value="Vegetarian/Vegan">Vegetarian/Vegan</option>
                    <option value="Salad">Salad</option>
                    <option value="Side dishes">Side dishes</option>
                    <option value="Others">Others</option>
                  </>
                ) : (
                  ""
                )}
                {main === "Dessert" ? (
                  <>
                    <option value="sub">Sub</option>
                    <option value="Chocolate">Chocolate</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Others">Others</option>
                  </>
                ) : (
                  <></>
                )}
                {main === "Other" ? (
                  <>
                    <option value="sub">Sub</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Other">Other</option>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </select>
        </section>
      </section>

      <section className="insparation_recipe_container">
        {response && response.length >= 1 ? (
          <>
            {response.map((item) => (
              <section className="insparation_recipe_content" key={item._id}>
                <RecipeLayout item={item} setUrl={setUrl} />
              </section>
            ))}
          </>
        ) : (
          <section
            style={{
              height: "40vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <p style={{ height: "50px" }}>
              {response && response.message ? `${response.message}` : ""}
            </p>
          </section>
        )}
      </section>
    </article>
  );
};
