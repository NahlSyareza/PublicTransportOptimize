const alg = require("../models/algorithm_conf");

const stlPoints = [
  "stlJatibeningBaru",
  "stlHalim",
  "stlCawang",
  "stlCiliwung",
  "stlCikoko",
];

const stlCollections = {
  stlJatibeningBaru: [106.92793843059258, -6.2577113950029],
  stlHalim: [106.88731413994873, -6.245803674280708],
  stlCawang: [106.87124211639338, -6.245894236283931],
  stlCiliwung: [106.86396806693443, -6.2434282466313675],
  stlCikoko: [106.8570212536103, -6.243483894762477],
};

const stlMarkers = [
  {
    coords: stlCollections.stlJatibeningBaru,
    id: "stlJatibeningBaru",
    name: "Stasiun LRT Jatibening Baru",
    desc: "Jatibening Baru LRT station, please mind your belongings",
  },
  {
    coords: stlCollections.stlHalim,
    id: "stlHalim",
    name: "Stasiun LRT Halim",
    desc: "Halim LRT station, please mind your belongings",
  },
  {
    coords: stlCollections.stlCawang,
    id: "stlCawang",
    name: "Stasiun LRT Cawang",
    desc: "Cawang LRT station, please mind your belongings",
  },
  {
    coords: stlCollections.stlCiliwung,
    id: "stlCiliwung",
    name: "Stasiun LRT Ciliwung",
    desc: "Ciliwung LRT station, please mind your belongings",
  },
  {
    coords: stlCollections.stlCikoko,
    id: "stlCikoko",
    name: "Stasiun LRT Cikoko",
    desc: "Cikoko LRT station, please mind your belongings",
  },
];

const stlRelations = {
  stlJatibeningBaru: ["stlHalim"],
  stlHalim: ["stlJatibeningBaru", "stlCawang"],
  stlCawang: ["stlHalim", "stlCiliwung"],
  stlCiliwung: ["stlCawang", "stlCikoko"],
  stlCikoko: ["stlCiliwung"],
};
