"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/CardAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  ExternalLink,
  ArrowRightLeft,
  WalletIcon,
  RefreshCw,
} from "lucide-react";
// import { toast } from "@/components/ui/use-toast";

// This is a simplified version without the actual blockchain integration
const WalletComponent = () => {
  const [network] = useState("Sonic Testnet");
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [publicAddress, setPublicAddress] = useState<string>("0x71C...93E2");
  const [sonicBalance, setSonicBalance] = useState("1.5 SONIC");
  const [catBalance, setCatBalance] = useState("1000 CAT");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading balances
  useEffect(() => {
    const loadBalances = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSonicBalance("1.5 SONIC");
      setCatBalance("1000 CAT");
      setIsLoading(false);
    };

    loadBalances();
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(publicAddress);
    // toast({
    //   title: "Address copied",
    //   description: "Wallet address copied to clipboard",
    // });
  };

  const handleTransfer = (token: "SONIC" | "CAT") => {
    if (!transferAmount || !recipientAddress) {
      //   toast({
      //     title: "Missing information",
      //     description: "Please enter both amount and recipient address",
      //     variant: "destructive",
      //   });
      return;
    }

    // Simulate transfer
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // toast({
      //   title: "Transfer initiated",
      //   description: `Transferring ${transferAmount} ${token} to ${recipientAddress}`,
      // });
      setTransferAmount("");
      setRecipientAddress("");
    }, 1500);
  };

  const refreshBalances = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // toast({
      //   title: "Balances refreshed",
      //   description: "Your wallet balances have been updated",
      // });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-100 shadow-sm bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <WalletIcon className="h-5 w-5 mr-2 text-blue-600" />
              Wallet Information
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshBalances}
              disabled={isLoading}
              className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <Label className="text-xs font-medium text-gray-500">
                Wallet Address
              </Label>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  {publicAddress}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-500">
                Network
              </Label>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  {network}
                </span>
                <div className="ml-2 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-xs font-medium text-gray-500">
                    Sonic Balance
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200"
                  >
                    <ArrowRightLeft className="h-3 w-3 mr-1" />
                    Swap
                  </Button>
                </div>
                <p className="text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <span className="inline-block w-20 h-6 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    sonicBalance
                  )}
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm">
              <CardContent className="pt-4 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-xs font-medium text-gray-500">
                    Cat Token Balance
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200"
                  >
                    <ArrowRightLeft className="h-3 w-3 mr-1" />
                    Swap
                  </Button>
                </div>
                <p className="text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <span className="inline-block w-20 h-6 bg-gray-200 animate-pulse rounded"></span>
                  ) : (
                    catBalance
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Transfer Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sonic">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger
                value="sonic"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Transfer SONIC
              </TabsTrigger>
              <TabsTrigger
                value="cat"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Transfer CAT
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sonic">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="sonic-amount"
                    className="text-xs font-medium text-gray-700"
                  >
                    Amount (SONIC)
                  </Label>
                  <Input
                    id="sonic-amount"
                    type="number"
                    placeholder="0.0"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="mt-1 h-9"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="sonic-recipient"
                    className="text-xs font-medium text-gray-700"
                  >
                    Recipient Address
                  </Label>
                  <Input
                    id="sonic-recipient"
                    type="text"
                    placeholder="0x..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="mt-1 h-9"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleTransfer("SONIC")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Transfer SONIC
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="cat">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="cat-amount"
                    className="text-xs font-medium text-gray-700"
                  >
                    Amount (CAT)
                  </Label>
                  <Input
                    id="cat-amount"
                    type="number"
                    placeholder="0"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="mt-1 h-9"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="cat-recipient"
                    className="text-xs font-medium text-gray-700"
                  >
                    Recipient Address
                  </Label>
                  <Input
                    id="cat-recipient"
                    type="text"
                    placeholder="0x..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="mt-1 h-9"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleTransfer("CAT")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Transfer CAT
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletComponent;
