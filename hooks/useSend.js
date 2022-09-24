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
                txObject = {value : amount, target : recipent, data : "", maxFeePerGas: null, maxPriorityFeePerGas: null}
                createAndSendUserOP(txObject);

            } else {
                
                //ERC20
                let iface = new ethers.utils.Interface([
                    "function transfer(address,uint256)"
                ]);
                let callData = iface.encodeFunctionData(
                    "transfer", [
                    recipent,
                    amount
                ]);
              
                let txObject = {value : 0, target : tokenAddress, maxFeePerGas: null, maxPriorityFeePerGas: null, data: callData}


                createAndSendUserOP(txObject);
            }
        }
        
    }

    return { initSend, setTokenAddress, tokenAddress, amount, length, setAmount, setLength, recipent, setRecipent  };
}

export default useSend;