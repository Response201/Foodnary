import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PageNotFound } from "./pages/PageNotFound";
import { Activate } from "./pages/Activate";
/* styles */

import { SignInOrUp } from "./pages/SignInOrUp";
import { Profile } from "./pages/Profile";
import { ResetPassword } from "./pages/ResetPassword";
import { ChangePassword } from "./pages/ChangePassword";
import { CreateRecipes } from "./pages/CreateRecipes";
import { UserProfile } from "./pages/UserProfile";
import {OneRecipe} from './pages/OneRecipe'
import Homeprofile from "./pages/Home___profile";
import { Insparation } from "./pages/Insparation";

export const PageRoutes = () => {
  return (
    <>
      <Routes>
       
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/home" element={<Homeprofile/>}></Route>
        <Route exact path="/signin" element={<SignInOrUp />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/user" element={<UserProfile />}></Route>
        <Route exact path="/recipe" element={< OneRecipe />}></Route>
        <Route exact path="/activate/:token" element={<Activate />}></Route>
        <Route exact path="/reset" element={<ResetPassword />}></Route>
        <Route exact path="/change" element={<ChangePassword />}></Route>
        <Route exact path="/insparation" element={<Insparation />}></Route>
        <Route exact path="/create" element={<CreateRecipes />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
};

export default PageRoutes;
