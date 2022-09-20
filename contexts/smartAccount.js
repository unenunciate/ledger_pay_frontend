import { createContext, useMemo } from 'react';

import { newProvider } from '../utils/ERC4337';

import { ClientConfiguration } from '../utils/ClientConfiguration';

import { useProvider } from 'wagmi';

import { useSigner, useNetwork, useAccount } from '@web3modal/react';

import useAuth from '../hooks/useAuth';

const SmartAccountContext = createContext(null);

                               

const SmartAccountProvider = ({provider, children}) => {
    const { user, recoveryMode } = useAuth();
    const { address, chainId } = useAccount();

    const isConnected = user?.id && address && !recoveryMode;

    const { signer } = useSigner();

    const smartAccountAddress = '0x0'// useMemo(user?.smartAccountAddresses[chainId], [user, chainId]);
    
    const smartAccountProvider = useMemo(async () => isConnected ? provider && signer ? await newProvider(provider, ClientConfiguration, signer) : null : null, [isConnected, provider, signer]);
    const smartAccountSigner = useMemo(async () => isConnected ? smartAccountProvider ? await smartAccountProvider.getSigner() : null : null, [isConnected, smartAccountProvider]);
  //  const smartAccountAPI = useMemo(() => isConnected ? smartAccountProvider && smartAccountSigner ? new SimpleWalletAPI(smartAccountProvider, ClientConfiguration.entryPointAddress, smartAccountAddress, smartAccountSigner, address) : null : null, [isConnected, smartAccountProvider, smartAccountSigner]);

    return (
        <SmartAccountContext.Provider value={{smartAccountSigner, smartAccountProvider, smartAccountAddress}} >
            {children}
        </SmartAccountContext.Provider>
    )
}

export {
    SmartAccountContext,
    SmartAccountProvider
}