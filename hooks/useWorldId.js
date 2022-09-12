import { useEffect, useState } from "react";
import useSmartAccount from '../hooks/useSmartAccount';
import SmartAccountABI from '../utils/contracts/abi/S'
import { useContract, useSigner } from 'wagmi';

const useWorldId = ({ aprrove = false, revoke = false, recover = false, callback = null }) => {
    const [proof, setProof] = useState(null);

    const {SmartAccountAddress} = useSmartAccount();

    const {data: signer} = useSigner();

    const {} = useContract(SmartAccountAddress, SmartAccountABI, signer);
  
    useEffect(() => {
        
    }, [proof]);

    const onVerificationSuccess = (response) => {
        setProof(response);
    }

    return { proof, onVerificationSuccess };
}

export default useWorldId;