import { createLazyFileRoute } from '@tanstack/react-router'
import MainLayout from '../../components/layouts/MainLayout'

export const Route = createLazyFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>
    <h2>AboutUs</h2>
  </MainLayout>
}
