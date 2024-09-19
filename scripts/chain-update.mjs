import useLoadJson from "./utils/useLoadJson.mjs";
import useChainList from "./utils/useChainList.mjs";
import useWriteFile from "./utils/useWriteFile.mjs";

let chains = [];

const updateChain = async (env, network) => {
  const registryChain = await useLoadJson(`./../../chains/${env}s/${network}/chain.json`);

  const { chain: remoteChain, assets: remoteAssets } = (await import(`chain-registry/${env}/${network}`));
  const remoteDenom = remoteChain.staking.staking_tokens[0].denom;
  const remoteAsset = remoteAssets.assets.find((asset) => asset.base === remoteDenom);
  const remoteDenomDetails = remoteAsset.denom_units.find((denomU) => denomU.denom === remoteAsset.display);
  const remoteFeeToken = remoteChain.fees.fee_tokens.find((feeToken) => feeToken.denom === remoteDenom);

  // logo_URIs
  if (
    registryChain.logo_URIs.png !== remoteChain.logo_URIs.png &&
    remoteChain.logo_URIs.png !== undefined
  ) {
    console.error(`${network} logo need to be updated (png)`);
    registryChain.logo_URIs.png = remoteChain.logo_URIs.png;
  }
  if (
    registryChain.logo_URIs.svg !== remoteChain.logo_URIs.svg &&
    remoteChain.logo_URIs.svg !== undefined
  ) {
    console.error(`${network} logo need to be updated (svg)`);
    registryChain.logo_URIs.svg = remoteChain.logo_URIs.svg;
  }

  // chainId
  if (
    registryChain.chainId !== remoteChain.chain_id &&
    remoteChain.chain_id !== undefined
  ) {
    console.error(
      `${network} chainId need to be updated`,
      registryChain.chainId,
      remoteChain.chain_id
    );
    registryChain.chainId = remoteChain.chain_id;
  }

  // bech32
  if (
    registryChain.bech32 !== remoteChain.bech32_prefix &&
    remoteChain.bech32_prefix !== undefined
  ) {
    console.error(
      `${network} bech32 need to be updated`,
      registryChain.bech32,
      remoteChain.bech32_prefix
    );
    registryChain.bech32 = remoteChain.bech32_prefix;
  }

  // denom
  if (
    registryChain.denom !== remoteAsset.display &&
    remoteAsset.display !== undefined
  ) {
    console.error(
      `${network} denom need to be updated`,
      registryChain.denom,
      remoteAsset.display
    );
    registryChain.denom  = remoteChain.display;
  }

  // denomUpper
  if (
    registryChain.denomUpper !== remoteAsset.symbol &&
    remoteAsset.symbol !== undefined
  ) {
    console.error(
      `${network} denomUpper need to be updated`,
      registryChain.denomUpper,
      remoteAsset.symbol
    );
    registryChain.denomUpper = remoteAsset.symbol;
  }

  // sdenom
  if (
    registryChain.sdenom !== remoteDenom &&
    remoteDenom !== undefined
  ) {
    console.error(
      `${network} sdenom need to be updated`,
      registryChain.sdenom,
      remoteDenom
    );
    registryChain.sdenom = remoteDenom;
  }

  // coinType
  if (
    registryChain.coinType !== remoteChain.slip44 &&
    remoteChain.slip44 !== undefined
  ) {
    console.error(
      `${network} coinType need to be updated`,
      registryChain.coinType,
      remoteChain.slip44
    );
    registryChain.coinType = remoteChain.slip44;
  }

  // gasPriceStep
  if (
    registryChain.gasPriceStep.low !== remoteFeeToken.low_gas_price &&
    remoteFeeToken.low_gas_price !== undefined
  ) {
    console.error(
      `${network} gasPriceStep.low need to be updated`,
      registryChain.gasPriceStep.low,
      remoteFeeToken.low_gas_price
    );
    registryChain.gasPriceStep.low = remoteFeeToken.low_gas_price;
  }
  if (
    registryChain.gasPriceStep.average !== remoteFeeToken.average_gas_price &&
    remoteFeeToken.average_gas_price !== undefined
  ) {
    console.error(
      `${network} gasPriceStep.average need to be updated`,
      registryChain.gasPriceStep.average,
      remoteFeeToken.average_gas_price
    );
    registryChain.gasPriceStep.average = remoteFeeToken.average_gas_price;
  }
  if (
    registryChain.gasPriceStep.high !== remoteFeeToken.high_gas_price &&
    remoteFeeToken.high_gas_price !== undefined
  ) {
    console.error(
      `${network} gasPriceStep.high need to be updated`,
      registryChain.gasPriceStep.high,
      remoteFeeToken.high_gas_price
    );
    registryChain.gasPriceStep.high = remoteFeeToken.high_gas_price;
  }

  // coinDecimals
  if (
    registryChain.coinDecimals !== remoteDenomDetails.exponent &&
    remoteDenomDetails.exponent !== undefined
  ) {
    console.error(
      `${network} coinDecimals need to be updated`,
      registryChain.coinDecimals,
      remoteDenomDetails.exponent
    );
    registryChain.coinDecimals = remoteDenomDetails.exponent;
  }

  // features

  // coinGeckoId
  if (
    registryChain.coinGeckoId !== remoteAsset.coingecko_id &&
    remoteAsset.coingecko_id !== undefined
  ) {
    console.error(
      `${network} coinGeckoId need to be updated`,
      registryChain.coinGeckoId,
      remoteAsset.coingecko_id
    );
    registryChain.coinGeckoId = remoteAsset.coingecko_id;
  }

  // chainInfo
  if (
    `v${registryChain.chainInfo.cosmosSdkVersion}` !== remoteChain.codebase.cosmos_sdk_version &&
    remoteChain.codebase.cosmos_sdk_version !== undefined
  ) {
    console.error(
      `${network} cosmosSdkVersion need to be updated`,
      `v${registryChain.chainInfo.cosmosSdkVersion}`,
      remoteChain.codebase.cosmos_sdk_version
    );
    registryChain.chainInfo.cosmosSdkVersion = remoteChain.codebase.cosmos_sdk_version.substring(1);
  }
  if (
    `v${registryChain.chainInfo.ibcGoVersion}` !== remoteChain.codebase.ibc_go_version &&
    remoteChain.codebase.ibc_go_version !== undefined
  ) {
    console.error(
      `${network} ibcGoVersion need to be updated`,
      `v${registryChain.chainInfo.ibcGoVersion}`,
      remoteChain.codebase.ibc_go_version
    );
    registryChain.chainInfo.ibcGoVersion = remoteChain.codebase.ibc_go_version.substring(1);
  }

  // links
  if (
    registryChain.links[0].url !== remoteChain.website &&
    remoteChain.website !== undefined
  ) {
    console.error(
      `${network} websiteUrl need to be updated`,
      registryChain.links[0].url,
      remoteChain.website
    );
    registryChain.links[0].url = remoteChain.website;
  }

  // isNativelySupportedByKeplr

  useWriteFile(
    JSON.stringify(registryChain, null, 2) + "\n",
    `./chains/${env}s/${network}/chain.json`
  );
}

const updateChains = async (isMainnet) => {
  chains = Object.keys(useChainList(isMainnet));

  for (let i = 0; i < chains.length; i++) {
    try {
      await updateChain(isMainnet ? 'mainnet' : 'testnet', chains[i]);
    } catch (_e) {
      // console.error(e);
    }
  }
}

const update = async () => {
  await updateChains(true);
  await updateChains(false);
}

await update();
