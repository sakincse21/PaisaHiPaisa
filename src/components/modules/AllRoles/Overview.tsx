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
import { useAllTransactionsQuery, useUserInfoQuery } from "@/redux/features/User/user.api";
import { Link } from "react-router";
import type { IItem } from "./AllTransactions";
import { getSidebarItems } from "@/lib/getSidebarItems";

const Overview = () => {
  const { data: userData, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);
  const { data: transactionData, isLoading: isTransactionLoading } =
    useAllTransactionsQuery({ limit: 3 });

  const role = (userData?.data?.role as string)?.toLowerCase();
  if (isUserLoading || isTransactionLoading) {
    return <LoadingScreen />;
  }

  const quickActions = getSidebarItems(userData?.data?.role)[0]?.items;
  console.log(quickActions);

  const items: IItem[] = transactionData?.data?.data;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <Card className="w-full md:w-3xl">
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="flex justify-center gap-2 items-center">
            Your current Balance is:
            <span className="font-semibold text-primary text-xl">
              {` ${userData?.data?.walletId?.balance}`}
            </span>{" "}
            BDT
          </h3>
        </CardContent>
      </Card>

      <Card className="w-full md:w-3xl">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-around items-center">
          {quickActions.map((item) => (
            <Link to={item.url}>
              <Button className="font-semibold">{item.title}</Button>
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card className="w-full md:w-3xl">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col justify-around items-center">
          <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b h-full">
            <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
              <TableRow className="hover:bg-transparent">
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="w-full flex justify-end items-center mt-4">
            <Link to={`/${role}/all-transactions`}>
              <Button variant={"outline"}>See more</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
