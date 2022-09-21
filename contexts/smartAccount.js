import { createContext, useMemo, useCallback } from 'react';

import { newProvider, SimpleWalletAPI, HttpRpcClient } from '../utils/ERC4337';

import { ClientConfigurations } from '../utils/ClientConfigurations';

import { useSigner, useNetwork, useAccount } from '@web3modal/react';

import useAuth from '../hooks/useAuth';

const SmartAccountContext = createContext(null);

const SmartAccountProvider = ({provider, children}) => {
    const { user, recoveryMode, isConnected } = useAuth();

    const isConnectedAndNotRecovery = useMemo(isConnected && !recoveryMode, [isConnected, recoveryMode]);

    const { address } = useAccount();
    const { signer } = useSigner();
    const { chainId } = useNetwork();

    const smartAccountAddress = '0x8f8509E544aaf6Fd175a66F455E1d54Ea635C558' // useMemo(user?.smartAccountAddresses[chainId], [user, chainId]);

    const config = useCallback(() => {
        const config = ClientConfigurations.find((c => c.chain.id === chainId))
        return config;
    }, [chainId])
    
    const smartAccountProvider = useMemo(async () => isConnectedAndNotRecovery ? provider && signer ? await newProvider(provider, config, signer) : null : null, [isConnectedAndNotRecovery, provider, signer, config]);
    const smartAccountSigner = useMemo(async () => isConnectedAndNotRecovery ? smartAccountProvider ? await smartAccountProvider.getSigner() : null : null, [isConnectedAndNotRecovery, smartAccountProvider]);
    const smartAccountAPI = useMemo(() => isConnectedAndNotRecovery ? smartAccountProvider && smartAccountSigner ? new SimpleWalletAPI(smartAccountProvider, config.entryPointAddress, smartAccountAddress, smartAccountSigner, address) : null : null, [isConnectedAndNotRecovery, smartAccountProvider, smartAccountSigner]);
    const bundlerClient = useMemo(() => isConnectedAndNotRecovery ? smartAccountProvider && smartAccountSigner ? new HttpRpcClient(config.bundlerUrl, config.entryPointAddress, config.chain.id) : null : null, [isConnectedAndNotRecovery, config]);
    
    return (
        <SmartAccountContext.Provider value={{ smartAccountAddress, smartAccountAPI, bundlerClient, configs : ClientConfigurations, chainId }} >
            {children}
        </SmartAccountContext.Provider>
    )
}

export {
    SmartAccountContext,
    SmartAccountProvider
}