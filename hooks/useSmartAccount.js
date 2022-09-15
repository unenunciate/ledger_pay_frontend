import { useContext, useState } from 'react';
import { SmartAccountContext } from '../contexts/smartAccount';

const useSmartAccount = () => {
    const {  SmartAccountSigner, SmartAccountAddress } = useContext(SmartAccountContext);
    const [ enqueuedOPs, setEnqueuedOPs ] = useState([]);

    const createUserOperation =  async  (to, value = 0, params = {}, addToQ = flase) => {
        const op = await SmartAccountAPI.encodeExecute(to, value, params);

        if(addToQ) {
            addToQueue(op);
        }

        return op;
    };

    //add way to send via extension then only as fallback send via RPC here
    const executeOP = async (OP) => {
        const result = await SmartAccountSigner.sendTransaction();

        return result;
    };

    const addToQueue = (OP) => {
        setEnqueuedOPs([...enqueuedOPs, OP]);
    }

    const executeQueue = async () => {
        const results = Array(enqueuedOPs).forEach(OP => {
            return SmartAccountRPC.sendUserOpToBundler(OP);
        });

        return results;
    };

    return { SmartAccountAddress, createUserOperation, executeOP, addToQueue, executeQueue };
}

export default useSmartAccount;