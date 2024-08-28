import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
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

let main_id = 0;

const getId = () => `${main_id++}`;

var currentPage;

const generateId = (parentId, childId) => {
  let newChildId = childId + 1;
  let result = parentId.toString() + newChildId.toString();
  return "c" + result;
};

const initialNodes = [];

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [channel, setChannel] = useState("");
  const [Audionode, SetAudionode] = useState(false);
  const [value, setValue] = useState("");
  const [savedraftClicked, setSavedraftClicked] = useState(false);
  const [textToSay, setTextToSay] = useState("");
  const [request, setRequest] = useState("");
  const [operation, Setoperation] = useState("");
  const [activeProject, setActiveProject] = useState(null);
  const [nodeDetails, setNodeDetails] = useState({});
  const [popupwarning, setPopupwarning] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [sessiondata, setSessionData] = useState("");
  const [httpMethod, setHTTPMethod] = useState(null);
  const [maxtries, setMaxtries] = useState();
  const [maxtriesAudio, setMaxtriesAudio] = useState();
  // const [closebtn, setClosebtn] = useState();
  const [audioName, setAudioname] = useState();
  const [popupclose, setPopupclose] = useState(false);
  const [playprompt, setPlayprompt] = useState("");
  const [nomatch, setNomatch] = useState();
  const [noinput, setNoinput] = useState();
  const [audioNoinput, setAudioNoinput] = useState();
  const [checked, setChecked] = useState(false);
  const [audioNomatch, setAudioNomatch] = useState();
  const [concat, setconcat] = useState("");
  const [selectedOption, setSelectedOption] = useState("tts");
  const [menuselectedOption, setMenuSelectedOption] = useState("TTS");
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
  const [isFirstCall, setIsFirstCall] = useState(true);
  const DecisionCounter = useRef(1);
  const menuCounter = useRef(1);
  const hangupCounter = useRef(1);
  const exitCounter = useRef(1);
  const entryCounter = useRef(1);
  const pageRef = useRef({});
  const [isProjectSaved, setIsProjectSaved] = useState(false);
  const audioCounter = useRef(1);
  const [sessionkey, Setsessionkey] = useState("");
  const [sessionvalue, Setsessionvalue] = useState("");
  const [method, setMethod] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [flowName, setFlowName] = useState("");
  const [savebtn, setSaveBtn] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [url, setURL] = useState(null);
  // const [sourceId, setSourceId] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [id, setId] = useState("");
  const nodeLabelRef = useRef("");
  const [menuAudioFile, setMenuAudioFile] = useState("");
  const [pageId, setPageId] = useState(1)
  const [pages, setPages] = useState([]);
  const [addPageButton, setAddPageButton] = useState(false)
  const [pageEntry, setPageEntry] = useState("");
  const [pageEntryList, setPageEntryList] = useState([])
  const [editPagePopup, setEditPagePopup] = useState(false);
  const [pagesData, setPagesData] = useState({});
  const [editablePage, setEditablePage] = useState();
  const [lastData, setLastData] = useState([
    {
      source: "0",
      nodeType: "Start",
      sourceLabel: "Start",
    },
  ]);

  useEffect(() => {
    if (pages.length > 0) {
      setAddPageButton(true)
    } else {
      setAddPageButton(false)
    }
  }, [pages])

  const AddPage = () => {
    const currPageTemp = currentPage;
    setPageId((prev) => prev + 1);
    const newPage = `page${pageId}`;
    setPages([...pages, newPage]);
    currentPage = newPage;
    setPagesData((prevData) => {
      // const currentData = prevData;
      // console.log("Current data in onconnect :: ", currentData);
      // console.log("Current page before :: ", currentPage);
      return {
        ...prevData,
        [currPageTemp]: {
          ...prevData[currPageTemp],
          NodesData: nodes, EdgesData: edges
        },
        [newPage]: { NodesData: [], EdgesData: [] }
      }
    });
    // setPageId((prev) => prev + 1);
    // const newPage = `page${pageId}`;
    // setPages([...pages, newPage]);
    // currentPage = newPage;
    // console.log("Current page after :: ", currentPage);
    setNodes([]);
    setEdges([]);
    // setPagesData({ ...pagesData, [newPage]: { NodesData: [], EdgesData: [] } })
  }

  const handlePages = (page) => {
    if (currentPage !== page) {
      // console.log("page selected data :: ", pagesData[page]["EdgesData"]);
      // console.log("Current page before :: ", currentPage);
      var prevPage = currentPage;
      setPagesData((prevData) => {
        const currentData = prevData;
        console.log("Current data in onconnect :: ", currentData);
        // console.log("Current page in setPage data :: ", prevPage);
        return {
          ...currentData,
          [prevPage]: {
            ...currentData[prevPage],
            NodesData: nodes, EdgesData: edges
          }
        }
      });
      currentPage = page;
      // console.log("Current page after :: ", currentPage);
      setNodes(pagesData[page]["NodesData"]);
      setEdges(pagesData[page]["EdgesData"]);
    }
  }

  const removePage = (event, page) => {
    event.stopPropagation();
    const { [page]: _, ...updatedData } = pagesData
    const updatedKeys = Object.keys(updatedData)
    const lastPage = updatedKeys[updatedKeys.length - 1]
    console.log("last page data :: ", lastPage);
    console.log("last page ref data :: ", pageRef.current[lastPage]);
    if (lastPage && pageRef.current[lastPage]) {
      pageRef.current[lastPage].click();
    }
    setPagesData((prevData) => {
      const { [page]: _, ...updatedPagesData } = prevData
      console.log("updated page data :: ", updatedPagesData);
      return updatedPagesData
    })

    setPages((prevPages) => {
      return prevPages.filter((currPage) => !(currPage === page))
    })
  }

  const handlePageName = (e) => {
    setEditablePage(e.target.value);
    console.log("editable page :: ", e.target.value);
  }
  const addPageName = () => {
    console.log("ediatble page length :: ", editablePage.length);
    if (editablePage.length <= 0) {
      toast.error("Page name cannot be empty. Please enter valid page name")
    } else {
      if (editablePage === currentPage) {
        setEditPagePopup(false);
      } else if (Object.keys(pagesData).includes(editablePage)) {
        toast.error("Page name is already available. Please change the page name")
      } else {
        setEditPagePopup(false);
        console.log("current page data in edit :: ", currentPage)
        // const tempPages = pages.filter((page) => page !== currentPage);
        // tempPages.push(editablePage);
        setPages((prevPages) => {
          prevPages[prevPages.indexOf(currentPage)] = editablePage;
          return prevPages;
        })
        setPagesData((prevData) => {
          const editedData = {
            ...prevData,
            [editablePage]: prevData[currentPage],
          }
          const { [currentPage]: _, ...restData } = editedData
          console.log("edited data in edit :: ", _);
          console.log("updated data in edit :: ", restData);
          return restData;
        });
        console.log("ref before data in edit :: ", pageRef);
        if (editablePage && pageRef.current[editablePage]) {
          pageRef.current[editablePage].click();
        }
      }
    }
  }

  useEffect(() => {
    fetch('http://localhost:5000/project_list')
      .then((res) => {
        // console.log("response from api :: ", res);
        return res.json();
      })
      .then((data) => {
        const projectsList = data.length > 0 ? data.map((val) => val.flowname) : []
        // console.log("data from api :: ", projectsList);
        setProjectList(projectsList)
      }).catch((error) => {
        toast.error(`failed to fetch projects.` + error);
      });
  }, []);

  const onConnect = useCallback((params) => {
    console.log("onConnect triggered with params:", params);
    setNodes((prevNodes) => {
      const sourceNode = prevNodes.find((node) => node.id === params.source);
      const targetNode = prevNodes.find((node) => node.id === params.target);
      const sourceNodeId = sourceNode.hasOwnProperty("parentId")
        ? sourceNode.parentId
        : params.source;

      setNodeDetails((prevDetails) => {
        const edge = {
          source: params.source,
          sourceLabel: sourceNode.data.label,
          target: params.target,
          sourceDetails: prevDetails[sourceNodeId] || {},
        };
        console.log("edge in onconnect ::", edge);

        setEdges((prevEdges) => {
          if (prevEdges.some((edge) => edge.source === params.source)) {
            return prevEdges;
          } else {
            console.log("Adding edge:", edge);
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
                    optionNum =
                      sourceNode.data.label === "NI" || sourceNode.data.label === "NM"
                        ? sourceNode.data.label
                        : sourceNode.id
                          .replace("c", "")
                          .substring(
                            sourceNode.id.length,
                            sourceNode.parentId.length
                          ) - 2;
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
            const returnedEdge = addEdge(edge, prevEdges);
            // var currPage;
            // setCurrentPage((prevPage) => {
            //   currPage = prevPage
            // });
            setPagesData((prevData) => {
              const currentData = prevData;
              console.log("Current data in onconnect :: ", currentData);
              return {
                ...currentData,
                [currentPage]: {
                  ...currentData[currentPage],
                  EdgesData: [...currentData[currentPage].EdgesData, returnedEdge[returnedEdge.length - 1]]
                }
              }
            }
            );
            return returnedEdge;
          }
        });
        return prevDetails;
      });
      return prevNodes;
    });
  }, []);

  useEffect(() => {
    console.log("last data :: ", lastData);
    console.log("Nodes data :: ", nodes);
    console.log("Page Data :: ", pagesData);
    console.log("current page :: ", currentPage);
    console.log("edges :: ", edges);
  }, [lastData, pagesData, currentPage, edges]);



  // const onEdgeUpdate = useCallback(
  //   (oldEdge, newConnection) => {
  //     console.log("old connection :: ", oldEdge);
  //     console.log("new connection :: ", newConnection);
  //     setEdges((els) => updateEdge(oldEdge, newConnection, els));
  //   },
  //   [setEdges]
  // );

  const Savebtn = () => {
    console.log("Inside save btn");
  };

  useEffect(() => {
    // Initially set the first project as active if available
    if (projectList && projectList.length > 0) {
      setActiveProject(projectList[0]);
    }

    // Dynamically add ::selection styles
    const style = document.createElement("style");
    style.textContent = `
      .ProjectList::selection {
        color: #308df0; /* Set selection color */
      }
    `;
    document.head.appendChild(style);
    // Cleanup the added style element on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, [projectList]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      console.log("Inside ondrop so isProjectSaved is true ");
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
          data: {
            label: `Condition-${DecisionCounter.current++}`,
            type: "Decision",
          },
          style: {
            width: 90,
            height: 30,
            padding: 5,
            fontSize: "8px",
            overflowWrap: "break-word",
          },
        };

        setNodes((nds) => nds.concat(newNode));
        setPagesData((prevData) => {
          const currentData = prevData;
          return {
            ...currentData,
            [currentPage]: {
              ...currentData[currentPage],
              NodesData: [...currentData[currentPage].NodesData, newNode]
            }
          }
        }
        );
        // setPagesData((prevData) => {
        //   return [...prevData[currentPage],
        //   { ...prevData[currentPage], NodesData: [...prevData[currentPage].NodesData, newNode] }]
        // })

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
        newChildNodes.map((childNode) => {
          setPagesData((prevData) => {
            const currentData = prevData;
            return {
              ...currentData,
              [currentPage]: {
                ...currentData[currentPage],
                NodesData: [...currentData[currentPage].NodesData, childNode]
              }
            }
          }
          );
        })
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
          data: {
            label: `Menu-${menuCounter.current++}`,
            type: nodeProps.nodeLabel,
          },
          style: {
            width: 50,
            height: 55,
            padding: 5,
            fontSize: "8px",
          },
        };

        setNodes((nds) => nds.concat(newNode));
        setPagesData((prevData) => {
          const currentData = prevData;
          return {
            ...currentData,
            [currentPage]: {
              ...currentData[currentPage],
              NodesData: [...currentData[currentPage].NodesData, newNode]
            }
          }
        }
        );
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
        newChildNodes.map((childNode) => {
          setPagesData((prevData) => {
            const currentData = prevData;
            return {
              ...currentData,
              [currentPage]: {
                ...currentData[currentPage],
                NodesData: [...currentData[currentPage].NodesData, childNode]
              }
            }
          }
          );
        })
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
        setNodes((prevNodes) => (nodeData = prevNodes));
        const startNode = nodeData.filter((node) => node.data.type === "Start");
        if (startNode.length > 0) {
          toast.error(`Start node already exists.`);
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
          setPagesData((prevData) => {
            const currentData = prevData;
            return {
              ...currentData,
              [currentPage]: {
                ...currentData[currentPage],
                NodesData: [...currentData[currentPage].NodesData, newNode]
              }
            }
          }
          );
          setLastData((prevNodes) => [
            ...prevNodes,
            {
              source: newNode.id,
              sourceLabel: newNode.data.label,
              nodeType: nodeProps.nodeLabel,
            },
          ]);
        }
      } else {
        if (nodeProps.nodeLabel === "Entry") {

        }
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

        // setCurrentPage((prevPage) => { currPage = prevPage; return currPage });
        console.log("current working page :: ", currentPage);
        setPagesData((prevData) => {
          // console.log("prevData in drop :: ", prevData);
          // console.log("current page in drop:: ", currPage);
          // console.log("page data in drop:: ", pagesData);
          const currentData = prevData;
          console.log("Current data in drop :: ", currentData);
          return {
            ...currentData,
            [currentPage]: {
              ...currentData[currentPage],
              NodesData: [...currentData[currentPage].NodesData, newNode]
            }
          }
        }
        );

        if (nodeProps.nodeLabel === "Play Prompt") {
          newNode.data.label = `Play Prompt-${audioCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Disconnect") {
          newNode.data.label = `Disconnect-${hangupCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Session Variable") {
          newNode.data.label = `Session Variable-${ApplicationModifierCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Exit") {
          newNode.data.label = `Exit-${exitCounter.current++}`;
        }
        if (nodeProps.nodeLabel === "Entry") {
          newNode.data.label = `Entry-${entryCounter.current++}`;
          setPageEntryList((prevData) =>
            prevData.concat(currentPage + ` - ` + newNode.data.label)
          )
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

  const HandleContinue = () => {
    console.log("Inside HandleContinue");
    setSaveBtn(true);
    setPopupwarning(false);
  };
  const Closebtn = () => {
    console.log("Inside closebtn");
    setPopupwarning(false);
  };

  const checkFlowName = async () => {
    setSaveBtn(false);
    setIsProjectSaved(true);
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
        main_id = 0;
        const startNode = {
          id: getId(),
          type: "input",
          data: { label: "Start", type: "Start" },
          position: { x: 250, y: 5 },
          style: {
            width: 50,
            padding: 5,
            fontSize: "8px",
          },
        }
        setNodes([
          startNode
        ]);
        setEdges([]);
        setLastData([
          {
            source: "0",
            nodeType: "Start",
            sourceLabel: "Start",
          },
        ]);
        setPages(["Main"]);
        setPagesData({
          "Main": {
            NodesData: [
              startNode
            ], EdgesData: []
          }
        })
        setPageId(1);
        setPageEntryList([])
        currentPage = "Main";
        setProjectList((prevData) => [...prevData, flowName]);
        menuCounter.current = 1;
        audioCounter.current = 1;
        hangupCounter.current = 1;
        exitCounter.current = 1;
        entryCounter.current = 1;
        ApplicationModifierCounter.current = 1;
      }
    } catch (error) {
      console.error("Error checking flow name:", error);
      toast.error("Failed to check flow name. Please try again.");
      return;
    }
  };
  const updateNodeDetails = (nodeId, updatedDetails) => {
    setNodeDetails((prevDetails) => ({
      ...prevDetails,
      [nodeId]: {
        ...prevDetails[nodeId],
        ...updatedDetails,
      },
    }));
  };
  const storeNodeDetails = () => {
    console.log("edges in storeNode details :: ", edges);
    setLastData((prevData) => {
      const index = prevData.findIndex((item) => item.NodesData !== undefined);
      console.log("prevdata in the store nodedetails :: ", prevData);
      console.log("menu counter :: ", menuCounter);
      console.log("audio counter :: ", audioCounter);
      const data =
        index !== -1
          ? prevData.map((item, i) =>
            i === index
              ? {
                NodesData: nodes,
                EdgesData: edges,
                PopupDetails: nodeDetails,
                Main_id: main_id,
                pagesData: pagesData,
                pages: pages,
                pageId: pageId,
                pageEntryList: pageEntryList,
                Counters: {
                  menuCounter: menuCounter.current,
                  disconnectCounter: hangupCounter.current,
                  PlayPromptCounter: audioCounter.current,
                  ExitCounter: exitCounter.current,
                  EntryCounter: entryCounter.current,
                  sessionVariableCounter:
                    ApplicationModifierCounter.current,
                },
              }
              : item
          )
          : [
            ...prevData,
            {
              NodesData: nodes,
              EdgesData: edges,
              PopupDetails: nodeDetails,
              Main_id: main_id,
              pagesData: pagesData,
              pages: pages,
              pageId: pageId,
              pageEntryList: pageEntryList,
              Counters: {
                menuCounter: menuCounter.current,
                disconnectCounter: hangupCounter.current,
                PlayPromptCounter: audioCounter.current,
                ExitCounter: exitCounter.current,
                EntryCounter: entryCounter.current,
                sessionVariableCounter: ApplicationModifierCounter.current,
              },
            },
          ];
      saveFlow(data);
      return data;
    });
  };
  // const handlePropertyChange = (nodeId, newProperties) => {
  //   updateNodeDetails(nodeId, newProperties);
  // };
  useEffect(() => {
    console.log("main id :: ", main_id)
  }, [main_id])

  const handleRetrieve = async (flowName) => {
    console.log("click working :: ", flowName);
    setFlowName(flowName);
    setActiveProject(flowName);
    Setinitialpopup(true);
    setShowPopup(false);
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
      console.log("check data :: ", checkData);
      if (Object.keys(checkData).length > 0) {
        // toast.error(
        //   `${flowName} name already exists. Please choose another name.`
        // );
        console.log("Response from retrieve api :: ", checkData);
        // console.log(
        //   "data :: ",
        //   JSON.parse(checkData).find((val, key) =>
        //     val.hasOwnProperty("NodesData")
        //   )
        // );
        const retrievedData = JSON.parse(checkData).find((val, key) =>
          val.hasOwnProperty("NodesData")
        );
        setLastData(JSON.parse(checkData));
        setNodes(retrievedData.pagesData ? retrievedData.pagesData?.Main?.NodesData : []);
        setEdges(retrievedData.pagesData ? retrievedData.pagesData?.Main?.EdgesData : []);
        setNodeDetails(retrievedData.PopupDetails);
        main_id = retrievedData.Main_id
        currentPage = "Main"
        setPageId(retrievedData.pageId ? retrievedData.pageId : 1)
        setPages(retrievedData.pages ? retrievedData.pages : [])
        setPagesData(retrievedData.pagesData ? retrievedData.pagesData : {})
        setPageEntryList(retrievedData.pageEntryList ? retrievedData.pageEntryList : [])
        menuCounter.current = retrievedData.Counters.menuCounter;
        audioCounter.current = retrievedData.Counters.PlayPromptCounter;
        hangupCounter.current = retrievedData.Counters.disconnectCounter;
        exitCounter.current = retrievedData.Counters.ExitCounter;
        entryCounter.current = retrievedData.Counters.EntryCounter;
        ApplicationModifierCounter.current =
          retrievedData.Counters.sessionVariableCounter;
        setIsProjectSaved(true);
        return;
      } else {
        // main_id = 0;
        // setNodes([
        //   {
        //     id: getId(),
        //     type: "input",
        //     data: { label: "Start", type: "Start" },
        //     position: { x: 250, y: 5 },
        //     style: {
        //       width: 50,
        //       padding: 5,
        //       fontSize: "8px",
        //     },
        //   },
        // ]);
        // setEdges([]);
        // setLastData([
        //   {
        //     source: "0",
        //     nodeType: "Start",
        //     sourceLabel: "Start",
        //   },
        // ]);
        // menuCounter.current = 1;
        // audioCounter.current = 1;
        // hangupCounter.current = 1;
        // exitCounter.current = 1;
        // entryCounter.current = 1;
        // ApplicationModifierCounter.current = 1;
        toast.error("Unale to retrieve the flow");
      }
    } catch (error) {
      console.error("Error retrieve flow name:", error);
      toast.error("Failed to retrieve flow data.");
      return;
    }
  };

  const onNodeClick = (event, node) => {
    console.log("Node inside the onnodeclick ", node);
    // const data = lastData.find((val) => val.source === node.id);
    // console.log("onnodeclick data :: ", data);
    setCurrNode(node);
    setSelectedNodeData(node);
    setShowPopup(true);
    Setinitialpopup(false);
  };

  const onNodeDoubleClick = (event, node) => {
    console.log("double click :: ", node.data.label);
    if (node.data.type === 'Exit') {
      Setinitialpopup(true);
      setShowPopup(false);
      console.log("keys of pages data :: ",
        Object.keys(pagesData)
      );

      const exitNodeDetails = lastData.find((value) => value.sourceLabel === node.data.label);
      console.log("exitNode Details :: ", exitNodeDetails);

      if (exitNodeDetails?.popupDetails?.pageEntry) {
        const entryLabel = (exitNodeDetails.popupDetails.pageEntry).split(' - ')[1]
        console.log("entry label :: ", entryLabel);
        // const pageToEnter = Object.keys(pagesData).find(key =>
        //   pagesData[key].NodesData.some(node => node.data.label === entryLabel)
        // );
        const pageToEnter = (exitNodeDetails.popupDetails.pageEntry).split(' - ')[0]
        // console.log("pageToEnter data :: ", pageToEnter);
        if (pageToEnter && pageRef.current[pageToEnter]) {
          pageRef.current[pageToEnter].click();
        }
      }
    }
  }

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
    // console.log("Source Node :: ", sourceNode);
    // console.log("connection target :: ", connection)
    return sourceNode.data.type === undefined
      ? connection.target !== sourceNode.parentId
      : connection.target !== sourceNode.id;
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
    console.log("savedraftClicked", savedraftClicked);
    if (isFirstCall) {
      setSaveBtn(true);
      setIsFirstCall(false);
    } else {
      if (savedraftClicked) {
        setSaveBtn(true);
      } else {
        console.log("Save draft not clicked");
        setSaveBtn(false);
        setPopupwarning(true);
      }
    }
  };

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
    if (audioNomatch) {
      formData.append("nomatchAudioFile", audioNomatch);
    }
    if (audioNoinput) {
      formData.append("noinputAudioFile", audioNoinput);
    }
    const newRequestBody = {
      id,
      Menuname: value,
      TexttoSay: textToSay,
      NoinputTTS: noinput,
      NomatchTTS: nomatch,
      MaxTriesTTS: maxtriesAudio,
      menuoptions: menuOption,
      Channel: channel,
      initialAudio: menuAudioFile ? { Audioname: menuAudioFile.name } : null,
      NomatchAudio: audioNomatch
        ? { NomatchAudioName: audioNomatch.name }
        : null,
      NoinputAudio: audioNoinput
        ? { NoinputAudioName: audioNoinput.name }
        : null,
      Maxtries: maxtries,
      SessionData: sessiondata,
      Operation: method,
      StartIndex: startValue,
      EndIndex: endValue,
      Concat: concat,
      Assign: assign,
      SessionKey: sessionkey,
      ConditionOperation: operation,
      Value: sessionvalue,
      apiResponse: apiResponse,
      url: url,
      playprompt: playprompt,
      pageEntry: pageEntry
    };
    formData.append("RequestBodyforMenu", JSON.stringify(newRequestBody));

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
                TexttoSay: playprompt,
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
                HTTPMethod: httpMethod,
                VariabletoSetResponse: apiResponse,
                RequestBody: request,
                url: url,
              },
            }
            : node;
        } else if (node.nodeType === "Exit") {
          return node.source === id
            ? {
              ...node,
              popupDetails: {
                id,
                pageEntry: pageEntry
              },
              target: pageEntry.split(' - ')[1]
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
        // setShowPopup(false);
        // Setinitialpopup(true);
        // setTextToSay("");
        // setMenuOption("");
        // setChannel("");
        // setId("");
        // Setsessionkey("");
        // Setsessionvalue("");
        // Setoperation("");
        // setEndValue("");
        // setStartValue("");
        // setMethod("");
        // setSessionData("");
        // Setassign("");
        // setAudioNoinput("");
        // setAudioNomatch("");
        // setNoinput("");
        // setNomatch("");
        // setconcat("");
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

  const saveFlow = async (data) => {
    console.log("data in save flow :: ", data);
    const nodesData = data.filter((node) => !node.hasOwnProperty('NodesData'));
    console.log("removed Nodes data :: ", nodesData);
    const loneNode = nodesData.find((node) => {
      if (node.nodeType === 'Menu' && !node.hasOwnProperty('optionsTarget')) {
        return node;
      } else if (node.nodeType === 'Condition' && !node.hasOwnProperty('decisionTarget')) {
        return node;
      } else if (!node.hasOwnProperty('target') && !node.nodeType === 'Disconnect') {
        return node;
      }
      // else if (node.nodeType === 'Disconnect') {
      //   return node;
      // }
    })
    console.log("lone node :: ", loneNode);
    if (loneNode) {
      toast.error("Please connect all the nodes");
    } else {
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
      console.log("Before sending to API ::", data);
      try {
        const response = await fetch("http://localhost:5000/save-flow", {
          method: "PUT",
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
    }
  };

  const DeployFlow = async () => {
    console.log("flowName in deploy function", flowName);
    setFlowName("");
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
      setShowPopup(false);
      Setinitialpopup(true);
      setLastData((prevData) =>
        prevData.filter((node) => node.source !== deleted[0].id)
      );

      setPagesData((prevData) => {
        const currentData = prevData;
        console.log("Current data in onconnect :: ", currentData);
        return {
          ...currentData,
          [currentPage]: {
            ...currentData[currentPage],
            NodesData: nodes.filter((node) => node.id !== deleted[0].id)
          }
        }
      });
      // if (deleted[0].data.type === 'Play Prompt') {
      //   audioCounter.current = audioCounter.current - 1
      // } else if (deleted[0].data.type === 'Menu') {
      //   menuCounter.current = menuCounter.current - 1
      // }
      console.log("on node delete :: ", deleted);
    },
    [nodes, edges]
  );

  const onEdgesDelete = useCallback(
    (deletedEdges) => {
      setPagesData((prevData) => {
        const currentData = prevData;
        console.log("Current data in onconnect :: ", currentData);
        return {
          ...currentData,
          [currentPage]: {
            ...currentData[currentPage],
            EdgesData: edges.filter((edge) => edge.source !== deletedEdges[0].source)
          }
        }
      });
      console.log("nodes in edge delete :: ", nodes);
      // nodes.map((node) => {
      //   console.log("nodes map edge delete :: ", node);
      // })
      const deletedEdgeSource = nodes.find(
        (node) => node.id === deletedEdges[0].source
      );
      console.log("on edge delete :: ", deletedEdges);

      if (deletedEdgeSource.parentId) {
        const label = deletedEdgeSource.data.label;
        setLastData((prevData) =>
          prevData.map((node) => {
            if (node.source === deletedEdgeSource.parentId) {
              const { [label]: _, ...updatedDecisionTarget } =
                node.nodeType === "Menu"
                  ? node.optionsTarget
                  : node.decisionTarget;
              return node.nodeType === "Menu"
                ? { ...node, optionsTarget: updatedDecisionTarget }
                : { ...node, decisionTarget: updatedDecisionTarget };
            }
            return node;
          })
        );
      } else {
        setLastData((prevData) =>
          prevData.map((node) => {
            return node.source === deletedEdgeSource.id
              ? { ...node, target: "" }
              : node;
          })
        );
      }
      console.log("deletedEdgeSource :: ", deletedEdgeSource);
    },
    [edges]
  );

  const handleChanges = (isChecked) => {
    setChecked(isChecked);
  };

  return (
    <ReactFlowProvider>
      <div className="grid-container">
        <div className="sidebar-container">
          <Navigator
            savebtn={savebtn}
            Popupsave={Popupsave}
            isProjectSaved={isProjectSaved}
            isDraftSaved={isDraftSaved}
            DeployFlow={DeployFlow}
            setIsDraftSaved={setIsDraftSaved}
            handleRetrieve={handleRetrieve}
            projectList={projectList}
            setValue={setValue}
            storeNodeDetails={storeNodeDetails}
            setIsToggled={setIsToggled}
            setChecked={setChecked}
            checked={checked}
            isToggled={isToggled}
            value={value}
          />
          <Elements onDragStart={onDragStart} isProjectSaved={isProjectSaved} />
        </div>

        <div className="main-content-wrapper" ref={reactFlowWrapper}>
          <Maincontent
            pageRef={pageRef}
            pages={pages}
            handlePages={handlePages}
            AddPage={AddPage}
            removePage={removePage}
            editPagePopup={editPagePopup}
            setEditPagePopup={setEditPagePopup}
            setEditablePage={setEditablePage}
            editablePage={editablePage}
            handlePageName={handlePageName}
            addPageName={addPageName}
            addPageButton={addPageButton}
            onNodeDoubleClick={onNodeDoubleClick}
            currentPage={currentPage}
            // setNodes={setNodes}
            // setEdges={setEdges}
            pagesData={pagesData}
            // setPagesData={setPagesData}
            // setPages={setPages}
            savebtn={savebtn}
            nodes={nodes}
            edges={edges}
            checkFlowName={checkFlowName}
            onNodesChange={onNodesChange}
            Closebtn={Closebtn}
            HandleContinue={HandleContinue}
            popupwarning={popupwarning}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            isValidConnection={isValidConnection}
            // onEdgeUpdate={onEdgeUpdate}
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
          pageEntry={pageEntry}
          pageEntryList={pageEntryList}
          setPageEntry={setPageEntry}
          url={url}
          setURL={setURL}
          apiResponse={apiResponse}
          setApiResponse={setApiResponse}
          selectedNodeData={selectedNodeData}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          request={request}
          setRequest={setRequest}
          nodes={nodes}
          currNode={currNode}
          checked={checked}
          httpMethod={httpMethod}
          SetDecision={SetDecision}
          setHTTPMethod={setHTTPMethod}
          handleChanges={handleChanges}
          Decision={Decision}
          setId={setId}
          handleFileChange={handleFileChange}
          setNomatch={setNomatch}
          nomatch={nomatch}
          noinput={noinput}
          setNoinput={setNoinput}
          lastData={lastData}
          setLastData={setLastData}
          setAppModifier={setAppModifier}
          setMaxtries={setMaxtries}
          maxtries={maxtries}
          maxtriesAudio={maxtriesAudio}
          setMaxtriesAudio={setMaxtriesAudio}
          setAudioNoinput={setAudioNoinput}
          audioNoinput={audioNoinput}
          audioNomatch={audioNomatch}
          setAudioNomatch={setAudioNomatch}
          setMenuAudioFile={setMenuAudioFile}
          menuAudioFile={menuAudioFile}
          setMenuSelectedOption={setMenuSelectedOption}
          menuselectedOption={menuselectedOption}
          setNodeDetails={setNodeDetails}
          nodeDetails={nodeDetails}
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
          setPlayprompt={setPlayprompt}
          playprompt={playprompt}
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
