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
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Product } from "../table";
import { methodType } from "@/types/method.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/entities/category";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { toast } from "sonner";
import useVisibility from "@/hooks/useVisibility";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pencil } from "lucide-react";

const schema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  countInStock: z.number(),
  category: z.string(),
});

interface IProps {
  id: string;
  data: Product;
}

const UpdateProduct: React.FC<IProps> = ({ id, data }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      image: data.image,
      price: data.price,
      description: data.description,
      countInStock: data.countInStock,
      category: data.category,
    },
  });

  const { isVisible, toggleVisibility } = useVisibility(false);

  const { control } = form;

  const { mutate: updateProduct } = useMutationProduct();

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      type: "update" as methodType,
      data: { ...data, id },
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

  return (
    <Sheet open={isVisible} onOpenChange={toggleVisibility}>
      <SheetTrigger asChild>
        <Button variant={"outline"} size="icon">
          <Pencil className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sửa sản phẩm</SheetTitle>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
  );
};

export default UpdateProduct;
