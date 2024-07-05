import * as fs from "fs";

export default function (content, path) {
  fs.writeFile(path, content, (err) => {
    if (err) {
      console.error(err);
    }
  });
};
