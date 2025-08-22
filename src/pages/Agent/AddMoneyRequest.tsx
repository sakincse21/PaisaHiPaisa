import LoadingScreen from "@/components/layout/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAddMoneyRequestMutation } from "@/redux/features/Transaction/transaction.api";
import { useAllTransactionsQuery } from "@/redux/features/User/user.api";
import { toast } from "sonner";

export interface IItem {
  _id: string;
  from: string;
  to: string;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AddMoneyRequest() {
  const { data, isLoading } = useAllTransactionsQuery({
    status: "PENDING",
    type: "ADD_MONEY",
  });
  const [addMoneyRequest] = useAddMoneyRequestMutation();
  if (isLoading) {
    return <LoadingScreen />;
  }
  console.log("all transactions", data);
  const items: IItem[] = data?.data?.data;
  const handleAccept = async (transactionId: string) => {
    const payload = {
      transactionId,
      body: {
        consent: true,
      },
    };
    const toastId = toast.loading("Add money request going on.");

    try {
      const res = await addMoneyRequest(payload).unwrap();
      if (res?.success) {
        toast.success("Add money request completed.", { id: toastId });
      } else {
        toast.error(res?.data?.message, { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.data?.message || "Something went wrong. Try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };
  return (
    <div className="w-full h-full md:w-5xl mx-auto flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Card className="w-full md:w-fit">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex justify-around items-center">
            <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b h-full">
              <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                <TableRow className="hover:bg-transparent">
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-y-auto">
                {items?.map((item: IItem) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.from}</TableCell>
                    <TableCell>{item.to}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="text-right">
                      {new Date(item.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="flex flex-row gap-2">
                      <Button className="bg-green-700" onClick={() => handleAccept(item._id)}>Accept</Button>
                      <Button variant={"destructive"}>Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
