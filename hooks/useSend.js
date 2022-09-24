import { useState } from 'react';
import { useNetwork, useSigner } from '@web3modal/react';
import { useSmartAccount } from './useSmartAccount';

const useSend = (token = null, callback = null) => {
    const [tokenAddress, setTokenAddress] = useState(token);
    const [amount, setAmount] = useState(0);
    const [length, setLength] = useState(0); //number of days
    const [recipent, setRecipent] = useState(null);

    const { chain } = useNetwork();

    const { createAndSendUserOP } = useSmartAccount();

    
    const initSend = async () => {
        if(recipent !== null) {
            if(token === null) {
                //Gas

                //all data
                //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
                //once tx prepared  V first param function below
                createAndSendUserOP();
            } else {
                //ERC20

                //all data
                //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
                //once tx prepared  V first param function below
                createAndSendUserOP();
            }
        }
        
    }

    return { initSend, setTokenAddress, tokenAddress, amount, length, setAmount, setLength, recipent, setRecipent  };
}

export default useSend;