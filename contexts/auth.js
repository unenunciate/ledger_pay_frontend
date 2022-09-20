import { initStytch, StytchProvider } from '@stytch/stytch-react';

import { isEmpty } from 'lodash';

import { createContext, useState, useMemo, useEffect } from 'react';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { useCookies }  from 'react-cookie';

import { useQuery } from "@tanstack/react-query";
import { getUserFromStytch } from '../utils/queries/users';

import { useAccount, useSigner, useConnectModal } from '@web3modal/react';

const AuthContext = createContext(null);

const stytchOptions = {
    
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const stytch = useMemo(() => (initStytch(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN, stytchOptions)), [stytchOptions]);
    const [stytchUUID, setStytchUUID] = useState(() => !isEmpty(cookies.user) ? cookies.user.stytches[0]: null);

    const shouldUserBeFetched = useMemo(() => (isEmpty(user) && stytchUUID && isEmpty(cookies.user)), [user, stytchUUID, cookies])
    const { isLoading: userIsLoading } = useQuery(['user', stytchUUID], getUserFromStytch, {
        onSuccess: (response) => updateUser(response.data.user),
        enabled: shouldUserBeFetched ?? false
    });

    const [recoveryMode, setRecoveryMode] = useState(false);

    /** 
    const shouldLogoutBePosted = useMemo(() => (!isEmpty(user) && isEmpty(cookies.user)), [user, cookies]);
    useQuery(['user', user.id], userLogout, {
        onSuccess: (response) => setUser({}),
        enabled: shouldLogoutBePosted ?? false
    });
    */
    const { isOpen, open, close } = useConnectModal();

    const { address: EOA } = useAccount();
    const { signer } = useSigner();
    

    useEffect(() => {
        if(cookies.user?.id !== user?.id || !isEmpty(cookies.user) && isEmpty(user)) {
            setUser(cookies.user);
        }
    }, [cookies]);

    useUpdateEffect(() => {
        if(isEmpty(cookies.user) && isEmpty(user) && signer && !recoveryMode) {
            finishEthereumLogin();
        } 
    }, [EOA, signer]);

    const triggerEthereumLogin = () => {
        open();
    };

    const finishEthereumLogin = async () => {
        /* Ask Stytch to generate a challenge for the user */
        const { challenge } = await stytch.cryptoWallets.authenticateStart({
            crypto_wallet_address: EOA,
            crypto_wallet_type: 'ethereum',
        });

        /* Ask the user's browser to sign the challenge */
        const signature = await signer.signMessage(
             [challenge, EOA]
        );

        /* Send the signature back to Stytch for validation */
        const s = await stytch.cryptoWallets.authenticate({
            crypto_wallet_address: EOA,
            crypto_wallet_type: 'ethereum',
            signature,
            session_duration_minutes: 120,
        });

        setStytchUUID(s.user_id);
    };

    const updateUser = (updates) => {
        setCookie('user', {...updates, ...cookies.user}, {maxAge:120})
    }

    const disconnect = async () => {
        await stytch.session.revoke();
        removeCookie('user', {});
    };

    return (
        <AuthContext.Provider value={{user, stytch, EOA, triggerEthereumLogin, disconnect, updateUser, modalIsOpen: isOpen, closeModal: close, setRecoveryMode, recoveryMode}} >
            <StytchProvider stytch={stytch}>
                {children}
            </StytchProvider>
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}