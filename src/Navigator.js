import React, { useEffect, useState } from "react";
import "./index.css";
import Button from "react-bootstrap/Button";

function Navigator({ handleRetrieve, storeNodeDetails, projectList, Popupsave, saveFlow, isDraftSaved, DeployFlow, flowName }) {

  return (
    <>
      <div className="sidebar-Navigator">
        <h3>Project Explorer</h3>
        <div>
          <Button
            variant="success"
            className="saveflowpopup"
            onClick={Popupsave}
          >
            New Project
          </Button>
        </div>
        <div className="Projects">
          {
            projectList.map((project) => {
              return <div onClick={() => handleRetrieve(project)}>{project}</div>
            })
          }
        </div>
        {/* <button className='Savebtn' onClick={saveFlow}>SAVE</button> */}

        <div className="Projectbtns">
          <Button
            variant="success"
            className="saveflowpopup"
            onClick={() => {
              storeNodeDetails(); 
            }}
          >
            Save Draft
          </Button>
          <Button
            variant="success"
            disabled={!isDraftSaved}
            onClick={DeployFlow}
            className="Deploybtn"
          >
            Deploy
          </Button>
        </div>
      </div>
    </>
  );
}

export default Navigator;
