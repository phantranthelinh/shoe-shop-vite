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
import { methodType } from "@/types/method.type";
import { Category } from "@/entities/category";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

interface IProps {
  id: string;
  data: Category;
}

const UpdateCategory: React.FC<IProps> = ({ id, data }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const { control } = form;

  const { mutate: updateProduct } = useMutationProduct();

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      type: "update" as methodType,
      data: { ...data, id },
    };
    updateProduct(payload as any);
  };

  return (
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
                  Tên danh mục
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tên danh mục" {...field} />
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
                  Mô tả danh mục
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Mô tả danh mục" {...field} />
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

export default UpdateCategory;
