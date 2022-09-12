import '../styles/globals.css';

import { CookiesProvider } from 'react-cookie';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { WagmiConfig as WagmiClientProvider } from 'wagmi';
import { SmartAccountProvider } from '../contexts/smartAccount';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from "../contexts/auth";
import { NotificationProvider } from "../contexts/notification";

import { useState } from 'react';

import { createClient, configureChains, defaultChains, createStorage } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const App = ({ Component, pageProps }) => {
  const [ queryClient ] = useState(() => new QueryClient());

  const { chains, provider } = configureChains(defaultChains, [publicProvider()])

  const [ wagmiClient ] = useState(() => createClient({
    connectors: [
      new InjectedConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
    ],
    provider,
    storage: createStorage({ storage: window.localStorage }),
  }));

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <WagmiClientProvider client={wagmiClient} >
            <AuthProvider>
              <SmartAccountProvider>
                <NotificationProvider>
                  <Component {...pageProps} />
                </NotificationProvider>
              </SmartAccountProvider>
            </AuthProvider>
          </WagmiClientProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
