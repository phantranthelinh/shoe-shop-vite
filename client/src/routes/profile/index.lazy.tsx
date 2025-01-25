import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { District, Province, Ward } from "@/entities/provinces";
import useGetDistrict from "@/hooks/api/provinces/useGetDistricts";
import useGetProvinces from "@/hooks/api/provinces/useGetProvinces";
import useGetWards from "@/hooks/api/provinces/useGetWards";
import { useAuth } from "@/hooks/api/useAuth";
import { useUpdateUser } from "@/hooks/api/users/useUpdateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createLazyFileRoute("/profile/")({
  component: ProfilePage,
});
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1).max(255),
  password: z.string().min(6).max(255),
  address: z.string().min(1),
  province: z.string().min(1, { message: "Vui lòng chọn tỉnh" }),
  district: z.string().min(1, { message: "Vui lòng chọn huyện" }),
  ward: z.string().min(1, { message: "Vui lòng chọn xã" }),
  isDefault: z.boolean(),
});
function ProfilePage() {
  const { data } = useAuth();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      province: "",
      district: "",
      ward: "",
      isDefault: false,
    },
  });
  const { control, watch } = form;

  const { data: provinces } = useGetProvinces();

  const provinceId = watch("province");
  const districtId = watch("district");

  const { data: districts } = useGetDistrict(provinceId);
  const { data: wards } = useGetWards(districtId);

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("email", data.email);
    }
  }, [data]);

  const { mutate: updateUserInfo } = useUpdateUser(data?._id);

  const handleUpdate = (data: z.infer<typeof schema>) => {
    updateUserInfo(
      {
        ...data,
        address: {
          addressLine: data.address,
          province: data.province,
          district: data.district,
          ward: data.ward,
          isDefault: data.isDefault,
        },
      },
      {
        onSuccess: () => {
          toast.success("Cập nhật thành công");
        },
        onError: () => {
          toast.error("Cập nhật thất bại");
        },
      }
    );
  };

  return (
    <MainLayout>
      <Wrapper>
        <h2 className="mb-4 text-2xl">Thông tin của bạn</h2>
        <div className="max-w-screen-md">
          <Form {...form}>
            <form
              className="space-y-2 md:space-y-4"
              onSubmit={form.handleSubmit(handleUpdate)}
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Họ tên
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Họ tên của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mật khẩu"
                        {...field}
                        type="password"
                      />
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
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Địa chỉ
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="gap-4 grid grid-cols-3">
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
                          disabled={!provinceId}
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
                          disabled={!districtId}
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
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Checkbox onChange={field.onChange} />
                          <div className="peer-disabled:opacity-70 font-medium text-slate-500 text-sm leading-none peer-disabled:cursor-not-allowed">
                            Chọn làm địa chỉ mặc định
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid}
              >
                Cập nhật
              </Button>
            </form>
          </Form>
        </div>
      </Wrapper>
    </MainLayout>
  );
}
