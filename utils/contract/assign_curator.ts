import { getContractWithSigner } from "./get_contract_signer";
import { contract } from "@/constants/contract";

export const assign_curator = async (walletAddress: `0x${string}`) => {
  const roleContract = getContractWithSigner(
    "CurateAIRoleManager",
    contract.role
  );
  try {
    //@ts-ignore
    await roleContract.assignCurator(walletAddress);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
