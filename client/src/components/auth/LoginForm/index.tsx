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
import { useAuth } from "@/hooks/api/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const schema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(6).max(255),
});
const LoginForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control } = form;
  const { login } = useAuth();
  const onSubmit = (data: z.infer<typeof schema>) => {
    login(data, {
      onSuccess: () => {
        toast.success("Đăng nhập thành công!");
      },
      onError() {
        toast.error("Đăng nhập thất bại, Tài khoản hoặc mật khẩu không đúng");
      },
    });
  };
  return (
    <div className="dark:border-gray-700 bg-white dark:bg-gray-800 shadow md:mt-0 xl:p-0 dark:border rounded-lg w-full sm:max-w-md">
      <div className="space-y-4 md:space-y-6 p-6 sm:p-8">
        <h1 className="font-bold text-gray-900 text-xl md:text-2xl dark:text-white leading-tight tracking-tight">
          Sign in
        </h1>
        <Form {...form}>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                    Email
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 border rounded focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 w-4 h-4"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="font-medium text-primary-600 text-sm dark:text-primary-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
