import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { MiniMap } from 'reactflow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

function ElementConfiguration({ setAudioFile,audioFile,menuAudioFile,setMenuAudioFile,setEdges,setLastData,lastData, setChannel,method, setMethod, appModifier, generateId, startValue, endValue, setAppModifier, setId, id, handleSaveMenuNode, SetAudionode, selectedNodeData, showPopup, setShowPopup, nodes, setNodes, popupHeight, initialPopup, Setinitialpopup, currNode, SetMenunode, setValue, value, setTextToSay, textToSay, menuOption, Menunode, setMenuOption }) {
  
  const methods = ['slice', 'substr', 'replace', 'toUpperCase', 'toLowerCase', 'concat', 'split'];
  
 
console.log("menuAudioFile",menuAudioFile.name)
 
  const handleSave = () => {
    
    if (!id.trim() || !value.trim()) {
      toast.error('ID and Name are required fields.');
      return;
    }
    if (Menunode && !menuOption) {
      toast.error('Select Menu Option.');
      return;
    }
    if (selectedNodeData && selectedNodeData.data.type === 'Menu' && (!menuAudioFile && !textToSay)) {
      toast.error('Please upload an audio file or enter text to speech.');
      return;
    }
    if (selectedNodeData && selectedNodeData.data.type === 'Audio' && (!audioFile && !textToSay)) {
      toast.error('Please upload an audio file or enter text to speech.');
      return;
    }
    handleSaveMenuNode();
  };

  useEffect(() => {
  
    if (selectedNodeData) {
      setId(selectedNodeData.id);
      setValue(selectedNodeData.data.label);

      switch (selectedNodeData.data.type) {
        case 'Hangup':
          SetMenunode(false);
          SetAudionode(false);
          setAppModifier(false);
          break;
        case 'Menu':
          SetMenunode(true);
          SetAudionode(false);
          setAppModifier(false);
          break;
        case 'Audio':
          SetMenunode(false);
          SetAudionode(true);
          setAppModifier(false);
          break;
        case 'Application Modifier':
          SetMenunode(false);
          SetAudionode(false);
          setAppModifier(true);
          break;
        default:
          SetMenunode(false);
          SetAudionode(false);
          setAppModifier(false);
          break;
      }
    }
  }, [selectedNodeData]);

  useEffect(() => {
   
    if (!menuOption) return;

    const numNodes = parseInt(menuOption, 10);
    if (isNaN(numNodes)) return;

    const childNodes = nodes.filter((n) => n.parentId === currNode.id);
    let updatedNodes = [...nodes];

    if (childNodes.length > 0) {
      if (numNodes < childNodes.length) {
        const slicedChildNodes = childNodes.slice(numNodes, childNodes.length);
        for (let i = 0; i < Object.keys(slicedChildNodes).length; i++) {
          setEdges((edges) => edges.filter((edge) => edge.source !== slicedChildNodes[i].id))
        }
        updatedNodes = nodes.filter((node) => node.parentId !== currNode.id)
          .concat(childNodes.slice(0, numNodes));
        setLastData((prevNodes) => {
          return prevNodes.map(node => {
            // console.log("currNode in map :: ", currNode.id);
            if (node.source === currNode.id) {
              const updatedOptions = node.hasOwnProperty('optionsTarget') && node?.optionsTarget
                ? Object.fromEntries(
                  Object.entries(node.optionsTarget).filter(([key, value]) => key <= numNodes)
                )
                : {};
              const updatedNode = {
                ...node,
                optionsTarget: updatedOptions
              }
              return updatedNode
 
            } else {
              return node;
            }
          })
        })
      } else if (numNodes > childNodes.length) {
        const diff = numNodes - childNodes.length;
        let lastChildId = Number((childNodes[childNodes.length - 1].id).split("")[1]);
        const lastChild_Y_Pos = (childNodes[childNodes.length - 1].position).y;

        const newNodes = Array.from({ length: diff }, (_, index) => ({
          id: generateId(currNode.id, lastChildId + index),
          type: 'input',
          position: {
            x: 34,
            y: lastChild_Y_Pos + (index + 1) * 15
          },
          data: { label: lastChildId + (index + 1) },
          extent: 'parent',
          parentId: currNode.id,
          sourcePosition: "right",
          style: {
            width: 15,
            height: 20,
            padding: '6px 0px',
            border: 'none',
            fontSize: '8px'
          },
          draggable: false,
        }));

        updatedNodes.push(...newNodes);
      }
    } else {
      const newNodes = Array.from({ length: numNodes }, (_, index) => ({
        id: generateId(currNode.id, index),
        type: 'input',
        position: {
          x: 34,
          y: index === 0 ? 15 : 15 + index * 15
        },
        data: { label: `${index + 1}` },
        extent: 'parent',
        parentId: currNode.id,
        sourcePosition: "right",
        style: {
          width: 15,
          height: 20,
          padding: '6px 0px',
          border: 'none',
          fontSize: '8px'
        },
        draggable: false,
      }));

      updatedNodes.push(...newNodes);
    }

    setNodes(
      updatedNodes.map((eachNode) => {
        if (eachNode.id === currNode.id) {
          const baseHeight = 70;
          const additionalHeight = 15;
          const heights = Array.from({ length: 8 }, (_, index) => baseHeight + (index - 1) * additionalHeight);
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

  const options = ['Voice', 'Chat'];
  const numbers = ["0", '2', '3', "4", '5', '6', '7', '8', '9'];
  const defaultOption = options[0];
  const defaultnumber = numbers[0];

  return (
    <>
      <ToastContainer className="Toastcontainer"/>
      {initialPopup && (
        <div className="Initialpopup">No Configurable Elements Selected.</div>
      )}
      {showPopup && selectedNodeData && (
        <div className="popup" style={{ height: popupHeight }}>
          <div className="popup-content">
            <h3 className='Selectednode'>Properties of {selectedNodeData.data.label}</h3>
            <div className='Nodename'>NODE ID</div>
            <input
              className="Inputbox"
              type="text"
              name="myInput"
              value={id}
              placeholder='node id'
              onChange={(e) => setId(e.target.value)}
            />
            <div className='Nodename'>NODE NAME</div>
            <input
              className="Inputbox"
              type="text"
              name="myInput"
              placeholder='Enter the node name'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          {selectedNodeData.data.type === 'Audio' && (
              <div>
                <div className='Texttosay'>TEXT TO Speech</div>
                <input
                  className="TexttosayInputbox"
                  type="text"
                  name="myInput"
                  placeholder='Enter the text'
                  value={textToSay}
                  onChange={(e) => setTextToSay(e.target.value)}
                />
                <div className='Texttosay'>Upload Audio File</div>
                <input
                  className='AudioUploadInput'
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

            {Menunode && (
              <><div>
                <div className='Texttosay' >TEXT TO SAY</div>
                <input
                  className="TexttosayInputbox"
                  type="text"
                  name="myInput"
                  placeholder='Hello, welcome to zenius!'
                  onChange={(e) => setTextToSay(e.target.value)} />
                     <div className='Texttosay'>Initial Audio File</div>
                <input
                  className='AudioUploadInput'
                  type="file"
                  accept=".mp3,.wav"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setMenuAudioFile(file);
           
                    console.log("Selected audio file:", file);
                  }}
                />
                <div className='Texttosay'>MENU OPTIONS</div>
                <Dropdown className="ChannelDropdown" options={numbers} value={defaultnumber} placeholder="Select an option" onChange={(e) => setMenuOption(e.value)} />
              </div>
                <div className='Texttosay'>Channel</div>
                <Dropdown className="ChannelDropdown" options={options} value={defaultOption} placeholder="Select an option" onChange={(e) => setChannel(e.value)} /></>

            )}
               {appModifier && (
              <>
                <div>
                  <div className='Texttosay' >TEXT TO SAY</div>
                  <input
                    className="TexttosayInputbox"
                    type="text"
                    name="myInput"
                    placeholder='Session data to modify'
                  // onChange={(e) => setSessionData(e.target.value)}
                  />
                  <div className='Texttosay'>Operation to perform</div>
                  <Dropdown className="ChannelDropdown" options={methods} placeholder="Select an option" onChange={(e) => setMethod(e.value)} />
                </div>
                {(method === 'slice' || method === 'substr' || method === 'replace') &&
                  <>
                    <div className='Texttosay'>{method === 'replace' ? 'String to replace' : 'Start Index'}</div>
                    <input
                      className="TexttosayInputbox"
                      type={method === 'replace' ? 'text' : 'number'}
                      name="myInput"
                      required
                      placeholder={method === 'replace' ? 'Enter String to Replace' : 'Enter Start Index'}
                    // onChange={(e) => setStartValue(e.target.value)}
                    />
                    <div className='Texttosay'>{method === 'replace' ? 'Replace String' : 'End Index'}</div>
                    <input
                      className="TexttosayInputbox"
                      type={method === 'replace' ? 'text' : 'number'}
                      name="myInput"
                      placeholder={method === 'replace' ? 'String to Replace with' : 'Enter End Index'}
                    // onChange={(e) => setEndValue(e.target.value)}
                    />
                  </>
                }
                {
                  (method === 'concat' || method === 'split') &&
                  <>
                    <input
                      className="TexttosayInputbox"
                      type="text"
                      name="myInput"
                      placeholder={method === 'concat' ? 'Enter String to Concat' : 'String to Split with'}
                    // onChange={(e) => setStartValue(e.target.value)}
                    />
                  </>
                }
              </>
 
            )}
                 <span className='btns'>
            <button className='savebtn' onClick={handleSave}>Save</button>
            <button className='Closebtn' onClick={Handleclosepopup}>Close</button>
            </span>
          </div>
        </div>
      )}
      <MiniMap className="Minimap" nodeColor={(node) => (node.type === 'input' ? '#6ede87' : '#ff0072')} nodeStrokeWidth={3} zoomable pannable />
    </>
  );
}

export default ElementConfiguration;
