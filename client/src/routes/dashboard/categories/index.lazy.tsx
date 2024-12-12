import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/categories/"!</div>
}
