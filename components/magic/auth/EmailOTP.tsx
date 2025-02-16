"use client"

import { useState } from "react"
import { useMagic } from "@/hooks/MagicProvider"
import showToast from "@/utils/showToast"
import { RPCError, RPCErrorCode } from "magic-sdk"
import type { LoginProps } from "@/utils/types"
import { saveUserInfo } from "@/utils/common"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, ArrowRight, Lock } from "lucide-react"

const EmailOTP = ({ token, setToken }: LoginProps) => {
  const { magic } = useMagic()
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [isLoginInProgress, setLoginInProgress] = useState(false)

  const handleLogin = async () => {
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      setEmailError(true)
    } else {
      try {
        setLoginInProgress(true)
        setEmailError(false)

        const token = await magic?.auth.loginWithEmailOTP({ email })

        console.log(token)

        const metadata = await magic?.user.getInfo()

        if (!token || !metadata?.publicAddress) {
          throw new Error("Magic login failed")
        }

        setToken(token)
        saveUserInfo(token, "EMAIL", metadata?.publicAddress)
        setEmail("")
      } catch (e) {
        console.log("login error: " + JSON.stringify(e))
        if (e instanceof RPCError) {
          switch (e.code) {
            case RPCErrorCode.MagicLinkFailedVerification:
            case RPCErrorCode.MagicLinkExpired:
            case RPCErrorCode.MagicLinkRateLimited:
            case RPCErrorCode.UserAlreadyLoggedIn:
              showToast({ message: e.message, type: "error" })
              break
            default:
              showToast({
                message: "Something went wrong. Please try again",
                type: "error",
              })
          }
        }
      } finally {
        setLoginInProgress(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-500 p-3 rounded-full">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome To Curate AI</h2>
          <p className="text-gray-600 text-center text-sm mb-8">Sign in to access your account, create a post and excess your wallet</p>
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                placeholder={token ? "Already logged in" : "Enter your email"}
                value={email}
                onChange={(e) => {
                  if (emailError) setEmailError(false)
                  setEmail(e.target.value)
                }}
                className="w-full h-12 pl-12 pr-4 text-gray-800 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                disabled={token.length > 0}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            {emailError && <p className="text-sm text-red-500 mt-2 pl-4">Please enter a valid email address</p>}
            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
              onClick={handleLogin}
              disabled={isLoginInProgress || (token.length > 0 ? false : email.length === 0)}
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
          </div>
          <div className="mt-8">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailOTP

