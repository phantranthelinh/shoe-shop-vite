import { Loading } from "@/components/common/Loading";
import Tiptap from "@/components/common/Tiptap";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/entities/category";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import useVisibility from "@/hooks/useVisibility";
import { methodType } from "@/types/method.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Pencil, Plus, UploadIcon, X } from "lucide-react";
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

const AddProduct = ({ productId }: { productId?: string }) => {
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

  const { data: categories } = useGetCategories();

  const { isUploading, uploadedUrl, uploadImage } = useCloudinaryUpload();

  const handleOpenChange = () => {
    toggleVisibility();
    form.reset();
  };

  return (
    <Dialog open={isVisible} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {productId ? (
          <Button variant={"outline"} size="icon">
            <Pencil className="size-4" />
          </Button>
        ) : (
          <Button>
            Thêm
            <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        style={{ maxWidth: "70vw" }}
        className="p-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="p-4">
          <DialogTitle>Thêm sản phẩm</DialogTitle>
          <DialogDescription className="hidden">
            Thêm sản phẩm
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="p-0 h-[calc(100vh-100px)]">
          <div className="gap-4 grid px-4 pb-4">
            <Form {...form}>
              <form
                className="space-y-2 md:space-y-4"
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
                        <Tiptap {...field} />
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
                      <div className="flex justify-center items-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="relative flex flex-col justify-center items-center border-2 border-gray-300 dark:hover:border-gray-500 dark:border-gray-600 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 border-dashed rounded-lg w-full h-48 cursor-pointer"
                        >
                          {field.value && uploadedUrl && (
                            <Button
                              type="button"
                              variant="outline"
                              className="top-2 right-2 absolute p-0"
                              size={"icon"}
                              onClick={() => field.onChange("")}
                            >
                              <X className="size-4" />
                            </Button>
                          )}

                          <div className="flex flex-col justify-center items-center pt-5 pb-6 w-full h-48">
                            {field.value && uploadedUrl ? (
                              <img
                                src={uploadedUrl}
                                alt="image"
                                className="w-[200px] h-[200px] object-cover" // Fixed dimensions
                              />
                            ) : (
                              <>
                                <UploadIcon />
                                <p className="mb-2 text-gray-500 text-sm dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>
                                </p>
                                <p className="text-gray-500 text-xs dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </>
                            )}
                          </div>

                          <FormControl>
                            <Input
                              id="dropzone-file"
                              type="file"
                              placeholder="Hình ảnh"
                              className="hidden"
                              onChange={(e) => {
                                uploadImage(e.target.files);
                                field.onChange(e.target.files);
                                if (!isUploading) {
                                  field.onChange(uploadedUrl);
                                }
                              }}
                            />
                          </FormControl>
                        </label>
                      </div>

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
                <Button type="submit">{isPending ? <Loading /> : "Lưu"}</Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
