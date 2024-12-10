import { createLazyFileRoute } from '@tanstack/react-router'
import MainLayout from '../../components/layouts/MainLayout'
import Cart from '../../components/Cart'

export const Route = createLazyFileRoute('/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MainLayout>
      <Cart />
    </MainLayout>
  )
}
