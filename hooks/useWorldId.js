import { useEffect, useState } from "react";
import useSmartAccount from '../hooks/useSmartAccount';
//import SmartAccountABI from '../utils/contracts/abi/SmartContractWallet'
import { useContract, useSigner } from '@web3modal/react';

const useWorldId = ( approve = false, revoke = false, recover = false, setup = false, callback = null ) => {
    const [proof, setProof] = useState(null);
    const [action, setAction] = useState(approve ? 'approve': revoke ? 'revoke' : recover ? 'recover' : setup ? 'setup' : null);

    const { smartAccountAddress,  createUserOperation, executeOP } = useSmartAccount();

    const { signer } = useSigner();

   // const {} = useContract(SmartAccountAddress, SmartAccountABI, signer);
  
    useEffect(() => {
        if(action === "approve") {

        } else if (action === "revoke") {

        } else if (action === "recover") {

        } else if (action === "setup") {
            if(proof) {
                const op = createUserOperation(smartAccountAddress, 0, {})
                executeOP(op);
                if(callback) {
                    callback();
                }
            }
        }
        
    }, [proof, action]);

    const onVerificationSuccess = (response) => {
        setProof(response);
    }

    const updateAction = (a = false, rev = false, rec = false, s = false) => {
        setAction(a ? 'approve': rev ? 'revoke' : rec ? 'recover' : s ? 'setup' : null);
    }

    return { proof, onVerificationSuccess, updateAction };
}

export default useWorldId;