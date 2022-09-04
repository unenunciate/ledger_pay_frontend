import { useEffect, useState, useContext, useCallback, useRef} from 'react';

import { ethers } from 'ethers';


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

    const createChallenge = () => {
        if(initalizedRef.current) {
            // bond amount approve on treasuray address
            tokenContract.aprove()
            // bond amount, goalWeight, deadline(string) 
            const hash = contract.initiateChallenge(goalWeight, bond, deadline);
            
            tresurayContract.on("ChallengeInitialized", (event) => {
                setChallengeId(event.challengeId)
            })

            conditionalTokenContract.on('ConditionPreparation', (event) => {
                setConditionId(event.conditionId)
            } )
        }
    };


    return { challengeId, conditionId, setGoalWeight, dispatchBond, setDeadline, createChallenge };
}

export default useCreateChallenge;