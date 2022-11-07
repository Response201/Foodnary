import React, { useEffect, useRef, useState } from "react";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

import { RecipeLayout } from "../components/RecipeLayout";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import "./Home.scss";

import { useDispatch } from "react-redux";
import { ui } from "../reducers/ui";
import { useNavigate } from "react-router";
import { recipes } from "../reducers/recipes";
import Particle from "../feature/Particle";
import Header_background from "../components/Header_background_text";

/*eslint-disable */
export const Home = () => {
  const [url, setUrl] = useState("");
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, next } = useFetchRecipe({ url });

  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/threenewestRecipes`);
  }, []);
  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/threenewestRecipes`);
  }, [url]);

  /* funkction to get to an userpage */
  const onClickUser = (e) => {
    dispatch(ui.actions.setPath("user"));
    dispatch(ui.actions.setSeeProfile(e.target.innerHTML));
    navigate("/user");
  };

  /* to recepie */

  const onClicktoRecipe = (e) => {
    dispatch(recipes.actions.setId(e));
    navigate("/recipe");
  };

  return (
    <article className="home___container">
      {
        <Parallax
          pages={2}
          style={{ top: "0", left: "0" }}
          className="parallax"
        >
          <ParallaxLayer
            className="header_container"
            factor={0.9}
            speed={-0.1}
            offset={0}
          >
            <Particle />
            <Header_background />
          </ParallaxLayer>

          <ParallaxLayer
            speed={-15}
            factor={0.5}
            offset={0.5}
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
            factor={1.2}
            offset={0.8}
            className="about_container"
          >
            <article
              className="main_container"
              style={{
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
                          <section
                            style={{ position: "relative" }}
                            className="recipe___content_img"
                            onClick={() => onClicktoRecipe(item._id)}
                          >
                            <img
                              src={item.image}
                              alt="image of dish"
                              className="recipe___img"
                            />
                            <svg
                              style={{
                                position: "absolute",
                                bottom: "0"
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1440 225"
                            >
                              <path
                                className="fill_svg"
                                fill-opacity="1"
                                d="M0,256L48,256C96,256,192,256,288,245.3C384,235,480,213,576,181.3C672,149,768,107,864,112C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                              ></path>
                            </svg>
                          </section>

                          <section className="recipe___content_title">
                            <h2 className="recipe___title_h2">{item.title}</h2>

                            <p
                              onClick={(e) => onClickUser(e)}
                              className="username"
                            >
                              {item.username}
                            </p>
                          </section>
                        </div>
                      );
                    })}
                </div>
              </section>
            </article>
          </ParallaxLayer>

          <ParallaxLayer speed={1} factor={1} offset={1}>
            <article className="about_container_article">
              <section speed={2} className="about_container_section">
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
        </Parallax>
      }
    </article>
  );
};
