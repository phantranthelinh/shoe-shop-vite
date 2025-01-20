/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckoutForm from "@/components/client/checkout/CheckoutForm";
import ReviewCheckout from "@/components/client/checkout/ReviewCheckout";
import { useCreateOrder } from "@/hooks/api/orders/useCreateOrder";
import { useAuth } from "@/hooks/api/useAuth";
import { CheckoutSchema, CheckoutSchemaType } from "@/lib/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export const Route = createLazyFileRoute("/checkout/")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const form = useForm({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phoneNumber: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      paymentMethod: "cod",
    },
  });

  const { data } = useAuth();

  useEffect(() => {
    if (data) {
      form.setValue("customerName", data.name);
      form.setValue("email", data.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { mutate: createOrder } = useCreateOrder();

  const navigate = useNavigate();

  const handleCheckout = (checkoutItems: any) => (data: CheckoutSchemaType) => {
    const orderItems = checkoutItems.map((item: any) => ({
      product: item._id,
      name: item.name,
      image: item.image,
      qty: item.quantity,
      price: item.price,
    }));
    const dataSubmit = {
      orderItems,
      shippingInfo: {
        customerName: data.customerName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        province: data.province,
        district: data.district,
        ward: data.ward,
        address: data.address,
      },
      paymentMethod: data.paymentMethod,
    };

    createOrder(dataSubmit, {
      onSuccess: () => {
        form.reset();
        toast.success("Đặt hàng thành công");
        navigate({
          to: "/payment-success",
        });
      },
      onError: () => {
        toast.error("Đặt hàng thất bại!");
        navigate({
          to: "/payment-failed",
        });
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex w-full max-w-screen-xl">
        <CheckoutForm form={form} />
        <ReviewCheckout form={form} handleCheckout={handleCheckout} />
      </div>
    </div>
  );
}
