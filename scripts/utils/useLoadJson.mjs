import * as fs from "fs";

export default function (path) {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
}
