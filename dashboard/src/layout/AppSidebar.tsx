import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Box, Home, ShoppingCart, Table2 } from "lucide-react";

const items = [
  {
    title: "Trang chủ",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Sản Phẩm",
    url: "/dashboard/products",
    icon: Box,
  },
  {
    title: "Danh mục sản phẩm",
    url: "/dashboard/product-categories",
    icon: Table2,
  },
  {
    title: "Đơn hàng",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
