const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/repositories/:id', checkRepoIdExistence);

function checkRepoIdExistence(request, response, next) {
  const { id } = request.params;

  if (!id || repositories.findIndex((repo) => repo.id === id) === -1) {
    return response.status(400).send();
  }

  return next();
}

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repos = 
  {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repos);
  
  return response.json(repos);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;
  const reposIndex = repositories.findIndex(repo => repo.id === id);
  const repos = repositories[reposIndex]

  if (title) {
    repos.title = title;
  }

  if (url) {
    repos.url = url;
  }

  if (techs) {
    repos.techs = techs;
  }
   
  repositories[reposIndex] = repos;

  return response.status(200).json(repos);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const reposIndex = repositories.findIndex(repo => repo.id === id);

  if (reposIndex < 0){
    return response.status(400).json({"error": "id not found"});
  }
  repositories.splice(reposIndex, 1);
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const reposIndex = repositories.findIndex((repo) => repo.id === id);
  const giveLikes = repositories[reposIndex]

  giveLikes.likes++

  return response.json(giveLikes);
});

module.exports = app;
