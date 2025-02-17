import { getRandomArrayElement, getRandomInteger } from "../utils";
import { OFFERS } from "./const";

function generateOffer() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomInteger(0, 10000),
  };
}

export { generateOffer };
