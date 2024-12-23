const alg = require("../models/algorithm_conf");
const stkController = require("./stk_controller");
const stlController = require("./stl_controller");

const globalPoints = [...stkController.points, ...stlController.points];

exports.getAllGlobalPoints = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Success!",
      payload: globalPoints,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getGlobalRoutes = async (req, res) => {
  let { src, dest } = req.query;

  if (typeof src === "string") {
    src = JSON.parse(src);
  }

  if (typeof dest === "string") {
    dest = JSON.parse(dest);
  }

  const fnpSrc = alg.fnp(globalPoints, src);
  const fnpDest = alg.fnp(globalPoints, dest);

  let routes;

  if (fnpSrc.type !== fnpDest.type) {
    let routesSrc;
    let routesDest;

    switch (fnpSrc.type) {
      case "stk":
        routesSrc = alg.bfs(stkController.points, fnpSrc.id, "stkCawang");
        break;

      case "stl":
        routesSrc = alg.bfs(stlController.points, fnpSrc.id, "stlCikoko");
        break;

      default:
        break;
    }

    switch (fnpDest.type) {
      case "stk":
        routesDest = alg.bfs(stkController.points, "stkCawang", fnpDest.id);
        break;

      case "stl":
        routesDest = alg.bfs(stlController.points, "stlCikoko", fnpDest.id);
        break;

      default:
        break;
    }

    routes = [...routesSrc, ...routesDest];
  } else {
    switch (fnpSrc.type) {
      case "stk":
        routes = alg.bfs(stkController.points, fnpSrc.id, fnpDest.id);
        break;

      case "stl":
        routes = alg.bfs(stlController.points, fnpSrc.id, fnpDest.id);
        break;

      default:
        break;
    }
  }

  try {
    return res.status(200).json({
      message: "Success!",
      payload: routes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStRoutes = async (req, res) => {
  let { src, dest } = req.query;
  const points = stkController.points;

  if (typeof src === "string") {
    src = JSON.parse(src);
  }

  if (typeof dest === "string") {
    dest = JSON.parse(dest);
  }

  const fnpSrc = alg.fnp(points, src);
  const fnpDest = alg.fnp(points, dest);

  const routes = alg.bfs(points, fnpSrc.id, fnpDest.id);

  try {
    return res.status(200).json({
      message: "Success",
      payload: routes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStlRoutes = async (req, res) => {
  let { src, dest } = req.query;
  const points = stlController.points;

  if (typeof src === "string") {
    src = JSON.parse(src);
  }

  if (typeof dest === "string") {
    dest = JSON.parse(dest);
  }

  fnpSrc = alg.fnp(points, src);
  fnpDest = alg.fnp(points, dest);

  const routes = alg.bfs(points, fnpSrc.id, fnpDest.id);

  try {
    return res.status(200).json({
      message: "Success",
      payload: routes,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
