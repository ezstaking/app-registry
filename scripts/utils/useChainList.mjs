import * as fs from "fs";
import { default as loadJson } from "./useLoadJson.mjs";

export default function (isMainnet) {
  const env = isMainnet ? 'mainnets' : 'testnets';
  const files = fs.readdirSync(`./chains/${env}`).sort()
  const data = {};

  for (let i = 0; i < files.length; i++) {
    if (["protocol.schema.json", "_template"].includes(files[i])) {
      continue;
    }

    const {
      name,
      chainName,
    } = loadJson(`./../../chains/${env}/${files[i]}/chain.json`);

    data[name] = { chainName };
  }

  return data;
};
