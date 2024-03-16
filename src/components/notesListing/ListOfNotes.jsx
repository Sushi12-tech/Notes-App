import React from "react";
import { useState, useRef } from "react";
import "./listOfNotes.css";
import ViewNotes from "./ViewNotes";
import bgImage from "../../images/bg_image.png";
import lockIcon from "../../images/lock.png";
import goBack from "../../images/back-arrow.png";
import sendArrowBlue from "../../images/blue-arrow.jpg";
import sendArrowGrey from "../../images/grey-arrow.jpg";

let everyNotes = {};

function ListOfNotes(props) {
  let selectedGroupName = props.everyGroup.filter(
    (selGrp) => selGrp.id == props.selectedGroup
  )[0];

  // Create a ref to store a reference to the note input field
  let noteInputRef = useRef("");

  let [eachNotes, setEachNotes] = useState(everyNotes);
  const [arrowColor, setArrowColor] = useState();

  everyNotes = JSON.parse(localStorage.getItem("Notes"));

  // Check if everyNotes is undefined, and initialize it as an empty object if true
  if (everyNotes == undefined) {
    everyNotes = {};
  }

  //Responsible for handling validation and adding notes to existing/new array
  function submitNote() {
    // Check if the input is empty
    if (noteInputRef.current.value.trim() == "") {
      alert("Cannot save empty message");
      return;
    }
    // Create a new note object with the current date and input value
    let note = {
      date: new Date().toString(),
      inp_note: noteInputRef.current.value,
    };

    // Clear the input field
    noteInputRef.current.value = "";

    // Check if notes exist for the selected group
    if (Object.keys(everyNotes).includes(selectedGroupName.id)) {
      // Add the new note to the existing array of notes for the selected group
      everyNotes[selectedGroupName.id].push(note);
    } else {
      everyNotes = { ...everyNotes, [selectedGroupName.id]: [note] };
    }

    setEachNotes(everyNotes);

    localStorage.setItem("Notes", JSON.stringify(everyNotes));
  }

  //Changes arrow color
  const handleInputChange = () => {
    setArrowColor(noteInputRef.current.value);
  };

  return (
    <section className="rightSection">
      {!props.selectedGroup ? (
        <div className="defaultSection">
          <div className="defaultMessageWrapper">
            <img style={{ width: "100%" }} src={bgImage}></img>
            <h1 className="rightHeading">Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>

          <div className="encryptMsg">
            <p>
              {" "}
              <img src={lockIcon} /> end-to-end encrypted
            </p>
          </div>
        </div>
      ) : (
        <div className="displayNotesContainer">
          <div className="notesHeading">
            {
              !props.isBigScreen && (
                <div
                  className="backBtnDiv"
                  onClick={() => {
                    props.setSelectedGroup((selected) => !selected);
                  }}
                >
                  <img src={goBack} />
                </div>
              ) //
            }

            <div
              style={{ background: selectedGroupName.color }}
              className="navGroupIcon"
            >
              {selectedGroupName.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="groupNameRightSide">{selectedGroupName.name}</div>
          </div>

          <div className="showAllNotes">
            {Object.keys(eachNotes).includes(selectedGroupName.id) &&
              eachNotes[selectedGroupName.id].map((note) => (
                <ViewNotes
                  key={note.date}
                  date={note.date}
                  note={note.inp_note}
                />
              ))}
          </div>

          {/*Text Area and Submit*/}
          <div className="userInputContainer">
            <textarea
              ref={noteInputRef}
              className="textInput textInputPlaceholder"
              placeholder="Enter your text here.... "
              onInput={handleInputChange}
            ></textarea>
            <img
              onClick={submitNote}
              src={arrowColor ? sendArrowBlue : sendArrowGrey}
              className="sendArrow"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default ListOfNotes;
