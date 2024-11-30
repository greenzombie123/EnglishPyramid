import { Animal, Place } from "./model";

const context = require.context("./assets", false, /.png$/);

type PictureStore = {
  [Key in Animal | Place]: string;
};

const validNames:(Animal | Place)[] = [
  "dog",
  "elephant",
  "cat",
  "tiger",
  "alligator",
  "library",
  "park",
  "school",
  "zoo",
  "supermarket",
]

// Helper function to assert a value is a valid name
const isValidName = (name: string): name is Animal | Place => validNames.includes(name as Animal | Place);


const pictureStore: PictureStore = context
  .keys()
  .reduce((store: PictureStore, key: string) => {
    const name = key.replace(".png", "").replace("./", "");

    if (isValidName(name)) {
      store[name] = context<string>(key);
    }

    return store;
  }, {} as PictureStore);

const getPicture = (name: keyof PictureStore) => pictureStore[name];

export default getPicture;
