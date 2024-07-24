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
} from "@fortawesome/free-solid-svg-icons";
function Elements({ onDragStart }) {
  // console.log("onDragStart in Elements ::",onDragStart)
  return (
    <div className="sidebar-Elements">
      <h3>Elements Panel</h3>
      <div className="ElementsAlignment">
        <div
          className="dndnode"
          onDragStart={(event) =>
            onDragStart(event, { nodeLabel: "Start", nodeType: "input" })
          }
          draggable
        >
          <FontAwesomeIcon className="StartIcon" icon={faHouseSignal} />Start
          {/* <button className="saveflowpopup">Start</button> */}
        </div>
        <div
          className="dndnode"
          onDragStart={(event) =>
            onDragStart(event, { nodeLabel: "Menu", nodeType: "output" })
          }
          draggable
        >
          <FontAwesomeIcon className="MenuIcon" icon={faBars} /> Menu
          {/* <button className="saveflowpopup">Menu</button> */}
        </div>
        <div
          className="dndnode"
          onDragStart={(event) =>
            onDragStart(event, { nodeLabel: "Play Prompt", nodeType: "default" })
          }
          draggable
        >
          <FontAwesomeIcon className="AudioIcon" icon={faFileAudio} /> Play Prompt
        </div>
        <div
          className="dndnode"
          onDragStart={(event) =>
            onDragStart(event, {
              nodeLabel: "Session Variable",
              nodeType: "default",
            })
          }
          draggable
        >
          <FontAwesomeIcon className="HangupIcon" icon={faEdit} /> Session Variable
        </div>
        <div
          className="dndnode"
          onDragStart={(event) =>
            onDragStart(event, { nodeLabel: "Decision", nodeType: "output" })
          }
          draggable
        >
          <FontAwesomeIcon className="Decision" icon={faDiamond} /> Condition
        </div>

        <div
          className="dndnode"
          onDragStart={(event) =>
            onDragStart(event, { nodeLabel: "Webhook", nodeType: "Webhook" })
          }
          draggable
        >
          <FontAwesomeIcon className="Webhook" icon={faCircleNodes} />
          Webhook
        </div>
        <div
          className="dndnode"
          onDragStart={(event) =>
            onDragStart(event, { nodeLabel: "Disconnect", nodeType: "output" })
          }
          draggable
        >
          <FontAwesomeIcon className="HangupIcon" icon={faPhone} /> Disconnect
        </div>
      </div>
    </div>
  );
}

export default Elements;
