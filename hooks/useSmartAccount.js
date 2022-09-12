import { useEffect, useContext, } from 'react';
import { useRouter } from 'next/router';
import { SmartAccountContext } from '../contexts/smartAccountt';
import { isEmpty } from 'lodash';

const useSmartAccount = () => {
    const { SmartAccountSigner, SmartAccountAPI, SmartAccountRPC } = useContext(SmartAccountContext);

    const execute = () => {

    };

    return { execute, };
}

export default useAuth;