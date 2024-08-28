import React, { useEffect, useState } from "react";
import "./index.css";
import Button from "react-bootstrap/Button";

function Navigator({
  handleRetrieve,
  storeNodeDetails,
  isProjectSaved,
  projectList,
  Popupsave,
  activeProject,
  saveFlow,
  isDraftSaved,
  DeployFlow,
  flowName,
}) {
  return (
    <>
      <div className="sidebar-Navigator">
        <div className="Project">
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
        </div>
        <div className="Projects">
          <ul>
            {projectList?.map((project) => (
              <li
                key={project}
                className={`ProjectList ${activeProject === project ? "active" : ""
                  }`}
                onMouseOver={(e) => e.currentTarget.classList.add("hover")}
                onMouseOut={(e) => e.currentTarget.classList.remove("hover")}
                onDoubleClick={() => handleRetrieve(project)}
              >
                {project}
              </li>
            ))}
          </ul>
        </div>
        {/* <button className='Savebtn' onClick={saveFlow}>SAVE</button> */}

        <div className="Projectbtns">
          <Button
            variant="success"
            className={`saveflowpopup ${!isProjectSaved ? "disabled" : ""}`}
            onClick={() => {
              if (isProjectSaved) {
                storeNodeDetails();
              }
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
