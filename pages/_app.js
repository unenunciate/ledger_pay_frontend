import '../styles/globals.css';

import { CookiesProvider } from 'react-cookie';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ClientConfigurations } from '../utils/ClientConfigurations';

import { createClient, configureChains, defaultChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { Web3ModalEthereum } from '@web3modal/ethereum';
import { Web3ModalProvider } from '@web3modal/react';

import { NotificationProvider } from "../contexts/notification";
import { AuthProvider } from "../contexts/auth";
import { SmartAccountProvider } from '../contexts/smartAccount';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



const App = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  const deployedChains = ClientConfigurations.map(config => config.Chain)

  const { chains, provider } = configureChains(deployedChains, [
          jsonRpcProvider({
            rpc: (chain) => ({ http: chain.rpcUrls.default })
          })
        ]
    );

  

  const wagmiClient  = createClient({
    autoConnect: true,
    connectors:  Web3ModalEthereum.defaultConnectors({ chains, appName: 'web3Modal' }),
    provider
  });

  const modalConfig = {
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
    theme: 'dark',
    accentColor: 'magenta'
  }

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Web3ModalProvider config={modalConfig} ethereumClient={wagmiClient}>
            <NotificationProvider>
              <AuthProvider>
                <SmartAccountProvider provider={provider} >
                  <Component {...pageProps} />
                </SmartAccountProvider>
              </AuthProvider>
            </NotificationProvider>
          </Web3ModalProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
