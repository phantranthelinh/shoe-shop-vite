/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as CategoryCategoryNameImport } from './routes/category/$categoryName'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const ProductsIndexLazyImport = createFileRoute('/products/')()
const PaymentSuccessIndexLazyImport = createFileRoute('/payment-success/')()
const PaymentFailedIndexLazyImport = createFileRoute('/payment-failed/')()
const LoginIndexLazyImport = createFileRoute('/login/')()
const ContactIndexLazyImport = createFileRoute('/contact/')()
const CartIndexLazyImport = createFileRoute('/cart/')()
const AboutIndexLazyImport = createFileRoute('/about/')()
const ProductsProductNameIndexLazyImport = createFileRoute(
  '/products/$productName/',
)()
const DashboardProductsIndexLazyImport = createFileRoute(
  '/dashboard/products/',
)()
const DashboardProductCategoriesIndexLazyImport = createFileRoute(
  '/dashboard/product-categories/',
)()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProductsIndexLazyRoute = ProductsIndexLazyImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/products/index.lazy').then((d) => d.Route),
)

const PaymentSuccessIndexLazyRoute = PaymentSuccessIndexLazyImport.update({
  id: '/payment-success/',
  path: '/payment-success/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/payment-success/index.lazy').then((d) => d.Route),
)

const PaymentFailedIndexLazyRoute = PaymentFailedIndexLazyImport.update({
  id: '/payment-failed/',
  path: '/payment-failed/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/payment-failed/index.lazy').then((d) => d.Route),
)

const LoginIndexLazyRoute = LoginIndexLazyImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login/index.lazy').then((d) => d.Route))

const ContactIndexLazyRoute = ContactIndexLazyImport.update({
  id: '/contact/',
  path: '/contact/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/contact/index.lazy').then((d) => d.Route))

const CartIndexLazyRoute = CartIndexLazyImport.update({
  id: '/cart/',
  path: '/cart/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/cart/index.lazy').then((d) => d.Route))

