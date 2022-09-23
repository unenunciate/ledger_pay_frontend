export const ClientConfigurations = [
    {
        paymasterAddress: "0x1184e555D2C56690cB27936357C5A0507Fb3a5d3",
        entryPointAddress: "0x953284cf7e8494563d79f4361895316690f68af5",
        bundlerUrl: "https://bundler.ledgepay.io",
        logoUrl: "/polygon.png",
        Chain: {
            id: 137,
            name: 'Polygon',
            network: 'polygon',
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
                address: '0x0',
                blockCreated: 0,
            },
        }
    },
    {
        paymasterAddress: "0x871dc4bFa243DB77c08D14d0c66a98d189e2f770",
        entryPointAddress: "0x9d74Dd4C532fdfBEc19Be8D1c31C2223001Aa816",
        bundlerUrl: "https://bundler.ledgepay.io",
        logoUrl: "/cronos.svg",
        Chain: {
            id: 338,
            name: 'Cronos testnet',
            network: 'cronos',
            nativeCurrency: { name: 'TCRO', symbol: 'TCRO', decimals: 18 },
            rpcUrls: {
                public: "https://evm-t3.cronos.org/",
            },
            blockExplorers: {
                default:  "https://testnet.cronoscan.com/",
            },
            ens: {
                address: '0x44e24cb10ccd14A066deBeF7B9Be11Cb71c8b264',
            },
            multicall: {
                address: '0x0',
                blockCreated: 0,
            },
        }
    },
    {
        paymasterAddress: "0x9d74Dd4C532fdfBEc19Be8D1c31C2223001Aa816",
        entryPointAddress: "0x20ed209B16EF395db0F0031A1bbf0F17CA5Aaca4",
        bundlerUrl: "https://bundler.ledgepay.io",
        logoUrl: "/optimism.png",
        Chain: {
            id: 10,
            name: 'Optimism',
            network: 'optimism',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: {
                public: "https://mainnet.optimism.io/",
            },
            blockExplorers: {
                default:  "https://optimistic.etherscan.io/",
            },
            ens: {
                address: '0x722e216C59BFb09F0cC0A08B5f37EC2409B59A45',
            },
            multicall: {
                address: '0x0',
                blockCreated: 0,
            },
          }
    },
    {
        paymasterAddress: "0x871dc4bFa243DB77c08D14d0c66a98d189e2f770",
        entryPointAddress: "0x9d74Dd4C532fdfBEc19Be8D1c31C2223001Aa816",
        bundlerUrl: "https://bundler.ledgepay.io",
        Chain: {
            id: 23295,
            name: 'Sapphire ParaTime Testnet',
            network: 'sapphire',
            nativeCurrency: { name: 'TEST', symbol: 'TEST', decimals: 18 },
            rpcUrls: {
              public: "https://testnet.sapphire.oasis.dev/",
            },
            blockExplorers: {
              default:  "https://testnet.explorer.sapphire.oasis.dev/",
            },
            ens: {
              address: '0x590C465154bd49D23d402cdb69170F6ba1f678d8',
            },
            multicall: {
              address: '0x0',
              blockCreated: 0,
            },
          }
    }
]


export const makeHeaderValueString = (chainId = null) => {
    const config = ClientConfigurations.find(c => c.Chain.id === chainId);

    if(!config) {
        return 'polygon:137';
    }

    return `${config.Chain.network}:${config.Chain.id}`;
}