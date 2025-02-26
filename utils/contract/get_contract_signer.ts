import { ethers } from "ethers";
import { Contract } from "./contract";

const rpc = process.env.RPC_URL as string;
const privateKey = process.env.MODERATOR_PRIVATE_KEY as string;

export const getContractWithSigner = (
  contractName: string,
  contractAddress: string
) => {
  const contractObj = new Contract(rpc);
  const contract = contractObj.getContract(contractName, contractAddress);
  const contractWithSigner = contract.connect(getSigner());
  return contractWithSigner;
};

export const getSigner = () => {
  const provider = new ethers.JsonRpcProvider(rpc);
  return new ethers.Wallet(privateKey, provider);
};
