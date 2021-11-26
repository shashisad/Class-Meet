import React from 'react'
import './Error.css';
const Error = () => {
    return (
        <>
          <div id="background"></div>
<div className="top">
  <h1 className="h1">404</h1>
  <h3 className="h3">page not found</h3>
</div>
<div className="container">
  <div className="ghostcopy">
    <div className="one"></div>
    <div className="two"></div>
    <div className="three"></div>
    <div className="four"></div>
  </div>
  <div className="ghost">
    <div className="face">
      <div className="eye"></div>
      <div className="eyeright"></div>
      <div className="mouth"></div>
    </div>
  </div>
  <div className="shadow"></div>
</div>
<div className="bottom">
  <h3 className="p">Boo, looks like a ghost stole this page!</h3>
 
  <div className="buttons">
  <a href='/' >  <button className="btn">Home</button> </a>
   
  </div>
</div>


       </>
    )
}

export default Error