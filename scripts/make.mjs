import { default as writeFile } from "./utils/useWriteFile.mjs";
import { default as chainList } from "./utils/useChainList.mjs";
import { default as chainListFeatured } from "./utils/useChainListFeatured.mjs";

writeFile(JSON.stringify(chainList(true)), "./public/chains/mainnets/list.json");
writeFile(JSON.stringify(chainListFeatured(true)), "./public/chains/mainnets/featured-list.json");

writeFile(JSON.stringify(chainList(false)), "./public/chains/testnets/list.json");
writeFile(JSON.stringify(chainListFeatured(false)), "./public/chains/testnets/featured-list.json");
