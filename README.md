# EZ Staking App Registry 📚

## Validator Logo

Managed automatically by a robot. The resources are available on the following github repository [validators-keybase-logo](https://github.com/EZStaking/validators-keybase-logo) <i>(the file name corresponds to the keybase identity defined for your validator)</i>.

## Chain

<details>
<summary><h3 style="display: inline; padding-left: 15px;line-height: initial;">Schema</h3></summary>

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**$schema**|`string`|Enum: `"../../chain.schema.json"`<br/>|yes|
|**name**|`string`||yes|
|**chainName**|`string`||yes|
|**shortChainName**|`string`||no|
|[**logo\_URIs**](#logo_uris)|`object`||yes|
|**rpcUrl**|`string`||yes|
|**restUrl**|`string`||yes|
|**chainId**|`string`||yes|
|**bech32**|`string`||no|
|**denom**|`string`||yes|
|**denomUpper**|`string`||yes|
|**sdenom**|`string`||yes|
|**bech32PrefixAcc**|`string`||no|
|**bech32PrefixVal**|`string`||no|
|**coinType**|`number`||yes|
|[**gasPriceStep**](#gaspricestep)|`object`||yes|
|**coinDecimals**|`number`||yes|
|[**features**](#features)|`string[]`||yes|
|**coinGeckoId**|`string`, `null`||yes|
|[**assets**](#assets)|`object[]`|Required only for assets that's not in the Cosmos Chain Registry.<br/>|no|
|[**chainInfo**](#chaininfo)|`object`||yes|
|[**colors**](#colors)|`object`||yes|
|[**links**](#links)|`array`||yes|
|**isExplorerEnabled**|`boolean`||yes|
|[**isModuleEnabled**](#ismoduleenabled)|`object`||yes|
|**isAProviderChain**|`boolean`||no|
|**isAConsumerChain**|`boolean`||no|
|**providerChain**|`string`||no|
|**gasModifier**|`number`|If the gas calculation is wrong, you can change the multiplier.<br/>Default: `1.3`<br/>|no|
|**isNativelySupportedByKeplr**|`boolean`|Allow to add the chain in Keplr.<br/>|yes|
|**withCoingeckoApi**|`boolean`|If we validate your chain, we'll take care of the API ourselves. If not, don't hesitate to provide us with an API key: contact[@]ezstaking[.]io.<br/>Default: `false`<br/>|yes|
|**isFeatured**|`boolean`|True if we validate your chain.<br/>Default: `false`<br/>|yes|

**Additional Properties:** not allowed  
**Example**

```json
{
    "gasPriceStep": {},
    "gasModifier": 1.3,
    "withCoingeckoApi": false,
    "isFeatured": false
}
```

<a name="logo_uris"></a>
## logo\_URIs: object

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**png**|`string`|||
|**svg**|`string`|||

**Additional Properties:** not allowed  
<a name="gaspricestep"></a>
## gasPriceStep: object

**Required Properties:**

<a name="features"></a>
## features\[\]: array

**Items**

**Item Type:** `string`  
**Item Enum:** `"ibc-transfer"`, `"ibc-go"`, `"cosmwasm"`, `"wasmd_0.24+"`, `"eth-address-gen"`, `"eth-key-sign"`, `"secretwasm"`  
<a name="assets"></a>
## assets: array

Required only for assets that's not in the Cosmos Chain Registry.


**Items**

**Item Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**base**|`string`||yes|
|**coingecko\_id**|`string`, `null`||yes|
|[**denom\_units**](#assetsdenom_units)|`array`||yes|
|**description**|`string`||yes|
|**display**|`string`||yes|
|[**logo\_URIs**](#assetslogo_uris)|`object`||yes|
|**name**|`string`||yes|
|**symbol**|`string`||yes|

**Item Additional Properties:** not allowed  
**Example**

```json
[
    {}
]
```

<a name="assetsdenom_units"></a>
### assets\.denom\_units\[\]: array

**Required Properties:**

<a name="assetslogo_uris"></a>
### assets\.logo\_URIs: object

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**png**|`string`|||
|**svg**|`string`|||

**Additional Properties:** not allowed  
<a name="chaininfo"></a>
## chainInfo: object

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**cosmosSdkVersion**|`string`|Minimal Length: `5`<br/>Maximal Length: `14`<br/>Pattern: ``^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$``<br/>|yes|
|**ibcGoVersion**|`string`|Minimal Length: `5`<br/>Maximal Length: `14`<br/>Pattern: ``^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$``<br/>|yes|

**Additional Properties:** not allowed  
<a name="colors"></a>
## colors: object

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**primaryOnLight**|`string`|Primary color for light theme.<br/>|yes|
|**primaryOnDark**|`string`|Primary color for dark theme.<br/>|yes|
|**lighterOnLight**|`string`|Lighter color than the primary one and for light theme.<br/>|yes|
|**lighterOnDark**|`string`|Lighter color than the primary one and for dark theme.<br/>|yes|
|**darkerOnLight**|`string`|Darker color than the primary one and for light theme.<br/>|yes|
|**darkerOnDark**|`string`|Darker color than the primary one and for dark theme.<br/>|yes|

**Additional Properties:** not allowed  
<a name="links"></a>
## links: array

**Items**

  
**Option 1 (alternative):**

  
**Option 2 (alternative):**

**Minimum Items:** 4  
**Maximum Items:** 4  
**Unique Items:** yes  
<a name="ismoduleenabled"></a>
## isModuleEnabled: object

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**governance**|`boolean`||yes|

**Additional Properties:** not allowed
</details>

<!-- Add a chain -->
<details>
<summary><h3 style="display: inline; padding-left: 15px;line-height: initial;">Add a chain</h3></summary>

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
  "rpcUrl": "https://akash.c29r3.xyz/rpc",
  "restUrl": "https://akash.c29r3.xyz/api",
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
  "features": [
    "ibc-transfer"
  ],
  "coinGeckoId": "akash-network",
  "chainInfo": {
    "cosmosSdkVersion": "0.45.16",
    "ibcGoVersion": "4.4.2"
  },
  "colors": {
    "primaryOnLight": "#cb262a",
    "primaryOnDark": "#cb262a",
    "lighterOnLight": "#ed3324",
    "lighterOnDark": "#ed3324",
    "darkerOnLight": "#ed3324",
    "darkerOnDark": "#ed3324"
  },
  "links": [
    {
      "title": "Official Website",
      "url": "https://akash.network",
      "icon": {
        "svg": "web"
      }
    },
    {
      "title": "Docs",
      "url": "https://docs.akash.network",
      "icon": {
        "svg": "document"
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
        "svg": "dotsHorizontal"
      },
      "children": [
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
  },
  "isNativelySupportedByKeplr": true,
  "withCoingeckoApi": true,
  "isFeatured": true
}
```
4. Update the Akash values with yours
</details>
