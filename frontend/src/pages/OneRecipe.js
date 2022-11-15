/*eslint-disable */
import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { Loading } from "../feature/Loading";
import { useDispatch, useSelector } from "react-redux";
import RatingStar from "../feature/RatingStar";
import "./OneRecipe.scss";
import { SetRatingStar } from "../feature/SetRatingStar";
import { useNavigate } from "react-router";
import { ui } from "../reducers/ui";
import GetChangeRecipe from "../feature/GetChangeRecipe";
import { useFetchRecipe } from "../hooks/useFetchOneRecipe";

export const OneRecipe = () => {
  const loading = useSelector((store) => store.ui.loading);
  const recipeId = useSelector((store) => store.recipes.id);
  const user = useSelector((store) => store.user.username);
  const [url, setUrl] = useState("");
  const { data } = useFetchRecipe({ url });
  const [next, setnext] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const update = useSelector((store) => store.ui.update);
  const updateRating = useSelector((store) => store.recipes.rating);
  const role = useSelector((store) => store.user.role);

  /* funkction to get to an userpage */
  const onClickUser = () => {
    if( user !== data.username){
    dispatch(ui.actions.setPath("user"));
    dispatch(ui.actions.setSeeProfile(data.username));
    navigate("/user");}
  };

  useEffect(() => {
    if (update) {
      setnext(true);
    }
  }, [update, recipeId]);

  useEffect(() => {
    if (url !== "") {
      setUrl("");
      setnext(false);
    }

    if (url === "" && recipeId) {
      setUrl(`${process.env.REACT_APP_URL}/oneRecipe`);
    }
  }, [recipeId, next, updateRating]);

  return (
    <article className="oneRecipe___container">
      {loading && <Loading />}
      {!loading && data && (
        <section className="oneRecipe___content">
          <section className="oneRecipe___titel_category">
            <h2> {data.title} </h2>
            <section className="oneRecipe___pencil_category">
              <div className="oneRecipe_ingredients_div___category">
                <p className="oneRecipe_mainCategory"> {data.mainCategory} </p>
                <p className="oneRecipe_subCatergory"> {data.subCatergory} </p>
              </div>
              <GetChangeRecipe data={data} />
            </section>
          </section>
          <section className="oneRecipe_recipe___img">
            <section className="oneRecipe___username_likes_container">
              <section className="oneRecipe___username_likes_content">
                <div className="oneRecipe_div___likeBtn_likeCount">
                  <i>
                    {" "}
                    <HiHeart />{" "}
                  </i>
                  <p> {data.hearts} </p>
                </div>
                <p   onClick={onClickUser} className={user !== data.username ?"oneRecipe___username":''}>
                  {" "}
                  {data.username}{" "}
                </p>
              </section>
            </section>
            <img src={data.image} alt=" dish" />
          </section>

          <section className="oneRecipe___Rateing_container">
            {data ? (
              <div className="star">
                <RatingStar data={data} update={update} />
              </div>
            ) : (
              ""
            )}
          </section>

          {user && user !== data.username && data ? (
            <section className="oneRecipe___Rateing_container rewive___section">
              <p> Review this recipe </p> <SetRatingStar data={data} />{" "}
            </section>
          ) : (
            ""
          )}

          <section className="ingredients_description___Container">
            <section className="oneRecipe___ingredients_container">
              {" "}
              {data.ingredients.map((item) => {
                return (
                  <section
                    className="oneRecipe___ingredients_content"
                    key={item._id}
                  >
                    <div className="div___amount_measure">
                      <p>{item.amount}</p>
                      <p>{item.measure}</p>
                    </div>
                    <p>{item.ingredient}</p>
                  </section>
                );
              })}{" "}
            </section>

            <section className="oneRecipe___description">
              <p>Description</p>
              <p> {data.description} </p>
            </section>
          </section>
        </section>
      )}
    </article>
  );
};
