import React, { useEffect, useState } from "react";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import { useSelector } from "react-redux";
import { Loading } from "../feature/Loading";
import { RecipeLayout } from "../components/RecipeLayout";

import "./Home.scss";

/*eslint-disable */
export const Home = () => {
  const loading = useSelector((store) => store.ui.loading);
  const [url, setUrl] = useState("");

  const { data, next } = useFetchRecipe({ url });

  useEffect(() => {
   setUrl(`${process.env.REACT_APP_URL}/newestRecipes`); 
  }, [next]);

  return (
    <article className="home___container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="headerText">Foodnary</h2>
          <section className="recipe___Container">



            <section className="recipe___Conent">

           


             {data &&
                data.map((item) => {
                  return (
                    <div key={item._id}>
                      {" "}
                      <RecipeLayout item={item} setUrl={setUrl} />{" "}
                    </div>
                  );
                })} 
            </section>















          </section>
        </>
      )}













    </article>
  );
};
