// pages/auth/callback.tsx (or app/auth/callback/page.tsx for Next.js App Router)
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMagic } from "@/hooks/MagicProvider";
import { saveUserInfo } from "@/utils/common";
import { useCreateUser } from "@/hooks/api-hooks";
import showToast from "@/utils/showToast";
import { useMagicState } from "@/app/context/magic.provider";

const AuthCallback = () => {
  const { magic } = useMagic();
  const router = useRouter();
  const { mutateAsync } = useCreateUser();

  const { setToken } = useMagicState();
  let called = false;
  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (called) return;
        called = true;
        // Retrieve the OAuth result
        const result = await magic?.oauth.getRedirectResult();
        const token = result?.magic.idToken;
        const metadata = result?.oauth.userInfo;

        if (!token || !metadata?.email || !metadata?.sub) {
          throw new Error("Google login failed");
        }

        await mutateAsync({
          token,
          email: metadata?.email,
          walletAddress: result?.magic?.userMetadata?.publicAddress,
        });

        saveUserInfo(
          token,
          "SOCIAL",
          result?.magic?.userMetadata?.publicAddress as string
        );

        setToken(token);

        showToast({
          message: "Login successful",
          type: "success",
        });

        router.push("/");
      } catch (e) {
        console.error("Callback error from:", e);
        showToast({
          message: "Failed to complete Google login. Please try again.",
          type: "error",
        });
        router.push("/");
      }
    };

    handleCallback();
  }, []);

  return <div className="mt-16">Authenticating, Please wait...</div>;
};

export default AuthCallback;
