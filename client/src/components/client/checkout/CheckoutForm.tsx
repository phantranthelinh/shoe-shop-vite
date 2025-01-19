/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentMethods } from "@/data";
import { District, Province, Ward } from "@/entities/provinces";
import useGetDistrict from "@/hooks/api/provinces/useGetDistricts";
import useGetProvinces from "@/hooks/api/provinces/useGetProvinces";
import useGetWards from "@/hooks/api/provinces/useGetWards";
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/api/useAuth";

const CheckoutForm = ({ form }: { form: any }) => {
  const { control, watch } = form;

  const { data: provinces } = useGetProvinces();
  const { isLogged } = useAuth();

  const provinceId = watch("province");
  const districtId = watch("district");

  const { data: districts } = useGetDistrict(provinceId);
  const { data: wards } = useGetWards(districtId);

  return (
    <div className="pr-6 w-full">
      <Link href="/" className="flex mb-4">
        <img
          src="/logo.svg"
          alt="nike-logo"
          width={60}
          height={60}
          className="w-[40px] md:w-[60px]"
        />
      </Link>
      <div className="flex justify-between items-center max-w-[400px]">
        <h2 className="text-xl">Thông tin nhận hàng</h2>
        {!isLogged && (
          <Link href="/login" className="flex items-center gap-1">
            <UserRound className="size-4" />
            Đăng nhập
          </Link>
        )}
      </div>
      <Form {...form}>
        <form className="mt-4 w-full">
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={control}
                name="customerName"
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
              <FormField
                control={control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.resetField("district");
                          form.resetField("ward");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
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

              <FormField
                control={control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.resetField("ward");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn Quận/Huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts &&
                            districts.map((item: District) => (
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
              <FormField
                control={control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Phường/Xã" />
                        </SelectTrigger>
                        <SelectContent>
                          {wards &&
                            wards.map((item: Ward) => (
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
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ cụ thể</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-none w-[300px]">
              <FormField
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thanh toán</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-2"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id}>
                            <RadioGroupItem
                              value={method.value}
                              id={method.value}
                              hidden
                            />
                            <Label
                              htmlFor={method.value}
                              className={cn(
                                "flex items-center justify-between  gap-2 p-4 border rounded-lg w-full cursor-pointer",
                                {
                                  "border-primary":
                                    method.value === field.value,
                                }
                              )}
                            >
                              <span>{method.name}</span>
                              <img
                                src={method.icon}
                                alt={method.name}
                                className="size-8"
                              />
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
