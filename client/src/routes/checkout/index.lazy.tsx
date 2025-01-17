import CheckoutForm from "@/components/client/checkout/CheckoutForm";
import ReviewCheckout from "@/components/client/checkout/ReviewCheckout";
import MainLayout from "@/components/client/layout";
import { useAuth } from "@/hooks/api/useAuth";
import { CheckoutSchema } from "@/lib/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

  return (
    <MainLayout classNames="justify-start">
      <div className="place-content-center grid grid-cols-1 lg:grid-cols-2 w-full max-w-screen-xl">
        <CheckoutForm form={form} />
        <ReviewCheckout form={form} />
      </div>
    </MainLayout>
  );
}
