import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RecipeLayout } from "../components/RecipeLayout";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import { useFetchUser } from "../hooks/useFetchUser";

import "./Profil.scss";
import "./UserProfile.scss";
export const UserProfile = () => {
  const seeProfile = useSelector((store) => store.ui.seeProfile);
  const following = useSelector((store) => store.user.follow);
  const token = useSelector((store) => store.user.token);
  const username = useSelector((store) => store.user.username);
  const [url, setUrl] = useState("");
  const { data, next } = useFetchRecipe({ url });
  const follow = following.map((e) => e.username === seeProfile);

  useFetchUser({ url });

  useEffect(() => {
    setUrl("");
  }, [follow]);

  useEffect(() => {
    setUrl(`${process.env.REACT_APP_URL}/userRecipe`);
  }, [next]);

  const onClickfollow = () => {
    setUrl(`${process.env.REACT_APP_URL}/${seeProfile}/follow`);
  };

  return (
    <div className="userProfile___container">
      <section className="userProfile___header_btn">
        <h2>{seeProfile}</h2>
        {token && username ? (
          <button onClick={onClickfollow}>
            {follow.includes(true) ? "Unfollow " : "Follow"}{" "}
          </button>
        ) : (
          ""
        )}
      </section>
      <section className="profil_grid___Container">
        <section
          className={
            data && data.length <= 1
              ? "oneRecipteWidth"
              : "profil_grid___Content"
          }
        >
          {data &&
            data.map((item) => {
              return (
                <div key={item._id}>
                  <RecipeLayout item={item} setUrl={setUrl} />{" "}
                </div>
              );
            })}
        </section>
      </section>
    </div>
  );
};