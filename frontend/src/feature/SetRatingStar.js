import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import { recipes } from "../reducers/recipes";

import "./setRatingStar.scss";
export const SetRatingStar = () => {
  const recipeId = useSelector((store) => store.recipes.id);
  const [first, setfirst] = useState(0);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  useFetchRecipe({ url });

  const onClickRating = (e) => {
  
    setfirst(e.target.value);
     setUrl("");
  };

  useEffect(() => {
    setfirst(0);
    setUrl("");
  }, []);

 

  useEffect(() => {
    if (first !== 0 && first !== undefined) {
      setUrl(`${process.env.REACT_APP_URL}/${recipeId}/ratingRecipe`);
      dispatch(recipes.actions.setRating(first));
    }
  }, [first, dispatch, recipeId]);

  return (
    <div class="ratingControl">
      <input
        id="score100"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="5"
        onClick={onClickRating}
      />
      <label
        for="score100"
        class="ratingControl__star"
        title="Five Stars"
      ></label>
      <input
        id="score90"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="4.5"
        onClick={onClickRating}
      />
      <label
        for="score90"
        class="ratingControl__star"
        title="Four & Half Stars"
      ></label>
      <input
        id="score80"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="4"
        onClick={onClickRating}
      />
      <label
        for="score80"
        class="ratingControl__star"
        title="Four Stars"
      ></label>
      <input
        id="score70"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="3.5"
        onClick={onClickRating}
      />
      <label
        for="score70"
        class="ratingControl__star"
        title="Three & Half Stars"
      ></label>
      <input
        id="score60"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="3"
        onClick={onClickRating}
      />
      <label
        for="score60"
        class="ratingControl__star"
        title="Three Stars"
      ></label>
      <input
        id="score50"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="2.5"
        onClick={onClickRating}
      />
      <label
        for="score50"
        class="ratingControl__star"
        title="Two & Half Stars"
      ></label>
      <input
        id="score40"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="2"
        onClick={onClickRating}
      />
      <label
        for="score40"
        class="ratingControl__star"
        title="Two Stars"
      ></label>
      <input
        id="score30"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="1.5"
        onClick={onClickRating}
      />
      <label
        for="score30"
        class="ratingControl__star"
        title="One & Half Star"
      ></label>
      <input
        id="score20"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="1"
        onClick={onClickRating}
      />
      <label for="score20" class="ratingControl__star" title="One Star"></label>
      <input
        id="score10"
        class="ratingControl__radio"
        type="radio"
        name="rating"
        value="0.5"
        onClick={onClickRating}
      />
      <label
        for="score10"
        class="ratingControl__star"
        title="Half Star"
      ></label>
    </div>
  );
};
