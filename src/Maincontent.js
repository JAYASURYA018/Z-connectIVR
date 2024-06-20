import React, { useEffect } from 'react';
import ReactFlow, { MiniMap, Background } from 'reactflow';
import Button from 'react-bootstrap/Button';
import 'reactflow/dist/style.css';
import "./index.css"
import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
function Maincontent({Closebutton,saveFlow,flowName, handleFlowNameChange,savebtn,nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, setReactFlowInstance, selectedNodeData, isValidConnection, onEdgeUpdate }) {
  return (
    <div className="main-content">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        isValidConnection={isValidConnection}
        onDragOver={onDragOver}
        onEdgeUpdate={onEdgeUpdate}
        onNodeClick={onNodeClick}
        fitView
        onInit={setReactFlowInstance}
        panOnScroll={true}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#aaa" gap={15} />    

        { savebtn && (
      <div className='SavePopup'> 
      <span className='btns'>
      <div className='FlownamePopup'>Flow Name:</div>
      <div><input type="text" value={flowName} onChange={handleFlowNameChange} className="InputPOPup" placeholder="Enter the flow name"/></div>
      <div className='PopupButtons'>
      <Button className="SaveClosebtn" onClick={Closebutton} >Close</Button>
      <Button onClick={saveFlow}  className='saveflowpopup'>Save Flow</Button>
      </div>
            </span>
      </div>
    )}
      </ReactFlow>
      
    </div>
  );
}
export default Maincontent;
