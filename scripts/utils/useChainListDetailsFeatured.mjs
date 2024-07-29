import * as fs from "fs";
import {default as loadJson} from "./useLoadJson.mjs";

export default function (isMainnet) {
  const env = isMainnet ? 'mainnets' : 'testnets';
  const files = fs.readdirSync(`./chains/${env}`).sort();
  const data = {};

  for (let i = 0; i < files.length; i++) {
    if (["protocol.schema.json", "_template"].includes(files[i])) {
      continue;
    }

    const {
      name,
      chainName,
      logo_URIs,
      sdenom,
      denomUpper,
      coinDecimals,
      coinGeckoId,
      chainInfo: {cosmosSdkVersion},
      colors,
      isExplorerEnabled,
      isNativelySupportedByKeplr,
      isFeatured,
    } = loadJson(`./../../chains/${env}/${files[i]}/chain.json`);

    if (isFeatured) {
      data[name] = {
        chainName,
        logo_URIs,
        sdenom,
        denomUpper,
        coinDecimals,
        coinGeckoId,
        cosmosSdkVersion,
        colors,
        isExplorerEnabled,
        isNativelySupportedByKeplr,
        isFeatured
      };
    }
  }

  return data;
};
