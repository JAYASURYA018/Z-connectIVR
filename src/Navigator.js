import React from 'react'
import "./index.css"
import Button from 'react-bootstrap/Button';

function Navigator({Popupsave,saveFlow,isDraftSaved,DeployFlow}) {

  return (
    <>
   
    <div className="sidebar-Navigator">
      <h3>Navigator</h3>
 
       {/* <button className='Savebtn' onClick={saveFlow}>SAVE</button> */}

       <Button  variant="success"className='saveflowpopup' onClick={Popupsave}>Save Draft</Button>
       <Button variant="success" disabled={!isDraftSaved} onClick={DeployFlow}className='Deploybtn'>Deploy</Button>
      
    

    </div>
  
    </>
  )
}

export default Navigator
