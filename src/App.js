import React, { useState, useEffect } from "react";
import NewsGrid from "./components/NewsGrid";
import Popup from "./components/AddRequestPopup";
import ViewArticlePopup from "./components/ArticleView";
import API from "./api";
const api = new API();

const App = () => {
  const [clickedSection, setClickedSection] = useState({});
  const [sections, setSections] = useState([]);
  const [addPopUpTrigger, setAddPopUpTrigger] = useState({
    isActive: false,
  });
  const [viewPopUpTrigger, setViewPopUpTrigger] = useState({
    isActive: false,
  });

  useEffect(() => {
    api.fetchAllSections().then(({ content }) => {
      setSections([
        {
          id: 0,
          name: "all",
        },
        ...content,
      ]);
      setClickedSection(content[0]);
    });
  }, []);

  const sectionButtonClick = (section) => {
    setClickedSection(section);
  };

  return (
    <>
      <main className="container">
        <div className="header">
          <h1>FirstNews</h1>
          <button
            className="add-btn"
            onClick={() => setAddPopUpTrigger({ isActive: true })}
          >
            add article
          </button>
        </div>
        <div className="innerWrapper">
          <div className="sectionsWrapper">
            {sections.length > 0 &&
              sections.map((section) => {
                return (
                  <button
                    key={section.id}
                    className={`section
                    ${clickedSection.id === section.id && "selected"}`}
                    onClick={() => sectionButtonClick(section)}
                  >
                    {section.name}
                  </button>
                );
              })}
          </div>
          <NewsGrid
            section={clickedSection}
            viewTrigger={setViewPopUpTrigger}
          />
        </div>
        {addPopUpTrigger.isActive && (
          <Popup trigger={addPopUpTrigger} setTrigger={setAddPopUpTrigger} />
        )}
        {viewPopUpTrigger.isActive && (
          <ViewArticlePopup
            trigger={viewPopUpTrigger}
            setTrigger={setViewPopUpTrigger}
          />
        )}
      </main>
    </>
  );
};

export default App;
