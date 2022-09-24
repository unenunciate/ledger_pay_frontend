import { useEffect, useState } from 'react';
import { useNetwork } from '@web3modal/react';
import { useSmartAccount } from './useSmartAccount';

//Arrays of exchange objects (not sure what you will need here)
//what ever need to swap (preferably anytoken)
const exchanges = {
    137 : {routerAddress : "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", wETH : "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"},
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

        const deadline = (Date.now() / 1000) + 60;
        if(tokenFromAddress === null && tokenToAddress !== null) {

            let target = exchange.routerAddress;

            const path = [exchange.wETH, tokenToAddress];

            //Gas To ERC20

            let iface = new ethers.utils.Interface([
                "function swapExactETHForTokens(uint,address[],address,uint)"
            ]);


            let callData = iface.encodeFunctionData(
                "swapExactETHForTokens", [
                0,
                path,
                smartAccountAddress,
                deadline

            ]);

            let txObject = {value : amount, target : target, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null}   

            createAndSendUserOP(txObject);

            if(callback) {
                callback();
            }

        } else if(tokenFrom !== null && tokenTo !== null) {
            //ERC20 To ERC20    

            let target = exchange.routerAddress;

            const path = [tokenFromAddress, tokenToAddress];

            //Gas To ERC20

            let iface = new ethers.utils.Interface([
                "function swapExactTokensForTokens(uint,uint,address[],address,uint)"
            ]);

            let callData = iface.encodeFunctionData(
                "swapExactTokensForTokens", [
                amount,
                0,
                path,
                smartAccountAddress,
                deadline

            ]);
  
            let txObject = {value : 0, target : target, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null}

            //all data
            createAndSendUserOP(txObject);

            if(callback) {
                callback();
            }

        } else if(tokenFrom !== null && tokenTo == null) {
            //ERC20 To Gas

            let target = exchange.routerAddress;

            const path = [tokenFromAddress, exchange.wETH];

            //Gas To ERC20

            let iface = new ethers.utils.Interface([
                "function swapExactTokensForETH(uint,uint,address[],address,uint)"
            ]);

            let callData = iface.encodeFunctionData(
                "swapExactTokensForETH", [
                amount,
                0,
                path,
                smartAccountAddress,
                deadline
            ]);
  
            let txObject = {value : 0, target : target, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null}

            createAndSendUserOP(txObject);

            if(callback) {
                callback();
            }
        }
    }

    return { initSwap, setTokenAddress, tokenAddress, tokenFromAddress, tokenToAddress,  amount, exchange, setAmount, setExchange  };
}

export default useSwap;