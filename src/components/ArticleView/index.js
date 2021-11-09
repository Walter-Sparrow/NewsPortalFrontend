import React from "react";
import "./ArticleView.css";

const ArticleView = (props) => {
  const { isActive, article } = props.trigger;
  const setTrigger = props.setTrigger;
  return (
    isActive && (
      <div className="popup">
        <div className="popupInner">
          <button
            onClick={() => setTrigger({ ...props.trigger, isActive: false })}
          ></button>
          <div className="articleWrapper">
            <h1 className="articleTitle">{article.title}</h1>
            <p className="articleText">{article.innerText}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default ArticleView;
