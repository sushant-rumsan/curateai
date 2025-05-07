"use client";

import { useState, useEffect } from "react";
import { useMagic } from "@/hooks/MagicProvider";
import showToast from "@/utils/showToast";
import { RPCError, RPCErrorCode } from "magic-sdk";
import type { LoginProps } from "@/utils/types";
import { saveUserInfo } from "@/utils/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useCreateUser } from "@/hooks/api-hooks";
import GoogleLogin from "./GoogleLogin";

const EmailOTP = ({ token, setToken }: LoginProps) => {
  const { magic } = useMagic();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoginInProgress, setLoginInProgress] = useState(false);
  const { mutateAsync } = useCreateUser();
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speed: number;
      direction: number;
      opacity: number;
      color: string;
    }>
  >([]);

  // Generate particles with the same style as BlogList
  useEffect(() => {
    const particleCount = 15;
    const vibrantColors = [
      "rgba(59, 130, 246, 0.2)", // Blue
      "rgba(99, 102, 241, 0.2)", // Indigo
      "rgba(139, 92, 246, 0.2)", // Purple
      "rgba(236, 72, 153, 0.2)", // Pink
      "rgba(14, 165, 233, 0.2)", // Sky
      "rgba(6, 182, 212, 0.2)", // Cyan
    ];

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 150 + 100, // Huge size (100-250px)
      speed: Math.random() * 0.05 + 0.01, // Very slow movement
      direction: Math.random() * 360,
      opacity: Math.random() * 0.15 + 0.05, // Very low opacity (0.05-0.2)
      color: vibrantColors[Math.floor(Math.random() * vibrantColors.length)],
    }));
    setParticles(newParticles);
  }, []);

  const handleLogin = async () => {
    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailError(true);
    } else {
      try {
        setLoginInProgress(true);
        setEmailError(false);

        const token = await magic?.auth.loginWithEmailOTP({ email });
        const metadata = await magic?.user.getInfo();

        await mutateAsync({
          token,
          email,
          walletAddress: metadata?.publicAddress,
        });

        if (!token || !metadata?.publicAddress) {
          throw new Error("Magic login failed");
        }

        setToken(token);
        saveUserInfo(token, "EMAIL", metadata?.publicAddress);
        setEmail("");
      } catch (e) {
        console.log("login error: " + JSON.stringify(e));
        if (e instanceof RPCError) {
          switch (e.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              showToast({ message: e.message, type: "error" });
              break;
            default:
              showToast({
                message: "Something went wrong. Please try again",
                type: "error",
              });
          }
        }
      } finally {
        setLoginInProgress(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-[#f9fafb] to-[#f9fafb] relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              background: particle.color,
              filter: `blur(${particle.size / 4}px)`, // Heavy blur effect
            }}
            animate={{
              x: [
                0,
                Math.cos(particle.direction * (Math.PI / 180)) *
                  100 *
                  particle.speed,
                Math.cos(particle.direction * (Math.PI / 180)) *
                  200 *
                  particle.speed,
              ],
              y: [
                0,
                Math.sin(particle.direction * (Math.PI / 180)) *
                  100 *
                  particle.speed,
                Math.sin(particle.direction * (Math.PI / 180)) *
                  200 *
                  particle.speed,
              ],
              opacity: [
                particle.opacity,
                particle.opacity * 1.2,
                particle.opacity,
              ],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30 + Math.random() * 40, // Very slow animation (30-70s)
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Add animated gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-blue-400 to-purple-500"
          style={{ top: "10%", left: "5%", filter: "blur(80px)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 bg-gradient-to-r from-pink-400 to-blue-500"
          style={{ bottom: "15%", right: "10%", filter: "blur(100px)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -70, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg px-6 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <div className="flex items-center justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-600 p-4 rounded-full shadow-lg"
            >
              <Zap className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-2 text-center"
          >
            Welcome To Curate AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 text-center text-sm mb-8"
          >
            Sign in to access your account, create a post and access your wallet
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-5"
          >
            <div className="relative">
              <Input
                type="email"
                placeholder={token ? "Already logged in" : "Enter your email"}
                value={email}
                onChange={(e) => {
                  if (emailError) setEmailError(false);
                  setEmail(e.target.value);
                }}
                className="w-full h-14 pl-14 pr-4 text-gray-800 bg-white/90 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 shadow-sm"
                disabled={token.length > 0}
              />
              <Mail
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-blue-500"
                size={20}
              />
            </div>
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 mt-2 pl-4"
              >
                Please enter a valid email address
              </motion.p>
            )}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                onClick={handleLogin}
                disabled={
                  isLoginInProgress ||
                  (token.length > 0 ? false : email.length === 0)
                }
              >
                {isLoginInProgress ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Continue with Email
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </motion.div>

            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative px-4 bg-white text-sm text-gray-500 rounded-md">
                Or continue with
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <GoogleLogin token={token} setToken={setToken} />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8"
          >
            <p className="text-sm text-gray-600 text-center">
              By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmailOTP;
