import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { MiniMap } from "reactflow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function ElementConfiguration({
  httpMethod,
  setHTTPMethod,
  url,
  setURL,
  apiResponse,
  setApiResponse,
  setAudioFile,
  audioFile,
  menuAudioFile,
  setMenuAudioFile,
  setEdges,
  setLastData,
  lastData,
  setEndValue,
  setStartValue,
  setChannel,
  method,
  setMethod,
  appModifier,
  generateId,
  startValue,
  endValue,
  operation,
  Setoperation,
  setAppModifier,
  setId,
  id,
  assign,
  Setassign,
  handleSaveMenuNode,
  SetAudionode,
  setconcat,
  concat,
  selectedNodeData,
  showPopup,
  setShowPopup,
  nodes,
  setNodes,
  popupHeight,
  sessiondata,
  setSessionData,
  initialPopup,
  Setinitialpopup,
  currNode,
  SetMenunode,
  setValue,
  value,
  setSelectedOption,
  selectedOption,
  setMenuSelectedOption,
  menuselectedOption,
  setTextToSay,
  textToSay,
  menuOption,
  Menunode,
  SetDecision,
  Setsessionkey,
  sessionkey,
  sessionvalue,
  Setsessionvalue,
  Decision,
  setMenuOption,
}) {
  const methods = [
    "slice",
    "substr",
    "replace",
    "toUpperCase",
    "toLowerCase",
    "concat",
    "assign",
  ];

  console.log("menuAudioFile", menuAudioFile.name);

  const handleSave = () => {
    if (!id.trim() || !value.trim()) {
      toast.error("ID and Name are required fields.");
      return;
    }

    if (Menunode && !menuOption) {
      toast.error("Select Menu Option.");
      return;
    }

    if (selectedNodeData) {
      const { type } = selectedNodeData.data;

      if (type === "Menu" && !menuAudioFile && !textToSay) {
        toast.error("Please upload an audio file or enter text to speech.");
        return;
      }

      if (type === "Audio" && !audioFile && !textToSay) {
        toast.error("Please upload an audio file or enter text to speech.");
        return;
      }

      if (type === "Decision") {
        if (!sessionkey) {
          toast.error("Please enter the session key.");
          return;
        }
        if (!operation) {
          toast.error("Please select the operation to perform.");
          return;
        }
        if (!sessionvalue) {
          toast.error("Please enter the session value.");
          return;
        }
      }

      if (type === "Application Modifier") {
        if (!sessiondata) {
          toast.error("Please enter the session data.");
          return;
        }
        if (!method) {
          toast.error("Please select the operation to perform.");
          return;
        }
        if (method === "slice") {
          if (!startValue) {
            toast.error("Please enter the start index.");
            return;
          }
          if (!endValue) {
            toast.error("Please enter the end index.");
            return;
          }
        }
        if (method === "replace") {
          if (!startValue) {
            toast.error("Please enter the string to replace field.");
            return;
          }
          if (!endValue) {
            toast.error("Please enter the replace string field.");
            return;
          }
        }
        if (method === "concat" && !concat) {
          toast.error("Please enter the string to concat field.");
          return;
        }
        if (method === "split" && !concat) {
          toast.error("Please enter the String to Split field.");
          return;
        }
        if (method === "assign" && !assign) {
          toast.error("Please enter the value to assign field.");
          return;
        }
      }
    }

    handleSaveMenuNode();
  };

  console.log("sessionkey ::", sessionkey);
  console.log("sessionvalue ::", sessionvalue);
  useEffect(() => {
    if (selectedNodeData) {
      setId(selectedNodeData.id);
      setValue(selectedNodeData.data.label);
      console.log("selected node in elements config ", selectedNodeData);
      switch (selectedNodeData.data.type) {
        case "Disconnect":
          SetMenunode(false);
          SetAudionode(false);
          setAppModifier(false);
          SetDecision(false);
          break;
        case "Menu":
          SetMenunode(true);
          SetAudionode(false);
          setAppModifier(false);
          SetDecision(false);
          break;
        case "Play Prompt":
          SetMenunode(false);
          SetAudionode(true);
          setAppModifier(false);
          SetDecision(false);
          break;
        case "Session Variable":
          SetMenunode(false);
          SetAudionode(false);
          setAppModifier(true);
          SetDecision(false);
          break;
        case "Decision":
          SetMenunode(false);
          SetAudionode(false);
          SetDecision(true);
          setAppModifier(false);
          break;
        default:
          SetMenunode(false);
          SetAudionode(false);
          setAppModifier(false);
          SetDecision(false);
          break;
      }
    }
  }, [selectedNodeData]);

  // console.log(
  //   "selectedNodeData in elemenets configuration ::",
  //   selectedNodeData.data
  // );

  useEffect(() => {
    if (!menuOption) return;

    const numNodes = parseInt(menuOption, 10);
    if (isNaN(numNodes)) return;

    const childNodes = nodes.filter((n) => n.parentId === currNode.id);
    let updatedNodes = [...nodes];

    if (childNodes.length > 2) {
      if (numNodes < childNodes.length - 2) {
        const slicedChildNodes = childNodes.slice(
          numNodes,
          childNodes.length - 2
        );
        for (let i = 0; i < Object.keys(slicedChildNodes).length; i++) {
          setEdges((edges) =>
            edges.filter((edge) => edge.source !== slicedChildNodes[i].id)
          );
        }
        updatedNodes = nodes
          .filter((node) => node.parentId !== currNode.id)
          .concat(childNodes.slice(0, numNodes + 2));
        setLastData((prevNodes) => {
          return prevNodes.map((node) => {
            // console.log("currNode in map :: ", currNode.id);
            if (node.source === currNode.id) {
              const updatedOptions =
                node.hasOwnProperty("optionsTarget") && node?.optionsTarget
                  ? Object.fromEntries(
                    Object.entries(node.optionsTarget).filter(
                      ([key, value]) => key <= numNodes
                    )
                  )
                  : {};
              const updatedNode = {
                ...node,
                optionsTarget: updatedOptions,
              };
              return updatedNode;
            } else {
              return node;
            }
          });
        });
      } else if (numNodes > childNodes.length - 2) {
        const diff = numNodes - (childNodes.length - 2);
        let lastChildId = Number(((childNodes[childNodes.length - 1].id).replace("c", "")).split("")[1]);
        const lastChild_Y_Pos = (childNodes[childNodes.length - 1].position).y;
        console.log("lastchil id :: ", lastChildId);
        const newNodes = Array.from({ length: diff }, (_, index) => ({
          id: generateId(currNode.id, lastChildId + index),
          type: "input",
          position: {
            x: 34,
            y: lastChild_Y_Pos + (index + 1) * 15,
          },
          data: { label: lastChildId - 2 + (index + 1) },
          extent: "parent",
          parentId: currNode.id,
          sourcePosition: "right",
          style: {
            width: 15,
            height: 20,
            padding: "6px 0px",
            border: "none",
            fontSize: "8px",
          },
          draggable: false,
        }));

        updatedNodes.push(...newNodes);
      }
    } else {
      const newNodes = Array.from({ length: numNodes }, (_, index) => ({
        id: generateId(currNode.id, index + 2),
        type: "input",
        position: {
          x: 34,
          y: index === 0 ? 45 : 45 + index * 15,
        },
        data: { label: `${index + 1}` },
        extent: "parent",
        parentId: currNode.id,
        sourcePosition: "right",
        style: {
          width: 15,
          height: 20,
          padding: "6px 0px",
          border: "none",
          fontSize: "8px",
        },
        draggable: false,
      }));

      updatedNodes.push(...newNodes);
    }

    setNodes(
      updatedNodes.map((eachNode) => {
        if (eachNode.id === currNode.id) {
          const baseHeight = 100;
          const additionalHeight = 15;
          const heights = Array.from(
            { length: 8 },
            (_, index) => baseHeight + (index - 1) * additionalHeight
          );
          return {
            ...eachNode,
            style: {
              ...eachNode.style,
              width: 50,
              padding: 5,
              height: heights[menuOption - 2],
            },
          };
        }
        return eachNode;
      })
    );
  }, [menuOption]);

  const Handleclosepopup = () => {
    setShowPopup(false);
    Setinitialpopup(true);
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log("updated value in input ::", newValue);
    setValue(newValue);

    const updatedNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            ...node.data,
            label: newValue,
          },
        };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const options = ["Voice", "Chat"];
  const DecisionOptions = [
    "Equal to",
    "Greater than",
    "Less than",
    "Not equal to",
    "Greater than or equal to",
    "Less than or equal to",
  ];
  const numbers = ["2", "3", "4", "5", "6", "7", "8", "9"];
  // const defaultOption = options[0];
  // const defaultnumber = numbers[0];

  return (
    <>
      <ToastContainer className="Toastcontainer" />
      {initialPopup && (
        <div className="Initialpopup">No Configurable Elements Selected.</div>
      )}
      {showPopup && selectedNodeData && (
        <div className="popup" style={{ height: popupHeight }}>
          <div className="popup-content">
            <h3 className="Selectednode">
              Properties of {selectedNodeData.data.label}
            </h3>
            {/* <div className="Nodename">NODE ID</div>
            <input
              className="Inputbox"
              type="text"
              name="myInput"
              value={id}
              placeholder="node id"
              onChange={(e) => setId(e.target.value)}
            /> */}
            <div className="Nodename">NODE NAME</div>
            <input
              className="Inputbox"
              type="text"
              name="myInput"
              placeholder="Enter the node name"
              value={value}
              onChange={handleChange}
            />
            {selectedNodeData.data.type === "Play Prompt" && (
              <div>
                <div className="Radiobtn">
                  <label className="TTSRadioBtn">
                    <input
                      type="radio"
                      value="tts"
                      checked={selectedOption === "tts"}
                      onChange={() => setSelectedOption("tts")}
                    />
                    TTS
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="prompt"
                      checked={selectedOption === "prompt"}
                      onChange={() => setSelectedOption("prompt")}
                    />
                    Prompt
                  </label>
                </div>
                {selectedOption === "tts" && (
                  <div>
                    <div className="Texttosay">TEXT TO Speech</div>
                    <input
                      className="TexttosayInputbox"
                      type="text"
                      name="myInput"
                      placeholder="Enter the text to speech"
                      value={textToSay}
                      onChange={(e) => setTextToSay(e.target.value)}
                    />
                  </div>
                )}
                {selectedOption === "prompt" && (
                  <div>
                    <div className="Texttosay">Upload Audio File</div>
                    <input
                      className="AudioUploadInput"
                      type="file"
                      accept=".mp3,.wav"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setAudioFile(file);
                        console.log("Selected audio file:", file);
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {Menunode && (
              <>
                <div>
                  <div>
                    <div className="Radiobtn">
                      <label className="TTSRadioBtn">
                        <input
                          type="radio"
                          value="TTS"
                          checked={menuselectedOption === "TTS"}
                          onChange={() => setMenuSelectedOption("TTS")}
                        />
                        TTS
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="PROMPT"
                          checked={menuselectedOption === "PROMPT"}
                          onChange={() => setMenuSelectedOption("PROMPT")}
                        />
                        Prompt
                      </label>
                    </div>
                  </div>
                  {menuselectedOption === "TTS" && (
                    <div>
                      <div className="Texttosay">TEXT TO SAY</div>
                      <div className="Texttosay">Initial</div>
                      <input
                        className="TexttosayInputbox"
                        type="text"
                        name="myInput"
                        placeholder="Enter the Initial TTS"
                        onChange={(e) => setTextToSay(e.target.value)}
                      />
                      <div className="Texttosay">NoInput</div>
                      <input
                        className="TexttosayInputbox"
                        type="text"
                        name="myInput"
                        placeholder="Enter the NoInput TTS"
                        onChange={(e) => setTextToSay(e.target.value)}
                      />
                      <div className="Texttosay">NoMatch</div>
                      <input
                        className="TexttosayInputbox"
                        type="text"
                        name="myInput"
                        placeholder="Enter the NoMatch TTS"
                        onChange={(e) => setTextToSay(e.target.value)}
                      />
                    </div>
                  )}
                  {menuselectedOption === "PROMPT" && (
                    <div>
                      <div className="Texttosay">Audio File</div>
                      <div className="Texttosay">Initial Audio File</div>
                      <input
                        className="AudioUploadInput"
                        type="file"
                        accept=".mp3,.wav"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setMenuAudioFile(file);
                          console.log("Selected audio file:", file);
                        }}
                      />
                      <div className="Texttosay">NoInput Audio File</div>
                      <input
                        className="AudioUploadInput"
                        type="file"
                        accept=".mp3,.wav"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setMenuAudioFile(file);
                          console.log("Selected audio file:", file);
                        }}
                      />
                      <div className="Texttosay">NoMatch Audio File</div>
                      <input
                        className="AudioUploadInput"
                        type="file"
                        accept=".mp3,.wav"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setMenuAudioFile(file);
                          console.log("Selected audio file:", file);
                        }}
                      />
                    </div>
                  )}
                  <div className="Texttosay">MENU OPTIONS</div>
                  <Dropdown
                    className="ChannelDropdown"
                    options={numbers}
                    placeholder="Select an option"
                    onChange={(e) => setMenuOption(e.value)}
                  />
                  <div className="Texttosay">Maxtries</div>
                  <input
                    className="TexttosayInputbox"
                    type="Number"
                    min={0}
                    name="myInput"
                    placeholder="Enter the NoMatch TTS"
                    onChange={(e) => setTextToSay(e.target.value)}
                  />
                </div>
                {/* <div className="Texttosay">Channel</div>
                      <Dropdown
                          className="ChannelDropdown"
                          options={options}
                          value={defaultOption}
                          placeholder="Select an option"
                          onChange={(e) => setChannel(e.value)}
                      /> */}
              </>
            )}
            {Decision && (
              <div>
                <div className="Texttosay">SESSION KEY</div>
                <input
                  className="TexttosayInputbox"
                  type="text"
                  name="myInput"
                  placeholder="Enter the Session key"
                  onChange={(e) => Setsessionkey(e.target.value)}
                />
                <div className="Texttosay">Operation to perform</div>
                <Dropdown
                  className="ChannelDropdown"
                  options={DecisionOptions}
                  placeholder="Select an option"
                  onChange={(e) => Setoperation(e.value)}
                />
                <div className="Texttosay">Value</div>
                <input
                  className="TexttosayInputbox"
                  type="text"
                  name="myInput"
                  placeholder="Enter the Value"
                  onChange={(e) => Setsessionvalue(e.target.value)}
                />
              </div>
            )}
            {appModifier && (
              <>
                <div>
                  <div className="Texttosay">Session data to modify</div>
                  <input
                    className="TexttosayInputbox"
                    type="text"
                    name="myInput"
                    placeholder="Enter the session data"
                    onChange={(e) => setSessionData(e.target.value)}
                  />
                  <div className="Texttosay">Operation to perform</div>
                  <Dropdown
                    className="ChannelDropdown"
                    options={methods}
                    placeholder="Select an option"
                    onChange={(e) => setMethod(e.value)}
                  />
                </div>
                {(method === "slice" ||
                  method === "substr" ||
                  method === "replace") && (
                    <>
                      <div className="Texttosay">
                        {method === "replace"
                          ? "String to replace"
                          : "Start Index"}
                      </div>
                      <input
                        className="TexttosayInputbox"
                        type={method === "replace" ? "text" : "number"}
                        name="myInput"
                        required
                        placeholder={
                          method === "replace"
                            ? "Enter String to Replace"
                            : "Enter Start Index"
                        }
                        onChange={(e) => setStartValue(e.target.value)}
                      />
                      <div className="Texttosay">
                        {method === "replace" ? "Replace String" : "End Index"}
                      </div>
                      <input
                        className="TexttosayInputbox"
                        type={method === "replace" ? "text" : "number"}
                        name="myInput"
                        placeholder={
                          method === "replace"
                            ? "String to Replace with"
                            : "Enter End Index"
                        }
                        onChange={(e) => setEndValue(e.target.value)}
                      />
                    </>
                  )}
                {method === "assign" && (
                  <>
                    {/* <div className="Texttosay">Enter the Value to assign</div> */}
                    <input
                      className="TexttosayInputbox"
                      type="text"
                      name="myInput"
                      placeholder={
                        method === "assign" ? "Enter the value to assign" : ""
                      }
                      onChange={(e) => Setassign(e.target.value)}
                    />
                  </>
                )}
                {method === "concat" && (
                  <>
                    <input
                      className="TexttosayInputbox"
                      type="text"
                      name="myInput"
                      placeholder={"Enter String to Concat"}
                      onChange={(e) => setconcat(e.target.value)}
                    />
                  </>
                )}
              </>
            )}
            {selectedNodeData.data.type === 'Webhook' &&
              (
                <>
                  <div className="Texttosay">URL</div>
                  <input
                    className="TexttosayInputbox"
                    type="text"
                    name="myInput"
                    placeholder={"Enter the complete URL"}
                    onChange={(e) => setURL(e.target.value)}
                  />
                  <div className="Texttosay">HTTP Method</div>
                  <Dropdown
                    className="ChannelDropdown"
                    options={["GET", "POST"]}
                    placeholder="Select a method"
                    onChange={(e) => setHTTPMethod(e.value)}
                  />
                  <div className="Texttosay">Store Response</div>
                  <input
                    className="TexttosayInputbox"
                    type="text"
                    name="myInput"
                    placeholder={"Enter the variable to store response"}
                    onChange={(e) => setApiResponse(e.target.value)}
                  />
                </>
              )

            }
          </div>
          <div className="btns">
            <button className="savebtn" onClick={handleSave}>
              Save
            </button>
            <button className="Closebtn" onClick={Handleclosepopup}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* <MiniMap
        className="Minimap"
        nodeColor={(node) => (node.type === "input" ? "#6ede87" : "#ff0072")}
        nodeStrokeWidth={3}
        zoomable
        pannable
      /> */}
    </>
  );
}

export default ElementConfiguration;
