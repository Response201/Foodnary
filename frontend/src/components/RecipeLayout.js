import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiHeart } from "react-icons/hi";
import { recipes } from "../reducers/recipes";
import GetChangeRecipe from "../feature/GetChangeRecipe";
import { ui } from "../reducers/ui";
import "./RecipeLayout.scss";
import RatingStar from "../feature/RatingStar";

/*eslint-disable */
export const RecipeLayout = ({ item, setUrl }) => {
  const username = useSelector((store) => store.user.username);
  const token = useSelector((store) => store.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const liked = item.liked.map((e) => e.user.includes(username));

  /* funkction to get to an userpage */
  const onClickUser = () => {
    dispatch(ui.actions.setPath("user"));
    dispatch(ui.actions.setSeeProfile(item.username));
    navigate("/user");
  };

  /* to recepie */

  const onClicktoRecipe = () => {
    dispatch(recipes.actions.setId(item._id));
    dispatch(recipes.actions.setId(item._id));
    navigate("/recipe");
  };

  /* function for likes */
  const onClickLike = (e) => {
    e.preventDefault();
    setUrl(`${process.env.REACT_APP_URL}/${item._id}/likeRecipe`);
  };

  

  



  return (
    <article key={item._id} className="recipe___content">
      <section className="recipe___content_title">
        {" "}
        <section className="recipe___title_rating_container">
          <h2 className="recipe___title_h2"> {item.title} </h2>

          <RatingStar data={item} />
        </section>
        <GetChangeRecipe data={item} />
      </section>
      <section className="recipe___content_img" onClick={onClicktoRecipe}>
        <img src={item.image} alt="image of dish" className="recipe___img" />
      </section>
      <section className="recipe___content_categories_hearts_username">
        <div className="category_text___div">
          <p className="mainCategory"> {item.mainCategory} </p>
          <p className="subCatergory"> {item.subCatergory} </p>
        </div>

        <div className="like_user_div">
          <div className="likeBtn_likeCount">
            {username === item.username || !token ? (
              <>
                {" "}
                <p> {item.hearts} </p>
                <button className="likebuttonUser">
                  <i className="icon_heart">
                    <HiHeart />
                  </i>
                </button>
              </>
            ) : (
              <>
                {" "}
                <p> {item.hearts} </p>
                <button 
                  className={
                    liked.includes(true) ? "likebuttonLiked" : "likebutton"
                  }
                  onClick={onClickLike}
                >
                  <i className="icon_heart">
                    <HiHeart />
                  </i>
                </button>
              </>
            )}
          </div>
          {username === item.username ? (
            <p> {item.username} </p>
          ) : (
            <p onClick={onClickUser} className="username">
              {" "}
              {item.username}{" "}
            </p>
          )}
        </div>
      </section>
    </article>
  );
};
