"use client";

import { useMagicState } from "@/app/context/magic.provider";
import WalletPage from "@/components/wallet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Wallet = () => {
  const { token } = useMagicState();

  const router = useRouter();

  useEffect(() => {
    !token && router.push("/");
  }, [token]);

  return "<WalletPage />";
};

export default Wallet;
