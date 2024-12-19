import React from 'react'

const Card = ({title,val}) => {
  return (
    <>
<div class="card">
<div class="card__content">
    <div className='flex flex-col justify-center items-center h-full'>
    <h1 className='text-white'>{title}</h1>
    <span className='text-white'>{val}</span>
    </div>
</div>
</div>
<style>{`/* From Uiverse.io by adamgiebl */ 
.card {
  width: 190px;
  height: 254px;
  border-radius: 20px;
  padding: 5px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
}

.card__content {
  background: rgb(5, 6, 45);
  border-radius: 17px;
  width: 100%;
  height: 100%;
}`}</style>
    </>
  )
}

export default Card