import CheckoutForm from "@/components/client/CheckoutForm";
import MainLayout from "@/components/client/layout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/checkout/")({
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-2 max-w-screen-xl">
        <div className="w-full">
          <h2 className="text-2xl">Checkout</h2>
          <CheckoutForm />
        </div>
        <div className="w-full">Review your card</div>
      </div>
    </MainLayout>
  );
}
