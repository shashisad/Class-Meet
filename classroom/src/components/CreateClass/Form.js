import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useLocalContext } from "../../context/context";
import { v4 as uuidV4 } from "uuid";
import db from "../../lib/firebase";

import './style.css'

const Form = () => {
  const [className, setClassName] = useState("");
  // const [classNameerror, setClassNameerror] = useState(false);
  const [Section, setSection] = useState("");
  // const [Sectionerror, setSectionerror] = useState(false);
  const [Room, setRoom] = useState("");
  // const [Roomerror, setRoomerror] = useState(false);
  const [Subject, setSubject] = useState("");
  // const [Subjecterror, setSubjecterror] = useState(false);

  const [hasError, setHasError] = useState("");
  const { loggedInMail, setCreateClassDialog } = useLocalContext();

  const addClass = (e) => {
    e.preventDefault();

    // setClassNameerror("");
    // setSectionerror("");
    // setRoomerror("");
    // setSubjecterror("");


    setHasError("");

    if (className === "" || Section=== "" ||Room==="" || Subject==="") {
  
      setHasError("Fields that are marked with * are mandatory");
      return;
  }

  alert(`Successfully Submitted`);
if(hasError===""){

    const id = uuidV4();

    db.collection("CreatedClasses")
      .doc(loggedInMail)
      .collection("classes")
      .doc(id)
      .set({
        owner: loggedInMail,
        className: className,
        section: Section,
        room: Room,
        id: id,
      })
      .then(() => {
        setCreateClassDialog(false);
      });


    }
  };
  return (
    <div className="form">
      <p className="class__title">Create Class</p>

      <div className="form__inputs">
        <TextField
          id="filled-basic"
          label="Class Name (required)"
          className="form__input"
          variant="filled"
          required
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
          
        <TextField
          id="filled-basic"
          label="Section"
          required
          className="form__input"
          variant="filled"
          value={Section}
          onChange={(e) => setSection(e.target.value)}
        />
          
        <TextField
          id="filled-basic"
          label="Subject"
          className="form__input"
          required
          variant="filled"
          value={Subject}
          onChange={(e) => setSubject(e.target.value)}
        />  
        <TextField
          id="filled-basic"
          label="Room"
          required
          className="form__input"
          variant="filled"
          value={Room}
          onChange={(e) => setRoom(e.target.value)}
        />  
      
      {hasError !== "" && <p style={{ color: 'red' }}>{hasError}</p>}
      </div>
      <DialogActions>
        <Button onClick={addClass} color="primary">
          Create
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;