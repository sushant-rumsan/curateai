import { ethers } from "ethers";
import { getContractWithSigner } from "./get_contract_signer";
import { contract } from "@/constants/contract";

const privateKey = process.env.MODERATOR_PRIVATE_KEY as string;
const rpc = process.env.RPC_URL as string;

const provider = new ethers.JsonRpcProvider(rpc);
const wallet = new ethers.Wallet(privateKey, provider);

export const transfer_sonic = async (
  receiverAddress: `0x${string}`,
  amountToSend: number
) => {
  const value = ethers.parseEther(amountToSend.toString());
  const tx = await wallet.sendTransaction({
    to: receiverAddress,
    value,
  });
  const receipt = await tx.wait();
  return receipt;
};

export const transfer_cat = async (receiverAddress: `0x${string}`) => {
  const amount = 10;
  const tokenContract = getContractWithSigner("CurateAIToken", contract.token);
  //@ts-ignore
  await tokenContract.transfer(receiverAddress, BigInt(amount));
};
