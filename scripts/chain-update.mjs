import cleanSemver from "clean-semver";
import { compareVersions } from "compare-versions";
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
    console.error(
      `${network} logo need to be updated (png)`,
      {
        from: registryChain.logo_URIs.png,
        to: remoteChain.logo_URIs.png
      }
    );

    registryChain.logo_URIs.png = remoteChain.logo_URIs.png;
  }
  if (
    registryChain.logo_URIs.svg !== remoteChain.logo_URIs.svg &&
    remoteChain.logo_URIs.svg !== undefined
  ) {
    console.error(
      `${network} logo need to be updated (svg)`,
      {
        from: registryChain.logo_URIs.svg,
        to: remoteChain.logo_URIs.svg
      }
    );
    registryChain.logo_URIs.svg = remoteChain.logo_URIs.svg;
  }

  // chainId
  if (
    registryChain.chainId !== remoteChain.chain_id &&
    remoteChain.chain_id !== undefined
  ) {
    console.error(
      `${network} chainId need to be updated`,
      {
        from: registryChain.chainId,
        to: remoteChain.chain_id
      }
    );
    registryChain.chainId = remoteChain.chain_id;
  }

  // bech32
  if (
    registryChain.bech32 !== undefined && remoteChain.bech32_prefix !== undefined &&
    registryChain.bech32 !== remoteChain.bech32_prefix
  ) {
    console.error(
      `${network} bech32 need to be updated`,
      {
        from: registryChain.bech32,
        to: remoteChain.bech32_prefix
      }
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
      {
        from: registryChain.denom,
        to: remoteAsset.display
      }
    );
    registryChain.denom  = remoteAsset.display;
  }

  // denomUpper
  if (
    registryChain.denomUpper !== remoteAsset.symbol &&
    remoteAsset.symbol !== undefined
  ) {
    console.error(
      `${network} denomUpper need to be updated`,
      {
        from: registryChain.denomUpper,
        to: remoteAsset.symbol
      }
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
      {
        from: registryChain.sdenom,
        to: remoteDenom
      }
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
      {
        from: registryChain.coinType,
        to: remoteChain.slip44
      }
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
      {
        from: registryChain.gasPriceStep.low,
        to: remoteFeeToken.low_gas_price
      }
    );
    registryChain.gasPriceStep.low = remoteFeeToken.low_gas_price;
  }
  if (
    registryChain.gasPriceStep.average !== remoteFeeToken.average_gas_price &&
    remoteFeeToken.average_gas_price !== undefined
  ) {
    console.error(
      `${network} gasPriceStep.average need to be updated`,
      {
        from: registryChain.gasPriceStep.average,
        to: remoteFeeToken.average_gas_price
      }
    );
    registryChain.gasPriceStep.average = remoteFeeToken.average_gas_price;
  }
  if (
    registryChain.gasPriceStep.high !== remoteFeeToken.high_gas_price &&
    remoteFeeToken.high_gas_price !== undefined
  ) {
    console.error(
      `${network} gasPriceStep.high need to be updated`,
      {
        from: registryChain.gasPriceStep.high,
        to: remoteFeeToken.high_gas_price
      }
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
      {
        from: registryChain.coinDecimals,
        to: remoteDenomDetails.exponent
      }
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
      {
        from: registryChain.coinGeckoId,
        to: remoteAsset.coingecko_id
      }
    );
    registryChain.coinGeckoId = remoteAsset.coingecko_id;
  }

  // chainInfo
  if (
    remoteChain.codebase.cosmos_sdk_version !== undefined &&
    registryChain.chainInfo.cosmosSdkVersion !== cleanSemver(remoteChain.codebase.cosmos_sdk_version)
  ) {
    const remoteCosmosSdkVersion = cleanSemver(remoteChain.codebase.cosmos_sdk_version).split('-')[0];
    const isRemoteVersionHigher = compareVersions(remoteCosmosSdkVersion, registryChain.chainInfo.cosmosSdkVersion) >= 0;
    // @fixme: find a better way to get the version without having doing all this
    const hotfixVersion = remoteChain.codebase.cosmos_sdk_version.includes(registryChain.chainInfo.cosmosSdkVersion);

    if (isRemoteVersionHigher && !hotfixVersion) {
      console.error(
        `${network} cosmosSdkVersion need to be updated`,
        {
          from: registryChain.chainInfo.cosmosSdkVersion,
          to: remoteCosmosSdkVersion,
          remoteOriginal: remoteChain.codebase.cosmos_sdk_version
        }
      );

      registryChain.chainInfo.cosmosSdkVersion = remoteCosmosSdkVersion;
    }
  }
  if (
    remoteChain.codebase.ibc_go_version !== undefined &&
    registryChain.chainInfo.ibcGoVersion !== cleanSemver(remoteChain.codebase.ibc_go_version)
  ) {
    const remoteIbcGoVersion = cleanSemver(remoteChain.codebase.ibc_go_version);
    const isRemoteVersionHigher = compareVersions(remoteIbcGoVersion, registryChain.chainInfo.ibcGoVersion) >= 0;
    // @fixme: find a better way to get the version without having doing all this
    const hotfixVersion = remoteChain.codebase.ibc_go_version.includes(registryChain.chainInfo.ibcGoVersion);

    if (isRemoteVersionHigher && !hotfixVersion) {
      console.error(
        `${network} ibcGoVersion need to be updated`,
        {
          from: registryChain.chainInfo.ibcGoVersion,
          to: remoteIbcGoVersion,
          remoteOriginal: remoteChain.codebase.ibc_go_version
        }
      );

      registryChain.chainInfo.ibcGoVersion = remoteIbcGoVersion;
    }
  }

  // links
  if (
    registryChain.links[0].url !== remoteChain.website &&
    remoteChain.website !== undefined
  ) {
    console.error(
      `${network} websiteUrl need to be updated`,
      {
        from: registryChain.links[0].url,
        to: remoteChain.website
      }
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

await update().then(() => {
  console.log('Done.')
  return 0;
})
