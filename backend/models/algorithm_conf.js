exports.bfs = (set, src, dest) => {
  const visited = new Set();
  const queue = [[set.find((s) => s.id === src)]];

  while (queue.length > 0) {
    const path = queue.shift();
    const currentStation = path[path.length - 1];

    if (currentStation.id === dest) {
      return path;
    }

    if (!visited.has(currentStation.id)) {
      visited.add(currentStation.id);
      for (const neighborId of currentStation.relations) {
        const neighborStation = set.find((s) => s.id === neighborId);
        if (neighborStation && !visited.has(neighborId)) {
          queue.push([...path, neighborStation]);
        }
      }
    }
  }

  return null;
};

exports.fnp = (set, dest) => {
  let nearestStation = null;
  let shortestDistance = Infinity;

  set.forEach((station) => {
    const [x1, y1] = dest;
    const [x2, y2] = station.coords;

    // Calculate Euclidean distance
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestStation = station;
    }
  });

  return nearestStation;
};
