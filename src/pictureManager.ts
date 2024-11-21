
const context = require.context("./assets", false, /.png$/);

const pictureStore: Record<string, string> = context.keys().reduce(
  (store: Record<string, string>, key: string) => {
    const name = key.replace(".png", "").replace("./", "")
    store[name] = context(key);
    return store
  },
  {} as Record<string, string>,
);

const getPicture = (name:string)=> pictureStore[name] 

export default getPicture
