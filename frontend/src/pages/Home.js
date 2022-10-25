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
  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/threenewestRecipes`);
  }, [url]);

 

  return (
    <article className="home___container">
      {
        <Parallax pages={3} style={{ top: "0", left: "0" }}>
          <ParallaxLayer
            className="header_container"
            factor={1}
            speed={-0.1}
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <HomeText />
          </ParallaxLayer>
          <ParallaxLayer speed={1} factor={1 / 1.2} offset={1.5}>
            <article
              className="main_container"
              style={{
                background: `url("https://source.unsplash.com/XbsuXjgN50Y")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                zIndex: "10"
              }}
            >
              <section className="main_content">
                <h2 className="main_insparation_header">Insparation</h2>
                <div className="main_recipe_content" style={{ zIndex: "10" }}>
                  {data &&
                    data.map((item) => {
                      return (
                        <div className="recipe_div_image" key={item._id}>
                          <RecipeLayout item={item} setUrl={setUrl} />
                        </div>
                      );
                    })}
                </div>
              </section>
            </article>
          </ParallaxLayer>

          <ParallaxLayer
            speed={-15}
            factor={0.1}
            offset={0.9}
            sticky={{ start: 0.9, end: 0.9 }}
            style={{ height: "100px" }}
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
            factor={1.5}
            offset={0.8}
            className="about_container_pageText"
          />

          <ParallaxLayer
            offset={2}
            speed={1}
            style={{ backgroundColor: "white" }}
          />
        </Parallax>
      }
    </article>
  );
};
