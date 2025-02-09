import Layout from "@/components/dashboard/layout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/incomes/")({
  component: IncomePage,
});

function IncomePage() {
  return <Layout>Hello "/dashboard/incomes/"!</Layout>;
}
