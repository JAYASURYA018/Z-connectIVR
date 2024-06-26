import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  updateEdge,
  useStoreApi,
} from "reactflow";
import "reactflow/dist/style.css";
import Navigator from "./Navigator";
import Elements from "./Elements";
import Maincontent from "./Maincontent";
import ElementConfiguration from "./ElementConfigiration";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

let id = 0;
const getId = () => `${id++}`;

const generateId = (parentId, childId) => {
  let newChildId = childId + 1;
  let result = parentId.toString() + newChildId.toString();
  return result;
};

const initialNodes = [
  {
    id: getId(),
    type: "input",
    data: { label: "Start", type: "Start" },
    position: { x: 250, y: 5 },
    style: {
      width: 50,
      padding: 5,
      fontSize: "8px",
    },
  },
];

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [channel, setChannel] = useState("");
  const [Audionode, SetAudionode] = useState(false);
  const [value, setValue] = useState("");
  const [textToSay, setTextToSay] = useState("");
  const [operation, Setoperation] = useState("");
  const [nodeDetails, setNodeDetails] = useState({});
  const [sessiondata, setSessionData] = useState("");
  const [audioName, setAudioname] = useState();
  const [concat, setconcat] = useState("");
  // const [nodeLabel, setNodeLabel] = useState('');
  // const[RequestBodyforMenu,setRequestBodyforMenu]=useState("")
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [appModifier, setAppModifier] = useState(false);
  const [menuOption, setMenuOption] = useState("");
  const [Menunode, SetMenunode] = useState(false);
  const [Decision, SetDecision] = useState(false);
  const [assign, Setassign] = useState("");
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupHeight, setPopupHeight] = useState("");
  const [initialPopup, Setinitialpopup] = useState(true);
  const [currNode, setCurrNode] = useState({});
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const menuCounter = useRef(1);
  const hangupCounter = useRef(1);
  const audioCounter = useRef(1);
  const [sessionkey, Setsessionkey] = useState("");
  const [sessionvalue, Setsessionvalue] = useState("");
  const [method, setMethod] = useState("");
  const [flowName, setFlowName] = useState("");
  const [savebtn, setSaveBtn] = useState(false);
  // const [sourceId, setSourceId] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [id, setId] = useState("");
  const nodeLabelRef = useRef("");
  const [menuAudioFile, setMenuAudioFile] = useState("");
  const [lastData, setLastData] = useState([
    {
      source: "0",
      nodeType: "Start",
      sourceLabel: "Start",
    },
  ]);
  console.log("Node details inside onconnect ::", nodeDetails);

  console.log("audioName outside function ::", audioName);
  console.log("Decision ::", Decision);
  const onConnect = useCallback((params) => {
    console.log("onConnect triggered with params:", params);

    setNodes((prevNodes) => {
      const sourceNode = prevNodes.find((node) => node.id === params.source);
      const targetNode = prevNodes.find((node) => node.id === params.target);
      setLastData((prevNodes) =>
        prevNodes.map((node) => {
          if (sourceNode.hasOwnProperty("parentId")) {
            if (
              sourceNode.data.label === "No" ||
              sourceNode.data.label === "Yes"
            ) {
              return node.source === sourceNode.parentId
                ? {
                  ...node,
                  decisionTarget: {
                    ...node.decisionTarget,
                    [sourceNode.data.label]: targetNode.data.label,
                  },
                }
                : node;
              // } else {
              //   const optionNum = sourceNode.id.substring(
              //     sourceNode.id.length,
              //     sourceNode.id.length - 1
              //   );
              //   return node.source === sourceNode.parentId
              //     ? {
              //         ...node,
              //         optionsTarget: {
              //           ...node.optionsTarget,
              //           [optionNum]: targetNode.data.label,
              //         },
              //       }
              //     : node;
              // }
            } else {
              var optionNum;

              optionNum = (sourceNode.data.label === "NI" || sourceNode.data.label === "NM")
                ? sourceNode.data.label
                : (sourceNode.id.substring(sourceNode.id.length, sourceNode.parentId.length) - 2)
              return node.source === sourceNode.parentId
                ? {
                  ...node,
                  optionsTarget: {
                    ...node.optionsTarget,
                    [optionNum]: targetNode.data.label
                  }
                }
                : node;
            }
          } else {
            return node.source === sourceNode.id
              ? { ...node, target: targetNode.data.label }
              : node
          }
        }
        ))
      const sourceNodeId = sourceNode.hasOwnProperty("parentId") ? sourceNode.parentId : params.source;

      console.log("sourceNodeId in onconnect :: ,", sourceNodeId);
      console.log("Source node in 83 ::", 0);

      setNodeDetails((prevDetails) => {
        const edge = {
          source: params.source,
          sourceLabel: sourceNode.data.label,
          target: params.target,
          sourceDetails: prevDetails[sourceNodeId] || {},
        };

        console.log("edge in onconnect ::", edge);

        setEdges((prevEdges) => {
          console.log("Adding edge:", edge);
          return addEdge(edge, prevEdges);
        });

        return prevDetails;
      });

      return prevNodes;
    });
  }, []);


  useEffect(() => {
    console.log("last data :: ", lastData);
  }, [lastData]);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [setEdges]
  );

  const Savebtn = () => {
    console.log("Inside save btn");
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  useEffect(() => {
    console.log("nodes menu :: ", nodes);
  }, [nodes])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeProps = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      if (!nodeProps.nodeType) {
        return;
      }
      const position = reactFlowInstance.project({
        x:
          event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });
      console.log("nodeProps.nodeType", nodeProps.nodeLabel);
      if (nodeProps.nodeLabel === "Decision") {
        const newNode = {
          id: getId(),
          type: nodeProps.nodeType,
          position,
          data: { label: nodeProps.nodeLabel, type: "Decision" },
          style: {
            width: 90,
            height: 30,
            padding: 5,
            fontSize: "8px",
            overflowWrap: "break-word",
          },
        };
        setNodes((nds) => nds.concat(newNode));
        var newChildNodes = Array.from({ length: 2 }, (_, index) => ({
          id: generateId(newNode.id, index),
          type: "input",
          position: {
            x: index === 0 ? 10 : 10 + index * 50,
            y: 10,
          },
          data: { label: index === 0 ? "Yes" : "No" },
          extent: "parent",
          parentId: newNode.id,
          sourcePosition: "bottom",
          style: {
            width: 15,
            height: 20,
            padding: "6px 6px",
            border: "none",
            fontSize: "8px",
            background: "none",
            textAlign: "left",
          },
          draggable: false,
        }));
        setNodes((nds) => nds.concat(newChildNodes));
        setLastData((prevNodes) => [
          ...prevNodes,
          {
            source: newNode.id,
            sourceLabel: newNode.data.label,
            nodeType: nodeProps.nodeLabel,
          },
        ]);
        console.log("nodes from onDrop", nodes);
      } else if (nodeProps.nodeLabel === 'Menu') {
        const newNode = {
          id: getId(),
          type: nodeProps.nodeType,
          position,
          data: { label: nodeProps.nodeLabel, type: nodeProps.nodeLabel },
          style: {
            width: 50,
            height: 55,
            padding: 5,
            fontSize: '8px'
          }
        };
        setNodes((nds) => nds.concat(newNode));
        var newChildNodes = Array.from({ length: 2 }, (_, index) => ({
          id: generateId(newNode.id, index),
          type: 'input',
          position: {
            x: 30,
            y: index === 0 ? 15 : 15 + index * 15
          },
          data: { label: index === 0 ? 'NI' : "NM" },
          extent: 'parent',
          parentId: newNode.id,
          sourcePosition: "right",
          style: {
            width: 19,
            height: 20,
            padding: '6px 0px',
            border: 'none',
            fontSize: '8px'
          },
          draggable: false,
        }));
        setNodes((nds) => nds.concat(newChildNodes));
        setLastData((prevNodes) => [
          ...prevNodes, {
            source: newNode.id,
            sourceLabel: newNode.data.label,
            nodeType: nodeProps.nodeLabel
          }
        ])
      } else {
        const newNode = {
          id: getId(),
          type: nodeProps.nodeType,
          position,
          data: { label: nodeProps.nodeLabel, type: nodeProps.nodeLabel },
          style: {
            width: 50,
            padding: 5,
            fontSize: "8px",
          },
        };

        console.log("newNode before dropped ::", newNode);
        if (nodeProps.nodeLabel === "Menu") {
          newNode.data.label = `Menu-${menuCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Audio") {
          newNode.data.label = `Audio-${audioCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Hangup") {
          newNode.data.label = `Hangup-${hangupCounter.current++}`;
        }

        setNodes((nds) => nds.concat(newNode));
        setNodeDetails((prevDetails) => ({
          ...prevDetails,
          [newNode.id]: {
            label: newNode.data.label,
            type: newNode.type,
            position: newNode.position,
          },
        }));
        nodeLabelRef.current = nodeProps.nodeLabel;
        setLastData((prevNodes) => [
          ...prevNodes,
          {
            source: newNode.id,
            sourceLabel: newNode.data.label,
            nodeType: nodeProps.nodeLabel,
          },
        ]);
      }
    },

    [reactFlowInstance, setNodes, setNodeDetails, setLastData]
  );

  // Example of updating node details when node properties change
  const updateNodeDetails = (nodeId, updatedDetails) => {
    setNodeDetails((prevDetails) => ({
      ...prevDetails,
      [nodeId]: {
        ...prevDetails[nodeId],
        ...updatedDetails,
      },
    }));
  };

  const handlePropertyChange = (nodeId, newProperties) => {
    updateNodeDetails(nodeId, newProperties);
  };

  const onNodeClick = (event, node) => {
    console.log("Node inside the onnodeclick ", node);
    setCurrNode(node);
    setSelectedNodeData(node);
    setShowPopup(true);
    Setinitialpopup(false);
  };
  console.log("Selected node type", selectedNodeData);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeType)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const isValidConnection = (connection) => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    return sourceNode.data?.label === "Audio"
      ? connection.target !== sourceNode.id
      : connection.target !== sourceNode.parentId;
  };

  useEffect(() => {
    if (!selectedNodeData) return;

    if (selectedNodeData.type === "Menu") {
      setPopupHeight("375px");
    } else if (selectedNodeData.type === "Audio") {
      setPopupHeight("314px");
    } else {
      setPopupHeight("192px");
    }
  }, [selectedNodeData]);

  const handleFlowNameChange = (e) => {
    setFlowName(e.target.value);
  };

  const Closebutton = () => {
    setSaveBtn(false);
  };

  const Popupsave = () => {
    setSaveBtn(true);
  };

  const handleSaveMenuNode = async (e) => {
    const newRequestBody = {
      id,
      Menuname: value,
      TexttoSay: textToSay,
      menuoptions: menuOption,
      Channel: channel,
      initialAudio: menuAudioFile ? menuAudioFile.name : "",
    };

    console.log("newRequestBody", newRequestBody);

    setLastData((prevNodes) => {
      return prevNodes.map((node) => {
        console.log("node.nodetype in app.js", node.nodeType);
        if (node.nodeType === "Menu") {
          return node.source === id
            ? { ...node, popupDetails: newRequestBody }
            : node;
        } else if (node.nodeType === "Audio") {
          return node.source === id
            ? {
              ...node,
              popupDetails: {
                id,
                Menuname: value,
                TexttoSay: textToSay,
                initialAudio: audioFile ? audioFile.name : "",
              },
            }
            : node;
        } else if (node.nodeType === "Decision") {
          console.log("node source in decision :", node.source);
          console.log("id in decision :", id);
          return node.source === id
            ? {
              ...node,
              popupDetails: {
                id,
                Menuname: value,
                SessionKey: sessionkey,
                Operation: operation,
                Value: sessionvalue,
              },
            }
            : node;
        } else if (node.nodeType === "Application Modifier") {
          console.log("Inside application modifier in app.js");
          console.log("node source in Applcaition  :", node.source);
          console.log("id in Application :", id);
          return node.source === id
            ? {
              ...node,
              popupDetails: {
                id,
                SessionData: sessiondata,
                Operation: operation,
                StartIndex: startValue,
                EndIndex: endValue,
                Concat: concat,
                Assign: assign,
              },
            }
            : node;
        } else {
          return node;
        }
      });
    });
    console.log("Last data in app.js ", lastData);

    setNodeDetails((prevDetails) => ({
      ...prevDetails,
      [id]: newRequestBody,
    }));

    console.log("Updated nodeDetails:", nodeDetails);

    try {
      const response = await fetch("http://localhost:5000/Menunode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RequestBodyforMenu: newRequestBody }),
      });

      if (response.ok) {
        console.log("API Response", await response.json());
        setShowPopup(false);
        Setinitialpopup(true);
        setTextToSay("");
        setMenuOption("");
        setChannel("");
        setId("");
        Setsessionkey("");
        Setsessionvalue("");
        Setoperation("");
        setEndValue("");
        setStartValue("");
        setMethod("");
        setSessionData("");
        Setassign("");
        setconcat("");
        toast.success(`Popup details of ${value} saved successfully`);
        return;
      } else {
        console.error(`Error saving ${value}`, await response.json());
        toast.success(`Error saving ${value} details`);
        return;
      }
    } catch (error) {
      console.error("Error saving flow and JavaScript code:", error);
    }
  };

  const saveFlow = async () => {
    setSaveBtn(false);
    try {
      const checkResponse = await fetch(
        "http://localhost:5000/check-flow-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flowName }),
        }
      );

      const checkData = await checkResponse.json();
      if (checkResponse.ok && checkData.exists) {
        toast.error(
          `${flowName} name already exists. Please choose another name.`
        );
        return;
      }
    } catch (error) {
      console.error("Error checking flow name:", error);
      toast.error("Failed to check flow name. Please try again.");
      return;
    }
    console.log("Before sending to API ::", lastData);
    try {
      const response = await fetch("http://localhost:5000/save-flow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowName,
          lastData,
        }),
      });
      if (flowName === "") {
        toast.error(`Failed to save workflow due to an empty value`);
        return;
      }
      console.log("Response in saveflow ::", response);
      if (response.ok) {
        setIsDraftSaved(true);
        console.log("Flow and JavaScript code saved successfully");
        toast.success(`${flowName} flow saved successfully`);
        return;
      } else if (response.status === 400) {
        const data = await response.json();
        toast.error(data.error);
        return;
      } else {
        console.error("Failed to save flow and JavaScript code");
        toast.error(`Failed to save ${flowName} flow`);
        return;
      }
    } catch (error) {
      console.error("Error saving flow and JavaScript code:", error);
    }
  };

  const DeployFlow = async () => {
    console.log("flowName in deploy function", flowName);
    if (flowName) {
      const DeployResponse = await fetch("http://localhost:5000/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flowName }),
      });

      if (DeployResponse.ok) {
        console.log("You request is sent to backend");
        toast.success(`${flowName} flow deployed successfully`);
        return;
      } else {
        console.error("Failed to save flow and JavaScript code");
        toast.error(`Failed to deploy ${flowName} flow `);
        return;
      }
    }
  };

  const onNodesDelete = useCallback(
    (deleted) => {
      setLastData((prevData) => prevData.filter((node) => node.source !== deleted[0].id));
      console.log("on node delete :: ", deleted);
    }, [nodes, edges]
  )

  const onEdgesDelete = useCallback(
    (edges) => {
      // var deletedEdgeSource;
      console.log("nodes in edge delete :: ", nodes);
      // nodes.map((node) => {

      //   console.log("nodes map edge delete :: ", node);
      // })
      const deletedEdgeSource = nodes.find((node) => node.id === edges[0].source)
      console.log("on edge delete :: ", edges);
      console.log("deletedEdgeSource :: ", deletedEdgeSource);
    }, [edges]
  )

  return (
    <ReactFlowProvider>
      <div className="grid-container">
        <div className="sidebar-container">
          <Navigator
            savebtn={savebtn}
            Popupsave={Popupsave}
            isDraftSaved={isDraftSaved}
            DeployFlow={DeployFlow}
            setIsDraftSaved={setIsDraftSaved}
          />
          <Elements onDragStart={onDragStart} />
        </div>
        <div className="main-content-wrapper" ref={reactFlowWrapper}>
          <Maincontent
            savebtn={savebtn}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            isValidConnection={isValidConnection}
            onEdgeUpdate={onEdgeUpdate}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            setReactFlowInstance={setReactFlowInstance}
            selectedNodeData={selectedNodeData}
            handleFlowNameChange={handleFlowNameChange}
            flowName={flowName}
            saveFlow={saveFlow}
            Closebutton={Closebutton}
            Popupsave={Popupsave}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
          />
        </div>

        <ElementConfiguration
          selectedNodeData={selectedNodeData}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          nodes={nodes}
          currNode={currNode}
          SetDecision={SetDecision}
          Decision={Decision}
          setId={setId}
          lastData={lastData}
          setLastData={setLastData}
          setAppModifier={setAppModifier}
          setMenuAudioFile={setMenuAudioFile}
          menuAudioFile={menuAudioFile}
          setEdges={setEdges}
          method={method}
          Setoperation={Setoperation}
          operation={operation}
          setAudioname={setAudioname}
          setAudioFile={setAudioFile}
          audioFile={audioFile}
          audioName={audioName}
          setMethod={setMethod}
          Audionode={Audionode}
          appModifier={appModifier}
          setEndValue={setEndValue}
          endValue={endValue}
          startValue={startValue}
          setStartValue={setStartValue}
          generateId={generateId}
          setNodes={setNodes}
          setChannel={setChannel}
          popupHeight={popupHeight}
          id={id}
          Setassign={Setassign}
          assign={assign}
          Setinitialpopup={Setinitialpopup}
          initialPopup={initialPopup}
          handleSaveMenuNode={handleSaveMenuNode}
          SetAudionode={SetAudionode}
          menuOption={menuOption}
          SetMenunode={SetMenunode}
          setValue={setValue}
          textToSay={textToSay}
          setTextToSay={setTextToSay}
          value={value}
          setMenuOption={setMenuOption}
          Menunode={Menunode}
          Setsessionkey={Setsessionkey}
          sessionkey={sessionkey}
          sessionvalue={sessionvalue}
          setSessionData={setSessionData}
          sessiondata={sessiondata}
          Setsessionvalue={Setsessionvalue}
          setconcat={setconcat}
          concat={concat}
        />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
