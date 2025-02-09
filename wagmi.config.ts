import { defineConfig } from '@wagmi/cli'
import { react } from "@wagmi/cli/plugins";
import { postAbi, settle, tokenAbi } from './abis';
import { Abi } from "viem";

export default defineConfig({
  out: "hooks/wagmi/contracts.ts",
  contracts: [
    {
      name: "Curate Token",
      abi: tokenAbi as Abi,
    },
    {
      name: "Curate Posts",
      abi: postAbi
    },
    {
      name: "Curate Settle",
      abi: settle
    }
  ],
  plugins: [react()],
})
