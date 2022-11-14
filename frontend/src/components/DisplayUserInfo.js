import React from "react";
import { useSelector } from "react-redux";
import { HiUserGroup, HiUser, HiBookOpen } from "react-icons/hi";
import "./DisplayUserInfo.scss";
export const DisplayUserInfo = ({ item, setTarget }) => {
  const followers = useSelector((store) => store.user.followers);
  const follow = useSelector((store) => store.user.follow);

  return (
    <article className="IconAndText___Container">
      <section
        className="IconAndText___Content"
        onClick={() => setTarget("userRecipes")}
      >
        <i>
          {" "}
          <HiBookOpen />{" "}
        </i>
        <p> {item.length >= 1 ? item.length : "0"} </p>
        <p>recipes</p>
      </section>

      <section
        className="IconAndText___Content"
        onClick={() => setTarget("userFollow")}
      >
        <i>
          {" "}
          <HiUser />{" "}
        </i>
        <p> {follow.length} </p>
        <p>Follow</p>{" "}
      </section>

      <section
        className="IconAndText___Content"
        onClick={() => setTarget("userFollowers")}
      >
        <i>
          {" "}
          <HiUserGroup />{" "}
        </i>
        <p>{followers.length}</p>
        <p>Followers</p>
      </section>
    </article>
  );
};
