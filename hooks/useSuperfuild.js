import { useState } from 'react';
import { useNetwork } from '@web3modal/react';
import { useSmartAccount } from './useSmartAccount';

const useSuperfuild = (token = null, callback = null) => {
    const [tokenAddress, setTokenAddress] = useState(token);
    const [amount, setAmount] = useState(0);
    const [length, setLength] = useState(0); //number of days
    const [recipent, setRecipent] = useState(null);

    const { chain } = useNetwork();

    const { createAndSendUserOP } = useSmartAccount();
    
    const initStream = async () => {
        //check for both network see if it will work
        if(chain.id === 137 || chain.id === 10) {
            if(recipent !== null) {
                if(token !== null) {
                    //all data
                    //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
                    //once tx prepared  V first param function below
                    createAndSendUserOP();
                }
            }
        }
    }

    //https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfav1-library                                                               
    //cfaV1.createFlow(receiver, token, flowRate)
    return { initStream, setTokenAddress, tokenAddress, amount, length, setAmount, setLength, recipent, setRecipent  };
}

export default useSuperfuild;