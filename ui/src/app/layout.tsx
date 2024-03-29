'use client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@rainbow-me/rainbowkit/styles.css';

import Head from 'next/head'
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  sepolia,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { Provider } from 'react-redux';
import store from './store/store';
import Footer from './components/Footer';


const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ETHEREUM_MAINNET_API_KEY! }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ETHEREUM_SEPOLIA_API_KEY! }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'escrow-app',
  projectId: '0ff2f2ab44c0672fe17266cca7157230',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Escrow App</title>
        <meta name="description" content="Escrow App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Provider store={store}>
              {children}
            </Provider>
          </RainbowKitProvider>
        </WagmiConfig>
        <Footer />
        </body>
    </html>
  )
}