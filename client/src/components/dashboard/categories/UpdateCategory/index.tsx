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
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/entities/category";
import { useMutationCategory } from "@/hooks/api/categories/useMutationCategory";
import useVisibility from "@/hooks/useVisibility";
import { methodType } from "@/types/method.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

  const { isVisible, toggleVisibility } = useVisibility();

  const { control } = form;

  const { mutate: updateCategory } = useMutationCategory();

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      type: "update" as methodType,
      data: { ...data, id },
    };
    updateCategory(payload as any, {
      onSuccess: () => {
        toast.success("Cập nhật danh mục thành công");
      },
    });
  };

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
      </SheetContent>
    </Sheet>
  );
};

export default UpdateCategory;
