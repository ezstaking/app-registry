import { default as writeFile } from "./utils/useWriteFile.mjs";
import { default as chainList } from "./utils/useChainList.mjs";
import { default as chainListFeatured } from "./utils/useChainListFeatured.mjs";
import { default as chainListDetails } from "./utils/useChainListDetails.mjs";
import { default as chainListDetailsFeatured } from "./utils/useChainListDetailsFeatured.mjs";

// MAINNETS
writeFile(JSON.stringify(chainList(true)), "./public/chains/mainnets/list.json");
writeFile(JSON.stringify(chainListDetails(true)), "./public/chains/mainnets/detailed-list.json");

writeFile(JSON.stringify(chainListFeatured(true)), "./public/chains/mainnets/featured-list.json");
writeFile(JSON.stringify(chainListDetailsFeatured(true)), "./public/chains/mainnets/featured-detailed-list.json");

// TESTNETS
writeFile(JSON.stringify(chainList(false)), "./public/chains/testnets/list.json");
writeFile(JSON.stringify(chainListDetails(false)), "./public/chains/testnets/detailed-list.json");

writeFile(JSON.stringify(chainListFeatured(false)), "./public/chains/testnets/featured-list.json");
writeFile(JSON.stringify(chainListDetailsFeatured(false)), "./public/chains/testnets/featured-detailed-list.json");
