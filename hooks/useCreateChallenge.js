import { useEffect, useState, useContext, useCallback, useRef, useReducer} from 'react';

import { ethers } from 'ethers';

import { tokenABI, conditionalTokenABI, tresurayABI } from '../utils/contracts/abi'

const tokenAddress = process.env.NEXT_PUBLIC_USD_ADDRESS
const conditionalTokenAddress = process.env.NEXT_PUBLIC_CT_ADDRESS
const tresurayAddress = process.env.NEXT_PUBLIC_TREASURAY_ADDRESS

const useCreateChallenge = () => {
    const { user, wallet } = useAuth();

    const initalizedRef = useRef(false);

    const [tresurayContract, setTresurayContract] = useState({});
    const [tokenContract, setTokenContract] = useState({});
    const [conditionalTokenContract, setConditionalTokenContract] = useState({});

    const [goalWeight, setGoalWeight] = useState(0);

    const [bond, dispatchBond] = useReducer((state, action) => {
        if(action.type === "change") {
            const bn = ethers.BigNumber.from(next);
            const fn = ethers.FixedNumber.fromValue( bn,  18 );
            return fn.toString();
        } else {
            return state;
        }
    }, '');

    const [deadline, setDeadline] = useState('');

    const [challengeId, setChallengeId] = useState('');
    const [conditionId, setConditionId] = useState('');
    
    //add vars to state then pass create and vars + set down bellow

    useEffect(() => {
        if(ethers.Signer.isSigner(wallet)) {
            setTresurayContract(ethers.contract(tresurayABI, tresurayAddress, wallet));
            setTokenContract(ethers.contract(tokenABI, tokenAddress, wallet));
            setConditionalTokenContract(ethers.contract(conditionalTokenABI, conditionalTokenAddress, wallet));
            initalizedRef.current = true;
        } else {
            initalizedRef.current = false;
        }
    }, [wallet])


    const createChallenge = async () => {
        if(initalizedRef.current) {
            const address = await wallet.getAddress();
            // bond amount approve on treasuray address
            await tokenContract.approve()
            // wait till approve goes through and is confirmed
            // bond amount, goalWeight, deadline(string) 
            tokenContract.on("approve", (event) => {
                if(event.from === address && event.to === tresurayAddress) {
                    tresurayContract.initiateChallenge(goalWeight, bond, deadline);
                }
            })
            
            //replace this with encoding to kek256 the same order as contract vars
            tresurayContract.on("ChallengeInitialized", (event) => {
                if(event.creater === address) {
                    setChallengeId(event.challengeId)
                }
            })

            conditionalTokenContract.on('ConditionPreparation', (event) => {
                if(challengeId === event.questionId) {
                    setConditionId(event.conditionId)
                }
            })
        }
    };


    return { challengeId, conditionId, setGoalWeight, dispatchBond, setDeadline, createChallenge };
}

export default useCreateChallenge;