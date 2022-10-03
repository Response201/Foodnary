import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { recipes } from "../reducers/recipes";
import "./search.scss";

export const Search = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [search, setSearch] = useState();
  const [output, setOutput] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/allRecipes`)
      .then((response) => response.json())
      .then((data) => setAllRecipes(data));
  }, []);

  useEffect(() => {
    setOutput([]);
    if (search !== "") {
      allRecipes.filter((e) => {
        if (
          e.mainCategory.toLowerCase().includes(search.toLowerCase()) ||
          e.subCatergory.toLowerCase().includes(search.toLowerCase()) ||
          e.title.toLowerCase().includes(search.toLowerCase())
        ) {
          setOutput((output) => [...output, e]);
        }
      });
    }
  }, [search]);

  /* to recepie */

  function onClicktoRecipe(e) {
    dispatch(recipes.actions.setId(e));
    setOutput([]);
    setSearch("");
    navigate("/recipe");
  }

  return (
    <div class="flexbox">
      <div class="search">
        <div>
          <input
            type="text"
            placeholder="Search . . ."
            value={search}
            required
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="output___result">
        {output.map((item) => (
          <div key={item._id}>
            <p
              className="output___p"
              onClick={() => {
                onClicktoRecipe(item._id);
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
