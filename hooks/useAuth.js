import { useEffect, useContext, } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/auth';
import { isEmpty } from 'lodash';

const useAuth = (required = false) => {
    const router = useRouter();
    const {user, stytch, EOA, triggerEthereumLogin, disconnect, updateUser, modalIsOpen, closeModal, setRecoveryMode, recoveryMode} = useContext(AuthContext);

    useEffect(() => {
        if(required) {
            if(isEmpty(user)) {
                router.push("/connect")
            }
        }
    }, [user]); 

    return { disconnect, user, triggerEthereumLogin, updateUser, modalIsOpen, closeModal, setRecoveryMode, recoveryMode};
}

export default useAuth;