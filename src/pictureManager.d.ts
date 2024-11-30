import { Animal, Place } from "./model";
type PictureStore = {
    [Key in Animal | Place]: string;
};
declare const getPicture: (name: keyof PictureStore) => string;
export default getPicture;
