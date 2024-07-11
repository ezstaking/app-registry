require("dotenv").config({path: ["ui/.env.local", "ui/.env"]});

const processIcs = (network, provider) => {
  if (network.isAConsumerChain && network.providerChain && provider) {
    network.providerRpcUrl = provider.rpcUrl;
    network.providerRestUrl = provider.restUrl;
  }

  return network;
};

const getNetworks = (isMainnet) => {
  const fs = require("node:fs");
  const env = isMainnet ? "mainnets" : "testnets";
  const files = fs.readdirSync(`./chains/${env}`);

  const networksData = {};

  // Retrieve data first to avoid consumers not having providers already populated.
  for (let i = 0; i < files.length; i++) {
    networksData[files[i]] = require(
      `./../chains/${env}/${files[i]}/chain.json`,
    );
  }

  // Update data for consumers chains.
  for (let i = 0; i < files.length; i++) {
    if (networksData[files[i]].providerChain) {
      networksData[files[i]] = processIcs(
        networksData[files[i]],
        networksData[networksData[files[i]].providerChain],
      );
    }
  }

  return networksData;
};

const writeConfig = (content, path) => {
  const fs = require("node:fs");
  fs.writeFile(path, content, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

(function () {
  console.log(
    "Generate Config...",
    {
      isMainnet: process.env.NUXT_PUBLIC_PROTOCOLS_TESTNET_MODE !== "true",
    },
    typeof process.env.NUXT_PUBLIC_PROTOCOLS_TESTNET_MODE,
  );

  const networks = getNetworks(
    process.env.NUXT_PUBLIC_PROTOCOLS_TESTNET_MODE !== "true",
  );

  const featuredNetworksAsArray = Object.keys(networks).filter(
    (network) => networks[network].isFeatured,
  );

  const config = JSON.stringify(
    {
      version: "beta " + process.env.NUXT_ENV_APP_VERSION,
      protocolsStyles: {
        // @important: any changes here should be replicated to `./assets/root.sass`
        default: {
          primary: "#424242",
          light: "#FFF",
          dark: "#000",
        },
      },
      networks,
      featuredNetworksAsArray,
    },
    null,
    2,
  );

  writeConfig(config, "./build/raw-config.json");

  console.debug("Generated.");
})();
