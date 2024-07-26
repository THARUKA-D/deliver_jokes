const express = require("express");
const { applyMiddleware, applyRoutes } = require("./utils");
const { routes, middleware } = require("./middleware");
const { connectMysqlDb } = require("./utils/db");

const PORT = 3000;
const router = express();

connectMysqlDb();

applyMiddleware(middleware, router);
applyRoutes(routes, router);

router.listen(PORT, () => {
	console.log(`Server is running on Port:${PORT}`);
});