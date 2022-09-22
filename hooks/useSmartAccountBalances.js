import { useEffect, useRef } from "react";

const useSmartAccountBalances = () => {
    const { data , isLoading } = useQuery(queryKeys.covalent.walletPriceHistory(137, testAddress), getWalletPriceHistory, {
        onSuccess: (res) => console.log(res)
    });
}

export default useSmartAccountBalances;