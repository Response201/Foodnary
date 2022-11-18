import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { RecipeLayout } from "../components/RecipeLayout";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import { recipes } from "../reducers/recipes";
import defaultImgRecip from "../assets/image/annie-spratt-R3LcfTvcGWY-unsplash.jpg";
import "./home___profil.scss";
import "./Profil.scss";
const Home___profile = () => {
  const [url, setUrl] = useState("");
  const { data, next } = useFetchRecipe({ url });
  const [array, setArray] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/userRecipe`);
  }, [next]);

 

  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/followRecipts`);
    if (url.includes("userRecipe") || url.includes("likeRecipe")) {
    } else if (data) {
      console.log(url);
      setArray([...data]);
    }
  }, [data]);

  const onClick = () => {
    dispatch(recipes.actions.setTitle("Title"));
    dispatch(recipes.actions.setDescription("Description"));
    dispatch(recipes.actions.setId(""));
    dispatch(recipes.actions.setImage(`${defaultImgRecip}`));
    dispatch(
      recipes.actions.setIngredients([
        { id: Date.now(), amount: "", measure: "", ingredient: "" }
      ])
    );
    dispatch(recipes.actions.setMainCategory("Main category"));
    dispatch(recipes.actions.setSubCatergory("Sub category"));
    dispatch(recipes.actions.setHeader("Create recipe"));

    navigate("/create");
  };

  const onClickDiscover = () => {};

  return (
    <article className="recipes__container">
      <section className="recipes__side">
        <button
          className="creat_btn_page"
          style={{ maxWidth: "200px", maxHeight: "70px" }}
          onClick={onClick}
        >
          Create recipe
        </button>
      </section>
      <section className="recipes__content">
        {data &&
          array.map((e) => (
            <>
              <RecipeLayout item={e} setUrl={setUrl} />
            </>
          ))}
      </section>
      <section className="recipes__side hidde">
        <button
          className="creat_btn_page"
          style={{ maxWidth: "200px", maxHeight: "70px" }}
          onClick={onClickDiscover}
        >
          Discover New Creators
        </button>
      </section>
    </article>
  );
};

export default Home___profile;
