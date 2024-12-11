import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import store from "@/store/store";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
let persistor = persistStore(store);
export const Route = createRootRoute({
  component: () => (
    <>
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Header />
            <Outlet />
            <Footer />
          </PersistGate>
        </Provider>
      </>
      <TanStackRouterDevtools />
    </>
  ),
});
