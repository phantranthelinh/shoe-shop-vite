import Layout from "@/components/dashboard/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <Layout>
      <div>Content</div>
    </Layout>
  );
}
