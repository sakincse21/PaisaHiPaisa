import LoadingScreen from "@/components/layout/LoadingScreen";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

const CheckWallet = () => {
  const { data, isLoading, refetch } = useUserInfoQuery(undefined);
  const qrRef = useRef<HTMLCanvasElement>(null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    // Convert the QR canvas to a PNG image
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `PaisaHiPaisa-qr-${
      userInfo?.walletId?.walletId || "unknown"
    }.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const userInfo = data?.data;
  console.log(userInfo);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      {/* <Card className="w-lg">
        <CardHeader>
          <CardTitle>{data?.data?.role} Wallet</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-5">
            <h3>
              Balance:{" "}
              <span className="font-semibold text-primary text-xl">
                {data?.data?.walletId?.balance}
              </span>{" "}
              BDT
            </h3>
            <h3>
              Wallet ID:{" "}
              <span className="font-semibold  text-lg">
                {data?.data?.walletId?.walletId}
              </span>
            </h3>
          </div>
          <hr />
          <div className="mt-5">
            <h3>
              Name:{" "}
              <span className="font-semibold  text-md">{data?.data?.name}</span>
            </h3>
            <h3>
              Email:{" "}
              <span className="font-semibold  text-md">
                {data?.data?.email}
              </span>
            </h3>
            <h3>
              Status:{" "}
              <span className="font-semibold  text-md">
                {data?.data?.status}
              </span>
            </h3>
          </div>
        </CardContent>
      </Card> */}

        <CreditCard
          company={`৳${userInfo?.walletId?.balance}`}
          cardNumber={userInfo?.walletId?.walletId}
          cardHolder={userInfo?.name}
          cardExpiration="07/2099"
          type="gray-dark"
          width={480}
        />

      <div className="p-5 flex flex-row justify-around items-center w-full gap-3 max-w-2xl">
        <Button
          onClick={() => refetch()}
          variant={"outline"}
          className="text-xl font-bold text-secondary"
        >
          Refresh
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"outline"}
              className="text-xl font-bold text-secondary"
            >
              Generate QR
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{`${userInfo?.name}'s QR`}</DialogTitle>
              <DialogDescription className="flex flex-row justify-center items-center gap-5">
                <div className="relative inline-block">
                  <QRCodeCanvas
                    value={`https://paisa-hi-paisa-two.vercel.app/${(
                      userInfo?.role as string
                    ).toLowerCase()}/send-money?receiver=${
                      userInfo?.walletId?.walletId
                    }`}
                    id="qr-code"
                    size={220}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                    ref={qrRef}
                  />
                  {/* ✅ Overlay text in the center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white py-1 px-2 text-xs font-bold text-secondary">
                      PaisaHiPaisa
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleDownload}
                    className="mt-3 px-4 py-2 rounded-sm bg-primary text-white hover:opacity-90 transition"
                  >
                    Download QR as PNG
                  </button>

                  <p className="text-muted-foreground text-xs mt-2">
                    Scan or share this QR to send money instantly.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* <QRCodeCanvas
          value={`https://paisa-hi-paisa-two.vercel.app/${(
            userInfo?.role as string
            ).toLowerCase()}/send-money?receiver=${userInfo?.walletId?.walletId}`}
            size={200} // pixels
            bgColor="#ffffff"
            fgColor="#000000"
            level="H" // error correction level: L, M, Q, H
            includeMargin={true}
            ref={qrRef}
            /> */}
      </div>
    </div>
  );
};

export default CheckWallet;
