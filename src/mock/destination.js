import { getRandomArrayElement } from '../utils';
import { CITIES, DESCRIPTIONS } from './const';

function generateDestination() {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: getRandomArrayElement(DESCRIPTIONS),
    pictures: [
      {
        src: `https://loremflickr.com/320/240?random=${crypto.randomUUID()}`,
        description: `${city} description`,
      },
    ],
  };
}

export { generateDestination };
