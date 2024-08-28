import React, { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Switch from "react-switch";
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
  setRequest,
  request,
  checked,
  handleChanges,
  setChecked,
  // checked,
  setAudioFile,
  maxtries,
  maxtriesAudio,
  setMaxtriesAudio,
  nomatch,
  setNomatch,
  noinput,
  setNodeDetails,
  nodeDetails,
  setMaxtries,
  setNoinput,
  audioFile,
  menuAudioFile,
  setPlayprompt,
  playprompt,
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
  setAudioNomatch,
  setAudioNoinput,
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
  setPageEntry,
  pageEntry,
  pageEntryList
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
  console.log("httpMethod", httpMethod);

  const handleSave = () => {
    if (!id.trim() || !value.trim()) {
      toast.error("ID and Name are required fields.");
      return;
    }

    if (selectedNodeData) {
      const { type } = selectedNodeData.data;

      if (type === "Menu") {
        if (menuselectedOption === "TTS" && !textToSay) {
          toast.error("Please enter the inital TTS");
          return;
        }
        if (menuselectedOption === "PROMPT" && !menuAudioFile) {
          toast.error("Please select the initial audio file");
          return;
        }
        if (!menuOption) {
          toast.error("Select Menu Option.");
          return;
        }
        if (!maxtries) {
          toast.error("Please enter the maxtries value");
          return;
        }
        if (!maxtriesAudio) {
          toast.error("Please enter the maxtriesAudio value");
          return;
        }
      }

      if (type === "Play Prompt") {
        if (selectedOption === "tts" && !playprompt) {
          toast.error("Please enter text to speech.");
          return;
        } else if (selectedOption === "prompt" && !audioFile) {
          toast.error("Please upload an audio ");
          return;
        }
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

      if (type === "Webhook") {
        if (!url) {
          toast.error("Please enter the URL.");
          return;
        }

        if (!apiResponse) {
          toast.error("Please enter the value for store response.");
          return;
        }
      }

      if (type === "Session Variable") {
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
      if (type === 'Exit') {
        if (!pageEntry) {
          toast.error("Please select the entry node.");
          return;
        }
      }
    }

    handleSaveMenuNode();
    Setinitialpopup(true);
    setShowPopup(false);
  };

  console.log("sessionkey ::", sessionkey);
  console.log("sessionvalue ::", sessionvalue);

  useEffect(() => {
    if (selectedNodeData) {
      const nodeId = selectedNodeData.id;
      console.log("Node id in useeffect ::", nodeId);
      console.log("nodeDetails[nodeId]", nodeDetails[nodeId]);
      if (!nodeDetails[nodeId]) {
        // Initialize node details for a new node
        setNodeDetails((prevDetails) => ({
          ...prevDetails,
          [nodeId]: {
            // setValue: "",
            // setTextToSay: "",
            // setNoinput: "",
            // setNomatch: "",
            // setMenuOption: "",
            // setMaxtries: "",
            // setPlayprompt: "",
            // Setsessionkey: "",
            // Setoperation: "",
            // Setsessionvalue: "",
            // setSessionData: "",
            // setMethod: "",
            // setStartValue: "",
            // setEndValue: "",
            // Setassign: "",
            // setconcat: "",
            // setURL: "",
            // setApiResponse: "",
          },
        }));
      } else {
        // Populate input fields for an existing node

        console.log("nodeDetails[nodeId]?.maxtries ", nodeDetails[nodeId]);
        setValue(nodeDetails[nodeId]?.Menuname ?? "");
        setTextToSay(nodeDetails[nodeId]?.TexttoSay ?? "");
        setNoinput(nodeDetails[nodeId]?.NoinputTTS ?? "");
        setNomatch(nodeDetails[nodeId]?.NomatchTTS ?? "");
        setMenuOption(nodeDetails[nodeId]?.menuoptions ?? "");
        setMaxtries(nodeDetails[nodeId]?.maxTries ?? "");
        setPlayprompt(nodeDetails[nodeId]?.playprompt ?? "");
        Setsessionkey(nodeDetails[nodeId]?.SessionKey ?? "");
        Setoperation(nodeDetails[nodeId]?.ConditionOperation ?? "");
        Setsessionvalue(nodeDetails[nodeId]?.Value ?? "");
        setSessionData(nodeDetails[nodeId]?.SessionData ?? "");
        setMethod(nodeDetails[nodeId]?.Operation ?? "");

        setStartValue(nodeDetails[nodeId]?.StartIndex ?? "");
        setEndValue(nodeDetails[nodeId]?.EndIndex ?? "");
        Setassign(nodeDetails[nodeId]?.Assign ?? "");
        setconcat(nodeDetails[nodeId]?.Operation ?? "");
        setURL(nodeDetails[nodeId]?.url ?? "");
        setApiResponse(nodeDetails[nodeId]?.apiResponse ?? "");
        setMaxtries(nodeDetails[nodeId]?.Maxtries ?? "");
        setMaxtriesAudio(nodeDetails[nodeId]?.MaxtriesTTS);
        setMenuAudioFile(nodeDetails[nodeId]?.menuAudioFile ?? "");
        setPageEntry(nodeDetails[nodeId]?.pageEntry ?? "");
      }
    }
  }, [selectedNodeData]);
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
        let lastChildId = Number(
          childNodes[childNodes.length - 1].id.replace("c", "").split("")[1]
        );
        const lastChild_Y_Pos = childNodes[childNodes.length - 1].position.y;
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
      <div className="RightContainer">
        <ToastContainer className="Toastcontainer" />
        {initialPopup && (
          <div className={checked ? "Initialpopup" : "RevisedInitialpopup"}>
            No Configurable Elements Selected.
          </div>
        )}
        {showPopup && selectedNodeData && (
          <div
            className={checked ? "popup" : "Revisedpopup"}
            style={{ height: popupHeight }}
          >
            <div
              className={checked ? "popup-content" : "Revisedpopup-content "}
            >
              <div className="ProjectSS">
                <div className="Selectednode">
                  Properties of {selectedNodeData.data.label}
                </div>
              </div>
              {/* <div className="Nodename">NODE ID</div>
            <input
              className="Inputbox"
              type="text"
              name="myInput"
              value={id}
              placeholder="node id"
              onChange={(e) => setId(e.target.value)}
            /> */}
              <div className="PopupdetailsContainer">
                <div className="Nodename">NODE NAME</div>
                <input
                  className="Inputbox"
                  type="text"
                  name="myInput"
                  value={value}
                  placeholder="Enter the node name"
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
                          value={playprompt || ""}
                          // value={nodeDetails[selectedNodeData.id]?.playprompt}
                          onChange={(e) => setPlayprompt(e.target.value)}
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
                            value={textToSay || ""}
                            // value={nodeDetails[selectedNodeData.id]?.TexttoSay}
                            placeholder="Enter the Initial TTS"
                            onChange={(e) => setTextToSay(e.target.value)}
                          />
                          <div className="Texttosay">NoInput</div>
                          <input
                            className="TexttosayInputbox"
                            type="text"
                            // value={nodeDetails[selectedNodeData.id]?.NoinputTTS}
                            value={noinput || ""}
                            name="myInput"
                            placeholder="Enter the NoInput TTS"
                            onChange={(e) => setNoinput(e.target.value)}
                          />
                          <div className="Texttosay">NoMatch</div>
                          <input
                            className="TexttosayInputbox"
                            type="text"
                            value={nomatch || ""}
                            // value={nodeDetails[selectedNodeData.id]?.NomatchTTS}
                            name="myInput"
                            placeholder="Enter the NoMatch TTS"
                            onChange={(e) => setNomatch(e.target.value)}
                          />
                          <div className="Texttosay">MaxTries</div>
                          <input
                            className="TexttosayInputbox"
                            type="text"
                            value={maxtriesAudio || ""}
                            // value={nodeDetails[selectedNodeData.id]?.NomatchTTS}
                            name="myInput"
                            placeholder="Enter the MaxTries TTS"
                            onChange={(e) => setMaxtriesAudio(e.target.value)}
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
                            // value={menuAudioFile?.initialAudio?.Audioname || ""}
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
                              setAudioNoinput(file);
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
                              setAudioNomatch(file);
                              console.log("Selected audio file:", file);
                            }}
                          />
                        </div>
                      )}
                      <div className="Texttosay">MENU OPTIONS</div>
                      <Dropdown
                        className="ChannelDropdown"
                        options={numbers}
                        value={menuOption || ""}
                        // value={nodeDetails[selectedNodeData.id]?.menuoptions}
                        placeholder="Select an option"
                        onChange={(e) => setMenuOption(e.value)}
                      />
                      <div className="Texttosay">Maxtries</div>
                      <input
                        className="TexttosayInputbox"
                        type="Number"
                        min={0}
                        value={maxtries || ""}
                        name="myInput"
                        // value={nodeDetails[selectedNodeData.id]?.Maxtries}
                        placeholder="Enter the maxtries value"
                        onChange={(e) => setMaxtries(e.target.value)}
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
                      value={sessionkey || ""}
                      // value={nodeDetails[selectedNodeData.id]?.sessionkey}
                      placeholder="Enter the Session key"
                      onChange={(e) => Setsessionkey(e.target.value)}
                    />
                    <div className="Texttosay">Operation to perform</div>
                    <Dropdown
                      className="ChannelDropdown"
                      options={DecisionOptions}
                      placeholder="Select an option"
                      value={operation || ""}
                      // value={nodeDetails[selectedNodeData.id]?.operation}
                      onChange={(e) => Setoperation(e.value)}
                    />
                    <div className="Texttosay">Value</div>
                    <input
                      className="TexttosayInputbox"
                      type="text"
                      name="myInput"
                      // value={nodeDetails[selectedNodeData.id]?.sessionvalue}
                      value={sessionvalue || ""}
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
                        // value={nodeDetails[selectedNodeData.id]?.sessiondata}
                        value={sessiondata || ""}
                        name="myInput"
                        placeholder="Enter the session data"
                        onChange={(e) => setSessionData(e.target.value)}
                      />
                      <div className="Texttosay">Operation to perform</div>
                      <Dropdown
                        className="ChannelDropdown"
                        options={methods}
                        value={method || ""}
                        // value={nodeDetails[selectedNodeData.id].method}
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
                            value={startValue || ""}
                            // value={nodeDetails[selectedNodeData.id]?.startValue}
                            placeholder={
                              method === "replace"
                                ? "Enter String to Replace"
                                : "Enter Start Index"
                            }
                            onChange={(e) => setStartValue(e.target.value)}
                          />
                          <div className="Texttosay">
                            {method === "replace"
                              ? "Replace String"
                              : "End Index"}
                          </div>
                          <input
                            className="TexttosayInputbox"
                            type={method === "replace" ? "text" : "number"}
                            name="myInput"
                            value={endValue}
                            // value={nodeDetails[selectedNodeData.id]?.endValue}
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
                          // value={nodeDetails[selectedNodeData.id]?.assign}
                          value={assign || ""}
                          placeholder={
                            method === "assign"
                              ? "Enter the value to assign"
                              : ""
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
                          // value={nodeDetails[selectedNodeData.id]?.concat}
                          value={concat || ""}
                          placeholder={"Enter String to Concat"}
                          onChange={(e) => setconcat(e.target.value)}
                        />
                      </>
                    )}
                  </>
                )}
                {selectedNodeData.data.type === "Webhook" && (
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
                    {httpMethod === "POST" && (
                      <>
                        <div className="Texttosay">Request body</div>
                        <input
                          className="TexttosayInputbox"
                          type="text"
                          name="myInput"
                          placeholder="Enter the request body"
                          onChange={(e) => setRequest(e.target.value)}
                        />
                      </>
                    )}
                    <div className="Texttosay">Store Response</div>
                    <input
                      className="TexttosayInputbox"
                      type="text"
                      name="myInput"
                      placeholder={"Enter the variable to store response"}
                      onChange={(e) => setApiResponse(e.target.value)}
                    />
                  </>
                )}
                {selectedNodeData.data.type === "Exit" &&
                  <>
                    <Dropdown
                      className="ChannelDropdown"
                      options={pageEntryList}
                      value={pageEntry}
                      placeholder="Select the entry node"
                      onChange={(e) => setPageEntry(e.value)}
                    />
                  </>
                }
              </div>
            </div>
            <div className={checked ? "btns" : "Revisedbtns "}>
              <button className="savebtn" onClick={handleSave}>
                Save
              </button>
              <button className="Closebtn" onClick={Handleclosepopup}>
                Close
              </button>
            </div>
          </div>
        )}
        <div className="minimapContainer">
          <div className="Checkboxcontainer">
            <div className="Checkboxminimap">
              <Switch onChange={handleChanges} checked={checked} />
            </div>
            <div className="EnablelingText">
              {checked ? (
                <span className="EnablingMinimap">Disable Minimap</span>
              ) : (
                <span className="EnablingMinimap">Enable Minimap</span>
              )}
            </div>
          </div>
        </div>
        {checked && (
          <MiniMap
            className="Minimap"
            nodeColor={(node) =>
              node.type === "input" ? "#6ede87" : "#ff0072"
            }
            nodeStrokeWidth={4}
            zoomable
            pannable
          />
        )}
      </div>
    </>
  );
}

export default ElementConfiguration;
