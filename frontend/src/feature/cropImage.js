

 /*eslint-disable */
 function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

export const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })


export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')


  
    canvas.width = 500
      canvas.height = 281
  
      ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          canvas.width,
          canvas.height
      )
  
  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {

       const reader = new FileReader();
      reader.readAsDataURL(file);
      resolve(file)
     
    }, 'image/jpeg')
    
  })
 
} 
