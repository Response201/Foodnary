import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import cherry from "../assets/cherryTest.png";
import { useSelector, useDispatch } from "react-redux";

import { ui } from "../reducers/ui";

import { Search } from "./Search";
import { Switch } from "./Switch";
export const Navbar = () => {
  const accessToken = useSelector((store) => store.user.token);
  const veri = useSelector((store) => store.user.verified);
  const dispatch = useDispatch();

  const onClickPath = () => {
    dispatch(ui.actions.setPath("profile"));
    dispatch(ui.actions.setSignInOrUp(false));
  };

  return (
    <article className="navbarContainer">
      {accessToken && veri ? (
        <>
          <Link className="nav_a link_hoover" to="/home">
            <section className="nav_image_container">
              <img className="nav_img" src={cherry} alt="logo" />
            </section>
          </Link>
          <ul className="nav_ul">
            <li className="nav_li">
              <Search />
            </li>
            <li className="nav_li link_hoover">
              <Link className="nav_a"  to="/insparation">
              Insparation
              </Link>
              </li>

            <li className="nav_li link_hoover">
              <Link onClick={onClickPath} className="nav_a" to="/profile">
                profile
              </Link>
            </li>
            <Switch />
          </ul>{" "}
        </>
      ) : (
        <>
          <Link className="nav_a link_hoover" to="/">
            <section className="nav_image_container">
              <img className="nav_img" src={cherry} alt="logo" />
            </section>
          </Link>
          <ul className="nav_ul">
            <li className="nav_li">
              <Search />
            </li>
            <li className="nav_li link_hoover">
              <Link className="nav_a"  to="/insparation">
              Insparation
              </Link>
              </li>

            <li className="nav_li link_hoover">
              <Link className="nav_a" onClick={onClickPath} to="/signin">
                Log in
              </Link>
            </li>
            <Switch />
          </ul>
        </>
      )}
    </article>
  );
};
