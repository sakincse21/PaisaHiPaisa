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
import { IRole, ITransactionSort } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  // useUserInfoQuery,
} from "@/redux/features/User/user.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  address: string;
  password: string;
  nidNo: string;
  isVerified: boolean;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  walletId: string;
}

const filterSchema = z.object({
  searchTerm: z.string().optional().or(z.literal("")),
  role: z
    .enum([...Object.values(IRole)] as [string, ...string[]])
    .or(z.literal("")),
  sort: z
    .enum([...Object.values(ITransactionSort)] as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  sortBy: z.string().optional(),
  limit: z.string().optional(),
  isVerified: z.string(),
  status: z.string()
});

export interface IFilters {
  searchTerm?: string;
  role?: string;
  sort?: string;
  limit?: string;
  page?: string;
  sortBy?: string;
  isVerified: string;
  status: string;
}

const sortByOptions: string[] = ["name", "phoneNo", "nidNo", "email"];

export default function VerifyUsers() {
  const [openDialog, setOpenDialog] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const defaultFilter: IFilters = {
    sortBy: "createdAt",
    sort: "asc",
    isVerified: "false",
    status: "ACTIVE"
  };
  const [filters, setFilters] = useState<IFilters | null>(defaultFilter);
  const { data, isLoading } = useGetAllUsersQuery(filters);
  // const { data: userData } = useUserInfoQuery(filters);

  // console.log(data);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      searchTerm: "",
      sort: "desc",
      limit: "10",
      sortBy: "createdAt",
      isVerified: "false",
      status: "ACTIVE"
    },
  });

  function onSubmit(values: z.infer<typeof filterSchema>) {
    const cleanedFilters = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
    );

    setFilters({
      ...cleanedFilters,
      isVerified: "false",
      status: "ACTIVE"
    } as IFilters);
    setCurrentPage(1);
    setOpenDialog(false);
  }

  useEffect(() => {
    setFilters({
      ...filters,
      page: currentPage.toString(),
      isVerified: "false",
      status: "ACTIVE"
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

  const handleConfirm = async (userId: string) => {
    const toastId = toast.loading("Updating user.");
    try {
      const payload = {
        isVerified: true,
        userId,
      };
      const res = await updateUser(payload).unwrap();
      if (res?.success) {
        toast.success("User updated successfully.", { id: toastId });
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

  const handleReject = async (userId: string) => {
    const toastId = toast.loading("Updating user.");
    try {
      const payload = {
        status: "DELETE",
        userId,
      };
      const res = await updateUser(payload).unwrap();
      if (res?.success) {
        toast.success("User updated successfully.", { id: toastId });
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
  // console.log(userData);

  // console.log("all transactions", data);
  const users: IUser[] = data?.data?.data;
  const totalPage = data?.data?.meta?.totalPage || 1;

  return (
    <div className="w-full flex flex-col justify-center items-center md:w-5xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Verify New Users</CardTitle>
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
                    <DialogTitle>Apply Filter</DialogTitle>
                    <DialogDescription>
                      Apply filters to narrow down your results.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="searchTerm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Search</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Name, Email, Phone, Nid No"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="gap-1">Role</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value as string}
                              disabled
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(IRole).map((eachType) => (
                                  <SelectItem key={eachType} value={eachType}>
                                    {eachType}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end items-end gap-3">
                        <FormField
                          control={form.control}
                          name="sortBy"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Sort By</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value as string}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Sort By" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Object.values(sortByOptions).map(
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

            {users.length > 0 ? (
              <div className="mt-8">
                <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b h-full">
                  <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>NID No</TableHead>
                      <TableHead className="text-right">Verified?</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="overflow-y-auto">
                    {users?.map((user: IUser) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phoneNo}</TableCell>
                        <TableCell>{user.nidNo}</TableCell>
                        <TableCell className="text-right flex flex-wrap justify-center items-center gap-3">
                          <Button
                            type="button"
                            onClick={() => handleConfirm(user._id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            type="button"
                            onClick={() => handleReject(user._id)}
                            variant={'destructive'}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {totalPage > 1 && (
                  <div className="flex justify-end mt-4">
                    <div>
                      <Pagination>
                        <PaginationContent>
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
                  No new users found. Try changing filters.
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
