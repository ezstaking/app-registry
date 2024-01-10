# EZ Staking App Registry 📚

## Validator Logo

Managed automatically by a robot. The resources are available on the following github repository [validators-keybase-logo](https://github.com/EZStaking/validators-keybase-logo) <i>(the file name corresponds to the keybase identity defined for your validator)</i>.

<details>
<summary><h2 style="display: inline; padding-left: 5px;">Add a chain</h2></summary>

1. Create a folder in `./chains/mainnets/` or `./chains/testnets`, let's say akash for example, so `./chains/mainnets/akash/`
2. Create a chain.json in your folder `./chains/mainnets/akash/chain.json`
3. Copy/paste the below template in `./chains/mainnets/akash/chain.json`
```{
  "$schema": "../../chain.schema.json",
  "name": "akash",
  "chainName": "Akash",
  "logo_URIs": {
    "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.png",
    "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.svg"
  },
  "rpcUrl": "https://rpc.akash.forbole.com:443",
  "restUrl": "https://api.akash.forbole.com:443",
  "chainId": "akashnet-2",
  "bech32": "akash",
  "denom": "akt",
  "denomUpper": "AKT",
  "sdenom": "uakt",
  "coinType": 118,
  "gasPriceStep": {
    "low": 0.025,
    "average": 0.025,
    "high": 0.025
  },
  "coinDecimals": 6,
  "features": ["ibc-transfer"],
  "explorerUrlToTx": "https://ezstaking.app/akash/txs/{txHash}",
  "proposalUrl": "https://ezstaking.app/akash/proposals/",
  "accountUrl": "https://ezstaking.app/akash/account/",
  "coinGeckoId": "akash-network",
  "gasPrice": "25000uakash",
  "chainInfo": {
    "cosmosSdkVersion": "0.45.16",
    "ibcGoVersion": "4.4.2"
  },
  "colors": {
    "headerGradient": "linear-gradient(to right, #cb262a, #ed3324 49%)",
    "primary": "#cb262a",
    "secondary": "#ed3324",
    "tertiary": "#ed3324",
    "light": "#fae7e5"
  },
  "links": [
    {
      "title": "Official Website",
      "url": "https://akash.network",
      "icon": {
        "svgImg": "chain/akash"
      }
    },
    {
      "title": "Docs",
      "url": "https://docs.akash.network",
      "icon": {
        "font": "article"
      }
    },
    {
      "title": "GitHub",
      "url": "https://github.com/ovrclk",
      "icon": {
        "svg": "github"
      }
    },
    {
      "title": "Learn more",
      "icon": {
        "font": "more_horiz"
      },
      "childs": [
        {
          "title": "Medium",
          "url": "https://akash.network/blog",
          "icon": {
            "svg": "medium"
          }
        },
        {
          "title": "Twitter",
          "url": "https://twitter.com/akashnet_",
          "icon": {
            "svg": "twitter"
          }
        }
      ]
    }
  ],
  "isExplorerEnabled": true,
  "isModuleEnabled": {
    "governance": true
  }
}
```
4. Update the Akash values with yours

‼️ Please ensure the name of the folder is the same as defined in the name property of the chain.json content file.
</details>
