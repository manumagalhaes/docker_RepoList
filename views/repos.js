"use strict";

const USERNAME = process.env.USERNAME;

/**
 * Fetch user repos
 */
const getRepos = function () {
  fetch(`https://api.github.com/users/${USERNAME}/repos`)
    // fetch(`https://api.github.com/users/manumagalhaes/repos`)
    .then((response) => response.json())
    .then((jsonData) => {
      extractData(jsonData);
    })
    .catch((error) => console.log(error));
};

/**
 * Extract data to be used on page
 * @param data - the JSON data
 */
const extractData = function (data) {
  data.forEach((repo) => {
    let { name, html_url, created_at, description, language } = repo;

    let dateCreated = new Date(created_at);
    $(".repos").append(
      createTemplate(name, html_url, dateCreated, description, language)
    );
  });
};

/**
 * Create HTML template for each result
 * @param repo_name
 * @param url
 * @param created_at
 * @param decription
 */
const createTemplate = function (repo_name, url, date, description, language) {
  let template = `
  <section>
    <h2><a href="${url}">${repo_name}</a></h2>
    <ul>
      <li>Description: ${description}</li>
      <li>
        Date created: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
      </li>
      <li>
        Language: ${language}
      </li>
    </ul>
  </section>
  `;
  return template;
};

$(getRepos);
