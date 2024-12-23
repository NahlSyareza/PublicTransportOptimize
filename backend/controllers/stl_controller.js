const alg = require("../models/algorithm_conf");

const coords = {
  stlJatibeningBaru: [106.92793843059258, -6.2577113950029],
  stlHalim: [106.88731413994873, -6.245803674280708],
  stlCawang: [106.87124211639338, -6.245894236283931],
  stlCiliwung: [106.86396806693443, -6.2434282466313675],
  stlCikoko: [106.8570212536103, -6.243483894762477],
};

const relations = {
  stlJatibeningBaru: ["stlHalim"],
  stlHalim: ["stlJatibeningBaru", "stlCawang"],
  stlCawang: ["stlHalim", "stlCiliwung"],
  stlCiliwung: ["stlCawang", "stlCikoko"],
  stlCikoko: ["stlCiliwung"],
};

exports.points = [
  {
    coords: coords.stlJatibeningBaru,
    id: "stlJatibeningBaru",
    type: "stl",
    name: "Stasiun LRT Jatibening Baru",
    desc: "Jatibening Baru LRT station, please mind your belongings",
    relations: relations.stlJatibeningBaru,
  },
  {
    coords: coords.stlHalim,
    id: "stlHalim",
    type: "stl",
    name: "Stasiun LRT Halim",
    desc: "Halim LRT station, please mind your belongings",
    relations: relations.stlHalim,
  },
  {
    coords: coords.stlCawang,
    id: "stlCawang",
    type: "stl",
    name: "Stasiun LRT Cawang",
    desc: "Cawang LRT station, please mind your belongings",
    relations: relations.stlCawang,
  },
  {
    coords: coords.stlCiliwung,
    id: "stlCiliwung",
    type: "stl",
    name: "Stasiun LRT Ciliwung",
    desc: "Ciliwung LRT station, please mind your belongings",
    relations: relations.stlCiliwung,
  },
  {
    coords: coords.stlCikoko,
    id: "stlCikoko",
    type: "stl",
    name: "Stasiun LRT Cikoko",
    desc: "Cikoko LRT station, please mind your belongings",
    relations: relations.stlCikoko,
  },
];

const a = [
  {
    name: "a",
    id: "1",
  },
];

const b = [{ name: "b", id: "2" }];
