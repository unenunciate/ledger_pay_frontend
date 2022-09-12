import { createContext, useMemo} from 'react';

import { SimpleWalletAPI, newProvider, ClientConfigation, HttpRpcClient } from '../utils/ERC4337/src';

import { useProvider, useSigner, chain } from 'wagmi';

const SmartAccountContext = createContext(null);

const SmartAccountProvider = ({children}) => {
    const { user } = useAuth();

    const { address } = useAccount();
    const { provider } = useProvider([chain.polygon]);
    const { signer } = useSigner();
    
    const [SmartAccountProvider] = useMemo(async () => provider && signer ? await newProvider(provider, ClientConfig, signer) : null, [provider, signer]);
    const [SmartAccountSigner] = useMemo(() => SmartAccountProvider ? SmartAccountProvider.getSigner() : null, [SmartAccountProvider]);
    const [SmartAccountAPI] = useMemo(() => SmartAccountProvider && SmartAccountSigner ? new SimpleWalletAPI(SmartAccountProvider, ClientConfig.entryPointAddress, user.smartAccountAddress, SmartAccountSigner, address) : null, [SmartAccountProvider, SmartAccountSigner]);
    const [SmartAccountRPC] = useMemo(() => SmartAccountAPI ? new HttpRpcClient(ClientConfigation.bundlerUrl. ClientConfigation.entryPointAddress, ClientConfigation.chainId) : null, [SmartAccountAPI]);

    return (
        <SmartAccountContext.Provider value={{SmartAccountSigner, SmartAccountProvider, SmartAccountAPI, SmartAccountRPC}} >
            {children}
        </SmartAccountContext.Provider>
    )
}

export {
    SmartAccountContext,
    SmartAccountProvider
}