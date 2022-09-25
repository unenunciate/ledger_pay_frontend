import { useState } from 'react';
import { useNetwork } from '@web3modal/react';
import useSmartAccount from './useSmartAccount';
import { decimalConversion } from "../utils/decimalConversion.js";
import { chainId } from 'wagmi';

//Arrays of exchange objects (not sure what you will need here)
//what ever need to swap (preferably anytoken)
const networks = {
    137 : {sETH : "0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3"},
    10 : {}
}

const useSuperfluid = (token = null, callback = null) => {
    const [tokenAddress, setTokenAddress] = useState(token);
    const [amount, setAmount] = useState(0);
    const [length, setLength] = useState(0); //number of days
    const [recipent, setRecipent] = useState(null);
    const [decimals, setDecimals] = useState(18);
    const { smartAccountAddress } = useSmartAccount();

    const { chain } = useNetwork();
    const { createAndSendUserOP } = useSmartAccount();
    
    const initStream = async () => {
        //check for both network see if it will work
        if(chain.id === 137 || chain.id === 10) {
            if(recipent !== null) {

                let amountConverted = decimalConversion(amount, decimals)
                if(token !== null) {

                    const flowRate = amountConverted.div(length);

                    let iface = new ethers.utils.Interface([
                        "function createFlow(address,address,int96,bytes)"
                    ]);

                    let callData = iface.encodeFunctionData(
                        "createFlow", [
                        recipent,
                        tokenAddress,
                        flowRate,
                        "0x0"
                    ]);

                    const txObject = {value : 0, target : smartAccountAddress, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null}
                   
                    createAndSendUserOP(txObject);

                } else {

                    const sETHAddress = networks[chainId].sETH;

                    let iface = new ethers.utils.Interface([
                        "function upgradeByETH()"
                    ]);

                    let callData = iface.encodeFunctionData(
                        "upgradeByETH", [     
                    ]);

                    let txObject = {value : amountConverted, target : sETHAddress, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null}
                   
                    createAndSendUserOP(txObject);

                    await new Promise(r => setTimeout(r, 30000));

                    const flowRate = amountConverted.div(length);

                    iface = new ethers.utils.Interface([
                        "function createFlow(address,address,int96,bytes)"
                    ]);

                    callData = iface.encodeFunctionData(
                        "createFlow", [
                        recipent,
                        sETHAddress,
                        flowRate,
                        "0x0"
                    ]);

                    txObject = {value : 0, target : smartAccountAddress, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null}
                   
                    createAndSendUserOP(txObject);


                }
            }
        }
    }

    //https://docs.superfluid.finance/superfluid/developers/constant-flow-agreement-cfa/cfav1-library                                                               
    //cfaV1.createFlow(receiver, token, flowRate)
    return { initStream, setTokenAddress, tokenAddress, amount, length, setAmount, setLength, recipent, setRecipent  };
}

export default useSuperfluid;