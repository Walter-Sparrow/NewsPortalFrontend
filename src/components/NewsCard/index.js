import React from "react";
import "./NewsCard.css";
import {
  EntypoMedal,
  EntypoMegaphone,
  EntypoAircraftTakeOff,
  EntypoBriefcase,
  EntypoChat,
} from "react-entypo";

const NewsCard = ({ title, section }) => {
  return (
    <div className="newsCard">
      <div className="wrapper">
        {section.id === 1 ? (
          <EntypoMedal className="icon" style="" />
        ) : section.id === 2 ? (
          <EntypoBriefcase className="icon" style="" />
        ) : section.id === 3 ? (
          <EntypoAircraftTakeOff className="icon" style="" />
        ) : section.id === 4 ? (
          <EntypoMegaphone className="icon" style="" />
        ) : section.id === 5 ? (
          <EntypoChat className="icon" style="" />
        ) : null}
        <div className="titleHolder">
          <h4 className="title">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
