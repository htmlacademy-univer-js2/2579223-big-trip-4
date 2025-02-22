import { getRandomInteger } from '../utils';

function generateWaypoint(type, destinationID, offersIDs) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(0, 1000000),
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T11:22:13.375Z'),
    destination: destinationID,
    isFavorite: getRandomInteger(0, 1),
    offers: offersIDs,
    type,
  };
}

export { generateWaypoint };
