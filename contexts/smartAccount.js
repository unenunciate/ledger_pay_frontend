import { createContext, useMemo, useState } from 'react';

import { newProvider } from '../utils/ERC4337';

import { ClientConfiguration } from '../utils/ClientConfiguration';

import { useProvider, useSigner, chain, useAccount } from 'wagmi';

import useAuth from '../hooks/useAuth';

const SmartAccountContext = createContext(null);

const SmartAccountProvider = ({children}) => {
    const { user } = useAuth();

    const isConnected = user?.id ?? false;

    const { address } = useAccount();
    const { provider } = useProvider([chain.polygon]);
    const { signer } = useSigner();

    const [SmartAccountAddress] = useState(user.smartAccountAddress);
    
    const SmartAccountProvider = useMemo(async () => isConnected ? provider && signer ? await newProvider(provider, ClientConfiguration, signer) : null : null, [isConnected, provider, signer]);
    const SmartAccountSigner = useMemo(async () => isConnected ? SmartAccountProvider ? await SmartAccountProvider.getSigner() : null : null, [isConnected, SmartAccountProvider]);
  //  const SmartAccountAPI = useMemo(() => isConnected ? SmartAccountProvider && SmartAccountSigner ? new SimpleWalletAPI(SmartAccountProvider, ClientConfiguration.entryPointAddress, SmartAccountAddress, SmartAccountSigner, address) : null : null, [isConnected, SmartAccountProvider, SmartAccountSigner]);

    return (
        <SmartAccountContext.Provider value={{SmartAccountSigner, SmartAccountProvider, SmartAccountAddress}} >
            {children}
        </SmartAccountContext.Provider>
    )
}

export {
    SmartAccountContext,
    SmartAccountProvider
}