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
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  name: z.string(),
  iamge: z.string(),
  price: z.number(),
  description: z.string(),
  countInStock: z.number(),
});
const Product = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      iamge: "",
      price: 0,
      description: "",
      countInStock: 0,
    },
  });

  const { control } = form;

  const onSubmit = () => {};
  return (
    <Sheet>
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
                      <Input placeholder="example@gmail.com" {...field} />
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
            </form>
          </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Product;
