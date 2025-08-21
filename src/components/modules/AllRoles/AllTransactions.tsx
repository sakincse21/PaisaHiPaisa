import LoadingScreen from "@/components/layout/LoadingScreen";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAllTransactionsQuery } from "@/redux/features/User/user.api"

export interface IItem {
  _id: string
  from: string
  to: string
  amount: number
  type: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function AllTransactions() {
  const {data,isLoading}=useAllTransactionsQuery(undefined);
  if(isLoading){
    return <LoadingScreen />
  }
  console.log('all transactions',data);
  const items:IItem[]=data?.data;
  return (
    <div className="w-full h-full md:w-5xl mx-auto flex flex-col">
      <div className="flex-1 overflow-hidden">
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
            {items?.map((item:IItem) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.from}</TableCell>
                <TableCell>{item.to}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="text-right">
                  {
                    new Date(item.createdAt).toLocaleString()
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
