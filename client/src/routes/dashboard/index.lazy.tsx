import Layout from "@/components/dashboard/layout";
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