const AboutIndexLazyRoute = AboutIndexLazyImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/index.lazy').then((d) => d.Route))

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const CategoryCategoryNameRoute = CategoryCategoryNameImport.update({
  id: '/category/$categoryName',
  path: '/category/$categoryName',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductNameIndexLazyRoute =
  ProductsProductNameIndexLazyImport.update({
    id: '/products/$productName/',
    path: '/products/$productName/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/products/$productName/index.lazy').then((d) => d.Route),
  )

const DashboardProductsIndexLazyRoute = DashboardProductsIndexLazyImport.update(
  {
    id: '/dashboard/products/',
    path: '/dashboard/products/',
    getParentRoute: () => rootRoute,
  } as any,
).lazy(() =>
  import('./routes/dashboard/products/index.lazy').then((d) => d.Route),
)

const DashboardProductCategoriesIndexLazyRoute =
  DashboardProductCategoriesIndexLazyImport.update({
    id: '/dashboard/product-categories/',
    path: '/dashboard/product-categories/',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/dashboard/product-categories/index.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/category/$categoryName': {
      id: '/category/$categoryName'
      path: '/category/$categoryName'
      fullPath: '/category/$categoryName'
      preLoaderRoute: typeof CategoryCategoryNameImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/about/': {
      id: '/about/'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/cart/': {
      id: '/cart/'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/contact/': {
      id: '/contact/'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/payment-failed/': {
      id: '/payment-failed/'
      path: '/payment-failed'
      fullPath: '/payment-failed'
      preLoaderRoute: typeof PaymentFailedIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/payment-success/': {
      id: '/payment-success/'
      path: '/payment-success'
      fullPath: '/payment-success'
      preLoaderRoute: typeof PaymentSuccessIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/product-categories/': {
      id: '/dashboard/product-categories/'
      path: '/dashboard/product-categories'
      fullPath: '/dashboard/product-categories'
      preLoaderRoute: typeof DashboardProductCategoriesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/products/': {
      id: '/dashboard/products/'
      path: '/dashboard/products'
      fullPath: '/dashboard/products'
      preLoaderRoute: typeof DashboardProductsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/products/$productName/': {
      id: '/products/$productName/'
      path: '/products/$productName'
      fullPath: '/products/$productName'
      preLoaderRoute: typeof ProductsProductNameIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/category/$categoryName': typeof CategoryCategoryNameRoute
  '/dashboard': typeof DashboardIndexRoute
  '/about': typeof AboutIndexLazyRoute
  '/cart': typeof CartIndexLazyRoute
  '/contact': typeof ContactIndexLazyRoute
  '/login': typeof LoginIndexLazyRoute
  '/payment-failed': typeof PaymentFailedIndexLazyRoute
  '/payment-success': typeof PaymentSuccessIndexLazyRoute
  '/products': typeof ProductsIndexLazyRoute
  '/dashboard/product-categories': typeof DashboardProductCategoriesIndexLazyRoute
  '/dashboard/products': typeof DashboardProductsIndexLazyRoute
  '/products/$productName': typeof ProductsProductNameIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/category/$categoryName': typeof CategoryCategoryNameRoute
  '/dashboard': typeof DashboardIndexRoute
  '/about': typeof AboutIndexLazyRoute
  '/cart': typeof CartIndexLazyRoute
  '/contact': typeof ContactIndexLazyRoute
  '/login': typeof LoginIndexLazyRoute
  '/payment-failed': typeof PaymentFailedIndexLazyRoute
  '/payment-success': typeof PaymentSuccessIndexLazyRoute
  '/products': typeof ProductsIndexLazyRoute
  '/dashboard/product-categories': typeof DashboardProductCategoriesIndexLazyRoute
  '/dashboard/products': typeof DashboardProductsIndexLazyRoute
  '/products/$productName': typeof ProductsProductNameIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/category/$categoryName': typeof CategoryCategoryNameRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/about/': typeof AboutIndexLazyRoute
  '/cart/': typeof CartIndexLazyRoute
  '/contact/': typeof ContactIndexLazyRoute
  '/login/': typeof LoginIndexLazyRoute
  '/payment-failed/': typeof PaymentFailedIndexLazyRoute
  '/payment-success/': typeof PaymentSuccessIndexLazyRoute
  '/products/': typeof ProductsIndexLazyRoute
  '/dashboard/product-categories/': typeof DashboardProductCategoriesIndexLazyRoute
  '/dashboard/products/': typeof DashboardProductsIndexLazyRoute
  '/products/$productName/': typeof ProductsProductNameIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/category/$categoryName'
    | '/dashboard'
    | '/about'
    | '/cart'
    | '/contact'
    | '/login'
    | '/payment-failed'
    | '/payment-success'
    | '/products'
    | '/dashboard/product-categories'
    | '/dashboard/products'
    | '/products/$productName'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/category/$categoryName'
    | '/dashboard'
    | '/about'
    | '/cart'
    | '/contact'
    | '/login'
    | '/payment-failed'
    | '/payment-success'
    | '/products'
    | '/dashboard/product-categories'
    | '/dashboard/products'
    | '/products/$productName'
  id:
    | '__root__'
    | '/'
    | '/category/$categoryName'
    | '/dashboard/'
    | '/about/'
    | '/cart/'
    | '/contact/'
    | '/login/'
    | '/payment-failed/'
    | '/payment-success/'
    | '/products/'
    | '/dashboard/product-categories/'
    | '/dashboard/products/'
    | '/products/$productName/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  CategoryCategoryNameRoute: typeof CategoryCategoryNameRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
  AboutIndexLazyRoute: typeof AboutIndexLazyRoute
  CartIndexLazyRoute: typeof CartIndexLazyRoute
  ContactIndexLazyRoute: typeof ContactIndexLazyRoute
  LoginIndexLazyRoute: typeof LoginIndexLazyRoute
  PaymentFailedIndexLazyRoute: typeof PaymentFailedIndexLazyRoute
  PaymentSuccessIndexLazyRoute: typeof PaymentSuccessIndexLazyRoute
  ProductsIndexLazyRoute: typeof ProductsIndexLazyRoute
  DashboardProductCategoriesIndexLazyRoute: typeof DashboardProductCategoriesIndexLazyRoute
  DashboardProductsIndexLazyRoute: typeof DashboardProductsIndexLazyRoute
  ProductsProductNameIndexLazyRoute: typeof ProductsProductNameIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  CategoryCategoryNameRoute: CategoryCategoryNameRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  AboutIndexLazyRoute: AboutIndexLazyRoute,
  CartIndexLazyRoute: CartIndexLazyRoute,
  ContactIndexLazyRoute: ContactIndexLazyRoute,
  LoginIndexLazyRoute: LoginIndexLazyRoute,
  PaymentFailedIndexLazyRoute: PaymentFailedIndexLazyRoute,
  PaymentSuccessIndexLazyRoute: PaymentSuccessIndexLazyRoute,
  ProductsIndexLazyRoute: ProductsIndexLazyRoute,
  DashboardProductCategoriesIndexLazyRoute:
    DashboardProductCategoriesIndexLazyRoute,
  DashboardProductsIndexLazyRoute: DashboardProductsIndexLazyRoute,
  ProductsProductNameIndexLazyRoute: ProductsProductNameIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/category/$categoryName",
        "/dashboard/",
        "/about/",
        "/cart/",
        "/contact/",
        "/login/",
        "/payment-failed/",
        "/payment-success/",
        "/products/",
        "/dashboard/product-categories/",
        "/dashboard/products/",
        "/products/$productName/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/category/$categoryName": {
      "filePath": "category/$categoryName.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/about/": {
      "filePath": "about/index.lazy.tsx"
    },
    "/cart/": {
      "filePath": "cart/index.lazy.tsx"
    },
    "/contact/": {
      "filePath": "contact/index.lazy.tsx"
    },
    "/login/": {
      "filePath": "login/index.lazy.tsx"
    },
    "/payment-failed/": {
      "filePath": "payment-failed/index.lazy.tsx"
    },
    "/payment-success/": {
      "filePath": "payment-success/index.lazy.tsx"
    },
    "/products/": {
      "filePath": "products/index.lazy.tsx"
    },
    "/dashboard/product-categories/": {
      "filePath": "dashboard/product-categories/index.lazy.tsx"
    },
    "/dashboard/products/": {
      "filePath": "dashboard/products/index.lazy.tsx"
    },
    "/products/$productName/": {
      "filePath": "products/$productName/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
