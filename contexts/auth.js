import { initStytch, StytchProvider } from '@stytch/stytch-react';

import { isEmpty } from 'lodash';

import { createContext, useState, useMemo, useEffect } from 'react';
import { useCookies }  from 'react-cookie';

import { useQuery } from "@tanstack/react-query";
import { getUserFromStytch } from '../utils/queries/users';

import { useAccount, useConnect, useSigner } from 'wagmi';

const AuthContext = createContext(null);

const stytchOptions = {
    
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const stytch = useMemo(() => (initStytch(process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN, stytchOptions)), [stytchOptions]);
    const [stytchUUID, setStytchUUID] = useState(() => !isEmpty(cookies.user) ? cookies.user.stytches[0]: null);

    const { isLoading: userIsLoading } = useQuery(['user', stytchUUID], getUserFromStytch, {
        onSuccess: (response) => updateUser(response.data.user),
        enabled: isEmpty(user) && stytchUUID && isEmpty(cookies.user)
    });

    useQuery(['user', user.id], userLogout, {
        onSuccess: (response) => setUser({}),
        enabled: !isEmpty(user) && isEmpty(cookies.user)
    });

    const { address: EOA } = useAccount();
    const { connectAsync, connectors } = useConnect();

    useEffect(() => {
        if(cookies.user?.id !== user?.id || !isEmpty(cookies.user) && isEmpty(user)) {
            setUser(cookies.user);
        }
    }, [cookies]);

    const triggerEthereumLogin = async () => {
        /* Request user's wallet address */
        const { address } = await connectAsync();
        /* Ask Stytch to generate a challenge for the user */
        const { challenge } = await stytch.cryptoWallets.authenticateStart({
            crypto_wallet_address: address,
            crypto_wallet_type: 'ethereum',
        });

        /* Ask the user's browser to sign the challenge */
        const signature = await signer.signMessage(
             [challenge, crypto_wallet_address]
        );

        /* Send the signature back to Stytch for validation */
        const s = await stytch.cryptoWallets.authenticate({
            crypto_wallet_address: address,
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
        <AuthContext.Provider value={{user, stytch, EOA, connectors, triggerEthereumLogin, disconnect, updateUser}} >
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