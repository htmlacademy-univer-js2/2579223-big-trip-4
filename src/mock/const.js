const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const CITIES = [
  'Amsterdam',
  'Athens',
  'Baghdad',
  'Bangkok',
  'Barcelona',
  'Beijing',
  'Belgrade',
  'Berlin',
  'Bogota',
  'Bratislava',
  'Brussels',
  'Bucharest',
  'Budapest',
  'Buenos Aires',
  'Cairo',
  'Cape Town',
];

const DESCRIPTIONS = [
  'is the capital of the Netherlands, known for its intricate canal network, narrow houses with gabled roofs, and rich artistic heritage, including that of the 17th century, which was the Golden Age in the country\'s history.',
  'is the capital and largest city of Germany, by both area and population. With 3.66 million inhabitants, it has the highest population within its city ...',
  'is one of nine regions of England and the top subdivision covering most of the city metropolis.',
];

const OFFERS = [
  'Upgrade to a business class',
  'Switch to comfort',
  'Add meal',
  'Add luggage',
];

const DESTINATIONS_COUNT = 3;
const WAYPOINTS_COUNT = 3;
const OFFERS_COUNT = 5;

const EVENTS_TYPES = [
  'taxi',
  'flight',
  'bus',
  'train',
  'restaurant',
  'check-in',
  'drive',
  'ship',
  'sightseeing',
  'transport',
];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export {
  CITIES,
  DESCRIPTIONS,
  DESTINATIONS_COUNT,
  EVENTS_TYPES,
  OFFERS,
  OFFERS_COUNT,
  WAYPOINTS_COUNT,
  UpdateType,
  Mode
};
