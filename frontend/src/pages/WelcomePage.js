import React from 'react'
import './welcomePage.scss'
import dinner from '../assets/video/dinner.mp4'
import food from '../assets/image/welcome.jpg'
export const WelcomePage = ({setShowWelcomePage}) => {



  return (
    
    <article className='WelcomPage__container'>
      
      
      <button className='WelcomPage__btn_close' onClick={() => setShowWelcomePage(false)}>X</button>
      <section className='WelcomPage__text_container'> 
      <section className='WelcomPage__text'> 
      
     <h1> Welcome <span className='text__to'> to </span> <span> Foodnary </span> </h1> 
     </section>
     </section>
<section className='imgTag'  />
    
      <video className='videoTag' autoPlay loop muted>
    <source src={dinner} type='video/mp4' />
</video>

      
      </article>
  )
}
