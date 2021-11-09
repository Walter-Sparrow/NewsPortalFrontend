import React, { useState, useEffect } from "react";
import "./AddRequestPopup.css";
import API from "../../api";
const api = new API();

const AddRequestPopup = (props) => {
  const { isActive } = props.trigger;
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(1);
  const [userFile, setUserFile] = useState();
  const setTrigger = props.setTrigger;
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    api.fetchAllSections().then(({ content }) => {
      setSections(content);
    });
  }, []);

  const addNewArticle = () => {
    if (!userFile) return;
    api.addNewArticle(selectedSection, userFile[0]).then((response) => {
      if (response.message === undefined)
        setTrigger({ ...props.trigger, isActive: false });
      else {
        setErrorMessage(response.message);
      }
    });
  };

  return (
    isActive && (
      <div className="popup">
        <div className="popupInner">
          <button
            onClick={() => setTrigger({ ...props.trigger, isActive: false })}
          ></button>
          {errorMessage && <h2>{errorMessage}</h2>}
          {!errorMessage && (
            <>
              <div className="controls">
                <input
                  className="fileInput"
                  type="file"
                  name="zipHolder"
                  id="1"
                  onChange={({ target }) => setUserFile(target.files)}
                />
                <label for="sections">Choose a section:</label>

                <select
                  name="sections"
                  id="sections"
                  onChange={({ target }) => setSelectedSection(target.value)}
                >
                  {sections.map((section) => {
                    return <option value={section.id}>{section.name}</option>;
                  })}
                </select>

                <button className="submit-btn" onClick={() => addNewArticle()}>
                  add
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default AddRequestPopup;
