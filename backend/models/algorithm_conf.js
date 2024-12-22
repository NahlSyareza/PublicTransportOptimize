// This is some next level magic right here
// Short for Breadth First Search
exports.bfs = (src, dest) => {
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

exports.fnp = (dest) => {
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
