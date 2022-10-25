import React, { useState, useEffect } from "react";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import {
  HiOutlinePlusSm,
  HiOutlineMinusSm,
  HiOutlineTrash
} from "react-icons/hi";
import "./CreateOrChange.scss";
import { useDispatch, useSelector } from "react-redux";
import { recipes } from "../reducers/recipes";
import { useNavigate } from "react-router";
import { ImageInput } from "../feature/ImageInput";
import defaultImgRecip from "../assets/image/annie-spratt-R3LcfTvcGWY-unsplash.jpg";
/*eslint-disable */
export const CreateOrChange = () => {
  const [url, setUrl] = useState("");
  const { data } = useFetchRecipe({ url });
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState("Main category");
  const [subCategory, setSubCategory] = useState("Sub category");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getTitle = useSelector((store) => store.recipes.title);
  const getDescription = useSelector((store) => store.recipes.description);
  const getMainCategory = useSelector((store) => store.recipes.mainCategory);
  const getSubCategory = useSelector((store) => store.recipes.subCatergory);
  const getIngredients = useSelector((store) => store.recipes.ingredients);
  const getHeader = useSelector((store) => store.recipes.header);
  const recipeId = useSelector((store) => store.recipes.id);
  const getimage = useSelector((store) => store.recipes.image);
  const errormessage = useSelector((store) => store.ui.message);

  const [newImage, setnewImage] = useState("");
  const [next, setNext] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    setTitle(getTitle);
    setDescription(getDescription);
    setMainCategory(getMainCategory);
    setSubCategory(getSubCategory);
    setInputList(getIngredients);
  }, [getHeader]);

  const [inputList, setInputList] = useState([
    {
      id: Date.now(),
      amount: "",
      measure: "",
      ingredient: ""
    }
  ]);

  useEffect(() => {
    dispatch(recipes.actions.setTitle(title));

    dispatch(recipes.actions.setDescription(description));

    dispatch(recipes.actions.setIngredients(inputList));

    dispatch(recipes.actions.setMainCategory(mainCategory));

    dispatch(recipes.actions.setSubCatergory(subCategory));
  }, [title, description, inputList, mainCategory, subCategory, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      title === "" ||
      title === "Title" ||
      description === "" ||
      description === "Description"
    ) {
    } else {
      if (getHeader === "Create recipe" && next) {
        setUrl(`${process.env.REACT_APP_URL}/createRecipe`);
        dispatch(recipes.actions.setUploadFile(true));
        dispatch(recipes.actions.setUploadFile(false));
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      } else if (getHeader === "Create recipe" && !next) {
        dispatch(recipes.actions.setImage(defaultImgRecip));
        setUrl(`${process.env.REACT_APP_URL}/createRecipe`);
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      } else if (getHeader === "Change recipe" && !next) {
        setUrl(`${process.env.REACT_APP_URL}/${recipeId}/changeRecipe`);
        setTimeout(() => {
          navigate("/profile");
        }, 5000);
      } else if (getHeader === "Change recipe" && next) {
        dispatch(recipes.actions.setUploadFile(true));
        setSubmit(true);
      }
    }
  };

  useEffect(() => {
    if (next && recipeId && submit && newImage) {
      setSubmit(false);
      setUrl(`${process.env.REACT_APP_URL}/${recipeId}/changeRecipe`);
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }, [next, setnewImage, getimage, recipeId, submit, errormessage]);

  /* remove text if its same as x 'name' */

  const ChangeText = (e) => {
    if (e.target.value === "Title") {
      setTitle("");
    } else if (e.target.value === "Description") {
      setDescription("");
    }
  };

  /*handel delete recipe  */

  const onClickDelete = () => {
    setUrl(`${process.env.REACT_APP_URL}/${recipeId}/deleteRecipe`);
    setTimeout(() => {
      navigate("/profile");
    }, 3000);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { value, name } = e.target;
    const list = [...inputList];
    const newArr = list.map((object) => {
      if (object.id === list[index].id) {
        // 👇️ change value of name property
        return { ...object, [name]: value };
      }
      return object;
    });

    setInputList([...newArr]);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { id: Date.now(), amount: "", measure: "", ingredient: "" }
    ]);
  };

  return (
    <>
      <form className="createRecipes___form">
        <section className="createRecipes___header_container">
          <h2>{getHeader}</h2>{" "}
          {getHeader === "Change recipe" ? (
            <i onClick={onClickDelete} className="createRecipes___icon">
              {" "}
              <HiOutlineTrash />{" "}
            </i>
          ) : (
            ""
          )}
        </section>

        <section className="createRecipes___inputContainer">
          <ImageInput setNext={setNext} setnewImage={setnewImage} />

          <section className="createRecipes___error_container">
            {errormessage.includes("Error!") ? (
              <section className="btnText_password_verification___container">
                <div>
                  <span>
                    <div className="text">{errormessage}</div>
                  </span>
                </div>
              </section>
            ) : (
              ""
            )}
          </section>
          <input
            required
            type="text"
            maxLength={20}
            placeholder={title !== "" ? title : "Set a title"}
            value={title}
            onClick={(e) => ChangeText(e)}
            onChange={(e) => setTitle(e.target.value.toLocaleLowerCase())}
          />
          <textarea
            className="description_input"
            required
            type="text"
            maxLength={1500}
            placeholder={description !== "" ? title : "Set a description"}
            value={description}
            onClick={(e) => ChangeText(e)}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="description_counter_container">
            <p className="description_counter">
              {description === "Description" ? 0 : description.length}/1500
            </p>
          </div>
          <div>
            <p className="ingredients_p">Ingredients</p>

            <div className="addInputs">
              {inputList.map((x, i) => {
                return (
                  <div className="ingredients" key={x.id}>
                    <input
                      name="amount"
                      placeholder="Amount"
                      value={x.amount}
                      onChange={(e) => handleInputChange(e, i)}
                      className="measure"
                    />

                    <select
                      type="text"
                      name="measure"
                      className="measure"
                      value={x.measure}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      {x.measure === "" ? <option> Measure </option> : ""}
                      <option value="kg">kg</option>
                      <option value="dl">dl</option>
                      <option value="ms">matsked</option>
                      <option value="ts">tesked</option>
                      <option value="ts">st</option>
                    </select>
                    <input
                      type="text"
                      name="ingredient"
                      placeholder="Ingredient"
                      value={x.ingredient}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <div className="AddOrRemove">
                      {inputList.length !== 1 && (
                        <i onClick={() => handleRemoveClick(i)}>
                          {" "}
                          <HiOutlineMinusSm />{" "}
                        </i>
                      )}
                      {inputList.length <= 11 &&
                      x.amount !== "" &&
                      x.measure !== "" &&
                      x.ingredient !== "" &&
                      inputList.length - 1 === i ? (
                        <i onClick={handleAddClick}>
                          <HiOutlinePlusSm />
                        </i>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <select
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            placeholder={mainCategory}
          >
            <option>{mainCategory}</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            placeholder={subCategory}
          >
            {mainCategory === "Main category" ? (
              <option>Select main category first</option>
            ) : (
              ""
            )}

            {mainCategory === "Breakfast" ? (
              <>
                {" "}
                <option value="Sandwich">Sandwich</option>
                <option value="Eggs">Eggs</option>
                <option value="Smoothies">Smoothies</option>
                <option value="Others">Others</option>
              </>
            ) : (
              ""
            )}
            {mainCategory === "Dinner" ? (
              <>
                {" "}
                <option value="Steak">Steak</option>
                <option value="Chicken">Chicken</option>
                <option value="Fish/Seafood">Fish/Seafood</option>
                <option value="Vegetarian/Vegan">Vegetarian/Vegan</option>
                <option value="Salad">Salad</option>
                <option value="Side dishes">Side dishes</option>
                <option value="Others">Others</option>
              </>
            ) : (
              ""
            )}
            {mainCategory === "Dessert" ? (
              <>
                <option value="Chocolate">Chocolate</option>
                <option value="Cupcakes">Cupcakes</option>
                <option value="Others">Others</option>
              </>
            ) : (
              ""
            )}
            {mainCategory === "Other" ? (
              <>
                 <option value="Snacks">Snacks</option>
                <option value="Other">Other</option>
              </>
            ) : (
              ""
            )}
          </select>
        </section>

        <section className="createRecipes___btn_form_message">
          <section>
            {data ? (
              <section className="btnText_password_verification___container">
                <div>
                  <span>
                    <div className="text">
                      {" "}
                      {getHeader === "Create recipe"
                        ? "Recipe created"
                        : data.message}
                    </div>
                  </span>
                </div>
              </section>
            ) : (
              ""
            )}
          </section>

          <button className="general_button" type="submit" onClick={onSubmit}>
            {getHeader}
          </button>
        </section>
      </form>
    </>
  );
};
