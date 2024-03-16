import "./App.css";
import { useEffect, useRef, useState } from "react";
import GroupsTab from "./components/groups-comp/GroupsTab";
import ListOfNotes from "./components/notesListing/ListOfNotes";
import closeIcon from "./images/close.png";

function randomColorGenerator() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
}

function App() {
  let defaultColors = {
    "#B38BFA": false,
    "#FF79F2": false,
    "#43E6FC": false,
    "#F19576": false,
    "#0047FF": false,
    "#6691FF": false,
  };
  let [chooseColor, setChooseColors] = useState(defaultColors);

  function updateColor() {
    defaultColors[randomColorGenerator()] = false;
  }

  updateColor();
  updateColor();

  //Screen-Setter
  const [isDesktopView, setDesktopView] = useState(window.innerWidth > 650);
  const updateScreenSize = () => {
    setDesktopView(window.innerWidth > 650);
  };
  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  });

  
  let [selectedGroup, setSelectedGroup] = useState(null);

  
  let [openGroupPopUP, setOpenGroupPopUp] = useState(false);

  // the name of group which user entered
  let groupNameRef = useRef("");

  let everyGroup = JSON.parse(localStorage.getItem("groups"));
  if (everyGroup == undefined) {
    everyGroup = [];
  }

  //generates new group-id
  function NewGroupUniqueId(key) {
    let count = everyGroup.length + 1;
    return function () {
      return key + count++;
    };
  }
  let createNewGroupId = NewGroupUniqueId("grp");

  let colorPicked = "";

  const addGroupList = () => {
    colorPicked = Object.keys(chooseColor).find((key) => chooseColor[key] === true);
    if (groupNameRef.current.value.trim() == "") {
      alert("Please enter the group name!");
      return;
    }
    if (colorPicked == undefined) {
      alert("Please pick a color!");
      return;
    }

    const isGroupNameExists = everyGroup.some(
      (group) =>
        group.name.toLowerCase() ===
        groupNameRef.current.value.trim().toLowerCase()
    );
    if (isGroupNameExists) {
      alert("Enter unique group name!");
      return;
    }

    everyGroup.push({
      id: createNewGroupId(),
      name: groupNameRef.current.value,
      color: colorPicked,
    });
    setChooseColors(defaultColors);
    setOpenGroupPopUp(false);

    localStorage.setItem("groups", JSON.stringify(everyGroup));
  };

  return (
    <>
      {
        /*1st conditional rendering, left side groups tab and right side notes list*/
        isDesktopView ? (
          <>
            <div className="groupSecDiv">
              <GroupsTab
                setOpenGroupPopUp={setOpenGroupPopUp}
                everyGroup={everyGroup}
                setSelectedGroup={setSelectedGroup}
                selectedGroup={selectedGroup}
              />
            </div>

            <div className="notesListDiv">
              <ListOfNotes
                isDesktopView={isDesktopView}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                everyGroup={everyGroup}
              />
            </div>
          </>
        ) : 
        selectedGroup ? (
          <ListOfNotes
            isDesktopView={isDesktopView}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            everyGroup={everyGroup}
          />
        ) : (
          <GroupsTab
            setOpenGroupPopUp={setOpenGroupPopUp}
            everyGroup={everyGroup}
            setSelectedGroup={setSelectedGroup}
            selectedGroup={selectedGroup}
          />
        )
      }

      {
        //2nd conditional rendering for popUp
       
        openGroupPopUP && (
          <div className="newGroupBox">
            <div className="grpForm">
              {/*Heading and Close Button */}
              <span className="show">
                <h2 className="createGrpHeading">Create New Group </h2>
                <button
                  className="backBtn"
                  onClick={() => {
                    setOpenGroupPopUp(false);
                    updateColor();
                  }}
                >
                  <img className="backButton" src={closeIcon}></img>
                </button>
              </span>

              {/*Group Name and Group Name Input */}
              <div className="inputContainer">
                <span className="grpInputStyle">
                  <label className="grpName">Group Name</label>
                  <input
                    ref={groupNameRef}
                    className="grpInput"
                    type="text"
                    placeholder="Enter Group Name"
                  ></input>
                </span>

                {/*Choose Color*/}
                <span className="grpInputStyle">
                  <label className="chooseColor">Choose Colour</label>

                  <div className="colorsContainer">
                    {Object.keys(chooseColor).map((colorHexCode, index) => (
                      <span
                        onClick={() => {
                          colorPicked = colorHexCode;
                          let otherColors = {};
                          Object.entries(chooseColor).map(([color, index]) => {
                            if (color !== colorPicked) {
                              otherColors[color] = false;
                            } else {
                              otherColors[color] = true;
                            }
                          });
                          setChooseColors(() => otherColors);
                        }}
                        key={colorHexCode}
                        style={
                          !chooseColor[colorHexCode]
                            ? { background: colorHexCode }
                            : {
                                border: "solid 3px grey",
                                background: colorHexCode,
                              }
                        }
                        className="chooseColor"
                      ></span>
                    ))}
                  </div>
                </span>
              </div>

              {/*Create Button */}
              <div className="createBtnDiv">
                <button onClick={addGroupList} className="createBtn">
                  Create
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default App;
