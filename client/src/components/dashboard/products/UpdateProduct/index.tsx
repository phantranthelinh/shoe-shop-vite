/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@/entities/category";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import useVisibility from "@/hooks/useVisibility";
import { methodType } from "@/types/method.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Product } from "../table";
import { useGetProductById } from "@/hooks/api/products/useGetProductById";

const schema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  countInStock: z.number(),
  category: z.string(),
});

interface IProps {
  productId: string;
  data: Product;
}

const UpdateProduct: React.FC<IProps> = ({ productId, data }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      image: data.image,
      price: data.price,
      description: data.description,
      countInStock: data.countInStock,
      category: data.category._id,
    },
  });

  const { isVisible, toggleVisibility } = useVisibility(false);

  const { control } = form;

  const { mutate: updateProduct } = useMutationProduct();

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      type: "update" as methodType,
      data: { ...data, id: productId },
    };
    updateProduct(payload as any, {
      onSuccess: () => {
        toast.success("Cập nhật sản phẩm thành công");
      },
      onSettled: () => {
        toggleVisibility();
      },
      onError: () => {
        toast.error("Cập nhật sản phẩm thất bại");
      },
    });
  };
  const { data: categories } = useGetCategories();

  const { data: product } = useGetProductById(productId);
  console.log("🚀 ~ AddProduct ~ product:", productId, product);
  return (
    <Dialog open={isVisible} onOpenChange={toggleVisibility}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="icon">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: "50vw" }}>
        <DialogHeader>
          <DialogTitle>Sửa sản phẩm</DialogTitle>
        </DialogHeader>
        <div className="gap-4 grid py-4">
          <Form {...form}>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={form.handleSubmit(onSubmit as any)}
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Tên sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tên sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Mô tả sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Mô tả sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Giá sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Giá sản phẩm"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="countInStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Số lượng tồn
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Số lượng tồn"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Hình ảnh
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Hình ảnh" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Danh mục
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn danh mục sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((item: Category) => (
                            <SelectItem value={item._id} key={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Cập nhật</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
