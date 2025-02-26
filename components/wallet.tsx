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
import { Copy, ExternalLink, ArrowRightLeft } from "lucide-react";
import { contract } from "@/constants/contract";
import { useReadCurateAiTokenBalanceOf } from "@/hooks/wagmi/contracts";
import { useBalance } from "wagmi";
import { formatEther } from "ethers";

const WalletPage = () => {
  const [network] = useState(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK);

  const [transferAmount, setTransferAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [publicAddress, setPublicAddress] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setPublicAddress(user as string);
  }, []);

  const { data: sonicBalanceData, isLoading: sonicLoading } = useBalance({
    address: publicAddress as `0x${string}`,
    chainId: 57054, // Sonic Testnet chain ID
  });

  const sonicBalance = sonicBalanceData
    ? `${parseFloat(formatEther(sonicBalanceData.value)).toFixed(2)} SONIC`
    : "0 SONIC";

  const { data } = useReadCurateAiTokenBalanceOf({
    address: contract.token as `0x${string}`,
    args: [publicAddress as `0x${string}`],
  });

  //   const handleCopyAddress = () => {
  //     navigator.clipboard.writeText(walletAddress?.toString())
  //   }

  const handleTransfer = (token: "SONIC" | "CAT") => {
    console.log(
      `Transferring ${transferAmount} ${token} to ${recipientAddress}`
    );
    // Implement transfer logic here
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-24">
      <Card className="mb-8 border-none">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <Label className="text-sm text-gray-500">Wallet Address</Label>
              <div className="flex items-center">
                <span className="text-sm font-medium">{publicAddress}</span>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Network</Label>
              <div className="flex items-center">
                <span className="text-lg font-medium">{network}</span>
                <div className="ml-2 w-3 h-3 rounded-full bg-blue-600"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm text-gray-500">Sonic Balance</Label>
                  <Button variant="outline" size="sm">
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                </div>
                <p className="text-2xl font-bold">
                  {!sonicLoading && sonicBalance}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm text-gray-500">
                    Cat Token Balance
                  </Label>
                  <Button variant="outline" size="sm">
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Swap
                  </Button>
                </div>
                <p className="text-2xl font-bold">{data} CAT</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Transfer</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="eth">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="eth">Transfer Sonic</TabsTrigger>
              <TabsTrigger value="cat">Transfer CAT</TabsTrigger>
            </TabsList>
            <TabsContent value="eth">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="eth-amount">Amount (Sonic)</Label>
                  <Input
                    id="eth-amount"
                    type="number"
                    placeholder="0.0"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="eth-recipient">Recipient Address</Label>
                  <Input
                    id="eth-recipient"
                    type="text"
                    placeholder="0x..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                </div>
                <Button
                  className="float-right px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  onClick={() => handleTransfer("SONIC")}
                >
                  Transfer Sonic
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="cat">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cat-amount">Amount (CAT)</Label>
                  <Input
                    id="cat-amount"
                    type="number"
                    placeholder="0"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cat-recipient">Recipient Address</Label>
                  <Input
                    id="cat-recipient"
                    type="text"
                    placeholder="0x..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                </div>
                <Button
                  className="float-right px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  onClick={() => handleTransfer("CAT")}
                >
                  Transfer CAT
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
