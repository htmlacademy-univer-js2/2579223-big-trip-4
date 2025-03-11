function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const filterWaypoints = {
  everything: (waypoints) => waypoints,
  future: (waypoints) => waypoints.filter((wp) => new Date(wp.dateFrom) > new Date()),
  past: (waypoints) => waypoints.filter((wp) => new Date(wp.dateTo) < new Date()),
  present: (waypoints) => waypoints.filter((wp) => new Date(wp.dateFrom) <= new Date() && new Date(wp.dateTo) >= new Date())
};

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomArrayElement, getRandomInteger,updateItem, filterWaypoints };
