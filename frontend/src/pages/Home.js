import React, { useEffect, useRef, useState } from "react";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

import { RecipeLayout } from "../components/RecipeLayout";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import "./Home.scss";
import HomeText from "../components/HomeText";

/*eslint-disable */
export const Home = () => {
  const [url, setUrl] = useState("");
  const ref = useRef();
  const { data, next } = useFetchRecipe({ url });

  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/threenewestRecipes`);
  }, []);

  console.log(data);

  return (
    <article className="home___container">
      {
        <Parallax pages={3} style={{ top: "0", left: "0" }}>
          <ParallaxLayer
            className="header_container"
            offset={0}
            factor={1 / 1.2}
            speed={-0.1}
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <HomeText />
          </ParallaxLayer>
          <ParallaxLayer speed={1} factor={1.6} offset={0.8}>
            <article className="main_container">
              <h2>Insparation</h2>
              <section className="main_recipe_content" style={{ zIndex: "10" }}>
                {data &&
                  data.map((item) => {
                    return (
                      <div className="recipe_div_image" key={item._id}>
                        <RecipeLayout item={item} />
                      </div>
                    );
                  })}
              </section>
            </article>
          </ParallaxLayer>

          <ParallaxLayer
            speed={5}
            factor={0.1}
            offset={0}
            sticky={{ start: 1.1, end: 0.1 }}
            style={{}}
          >
            <section className="Gif___farmer_text">
              <iframe
                src="https://giphy.com/embed/XMI5EK3tkcfvyAEkpD"
                frameBorder="0"
                style={{
                  padding: "0",
                  margin: "0",
                  frameBorder: "0",
                  width: "25vw",
                  maxWidth: "300px"
                }}
              />
            </section>
          </ParallaxLayer>

          <ParallaxLayer
            speed={1}
            factor={2}
            offset={1.35}
            style={{
              background: `url("https://source.unsplash.com/FDO_EjrAk9c")`,
              backgroundSize: "cover"
            }}
          />

          <ParallaxLayer
            offset={2}
            speed={1}
            style={{ backgroundColor: "grey" }}
          />
        </Parallax>
      }
    </article>
  );
};
