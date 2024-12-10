import Layout from "@/layout/Layout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <div>Content</div>
    </Layout>
  );
}
