/*eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import { ui } from "../reducers/ui";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import { RecipeLayout } from "../components/RecipeLayout";
import "./Profil.scss";
import { DisplayUserInfo } from "../components/DisplayUserInfo";
import { Loading } from "../feature/Loading";
import { recipes } from "../reducers/recipes";
import defaultImgRecip from '../assets/image/annie-spratt-R3LcfTvcGWY-unsplash.jpg'
export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.ui.loading);
  const accessToken = useSelector((store) => store.user.token);
  const username = useSelector((store) => store.user.username);
  const [target, setTarget] = useState("userRecipes");
  const followers = useSelector((store) => store.user.followers);
  const follow = useSelector((store) => store.user.follow);
  const [url, setUrl] = useState('');
  const { data } = useFetchRecipe({ url });

  const LogOut = () => {
    dispatch(user.actions.setToken(""));
    dispatch(user.actions.setUsername(""));
    dispatch(user.actions.setRole(""));
    dispatch(user.actions.setEmail(""));
    dispatch(ui.actions.setSignInOrUp(false));
    navigate("/signin");
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(ui.actions.setPath('profile'))
      setUrl(`${process.env.REACT_APP_URL}/userRecipe`);
      navigate("/profile");

    } else {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

useEffect(() => {
  setUrl(`${process.env.REACT_APP_URL}/userRecipe`);
}, [username])


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
  

  return (
    <article className="profil___container">
      <section className="profil___logout_create_btn">
        {" "}
        <button onClick={LogOut} className="general_button">
          Log out
        </button>{" "}

        <button className="general_button creat_btn_header" onClick={onClick} >
              Create recipe
            </button>


      </section>

      {loading ? (
        <div className="loading_container"> 
        <Loading />
        </div>
      ) : ''  }
      
      {data ? (
        <section className="profil___followers">
          <DisplayUserInfo item={data} setTarget={setTarget} />
        </section>
      ) : (
        ""
      )}

      <>
        <section
          className={
            data && data.length === 1
              ? "oneRecipteWidth_container"
              : "profil_grid___Container"
          }
        >
          <section
            className={
              data && data.length === 1
                ? "oneRecipteWidth"
                : "profil_grid___Content"
            }
          >
            {data &&
              target === "userRecipes" &&
              data.length >= 1 &&
              data.map((item) => {
                return (
                  <div key={item._id}>
                    {" "}
                    <RecipeLayout item={item} />{" "}
                  </div>
                );
              })}
          </section>
          <section className="profil_follow___Container">
         
            {follow &&
              target === "userFollow" &&
              follow.map((item) => {
                /* funkction to get to an userpage */
                const onClickUser = () => {
                  dispatch(ui.actions.setPath("user"));
                  dispatch(ui.actions.setSeeProfile(item.username));
                  navigate("/user");
                };

                return (
                  <div key={item._id}>
                    {" "}
                    <p onClick={onClickUser}> {item.username} </p>{" "}
                  </div>
                );
              })}

            {followers &&
              target === "userFollowers" &&
              followers.map((item) => {
                const onClickUser = () => {
                  dispatch(ui.actions.setPath("user"));
                  dispatch(ui.actions.setSeeProfile(item.username));
                  navigate("/user");
                };

                return (
                  <div key={item._id}>
                    {" "}
                    <p onClick={onClickUser}> {item.username} </p>{" "}
                  </div>
                );
              })}

            {follow.length === 0 && target === "userFollow" ? (
              <p>You dont follow annyone yet</p>
            ) : (
              ""
            )}
            {followers.length === 0 && target === "userFollowers" ? (
              <p>You dont have anny followers yet</p>
            ) : (
              ""
            )}
            {data &&
            target === "userRecipes" &&
            data.message === "user have no recipt yet" ? (
              <p>You have not create anny recipes yet </p>
            ) : (
              ""
            )}




          </section>
         

        </section>



        <section className="profil_createPage___Container"> 
          <button className="general_button creat_btn_page" onClick={onClick} >
              Create recipe
            </button>
            </section>


      </>
    </article>
  );
};
