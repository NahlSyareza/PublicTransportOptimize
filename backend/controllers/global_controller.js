const alg = require("../models/algorithm_conf");
const stController = require("../controllers/st_controller");
const stlController = require("../controllers/stl_controller");

const globalPoints = [...stController.points, ...stlController.points];

console.log("Heheheha");

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
      case "st":
        console.log("Source is st");
        routesSrc = alg.bfs(stController.points, fnpSrc.id, "stCawang");
        break;

      case "stl":
        console.log("Source is stl");
        routesSrc = alg.bfs(stlController.points, fnpSrc.id, "stlCikoko");
        break;

      default:
        console.log("What is that type? Are you joking?");
        break;
    }

    switch (fnpDest.type) {
      case "st":
        console.log("Destination is st");
        routesDest = alg.bfs(stController.points, "stCawang", fnpDest.id);
        break;

      case "stl":
        console.log("Destination is stl");
        routesDest = alg.bfs(stlController.points, "stlCikoko", fnpDest.id);
        break;

      default:
        console.log("What is this type? Are you joking?");
        break;
    }

    routes = [...routesSrc, ...routesDest];

    // console.log(
    //   `Is not the same! (fnpSrc: ${fnpSrc.type} fnpDest: ${fnpDest.type})`
    // );
  } else {
    switch (fnpSrc.type) {
      case "st":
        console.log("Both type is st");
        routes = alg.bfs(stController.points, fnpSrc.id, fnpDest.id);
        break;

      case "stl":
        console.log("Both type is stl");
        routes = alg.bfs(stlController.points, fnpSrc.id, fnpDest.id);
        break;

      default:
        break;
    }

    // console.log(
    //   `Is the same! (fnpSrc: ${fnpSrc.type} fnpDest: ${fnpDest.type})`
    // );
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
  const points = stController.points;

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
