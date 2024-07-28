const {
  fetchJoke,
  jokeTypes,
  addJoke,
} = require("../controllers/jokes-controller");

const routes = [
  {
    path: "/fetchJoke",
    handler: fetchJoke,
    method: "get",
  },
  {
    path: "/jokeTypes",
    handler: jokeTypes,
    method: "get",
  },
  {
    path: "/addJoke",
    handler: addJoke,
    method: "post",
  },
];

module.exports = {
  routes,
};
