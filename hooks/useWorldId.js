import { useEffect, useState } from "react";
import useSmartAccount from '../hooks/useSmartAccount';
import SmartAccountABI from '../utils/contracts/abi/S'
import { useContract, useSigner } from 'wagmi';

const useWorldId = ({ aprrove = false, revoke = false, recover = false, callback = null }) => {
    const [proof, setProof] = useState(null);
    const [action, setAction] = useState(approve ? 'approve': revoke ? 'revoke' : recover ? 'recover' : null);

    const {SmartAccountAddress} = useSmartAccount();

    const {data: signer} = useSigner();

    const {} = useContract(SmartAccountAddress, SmartAccountABI, signer);
  
    useEffect(() => {
        
    }, [proof, action]);

    const onVerificationSuccess = (response) => {
        setProof(response);
        
        if (callback) {
            callback();
        }
    }

    const updateAction = (a = false, rev = false, rec = false) => {
        setAction(a ? 'approve': rev ? 'revoke' : rec ? 'recover' : null);
    }

    return { proof, onVerificationSuccess, updateAction };
}

export default useWorldId;