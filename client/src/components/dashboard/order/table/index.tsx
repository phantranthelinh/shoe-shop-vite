/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Eye, Trash2 } from "lucide-react";

import DataTable from "@/components/common/DataTable";
import DataTablePagination from "@/components/common/DataTable/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Order } from "@/entities/order";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import useDataGrid from "@/hooks/useDataGrid";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { formatDate } from "@/utils/format-date";
import { Badge } from "@/components/ui/badge";
import OrderDetail from "../detail";

export type Review = {
  name: string;
  rating: number;
  comment: string;
  user: string;
};

interface IProps {
  data: Order[];
}
export function OrderTable({ data }: IProps) {
  const { mutate } = useMutationProduct();

  const handleDelete = async (product: Order) => {
    const payload = {
      type: "delete",
      data: product,
    };
    mutate(payload as any, {
      onSuccess: () => {
        toast("Xóa sản phẩm thành công!");
      },
      onError: () => {
        toast("Xóa sản phẩm thất bại!");
      },
    });
  };
  const columns: ColumnDef<Order>[] = [
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
      accessorKey: "_id",
      header: "Mã đơn hàng",
      cell: ({ row }) => (
        <div className="capitalize">
          {"NIKE" + row.original._id.slice(0, 6)}
        </div>
      ),
    },
    {
      accessorKey: "shippingInfo",
      header: "Tên khách hàng",
      cell: ({ row }) => (
        <div className="lowercase">
          {row.original.shippingInfo.customerName}
        </div>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Tổng tiền",
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.totalPrice}</div>;
      },
    },

    {
      accessorKey: "isPaid",
      header: "Trạng thái",
      cell: ({ row }) => {
        return (
          <Badge
            variant="outline"
            className={cn("font-medium", {
              "border-green-500": row.original.isPaid,
              "border-slate-500": !row.original.isPaid,
            })}
          >
            {row.original.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
          </Badge>
        );
      },
    },

    {
      accessorKey: "isDelivered",
      header: "Vận chuyển",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row.original.isDelivered ? "Đã giao hàng" : "Đang giao hàng"}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Ngày đặt hàng",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {formatDate(row.original.createdAt)}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="">Thao tác</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            <OrderDetail data={row?.original} />
            <Button
              variant={"outline"}
              size="icon"
              onClick={() => handleDelete(row.original)}
            >
              <Trash2 className="text-red-500 size-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const { table } = useDataGrid(columns, data, {
    pagination: {
      pageSize: 10,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm theo tên"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột <ChevronDown />
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
                    {(column.columnDef.header as string) || ""}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={cn("text-sm text-muted-foreground opacity-0 pb-2 -mt-2", {
          "opacity-1": table.getFilteredSelectedRowModel().rows.length > 0,
        })}
      >
        Đã chọn {table.getFilteredSelectedRowModel().rows.length} hàng (
        {table.getFilteredRowModel().rows.length} hàng tổng cộng)
      </div>

      <div className="border rounded-md">
        <DataTable table={table} columns={columns} />
      </div>
      <div className="flex justify-between items-center py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
