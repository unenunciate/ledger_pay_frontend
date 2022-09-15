import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory";

export const usersKeys = createQueryKeys('users',  {
    self: () => {},
    list: (filters) => ({ filters }),
    search: (query, limit = 15) => [query, limit],
    transactions: (query, limit = 15) => [query, limit],
});

export const covalentKeys = createQueryKeys('covalent', {
    coinsInWallet: (chainId, address ) => [chainId, address],
    coinPriceHistory: (chainId, address) => [chainId, address],
    walletPriceHistory: (chainId, address) => [chainId, address],
});

export const appKeys = createQueryKeys('apps', {
    list: (filters) => ({ filters }),
    transactions: (query, limit = 15) => [query, limit],
});

export const queryKeys = mergeQueryKeys(usersKeys, covalentKeys, appKeys);

