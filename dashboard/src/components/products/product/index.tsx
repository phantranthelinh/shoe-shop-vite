import Loading from "@/components/common/loading";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import useVisibility from "@/hooks/useVisibility";
import { methodType } from "@/types/method.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormFields = {
  name: string;
  image: string;
  price: number;
  description: string;
  countInStock: number;
};
const schema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string(),
  countInStock: z.number(),
});

const Product = () => {
  const { isVisible, toggleVisibility } = useVisibility(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      image: "",
      price: 0,
      description: "",
      countInStock: 0,
    },
  });

  const { control } = form;
  const { mutate, isPending } = useMutationProduct();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const payload = {
      type: "create" as methodType,
      product: data,
    };
    mutate(payload, {
      onSuccess: () => {
        console.log("Submission successful");
      },
      onError: (error) => {
        console.log(`Error:::${error}`);
      },
      onSettled: () => {
        toggleVisibility();
      },
    });
  };

  return (
    <Sheet open={isVisible} onOpenChange={toggleVisibility}>
      <SheetTrigger asChild>
        <Button variant="outline">Thêm sản phẩm</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Thêm sản phẩm</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
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
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Hình ảnh
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Hình ảnh" {...field} />
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

export default Product;
