"use client";

import { useState, useEffect } from "react";
import { http, createConfig } from "wagmi";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import { sonic_blaze_rpc } from "@/constants/sonic";

export const sonicTestnet = {
  id: 57054,
  name: "Sonic Testnet",
  nativeCurrency: { decimals: 18, name: "Sonic", symbol: "S" },
  rpcUrls: { default: { http: ["https://rpc.blaze.soniclabs.com"] } },
  blockExplorers: {
    default: {
      name: "Sonic Testnet Explorer",
      url: sonic_blaze_rpc,
    },
  },
  testnet: true,
};

export function useWagmiConfig() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const wagmiConfig = createConfig({
      batch: { multicall: true },
      chains: [sonicTestnet],
      connectors: [
        dedicatedWalletConnector({
          chains: [sonicTestnet],
          options: {
            apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
            magicSdkConfiguration: {
              network: {
                rpcUrl: sonic_blaze_rpc,
                chainId: 57054,
              },
            },
          },
        }),
      ],
      transports: {
        [sonicTestnet.id]: http(),
      },
    });

    setConfig(wagmiConfig);
  }, []);

  return config;
}
