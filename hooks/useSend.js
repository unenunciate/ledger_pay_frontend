import { useState } from 'react';
import { useNetwork, useSigner } from '@web3modal/react';
import { useSmartAccount } from './useSmartAccount';
import { decimalConversion } from "../utils/decimalConversion.js";

const useSend = (token = null, callback = null) => {
    const [tokenAddress, setTokenAddress] = useState(token);
    const [amount, setAmount] = useState(0);
    const [length, setLength] = useState(0); //number of days
    const [recipent, setRecipent] = useState(null);
    const [decimals, setDecimals] = useState(18);
    const { chain } = useNetwork();

    const { createAndSendUserOP, smartAccountAddress } = useSmartAccount();

    
    const initSend = async () => {

        const amountConverted = decimalConversion(amount, decimals);

        if(recipent !== null) {

            let target;
            if(token === null) {
               target = smartAccountAddress;
            } else {
                target = tokenAddress;
            }

            let iface = new ethers.utils.Interface([
                "function transfer(address,uint256)"
            ]);
            let callData = iface.encodeFunctionData(
                "transfer", [
                recipent,
                amountConverted
            ]);
            
            let txObject = {value : 0, target : target, maxFeePerGas: null, maxPriorityFeePerGas: null, data: callData}

            createAndSendUserOP(txObject);
        }
        
    }

    return { initSend, setTokenAddress, tokenAddress, amount, length, setAmount, setLength, recipent, setRecipent  };
}

export default useSend;