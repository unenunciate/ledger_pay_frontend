import { useEffect, useState, useContext, useCallback, useRef, useReducer} from 'react';

import { ethers } from 'ethers';

import { tokenABI, conditionalTokenABI } from '../utils/contracts/abi'

const tokenAddress = process.env.NEXT_PUBLIC_USD_ADDRESS
const conditionalTokenAddress = process.env.NEXT_PUBLIC_CT_ADDRESS


const useMintable = (conditionId) => {
    const { user, wallet } = useAuth();

    const initalizedRef = useRef(false);

    const [tokenContract, setTokenContract] = useState({});
    const [conditionalTokenContract, setConditionalTokenContract] = useState({});

    const [conditionResponse, setConditionResponse] = useState(true);

    const [amount, dispatchAmount] = useReducer((state, action) => {
        if(action.type === "change") {
            const bn = ethers.BigNumber.from(next);
            const fn = ethers.FixedNumber.fromValue( bn,  18 );
            return fn.toString();
        } else {
            return state;
        }
    }, '');
    
    //add vars to state then pass create and vars + set down bellow

    useEffect(() => {
        if(ethers.Signer.isSigner(wallet)) {
            setTokenContract(ethers.contract(tokenABI, tokenAddress, wallet));
            setConditionalTokenContract(ethers.contract(conditionalTokenABI, conditionalTokenAddress, wallet));
            initalizedRef.current = true;
        } else {
            initalizedRef.current = false;
        }
    }, [wallet])

    const mintToken = async () => {
        if(initalizedRef.current) {
            const address = await wallet.getAddress();
            // bond amount approve on treasuray address
            // bond amount approve on CT address
            await tokenContract.approve()
            // wait till approve goes through and is confirmed
            // call split positon on CT
            tokenContract.on("approve", (event) => {
              if(event.from === address && event.to === conditionalTokenAddress) {
                conditionalTokenContract.splitPosition(conditionId, conditionResponse ? [1,0] : [0, 1], amount);
              }
            })
        }
    };


    return { mintToken, setConditionResponse, dispatchAmount };
}

export default useMintable;