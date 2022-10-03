import React from 'react'
import './RecipeLayout.scss'

export const RecipeLayout = ({item}) => {
  return (
    <div key={item._id} className='recipe___content'>
<h2> {item.title} </h2>

<section> {item.ingredients.map(item => { return( <div key={item._id}> <p>{item.amount}</p> <p>{item.measure}</p> <p>{item.ingredient}</p>    </div>   ) })} </section>
<p> {item.description} </p>
<p> {item.mainCategory} </p>
<p> {item.subCatergory} </p>
<p> {item.hearts} </p>
<p> {item.username} </p>
              </div>
              
  )
}