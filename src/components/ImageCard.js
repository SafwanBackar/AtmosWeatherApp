import React from 'react'

function ImageCard({imageSrc}) {
  return (
        <div className="relative rounded fade-in-image">
            <img src={imageSrc} width='250' style={{height: '200px'}} alt="Hanging Planters" className="w-full rounded-md"/>
        </div>
  )
}

export default ImageCard