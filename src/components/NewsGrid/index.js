import React, { useState, useEffect } from "react";
import NewsCard from "../NewsCard";
import "./NewsGrid.css";
import API from "../../api/index";
import { EntypoChevronLeft, EntypoChevronRight } from "react-entypo";

const api = new API();

const NewsGrid = ({ section, viewTrigger }) => {
  const [newsCollection, setNewsCollection] = useState([]);
  const [message, setMessage] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (section.id === 0 || section.id === undefined)
      api.fetchAllNews(pageNumber).then((response) => {
        setPageInfo(response);
        setNewsCollection(response.content);
      });
    else
      api.fetchAllNewsBySection(section.id, pageNumber).then((response) => {
        setPageInfo(response);
        setNewsCollection(response.content);
      });

    if (newsCollection.length === 0)
      setMessage("No articles on this section yet");
  }, [section, pageNumber]);

  useEffect(() => {
    setPageNumber(0);
  }, [section]);

  return (
    <>
      <div className="controls">
        <EntypoChevronLeft
          onClick={() => {
            if (!pageInfo.first) setPageNumber(pageNumber - 1);
          }}
          className={`arrows arrowL ${pageInfo && pageInfo.first && "blocked"}`}
          style=""
        />
        <EntypoChevronRight
          onClick={() => {
            if (!pageInfo.last) setPageNumber(pageNumber + 1);
          }}
          className={`arrows arrowR ${pageInfo && pageInfo.last && "blocked"}`}
          style=""
        />
      </div>
      {newsCollection.length === 0 && (
        <h1 className="notFoundMessage">{message}</h1>
      )}
      <section className="newsGrid">
        {newsCollection.map((news) => {
          return (
            <div
              key={news.id}
              onClick={() => viewTrigger({ isActive: true, article: news })}
            >
              <NewsCard title={news.title} section={news.section} />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default NewsGrid;
