import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UpdateProduct from "../product/update";

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     email: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
// ];

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export type Review = {
  name: string;
  rating: number;
  comment: string;
  user: string;
};

export type Product = {
  _id: string;
  name: string;
  image?: string;
  description: string;
  slug: string;
  review: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
};
interface IProps {
  data: Product[];
}
export function DataTableDemo({ data }: IProps) {
  const { mutate } = useMutationProduct();
  //#region Column
  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Tên  sản phẩm",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "image",
      header: "Hình ảnh",
      cell: ({ row }) => (
        <div className="lowercase">
          <img
            src={row.getValue("image")}
            className="size-20 rounded"
            alt={row.original.name}
          />
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="">Mô tả sản phẩm</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("description")}</div>;
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="">Giá sản phẩm</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className=" font-medium">{formatted}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="">Thao tác</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size="icon">
                  <Pencil className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sửa sản phẩm</SheetTitle>
                </SheetHeader>
                <UpdateProduct
                  id={row.original._id}
                  data={row.original}
                />
              </SheetContent>
            </Sheet>

            <Button
              variant={"outline"}
              size="icon"
              onClick={() => {
                const payload = {
                  type: "delete" as const,
                  body: {
                    id: row.original._id,
                  },
                };
                mutate(payload);
              }}
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];
  //#endregion
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}