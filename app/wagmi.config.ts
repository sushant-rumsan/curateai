'use client';

import { safe } from 'wagmi/connectors';
import { baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';
import { http, type Config, createConfig } from 'wagmi';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

export const config: Config = createConfig(
  getDefaultConfig({
    syncConnectedChain: true,
    chains: [baseSepolia],
    batch: {
      multicall: true,
    },
    connectors: [
      safe(),
    ],
    transports: {
      [baseSepolia.id]: http(),
    },
    walletConnectProjectId: '',
    appName: 'Curate AI',

    appDescription: '',
    appUrl: '',
    appIcon: '/public/logo/logo_single.png',
  })
);