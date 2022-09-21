import { useContext } from 'react';
import { SmartAccountContext } from '../contexts/smartAccount';

const useSmartAccount = () => {
    const { smartAccountAPI, bundlerClient, smartAccountAddress, configs, chainId } = useContext(SmartAccountContext);

    // add way to send via extension then only as fallback send via RPC here
    // transaction : {value: 0, target: "", data:"", maxFeePerGas: 0, maxPriorityFeePerGas:0}
    const createAndSendUserOP = async (transaction) => {
        const OP = await smartAccountAPI.createSignedUserOp(transaction);
        const result = await bundlerClient.sendUserOpToBundler(OP);
        return result;
    };

    return { smartAccountAddress, createAndSendUserOP, configs, chainId };
}

export default useSmartAccount;