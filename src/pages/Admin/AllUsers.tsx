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
import { IRole, IStatus, ITransactionSort } from "@/interfaces";
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
  useUserInfoQuery,
} from "@/redux/features/User/user.api";
import ActionDialog from "./ActionDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  status: z
    .enum([...Object.values(IStatus)] as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  role: z
    .enum([...Object.values(IRole)] as [string, ...string[]])
    .or(z.literal("")),
  sort: z
    .enum([...Object.values(ITransactionSort)] as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  sortBy: z.string().optional(),
  limit: z.string().optional(),
  isVerified: z.string().optional(),
});

export interface IFilters {
  searchTerm?: string;
  role?: string;
  status?: string;
  sort?: string;
  limit?: string;
  page?: string;
  sortBy?: string;
  isVerified?: string;
}

const sortByOptions: string[] = ["name", "phoneNo", "nidNo", "email"];

export default function AllUsers({ role }: { role: string }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultFilter = {
    role,
    sortBy: "name",
    sort: "asc",
  };
  const [filters, setFilters] = useState<IFilters | null>(defaultFilter);
  const { data, isLoading } = useGetAllUsersQuery(filters);
  const { data: userData } = useUserInfoQuery(filters);

  // console.log(data);
  // console.log(role, "given role");

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      searchTerm: "",
      status: "",
      role,
      sort: "asc",
      limit: "10",
      sortBy: "name",
      isVerified: "",
    },
  });

  function onSubmit(values: z.infer<typeof filterSchema>) {
    const cleanedFilters = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
    );

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
    form.resetField('isVerified');
    form.resetField('role');
    form.resetField('searchTerm');
    setFilters({
      role,
      sort: "asc",
      limit: "10",
      sortBy: "name",
    });
    setOpenDialog(false);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  // console.log(userData);

  // console.log("all transactions", data);
  const users: IUser[] = data?.data?.data;
  const totalPage = data?.data?.meta?.totalPage || 1;

  return (
    <div className="w-full flex flex-col justify-center items-center md:w-5xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All {role}</CardTitle>
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
                    <DialogTitle>Filter {role}</DialogTitle>
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
                              <Input placeholder="Name, Email, Phone, Nid No" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                                  {Object.values(IStatus).map((eachStatus) => (
                                    <SelectItem
                                      key={eachStatus}
                                      value={eachStatus}
                                    >
                                      {eachStatus}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
                      </div>

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
                        <FormField
                          control={form.control}
                          name="isVerified"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Verified</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Verified" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={"true"}>Yes</SelectItem>
                                  <SelectItem value={"false"}>No</SelectItem>
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
                      <TableHead>Status</TableHead>
                      <TableHead>Verified</TableHead>
                      <TableHead className="text-right">Action</TableHead>
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
                        <TableCell>{user.status}</TableCell>
                        <TableCell>{user.isVerified ? "YES" : "NO"}</TableCell>
                        <TableCell className="text-right">
                          <ActionDialog userId={user._id} role={userData?.data?.role} />
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
                  No {role} found. Try changing filters.
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
