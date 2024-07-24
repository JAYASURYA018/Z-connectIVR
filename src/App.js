import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  removeElements,
  useEdgesState,
  updateEdge,
  useStoreApi,
} from "reactflow";
import axios from "axios";
import "reactflow/dist/style.css";
import Navigator from "./Navigator";
import Elements from "./Elements";
import Maincontent from "./Maincontent";
import ElementConfiguration from "./ElementConfigiration";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

let id = 1;
const getId = () => `${id++}`;

const generateId = (parentId, childId) => {
  let newChildId = childId + 1;
  let result = parentId.toString() + newChildId.toString();
  return "c" + result;
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [channel, setChannel] = useState("");
  const [Audionode, SetAudionode] = useState(false);
  const [value, setValue] = useState("");
  const [textToSay, setTextToSay] = useState("");
  const [operation, Setoperation] = useState("");
  const [nodeDetails, setNodeDetails] = useState({});
  const [sessiondata, setSessionData] = useState("");
  const [audioName, setAudioname] = useState();
  const [concat, setconcat] = useState("");
  const [selectedOption, setSelectedOption] = useState("tts");
  const [menuselectedOption, setMenuSelectedOption] = useState("TTS");
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
  const ApplicationModifierCounter = useRef(1);
  const DecisionCounter = useRef(1);
  const menuCounter = useRef(1);
  const hangupCounter = useRef(1);
  const audioCounter = useRef(1);
  const [sessionkey, Setsessionkey] = useState("");
  const [sessionvalue, Setsessionvalue] = useState("");
  const [method, setMethod] = useState("");
  const [flowName, setFlowName] = useState("");
  const [savebtn, setSaveBtn] = useState(false);
  // const [sourceId, setSourceId] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [url, setURL] = useState(null)
  const [httpMethod, setHTTPMethod] = useState(null)
  const [audioFile, setAudioFile] = useState(null);
  const [id, setId] = useState("");
  const nodeLabelRef = useRef("");
  const [menuAudioFile, setMenuAudioFile] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [lastData, setLastData] = useState([
    {
      source: "1",
      nodeType: "Start",
      sourceLabel: "Start",
    },
  ]);
  // console.log("Node details inside onconnect ::", nodeDetails);

  // console.log("audioName outside function ::", audioName);
  // console.log("Decision ::", Decision);


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
                : ((sourceNode.id.replace("c", "")).substring(sourceNode.id.length, sourceNode.parentId.length) - 2)
              return node.source === sourceNode.parentId
                ? {
                  ...node,
                  optionsTarget: {
                    ...node.optionsTarget,
                    [optionNum]: targetNode.data.label,
                  },
                }
                : node;
            }
          } else {

            return node.source === sourceNode.id
              ? { ...node, target: targetNode.data.label }
              : node;
          }
        })
      );
      const sourceNodeId = sourceNode.hasOwnProperty("parentId")
        ? sourceNode.parentId
        : params.source;

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
          return addEdge(edge, prevEdges)
        });

        return prevDetails;
      });

      return prevNodes;
    });
    console.log("edges in onconnect :: ", edges)
  }, []);

  useEffect(() => {
    console.log("last data :: ", lastData);
  }, [lastData]);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      console.log("old connection :: ", oldEdge);
      console.log("new connection :: ", newConnection);
      setEdges((els) => updateEdge(oldEdge, newConnection, els))
    },
    [setEdges]
  );

  const Savebtn = () => {
    console.log("Inside save btn");
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeProps = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      console.log("nodeProps.nodeLabel", nodeProps.nodeLabel);
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
          data: { label: `Condition-${DecisionCounter.current++}`, type: "Decision" },
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
      } else if (nodeProps.nodeLabel === "Menu") {
        const newNode = {
          id: getId(),
          type: nodeProps.nodeType,
          position,
          data: { label: `Menu-${menuCounter.current++}`, type: nodeProps.nodeLabel },
          style: {
            width: 50,
            height: 55,
            padding: 5,
            fontSize: "8px",
          },
        };
        setNodes((nds) => nds.concat(newNode));
        var newChildNodes = Array.from({ length: 2 }, (_, index) => ({
          id: generateId(newNode.id, index),
          type: "input",
          position: {
            x: 30,
            y: index === 0 ? 15 : 15 + index * 15,
          },
          data: { label: index === 0 ? "NI" : "NM" },
          extent: "parent",
          parentId: newNode.id,
          sourcePosition: "right",
          style: {
            width: 19,
            height: 20,
            padding: "6px 0px",
            border: "none",
            fontSize: "8px",
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
      } else if (nodeProps.nodeLabel === "Start") {
        var nodeData;
        setNodes((prevNodes) => nodeData = prevNodes)
        const startNode = nodeData.filter((node) => node.data.type === 'Start');
        if (startNode.length > 0) {
          toast.error(
            `Start node already exists.`
          );
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
          setNodes((nds) => nds.concat(newNode));
        }

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
        console.log("nodeProps.nodeLabel", nodeProps.nodeLabel);
        console.log("newNode before dropped ::", newNode);
        if (nodeProps.nodeLabel === "Play Prompt") {
          newNode.data.label = `Play Prompt-${audioCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Disconnect") {
          newNode.data.label = `Disconnect-${hangupCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Session Variable") {
          newNode.data.label = `Session Variable-${ApplicationModifierCounter.current++}`;
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

  const Popupsave = async () => {
    setSaveBtn(true);
  };

  const handleRetrieve = async (flowName) => {
    console.log("click working :: ", flowName)
    try {
      const checkResponse = await fetch(
        "http://localhost:5000/retrieve_flow_data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ flowName }),
        }
      );

      const checkData = await checkResponse.json();
      console.log("check data :: ", checkData)
      if (Object.keys(checkData).length > 0) {
        // toast.error(
        //   `${flowName} name already exists. Please choose another name.`
        // );
        console.log("Response from retrieve api :: ", checkData);
        console.log("data :: ", JSON.parse(checkData).find((val, key) => val.hasOwnProperty('NodesData')))
        const retrievedData = JSON.parse(checkData).find((val, key) => val.hasOwnProperty('NodesData'));
        setLastData(JSON.parse(checkData));
        setNodes(retrievedData.NodesData);
        setEdges(retrievedData.EdgesData);
        menuCounter.current = retrievedData.Counters.menuCounter;
        audioCounter.current = retrievedData.Counters.PlayPromptCounter;
        hangupCounter.current = retrievedData.Counters.disconnectCounter;
        ApplicationModifierCounter.current = retrievedData.Counters.sessionVariableCounter;
        return;
      } else {
        setNodes([
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
        ])
        menuCounter.current = 1;
        audioCounter.current = 1;
        hangupCounter.current = 1;
        ApplicationModifierCounter.current = 1;
      }
    } catch (error) {
      console.error("Error retrieve flow name:", error);
      toast.error("Failed to retrieve flow data.");
      return;
    }
  }

  const checkFlowName = async () => {
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
      } else {
        setNodes([
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
        ])
        setProjectList((prevData) => [
          ...prevData,
          flowName
        ]);
        menuCounter.current = 1;
        audioCounter.current = 1;
        hangupCounter.current = 1;
        ApplicationModifierCounter.current = 1;
      }
    } catch (error) {
      console.error("Error checking flow name:", error);
      toast.error("Failed to check flow name. Please try again.");
      return;
    }
  }
  useEffect(() => {
    console.log("edges check :: ", edges);
    console.log("Nodes check :: ", nodes)
  })
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0].File;
    console.log("Selected audio file ===> 123:", file); // Log selected file
    setMenuAudioFile(file);
  };
  const handleSaveMenuNode = async (e) => {
    const formData = new FormData();

    // Append audio file to formData if it exists
    if (menuAudioFile) {
      formData.append("audioFile", menuAudioFile);
    }

    // Prepare the structured data payload
    const newRequestBody = {
      id,
      Menuname: value,
      TexttoSay: textToSay,
      menuoptions: menuOption,
      Channel: channel,
      initialAudio: menuAudioFile
        ? {
          Audioname: menuAudioFile.name,
          Audio: menuAudioFile,
        }
        : null,
    };

    // Append the JSON stringified version of newRequestBody to formData
    formData.append("RequestBodyforMenu", JSON.stringify(newRequestBody));

    // Log each entry in formData for debugging
    for (let pair of formData.entries()) {
      console.log("Form data entry:", pair[0], pair[1]);
    }

    console.log("FormData before submission:", formData);

    setLastData((prevNodes) => {
      return prevNodes.map((node) => {
        console.log("node.nodetype in app.js", node.nodeType);
        if (node.nodeType === "Menu") {
          return node.source === id
            ? { ...node, popupDetails: newRequestBody }
            : node;
        } else if (node.nodeType === "Play Prompt") {
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
        } else if (node.nodeType === "Session Variable") {
          console.log("Inside application modifier in app.js");
          console.log("node source in Applcaition  :", node.source);
          console.log("id in Application :", id);
          return node.source === id
            ? {
              ...node,
              popupDetails: {
                id,
                SessionData: sessiondata,
                Operation: method,
                StartIndex: startValue,
                EndIndex: endValue,
                Concat: concat,
                Assign: assign,
              },
            }
            : node;
        } else if (node.nodeType === "Webhook") {
          return node.source === id
            ? {
              ...node,
              popupDetails: {
                id,
                apiResponse: apiResponse,
                url: url,
                httpMethod: httpMethod
              }
            } : node
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
      const response = await axios.post(
        "http://localhost:5000/Menunode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("API Response", response.data);
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
      } else {
        console.error(`Error saving ${value}`, response.data);
        toast.error(`Error saving ${value} details`);
      }
    } catch (error) {
      console.error("Error saving flow and JavaScript code:", error);
      toast.error("Error saving flow and JavaScript code");
    }
  };

  const storeNodeDetails = () => {
    console.log("edges in storeNode details :: ", edges)
    setLastData((prevData) => {
      const index = prevData.findIndex(item => item.NodesData !== undefined);
      console.log("prevdata in the store nodedetails :: ", prevData);
      console.log("menu counter :: ", menuCounter);
      console.log("audio counter :: ", audioCounter);
      const data = index !== -1
        ? prevData.map((item, i) => i === index ? { NodesData: nodes, EdgesData: edges, Counters: { menuCounter: menuCounter.current, disconnectCounter: hangupCounter.current, PlayPromptCounter: audioCounter.current, sessionVariableCounter: ApplicationModifierCounter.current } } : item)
        : [...prevData, { NodesData: nodes, EdgesData: edges, Counters: { menuCounter: menuCounter.current, disconnectCounter: hangupCounter.current, PlayPromptCounter: audioCounter.current, sessionVariableCounter: ApplicationModifierCounter.current } }];
      saveFlow(data);
      return data
    })
  }

  const saveFlow = async (data) => {
    setSaveBtn(false);

    // try {
    //   const checkResponse = await fetch(
    //     "http://localhost:5000/check-flow-name",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ flowName }),
    //     }
    //   );

    //   const checkData = await checkResponse.json();
    //   if (checkResponse.ok && checkData.exists) {
    //     toast.error(
    //       `${flowName} name already exists. Please choose another name.`
    //     );
    //     return;
    //   }
    // } catch (error) {
    //   console.error("Error checking flow name:", error);
    //   toast.error("Failed to check flow name. Please try again.");
    //   return;
    // }
    console.log("Before sending to API last data ::", lastData);
    console.log("Before sending to API data ::", data);
    try {
      const response = await fetch("http://localhost:5000/save-flow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowName,
          lastData: data,
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
      setLastData((prevData) =>
        prevData.filter((node) => node.source !== deleted[0].id)
      );
      console.log("on node delete :: ", deleted);
    },
    [nodes, edges]
  );

  const onEdgesDelete = useCallback(
    (edges) => {
      console.log("nodes in edge delete :: ", nodes);
      // nodes.map((node) => {

      //   console.log("nodes map edge delete :: ", node);
      // })
      const deletedEdgeSource = nodes.find((node) => node.id === edges[0].source)
      console.log("on edge delete :: ", edges);
      console.log("deletedEdgeSource :: ", deletedEdgeSource);

      edges?.map((edge) => {
        const deletedEdgeSource = nodes.find((node) => node.id === edge.source)
        if (deletedEdgeSource.parentId) {
          const label = deletedEdgeSource.data.label;
          setLastData(prevData =>
            prevData.map(node => {
              if (node.source === deletedEdgeSource.parentId) {
                const { [label]: _, ...updatedDecisionTarget } = node.nodeType === 'Menu' ? node.optionsTarget : node.decisionTarget;
                return node.nodeType === 'Menu' ? { ...node, optionsTarget: updatedDecisionTarget } : { ...node, decisionTarget: updatedDecisionTarget };
              }
              return node;
            })
          );
        } else {
          setLastData(prevData =>
            prevData.map(node => {
              return node.source === deletedEdgeSource.id ? { ...node, target: "" } : node;
            })
          );
        }
      })
      // console.log("deletedEdgeSource :: ", deletedEdgeSource);
    },
    [edges]
  );

  return (
    <ReactFlowProvider>
      <div className="grid-container">
        <div className="sidebar-container">
          <Navigator
            savebtn={savebtn}
            Popupsave={Popupsave}
            storeNodeDetails={storeNodeDetails}
            handleRetrieve={handleRetrieve}
            saveFlow={saveFlow}
            isDraftSaved={isDraftSaved}
            projectList={projectList}
            DeployFlow={DeployFlow}
            setIsDraftSaved={setIsDraftSaved}
            flowName={flowName}
          />
          <Elements onDragStart={onDragStart} />
        </div>
        <div className="main-content-wrapper" ref={reactFlowWrapper}>
          <Maincontent
            checkFlowName={checkFlowName}
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
          httpMethod={httpMethod}
          setHTTPMethod={setHTTPMethod}
          url={url}
          setURL={setURL}
          apiResponse={apiResponse}
          setApiResponse={setApiResponse}
          selectedNodeData={selectedNodeData}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          nodes={nodes}
          currNode={currNode}
          SetDecision={SetDecision}
          Decision={Decision}
          setId={setId}
          handleFileChange={handleFileChange}
          lastData={lastData}
          setLastData={setLastData}
          setAppModifier={setAppModifier}
          setMenuAudioFile={setMenuAudioFile}
          menuAudioFile={menuAudioFile}
          setMenuSelectedOption={setMenuSelectedOption}
          menuselectedOption={menuselectedOption}
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
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
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
