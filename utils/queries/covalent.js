import { covalentHeaders } from "./headers";

const getCoinPriceHistory = async (chainId, address) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COVALENT_API_URL}/pricing/historical_by_addresses_v2/${chainId}/USD/${address}/`, { headers: covalentHeaders()});

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

const getWalletPriceHistory = async ({queryKey}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COVALENT_API_URL}/${queryKey[2]}/address/${queryKey[3]}/portfolio_v2/`, { headers: covalentHeaders()});

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

const getCoinsInWallet = async (chainId, address) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COVALENT_API_URL}/${chainId}/address/${address}/balances_v2/`,  { headers: covalentHeaders()});

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}


export {
    getCoinsInWallet,
    getWalletPriceHistory,
    getCoinPriceHistory,
}