import React, { useEffect } from 'react'
import {CreateOrChange} from '../components/CreateOrChange'
import './CreateRecipes.scss'
import '../index.css'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export const CreateRecipes = () => {

  const token = useSelector((store) => store.user.token);
  const showCropper = useSelector((store) => store.ui.showCropper);
  
 
  const navigate = useNavigate()
   
   useEffect(() => {
    if (token) {
      navigate("/create");
    } else {
      navigate("/signin");
    }
  }, [token, navigate]);
 
  

  return (
    <article className="create___container"> 
  <section className="createRecipes___container">
    <section className={showCropper ?'createRecipes___content_crooper' : 'createRecipes___content'} >


<CreateOrChange  />

    </section>
    </section>
    </article>
  )
}
