import { Loading } from "@/components/common/Loading";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/entities/category";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import useVisibility from "@/hooks/useVisibility";
import { methodType } from "@/types/method.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  countInStock: z.number(),
  category: z.string(),
});

const AddProduct = () => {
  const { isVisible, toggleVisibility } = useVisibility(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      image: "",
      price: 0,
      description: "",
      countInStock: 0,
      category: "",
    },
  });

  const { control } = form;
  const { mutate, isPending, error } = useMutationProduct();

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
    const payload = {
      type: "create" as methodType,
      data,
    };
    mutate(payload, {
      onSuccess: () => {
        toast.success("Thêm sản phẩm thành công");
        form.reset();
      },

      onSettled: () => {
        toggleVisibility();
      },
    });
  };

  if (error && error instanceof AxiosError) {
    toast.error(error?.response?.data.message);
  }

  const { data } = useGetCategories();

  return (
    <Sheet open={isVisible} onOpenChange={toggleVisibility}>
      <SheetTrigger asChild>
        <Button>Thêm sản phẩm</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Thêm sản phẩm</SheetTitle>
        </SheetHeader>
        <div className="gap-4 grid py-4">
          <Form {...form}>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
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
                      <Textarea placeholder="Mô tả sản phẩm" {...field} />
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
                          {data.map((item: Category) => (
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
              <Button type="submit">{isPending ? <Loading /> : "Thêm"}</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddProduct;
