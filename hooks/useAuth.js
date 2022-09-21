import { useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/auth';
import { isEmpty } from 'lodash';

const useAuth = (required = false) => {
    const router = useRouter();
    const {user, stytch, EOA, cookiesCheckedRef, triggerEthereumLogin, disconnect, updateUser, modalIsOpen, closeModal, setRecoveryMode, recoveryMode} = useContext(AuthContext);

    const isConnected = useCallback(() => {
        if(isEmpty(user) && cookiesCheckedRef.current) {
            return false;
        }

        if(isEmpty(user) && !cookiesCheckedRef.current) {
            return null;
        }

        return true;
    }, [user, cookiesCheckedRef.current])

    useEffect(() => {
        if(required) {
            if(isConnected() === false) {
                router.push("/connect");
            }
        }
    }, [isConnected]); 

    return { disconnect, user, isConnected, triggerEthereumLogin, updateUser, modalIsOpen, closeModal, setRecoveryMode, recoveryMode };
}

export default useAuth;