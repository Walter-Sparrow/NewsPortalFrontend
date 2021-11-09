const baseUrl = "http://localhost:8080";
const newsUrl = "/news";
const sectionsUrl = "/sections";

class API {
  async addNewArticle(sectionId, file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("section_id", sectionId);

    return fetch(`${baseUrl}${newsUrl}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async fetchAllSections(errorCallback = () => {}) {
    return fetch(`${baseUrl}/${sectionsUrl}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300)
          return response.json();
        errorCallback(true);
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async fetchAllNews(pageNumber = 0, pageSize = 6, errorCallback = () => {}) {
    return fetch(
      `${baseUrl}/${newsUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.status >= 200 && response.status < 300)
          return response.json();
        errorCallback(true);
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  async fetchAllNewsBySection(
    sectionId,
    pageNumber = 0,
    pageSize = 6,
    errorCallback = () => {}
  ) {
    return fetch(
      `${baseUrl}/${newsUrl}?section_id=${sectionId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.status >= 200 && response.status < 300)
          return response.json();
        errorCallback(true);
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }
}

export default API;
