import React, { useEffect } from "react";
import ReactFlow, { MiniMap, Background } from "reactflow";
import Button from "react-bootstrap/Button";
import "reactflow/dist/style.css";
import "./index.css";
import {
  faSquarePlus,
  faCirclePlus,
  faXmark,
  faTrashCan,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
// import { Button } from 'react-bootstrap';
function Maincontent({
  checkFlowName,
  onEdgesDelete,
  onNodesDelete,
  Closebutton,
  HandleContinue,
  saveFlow,
  flowName,
  Closebtn,
  handleFlowNameChange,
  savebtn,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDrop,
  onDragOver,
  onNodeClick,
  popupwarning,
  setReactFlowInstance,
  selectedNodeData,
  isValidConnection,
  onEdgeUpdate,
  pages,
  // setPages,
  // pagesData,
  // setPagesData,
  // setNodes,
  // setEdges,
  AddPage,
  handlePages,
  pagesData,
  removePage,
  addPageButton,
  onNodeDoubleClick,
  pageRef,
  currentPage,
  editPagePopup,
  setEditPagePopup,
  handlePageName,
  setEditablePage,
  editablePage,
  addPageName
}) {
  // const handlePages = (page) => {
  //   // if (page === "Main") {
  //   setNodes(pagesData[page]["NodesData"]);
  //   setEdges(pagesData[page]["EdgesData"]);
  //   // }
  //   console.log("page clicked :: ", page)
  // }
  const handleRightClick = (e) => {
    e.preventDefault()
    console.log("right clicked");

  }
  return (
    <>
      {flowName && <div className="currProject">{flowName}</div>}
      <div className={addPageButton ? "main-content-initital" : "main-content"}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          isValidConnection={isValidConnection}
          onNodeDoubleClick={onNodeDoubleClick}
          onDragOver={onDragOver}
          // onEdgeUpdate={onEdgeUpdate}
          onNodeClick={onNodeClick}
          fitView
          onInit={setReactFlowInstance}
          panOnScroll={true}
          proOptions={{ hideAttribution: true }}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
        >
          <Background color="#aaa" gap={15} />

          {savebtn && !popupwarning && (
            <div className="SavePopup">
              <span className="btns">
                <div className="FlownamePopup">Project Name:</div>
                <div>
                  <input
                    type="text"
                    value={flowName}
                    onChange={handleFlowNameChange}
                    className="InputPOPup"
                    placeholder="Enter the flow name"
                  />
                </div>
                <div className="PopupButtons">
                  <Button className="SaveClosebtn" onClick={Closebutton}>
                    Close
                  </Button>
                  <Button onClick={checkFlowName} className="saveflowpopup">
                    Save Flow
                  </Button>
                </div>
              </span>
            </div>
          )}

          {editPagePopup && (
            <div className="SavePopup">
              <span className="btns">
                <div className="FlownamePopup">Page Name:</div>
                <div>
                  <input
                    type="text"
                    value={editablePage}
                    onChange={handlePageName}
                    className="InputPOPup"
                    placeholder="Enter the flow name"
                  />
                </div>
                <div className="PopupButtons">
                  <Button className="SaveClosebtn" onClick={() => setEditPagePopup(false)}>
                    Close
                  </Button>
                  <Button onClick={addPageName} className="saveflowpopup">
                    Save Page
                  </Button>
                </div>
              </span>
            </div>
          )}

          {popupwarning && (
            <>
              <div className="SavePopups">
                <div className="ImportantNotice">IMPORTANT NOTICE:</div>
                <p className="Warningmessage">
                  {" "}
                  You have not saved the flow. If you want to continue without
                  saving, click on Continue. The flow will not be saved.
                </p>
                <div className="PopupButtonss">
                  <Button className="SaveClosebtn" onClick={(Closebtn)}>
                    Close
                  </Button>
                  <Button onClick={HandleContinue} className="saveflowpopup">
                    Continue
                  </Button>
                </div>
              </div>
            </>
          )}
        </ReactFlow>
      </div>
      {pages.length > 0 &&
        <div className="pageBoxList">
          {/* <div className={flowName ? "PageBox-active" : ""}>{flowName}</div> */}
          {
            pages.map((page) => {
              return <div ref={(e) => (pageRef.current[page] = e)} className={page === currentPage ? "PageBox-active" : "PageBox"} onContextMenu={(e) => handleRightClick(e)} onClick={() => handlePages(page)}>
                <span style={{
                  overflow: "hidden", whiteSpace: "nowrap",
                  textOverflow: "ellipsis"
                }}>{page}</span>
                {/* <i class="fa fa-times" aria-hidden="true" onClick={() => removePage(page)}></i> */}
                {/* <FontAwesomeIcon icon={faXmark}  /> */}
                <FontAwesomeIcon icon={faEdit} className="editPage" onClick={() => { currentPage = page; setEditablePage(page); setEditPagePopup(true) }} />
                <FontAwesomeIcon icon={faTrashCan} className="closePage" onClick={(event) => removePage(event, page)} />
              </div>
            })
          }
          {addPageButton &&
            // <FontAwesomeIcon icon={faSquarePlus} onClick={AddPage} />
            <button className="addPage" onClick={AddPage}>+</button>
            // <FontAwesomeIcon className="addPage" icon={faCirclePlus} onClick={AddPage} />
          }
        </div >
      }
    </>
  );
}
export default Maincontent;
