import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseSignal,
  faBars,
  faFileAudio,
  faPhone,
  faDiamond,
  faCircleNodes,
  faEdit,
  faSignIn,
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
function Elements({ onDragStart, isProjectSaved }) {
  // console.log("onDragStart in Elements ::",onDragStart)
  return (
    <div className="sidebar-Elements">
      <div className="Project">
        <h3>Elements Panel</h3>
      </div>
      <div className="ElementsAlignment">
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, { nodeLabel: "Start", nodeType: "input" })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="StartIcon" icon={faHouseSignal} />
          Start
          {/* <button className="saveflowpopup">Start</button> */}
        </div>
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, { nodeLabel: "Menu", nodeType: "output" })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="MenuIcon" icon={faBars} /> Menu
          {/* <button className="saveflowpopup">Menu</button> */}
        </div>
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, {
              nodeLabel: "Play Prompt",
              nodeType: "default",
            })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="AudioIcon" icon={faFileAudio} /> Play
          Prompt
        </div>
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, {
              nodeLabel: "Session Variable",
              nodeType: "default",
            })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="HangupIcon" icon={faEdit} /> Session
          Variable
        </div>
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, { nodeLabel: "Decision", nodeType: "output" })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="Decision" icon={faDiamond} /> Condition
        </div>

        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, { nodeLabel: "Webhook", nodeType: "default" })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="Webhook" icon={faCircleNodes} />
          Webhook
        </div>
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, { nodeLabel: "Entry", nodeType: "input" })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="pageConnectors" icon={faSignIn} />
          Entry
        </div>
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, { nodeLabel: "Exit", nodeType: "output" })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="pageConnectors" icon={faSignOut} />
          Exit
        </div>
        <div
          className={`dndnode ${!isProjectSaved ? "disabled" : ""}`}
          onDragStart={(event) =>
            isProjectSaved &&
            onDragStart(event, { nodeLabel: "Disconnect", nodeType: "output" })
          }
          draggable={isProjectSaved}
        >
          <FontAwesomeIcon className="HangupIcon" icon={faPhone} /> Disconnect
        </div>
      </div>
    </div>
  );
}

export default Elements;
