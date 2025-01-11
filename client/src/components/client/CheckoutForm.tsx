import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { Province } from "@/entities/provinces";
import useGetProvinces from "@/hooks/api/provinces/useGetProvinces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CheckoutForm = () => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      province: "",
      district: "",
      ward: "",
      address: "",
    },
  });

  const { control } = form;

  const { data: provinces } = useGetProvinces();

  return (
    <form className="mt-4 w-full">
      <Form {...form}>
        <FormField
          control={control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên khách hàng</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <Form {...form}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>

      <Form {...form}>
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <FormField
        control={control}
        name="province"
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
                  <SelectValue placeholder="Chọn tỉnh thành" />
                </SelectTrigger>
                <SelectContent>
                  {provinces &&
                    provinces.map((item: Province) => (
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
      <Form {...form}>
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </form>
  );
};

export default CheckoutForm;
