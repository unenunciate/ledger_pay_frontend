import { useState } from "react";
import { useAuth } from "./useAuth";
import useSmartAccount from '../hooks/useSmartAccount';
//import SmartAccountABI from '../utils/contracts/abi/SmartContractWallet'
import { useAccount, useNetwork } from '@web3modal/react';

const useWorldId = ( act = "setup", callback = null ) => {
    const [action, setAction] = useState(act);

    const { recoveryMode } = useAuth();
    const { address } = useAccount();

    const { chain } = useNetwork();

    const { createAndSendUserOP } = useSmartAccount();

    const onVerificationSuccess = (proof) => {
        if(chain.id === 137) {
            if (action === "recover") {
                if(recoveryMode) {
                    //this is the address to recover too
                    address

                    //all data
                    //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
                    //once tx prepared  V first param function below
                    createAndSendUserOP();

                    if(callback) {
                        callback();
                    }
                }

            } else if (action === "setup") {
                    
                //all data
                //tx object: {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
                //once tx prepared  V first param function below
                createAndSendUserOP();

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