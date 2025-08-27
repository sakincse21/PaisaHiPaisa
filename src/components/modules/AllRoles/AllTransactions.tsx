import LoadingScreen from "@/components/layout/LoadingScreen";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IRole,
  ITransactionSort,
  ITransactionStatus,
  ITransactionType,
} from "@/interfaces";
import { cn } from "@/lib/utils";
import {
  useAllTransactionsQuery,
  useRefundMutation,
} from "@/redux/features/Transaction/transaction.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import z from "zod";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const filterSchema = z
  .object({
    searchTerm: z
      .string()
      .regex(/^(?:01\d{9})$/, {
        message:
          "Phone number must be valid for Bangladesh. Format: 018XXXXXXXX",
      })
      .optional()
      .or(z.literal("")),
    status: z
      .enum([...Object.values(ITransactionStatus)] as [string, ...string[]])
      .optional()
      .or(z.literal("")),
    type: z
      .enum([...Object.values(ITransactionType)] as [string, ...string[]])
      .optional()
      .or(z.literal("")),
    sort: z
      .enum([...Object.values(ITransactionSort)] as [string, ...string[]])
      .optional()
      .or(z.literal("")),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    limit: z.string().optional(),
    sortBy: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

export interface IFilters {
  searchTerm?: string;
  type?: string;
  status?: string;
  sort?: string;
  startDate?: string;
  endDate?: string;
  limit?: string;
  page?: string;
  sortBy?: string;
}

export default function AllTransactions() {
  const [refund] = useRefundMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<IFilters | null>(null);
  const { data, isLoading } = useAllTransactionsQuery(filters);
  const { data: userData } = useUserInfoQuery(undefined);

  // console.log(data);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      searchTerm: "",
      status: "",
      type: "",
      sort: "desc",
      sortBy: "updatedAt",
      startDate: undefined,
      endDate: undefined,
      limit: "10",
    },
  });

  function onSubmit(values: z.infer<typeof filterSchema>) {
    const cleanedFilters = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
    );
    if (values.startDate) {
      const start = new Date(values.startDate);
      start.setHours(0, 0, 0, 0); // beginning of day
      cleanedFilters.startDate = start.toISOString();
    }

    if (values.endDate) {
      const end = new Date(values.endDate);
      end.setHours(23, 59, 59, 999); // end of day
      cleanedFilters.endDate = end.toISOString();
    }

    setFilters(cleanedFilters);
    setCurrentPage(1);
    setOpenDialog(false);
  }

  useEffect(() => {
    setFilters({
      ...filters,
      page: currentPage.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleFilterClear = () => {
    form.reset();
    setFilters(null);
    setOpenDialog(false);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  // console.log(userData);

  const handleRefund = async (transactionId: string) => {
    // console.log(transactionId);

    const toastId = toast.loading("Initiating refund...");
    try {
      const res = await refund(transactionId).unwrap();
      if (res?.success) {
        toast.success("Refunded successfully", { id: toastId });
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

  // console.log("all transactions", data);
  const items: IItem[] = data?.data?.data;
  const totalPage = data?.data?.meta?.totalPage || 1;

  return (
    <div className="w-full mx-auto  flex flex-col justify-center items-center md:w-5xl lg:5xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex-1 overflow-hidden">
            <div className="w-full flex justify-end items-center my-3">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger>
                  <span
                    className="py-2 px-4 rounded-lg border-2 border-gray-500"
                    // onClick={() => setOpenDialog(true)}
                  >
                    Apply Filters
                  </span>
                  {/* <Button variant={"outline"}>Apply Filters</Button> */}
                </DialogTrigger>
                {/* {openDialog && ( */}
                <DialogContent className="flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Filter Transactions</DialogTitle>
                    <DialogDescription>
                      Apply filters to narrow down your transaction results.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      {userData?.data?.role === IRole.ADMIN ||
                      userData?.data?.role === IRole.SUPER_ADMIN ? (
                        <FormField
                          control={form.control}
                          name="searchTerm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Wallet ID</FormLabel>
                              <FormControl>
                                <Input placeholder="018XXXXXXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : (
                        <></>
                      )}
                      <div className="flex justify-between items-center gap-2">
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="gap-1">Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value as string}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(ITransactionStatus).map(
                                    (eachStatus) => (
                                      <SelectItem
                                        key={eachStatus}
                                        value={eachStatus}
                                      >
                                        {eachStatus}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="gap-1">Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value as string}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(ITransactionType).map(
                                    (eachType) => (
                                      <SelectItem
                                        key={eachType}
                                        value={eachType}
                                      >
                                        {eachType}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-between items-center gap-3">
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel>Start Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick start date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel>End Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick end date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end items-end gap-3">
                        <FormField
                          control={form.control}
                          name="sort"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Sort</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sort type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(ITransactionSort).map(
                                    (sortOption) => (
                                      <SelectItem
                                        key={sortOption}
                                        value={sortOption}
                                      >
                                        {sortOption}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="limit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Limit</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="10"
                                  {...field}
                                  type={"number"}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-end items-center gap-3">
                        <Button type="submit" variant={"default"}>
                          Apply
                        </Button>
                        {/* <span className="py-1 px-4 rounded-lg" onClick={handleFilterClear}>Clear</span> */}
                        <Button
                          type="button"
                          variant={"ghost"}
                          onClick={handleFilterClear}
                        >
                          Clear
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {items.length > 0 ? (
              <div className="mt-8 ">
                <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b h-full">
                  <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead
                        className={cn(
                          "",
                          (userData?.data?.role === IRole.ADMIN || userData?.data?.role === IRole.SUPER_ADMIN)
                            ? ""
                            : "text-right"
                        )}
                      >
                        Date
                      </TableHead>
                      {(userData?.data?.role === IRole.ADMIN || userData?.data?.role === IRole.SUPER_ADMIN) && (
                        <TableHead className="text-right">Action</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="overflow-y-auto">
                    {items?.map((item: IItem) => (
                      <TableRow key={item._id}>
                        <TableCell className="font-medium">
                          {item.from}
                        </TableCell>
                        <TableCell>{item.to}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell
                          className={cn(
                            "",
                            (userData?.data?.role === IRole.ADMIN || userData?.data?.role === IRole.SUPER_ADMIN)
                              ? ""
                              : "text-right"
                          )}
                        >
                          {new Date(item.updatedAt).toLocaleString()}
                        </TableCell>
                        {(userData?.data?.role === IRole.ADMIN || userData?.data?.role === IRole.SUPER_ADMIN) && (
                          <TableCell className="text-right">
                            <Button
                              variant={"destructive"}
                              onClick={() => handleRefund(item._id)}
                              disabled={
                                item.status === ITransactionStatus.PENDING ||
                                item.status === ITransactionStatus.REFUNDED
                              }
                            >
                              {
                                item.status === ITransactionStatus.REFUNDED ? item.status:" Refund "
                              }
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {totalPage > 1 && (
                  <div className="flex justify-end mt-4">
                    <div>
                      <Pagination>
                        <PaginationContent className="flex flex-wrap justify-end">
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => setCurrentPage((prev) => prev - 1)}
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                          {Array.from(
                            { length: totalPage },
                            (_, index) => index + 1
                          ).map((page) => (
                            <PaginationItem
                              key={page}
                              onClick={() => setCurrentPage(page)}
                            >
                              <PaginationLink isActive={currentPage === page}>
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext
                              onClick={() => setCurrentPage((prev) => prev + 1)}
                              className={
                                currentPage === totalPage
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex justify-center">
                <span className="font-semibold text-lg mt-8">
                  You do not have any transactions.
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
