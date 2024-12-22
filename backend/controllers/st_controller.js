const stPoints = [
  "stManggarai",
  "stTebet",
  "stCawang",
  "stDurenKalibata",
  "stPasarMingguBaru",
  "stPasarMinggu",
  "stTanjungBarat",
  "stLentengAgung",
  "stUniversitasPancasila",
  "stUniversitasIndonesia",
  "stPondokCina",
];

const stCollections = {
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

const stMarkers = [
  {
    coords: stCollections.stManggarai,
    id: "stManggarai",
    name: "St. Manggarai",
    desc: "Manggarai station, please mind the platform gap",
  },
  {
    coords: stCollections.stTebet,
    id: "stTebet",
    name: "St. Tebet",
    desc: "Tebet station, please mind the platform gap",
  },
  {
    coords: stCollections.stCawang,
    id: "stCawang",
    name: "St. Cawang",
    desc: "Cawang station, please mind the platform gap",
  },
  {
    coords: stCollections.stDurenKalibata,
    id: "stDurenKalibata",
    name: "St. Duren Kalibata",
    desc: "Duren Kalibata station, please mind the platform gap",
  },
  {
    coords: stCollections.stPasarMingguBaru,
    id: "stPasarMingguBaru",
    name: "St. Pasar Minggu Baru",
    desc: "Pasar Minggu Baru station, please mind the platform gap",
  },
  {
    coords: stCollections.stPasarMinggu,
    id: "stPasarMinggu",
    name: "St. Pasar Minggu",
    desc: "Pasar Minggu station, please mind the platform gap",
  },
  {
    coords: stCollections.stTanjungBarat,
    id: "stTanjungBarat",
    name: "St. Tanjung Barat",
    desc: "Tanjung Barat station, please mind the platform gap",
  },
  {
    coords: stCollections.stLentengAgung,
    id: "stLentengAgung",
    name: "St. Lenteng Agung",
    desc: "Lenteng Agung station, please mind the platform gap",
  },
  {
    coords: stCollections.stUniversitasPancasila,
    id: "stUniversitasPancasila",
    name: "St. Universitas Pancasila",
    desc: "Universitas Pancasila station, please mind the platform gap",
  },
  {
    coords: stCollections.stUniversitasIndonesia,
    id: "stUniversitasIndonesia",
    name: "St. Universitas Indonesia",
    desc: "Universitas Indonesia station, please mind the platform gap",
  },
  {
    coords: stCollections.stPondokCina,
    id: "stPondokCina",
    name: "St. Pondok Cina",
    desc: "Pondok Cina station, please mind the platform gap",
  },
];

const stRelations = {
  stManggarai: ["stTebet"],
  stTebet: ["stManggarai", "stCawang"],
  stCawang: ["stTebet", "stDurenKalibata"],
  stDurenKalibata: ["stCawang", "stPasarMingguBaru"],
  stPasarMingguBaru: ["stDurenKalibata", "stPasarMinggu"],
  stPasarMinggu: ["stPasarMinggu", "stTanjungBarat"],
  stTanjungBarat: ["stPasarMinggu", "stLentengAgung"],
  stLentengAgung: ["stTanjungBarat", "stUniversitasPancasila"],
  stUniversitasPancasila: ["stLentengAgung", "stUniversitasIndonesia"],
  stUniversitasIndonesia: ["stUniversitasPancasila", "stPondokCina"],
  stPondokCina: ["stUniversitasIndonesia"],
};

// This is some next level magic right here
// Short for Breadth First Search
const bfs = (src, dest) => {
  let queue = [[src]];
  let visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node === dest) {
      return path;
    }

    if (!visited.has(node)) {
      visited.add(node);
      const neighbors = stRelations[node] || []; // Get the neighbors of the current node
      // For each neighbor, add the new path to the queue
      neighbors.forEach((neighbor) => {
        queue.push([...path, neighbor]); // Append the neighbor to the current path
      });
    }
  }

  return [];
};

const fnp = (dest) => {
  let nearest = null;
  let minDistance = Infinity;

  const calculateDistance = ([lng1, lat1], [lng2, lat2]) => {
    const lngDiff = lng2 - lng1;
    const latDiff = lat2 - lat1;

    return Math.sqrt(Math.pow(lngDiff, 2) + Math.pow(latDiff, 2));
  };

  Object.entries(stCollections).forEach(([key, value]) => {
    const distance = calculateDistance(value, dest);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = { key, value, distance };
    }
  });

  return nearest.key;
};

exports.getStRoutes = async (req, res) => {};

exports.getStPoints = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Successfully fetched stPoints!",
      payload: stPoints,
    });
  } catch (res) {
    return res.status(500).json(error.message);
  }
};

exports.getStCollections = async (req, res) => {
  const { src, dest } = req.query;
  const st = bfs(fnp(src), fnp(dest));
  const stCollectionsTrue = st.map((sta) => stCollections[sta]);

  try {
    return res.status(200).json({
      message: "Successfully fetched all stCollections",
      payload: stCollectionsTrue,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

exports.getStMarkers = async (req, res) => {
  const { src, dest } = req.query;
  const st = bfs(fnp(src), fnp(dest));
  const stMarkersTrue = stMarkers.filter((e) => st.includes(e.id));

  try {
    return res.status(200).json({
      message: "Successfully fetched all stMarkers",
      payload: stMarkersTrue,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
