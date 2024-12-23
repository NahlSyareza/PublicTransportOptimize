const alg = require("../models/algorithm_conf");

const coords = {
  stManggarai: [106.84997503831084, -6.210434394178989],
  stTebet: [106.85843992737534, -6.2263980321163785],
  stCawang: [106.85868911789868, -6.242550437138419],
  stDurenKalibata: [106.85516790771038, -6.255202239308758],
  stPasarMingguBaru: [106.851796078127, -6.26279835309812],
  stPasarMinggu: [106.84485465110748, -6.283332973466244],
  stTanjungBarat: [106.83894821636488, -6.308041206274282],
  stLentengAgung: [106.83467834757363, -6.3303075907219295],
  stUniversitasPancasila: [106.83426287841388, -6.339344758651663],
  stUniversitasIndonesia: [106.83178133141689, -6.360430625491446],
  stPondokCina: [106.83208480681662, -6.369059538548413],
};

const relations = {
  stManggarai: ["stTebet"],
  stTebet: ["stManggarai", "stCawang"],
  stCawang: ["stTebet", "stDurenKalibata"],
  stDurenKalibata: ["stCawang", "stPasarMingguBaru"],
  stPasarMingguBaru: ["stDurenKalibata", "stPasarMinggu"],
  stPasarMinggu: ["stPasarMingguBaru", "stTanjungBarat"],
  stTanjungBarat: ["stPasarMinggu", "stLentengAgung"],
  stLentengAgung: ["stTanjungBarat", "stUniversitasPancasila"],
  stUniversitasPancasila: ["stLentengAgung", "stUniversitasIndonesia"],
  stUniversitasIndonesia: ["stUniversitasPancasila", "stPondokCina"],
  stPondokCina: ["stUniversitasIndonesia"],
};

exports.points = [
  {
    coords: coords.stManggarai,
    id: "stManggarai",
    type: "st",
    name: "St. Manggarai",
    desc: "Manggarai station, please mind the platform gap",
    relations: relations.stManggarai,
  },
  {
    coords: coords.stTebet,
    id: "stTebet",
    type: "st",
    name: "St. Tebet",
    desc: "Tebet station, please mind the platform gap",
    relations: relations.stTebet,
  },
  {
    coords: coords.stCawang,
    id: "stCawang",
    type: "st",
    name: "St. Cawang",
    desc: "Cawang station, please mind the platform gap",
    relations: relations.stCawang,
  },
  {
    coords: coords.stDurenKalibata,
    id: "stDurenKalibata",
    type: "st",
    name: "St. Duren Kalibata",
    desc: "Duren Kalibata station, please mind the platform gap",
    relations: relations.stDurenKalibata,
  },
  {
    coords: coords.stPasarMingguBaru,
    id: "stPasarMingguBaru",
    type: "st",
    name: "St. Pasar Minggu Baru",
    desc: "Pasar Minggu Baru station, please mind the platform gap",
    relations: relations.stPasarMingguBaru,
  },
  {
    coords: coords.stPasarMinggu,
    id: "stPasarMinggu",
    type: "st",
    name: "St. Pasar Minggu",
    desc: "Pasar Minggu station, please mind the platform gap",
    relations: relations.stPasarMinggu,
  },
  {
    coords: coords.stTanjungBarat,
    id: "stTanjungBarat",
    type: "st",
    name: "St. Tanjung Barat",
    desc: "Tanjung Barat station, please mind the platform gap",
    relations: relations.stTanjungBarat,
  },
  {
    coords: coords.stLentengAgung,
    id: "stLentengAgung",
    type: "st",
    name: "St. Lenteng Agung",
    desc: "Lenteng Agung station, please mind the platform gap",
    relations: relations.stLentengAgung,
  },
  {
    coords: coords.stUniversitasPancasila,
    id: "stUniversitasPancasila",
    type: "st",
    name: "St. Universitas Pancasila",
    desc: "Universitas Pancasila station, please mind the platform gap",
    relations: relations.stUniversitasPancasila,
  },
  {
    coords: coords.stUniversitasIndonesia,
    id: "stUniversitasIndonesia",
    type: "st",
    name: "St. Universitas Indonesia",
    desc: "Universitas Indonesia station, please mind the platform gap",
    relations: relations.stUniversitasIndonesia,
  },
  {
    coords: coords.stPondokCina,
    id: "stPondokCina",
    type: "st",
    name: "St. Pondok Cina",
    desc: "Pondok Cina station, please mind the platform gap",
    relations: relations.stPondokCina,
  },
];

// This is some next level magic right here
// Short for Breadth First Search
// const bfs = (src, dest, rel) => {
//   let queue = [[src]];
//   let visited = new Set();

//   while (queue.length > 0) {
//     const path = queue.shift();
//     const node = path[path.length - 1];

//     if (node === dest) {
//       return path;
//     }

//     if (!visited.has(node)) {
//       visited.add(node);
//       const neighbors = rel[node] || []; // Get the neighbors of the current node
//       // For each neighbor, add the new path to the queue
//       neighbors.forEach((neighbor) => {
//         queue.push([...path, neighbor]); // Append the neighbor to the current path
//       });
//     }
//   }

//   return [];
// };

// const fnp = (src, dest) => {
//   let nearest = null;
//   let minDistance = Infinity;

//   const calculateDistance = ([lng1, lat1], [lng2, lat2]) => {
//     const lngDiff = lng2 - lng1;
//     const latDiff = lat2 - lat1;

//     return Math.sqrt(Math.pow(lngDiff, 2) + Math.pow(latDiff, 2));
//   };

//   Object.entries(src).forEach(([key, value]) => {
//     const distance = calculateDistance(value, dest);
//     if (distance < minDistance) {
//       minDistance = distance;
//       nearest = { key, value, distance };
//     }
//   });

//   return nearest.key;
// };

exports.getStRoutes = (src, dest) => {
  const st = alg.bfs(
    alg.fnp(stPoints, src),
    alg.fnp(stPoints, dest),
    relations
  );
  const coordsTrue = st.map((sta) => coords[sta]);

  return coordsTrue;
};

exports.getstPoints = (src, dest) => {
  const st = alg.bfs(
    alg.fnp(stPoints, src),
    alg.fnp(stPoints, dest),
    relations
  );

  const stPointsTrue = stPoints.filter((e) => st.includes(e.id));
  return stPointsTrue;
};
