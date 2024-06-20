import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseSignal,faBars ,faFileAudio,faPhone,faDiamond,faEdit} from '@fortawesome/free-solid-svg-icons';
function Elements({ onDragStart }) {
    // console.log("onDragStart in Elements ::",onDragStart)
  return (
    <div className="sidebar-Elements">
        
      <h3>Elements</h3>
      <div className='ElementsAlignment'>
    <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, { nodeLabel: 'Start', nodeType: 'input' })}
        draggable
      >
        <FontAwesomeIcon className='StartIcon' icon={faHouseSignal} /> {" "}Start Node
      </div>
     <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, { nodeLabel: 'Menu', nodeType: 'output' })}
        draggable
      >
        <FontAwesomeIcon className='MenuIcon' icon={faBars} />  Menu Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, { nodeLabel: 'Audio', nodeType: 'default' })}
        draggable
      >
    <FontAwesomeIcon className = "AudioIcon" icon={faFileAudio} /> {" "} Audio Node
      </div>
      <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, { nodeLabel: 'Application Modifier', nodeType: 'default' })}
          draggable
        >
          <FontAwesomeIcon className='HangupIcon' icon={faEdit} /> Application Modifier
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, { nodeLabel: 'Decision', nodeType: 'output' })}
          draggable
        >
          <FontAwesomeIcon className='Decision' icon={faDiamond} />  Decision Node
        </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, { nodeLabel: 'Hangup', nodeType: 'output' })}
        draggable
      >
       <FontAwesomeIcon className='HangupIcon' icon={faPhone} /> Hangup Node
      </div>
    
    </div>
    </div>
  );
}

export default Elements;
