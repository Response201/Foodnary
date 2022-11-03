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
        <Parallax pages={2.1} style={{ top: "0", left: "0" }}>
          <ParallaxLayer className="header_container" factor={1} speed={-0.1}>
            <HomeText />
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
            factor={1.75}
            offset={0.8}
            className="about_container"
          >
            <article className="about_container_article">
              <section className="about_container_section">
                <h1>Welcome </h1>

                <p>
                  Lorem ipsum dolor sit amet. Et rerum vero est consequatur
                  magni vel maxime necessitatibus aut reprehenderit doloribus.
                  Sit quia voluptatem qui aspernatur culpa aut voluptas totam in
                  aperiam suscipit non optio iusto qui animi officiis et ullam
                  architecto. Non labore magnam quo alias recusandae aut vitae
                  nisi rem praesentium voluptate et blanditiis accusantium aut
                  obcaecati numquam et animi labore.
                </p>
                <p>
                  Ea quasi minima qui harum quis et animi illo hic harum
                  repudiandae qui corporis velit et dolor rerum qui consequatur
                  culpa. Aut aspernatur quos aut suscipit fuga est internos
                  temporibus in reprehenderit eaque eos magnam explicabo. Ut
                  facere dolores aut nihil harum et maiores omnis aut eveniet
                  aspernatur aut autem cupiditate est quas corporis et suscipit
                  eligendi.
                </p>
              </section>

              <section className="about_container_section">
                <h1> Skapa ett konto och följ dina vänner</h1>

                <p>
                  Lorem ipsum dolor sit amet. Ex rerum itaque sit suscipit
                  maiores aut magni repellendus eum quaerat nemo ut dolorem unde
                  cum dolores ipsam. Sit consequuntur exercitationem qui atque
                  sint et aperiam ipsam. Ut ipsam libero et itaque itaque non
                  labore Sit quia voluptatem qui aspernatur culpa aut rerum.
                </p>
                <p>
                  Vel quod pariatur ex harum cumque sit quod sint At voluptatem
                  aperiam qui facere repellendus eos unde delectus ea
                  perspiciatis excepturi. Et incidunt magnam aut magni internos
                  ad beatae galisum eos quos illum et quod dignissimos aut optio
                  aspernatur. Vel quos asperiores vel sint deserunt qui tempore
                  rerum ex voluptatem eaque et reprehenderit amet.
                </p>
              </section>
            </article>
          </ParallaxLayer>

          <ParallaxLayer speed={1.2} factor={1 / 1.2} offset={1.5}>
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
        </Parallax>
      }
    </article>
  );
};
