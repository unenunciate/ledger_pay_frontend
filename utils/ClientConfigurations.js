export const ClientConfigurations = [{
    paymasterAddress: "0x1184e555D2C56690cB27936357C5A0507Fb3a5d3",
    entryPointAddress: "0x953284cf7e8494563d79f4361895316690f68af5",
    bundlerUrl: "https://polygon.bundler.ledgepay.io",
    Chain: {
        id: 137,
        name: 'Polygon',
        network: 'homestead <idk?>',
        nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
        rpcUrls: {
          public: "https://matic-mainnet.chainstacklabs.com/",
        },
        blockExplorers: {
          default:  "https://polygonscan.com/",
        },
        ens: {
          address: '0xFC1F13cC3D81E2099402e0baFfdA935d617c78c5',
        },
        multicall: {
          address: '',
          blockCreated: 0,
        },
      }
}]


