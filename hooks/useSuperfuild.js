import useSmartAccountBalances from "./useSmartAccountBalances";

const useSuperfuild = (callback = null) => {
    //https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfav1-library                                                               
    //cfaV1.createFlow(receiver, token, flowRate)
    return { initStream, setTokenAddress, tokenAddress, amount, length, setAmount, setLength, recipent, setRecipent,  };
}

export default useSuperfuild;