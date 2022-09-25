import { useState } from "react";
import useAuth from "./useAuth";
import useSmartAccount from '../hooks/useSmartAccount';
//import SmartAccountABI from '../utils/contracts/abi/SmartContractWallet'
import { useAccount, useNetwork } from '@web3modal/react';

const useWorldId = ( act = "setup", callback = null ) => {
    const [action, setAction] = useState(act);

    const { recoveryMode } = useAuth();
    const { address } = useAccount();

    const { chain } = useNetwork();

    const { createAndSendUserOP, smartAccountAddress } = useSmartAccount();

    const onVerificationSuccess = (proof) => {
        if(chain.id === 137) {
            if (action === "recover") {
                if(recoveryMode) {

                    let iface = new ethers.utils.Interface([
                        "function recoverWalletWithWorldId(address,uint256,uint256,uint256[])"
                    ]);
                    let callData = iface.encodeFunctionData(
                        "recoverWalletWithWorldId", [
                        address,
                        proof.merkle_root,
                        proof.nullifier_hash,
                        proof.proof
                    ]);

                    const txObject = {value : 0, target : smartAccountAddress, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null }
               
                    createAndSendUserOP(txObject);

                    if(callback) {
                        callback();
                    }
                }

            } else if (action === "setup") {


                let iface = new ethers.utils.Interface([
                    "function setRecoveryHash(uint256)"
                ]);
                let callData = iface.encodeFunctionData(
                    "setRecoveryHash", [
                    proof.nullifier_hash
                ]);

                const txObject = {value : 0, target : smartAccountAddress, data : callData, maxFeePerGas: null, maxPriorityFeePerGas: null }
                    
                //all data
                //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
                //once tx prepared  V first param function below
                createAndSendUserOP(txObject);

                if(callback) {
                    callback();
                }
            }
        }

    }

    const updateAction = (action) => {
        setAction(action);

        if(action === "approve") {
            //all data
            //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
            //once tx prepared  V first param function below
            createAndSendUserOP();

            if(callback) {
                callback();
            }
        } else if (action === "revoke") {
            //all data
            //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
            //once tx prepared  V first param function below
            createAndSendUserOP();

            if(callback) {
                callback();
            }
        }
    }

    return { onVerificationSuccess, updateAction };
}

export default useWorldId;