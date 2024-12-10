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
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Product } from "../table";

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

interface IProps {
  id: string;
  data: Product;
  refetch: () => void;
}

const UpdateProduct: React.FC<IProps> = ({ id, data, refetch }) => {
  console.log(data);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      image: data.image,
      price: data.price,
      description: data.description,
      countInStock: data.countInStock,
    },
  });

  const { control } = form;

  const { mutate } = useMutationProduct();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const payload = {
      type: "update" as const,
      body: { ...data, id },
    };
    mutate(payload, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.log(`Error:::${error}`);
      },
    });
  };

  return (
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
          <Button type="submit">Cập nhật</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProduct;
