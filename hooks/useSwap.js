import { useEffect, useState } from 'react';
import { useNetwork } from '@web3modal/react';
import { useSmartAccount } from './useSmartAccount';

//Arrays of exchange objects (not sure what you will need here)
//what ever need to swap (preferably anytoken)
const exchanges = {
    137 : [],
    10 : []
}

const useSwap = (tokenFrom = null, tokenTo = null, callback = null) => {
    const { chain } = useNetwork();

    const [tokenFromAddress, setTokenFromAddress] = useState(tokenFrom);
    const [tokenToAddress, setTokenToAddress] = useState(tokenTo);
    const [exchange, setExchange] = useState(exchanges[chain.id]);
    const [amount, setAmount] = useState(0);

    const { smartAccountAddress } = useSmartAccount();

    useEffect(() => {
        setExchange(exchanges[chain.id]);
    }, [chain])

    const { createAndSendUserOP } = useSmartAccount();

    const initSwap = async () => {
        if(tokenFrom === null && tokenTo !== null) {
            //Gas To ERC20

            //all data
            //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
            //once tx prepared  V first param function below
            createAndSendUserOP();

            if(callback) {
                callback();
            }
        } else if(tokenFrom !== null && tokenTo !== null) {
            //ERC20 To ERC20

            //all data
            //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
            //once tx prepared  V first param function below
            createAndSendUserOP();

            if(callback) {
                callback();
            }
        } else if(tokenFrom !== null && tokenTo == null) {
            //ERC20 To Gas

            //all data
            //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
            //once tx prepared  V first param function below
            createAndSendUserOP();

            if(callback) {
                callback();
            }
        }
    }

    return { initSwap, setTokenAddress, tokenAddress, amount, exchange, setAmount, setExchange  };
}

export default useSwap;