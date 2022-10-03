import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { recipes } from "../reducers/recipes";
import { HiPencil } from "react-icons/hi";


const GetChangeRecipe = ({data}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const role = useSelector((store) => store.user.role);
  const user = useSelector((store) => store.user.username);
  const token = useSelector((store) => store.user.token);

  

  const onClick = () => {
    if (token || role === "admin") {
      dispatch(recipes.actions.setTitle(`${data.title}`));

      dispatch(recipes.actions.setDescription(data.description));

      dispatch(recipes.actions.setIngredients([...data.ingredients]));

      dispatch(recipes.actions.setMainCategory(data.mainCategory));

      dispatch(recipes.actions.setSubCatergory(data.subCatergory));

      dispatch(recipes.actions.setId(data._id));

      dispatch(recipes.actions.setHeader("Change recipe"));

      dispatch(recipes.actions.setImage(data.image));

      navigate("/create");
    } else {
      dispatch(
        recipes.actions.setMessage("you need to log in to change the recipe")
      );
    }
  };



  return (<div > 
    {user === data.username || role === "admin" ? (
      <i className="icon_pencil" onClick={onClick} style={{marginLeft:'15px'}}>
        {" "}
        <HiPencil />{" "}
      </i>
    ) : (
      ""
    )}
    </div>
  )
}

export default GetChangeRecipe