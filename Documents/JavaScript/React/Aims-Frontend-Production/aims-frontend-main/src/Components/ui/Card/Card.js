import React from 'react'

const Card = ({title,val}) => {
  return (
    <>
<div class="card ">
    <div class="title">
     
            <img className='w-4 h-4 ' src='./calendarIcon.png'  />
        <p class="!text-white title-text ">
            {title}
        </p>
    </div>
    <div class="data ">
        <p className='!text-white' >
            {val} 
        </p>
        
    </div>
</div>
<style>{`
/* From Uiverse.io by Yaya12085 */ 
.card {
  padding: 1rem;
  background-color: #1e293b;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  height:120px;
  width:16%;
  border-radius: 10px;
} 
  @media screen and (max-width: 1280px) {
    .card{  
    width:97%;
    margin-top:10px; 
    margin-bottom:10px; 
    margin-left:auto; 
    margin-right:auto;
    }
} 
      @media screen and (max-width: 768px) {
    .card{  
    width:95vw; 
  \
    } 
}



.title {
  display: flex;
  align-items: center;
}

.title span {
  position: relative;
  padding: 0.5rem;
  background-color: #10B981;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
}

.title span svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  height: 1rem;
}

.title-text {
  margin-left: 0.5rem;
  color: #374151;
  font-size: 18px;
}

.percent {
  margin-left: 0.5rem;
  color: #02972f;
  font-weight: 600;
  display: flex;
}

.data {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.data p {
  margin-top: 1rem;
  margin-bottom: 1rem; 
  margin:0 , 0 , 3px ,3px;
  color: #1F2937;
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  text-align: left;
}

.data .range {
  position: relative;
  background-color: #E5E7EB;
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
}

.data .range .fill {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #10B981;
  width: 76%;
  height: 100%;
  border-radius: 0.25rem;
}
`}</style>
    </>
  )
}

export default Card