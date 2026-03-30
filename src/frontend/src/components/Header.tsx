import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocalCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCart, useIsAdmin } from "../hooks/useQueries";

interface HeaderProps {
  onCartOpen: () => void;
}

export default function Header({ onCartOpen }: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;
  const { data: cartItems = [] } = useGetCart();
  const { localCartCount } = useLocalCart();
  const { data: isAdmin } = useIsAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = isAuthenticated
    ? cartItems.reduce((s, i) => s + Number(i.quantity), 0)
    : localCartCount;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: "/" });
  };

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      if (error.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            ShopNow
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.home.link"
          >
            Home
          </Link>
          <Link
            to="/shop"
            search={{ category: undefined }}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="nav.shop.link"
          >
            Shop
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.admin.link"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartOpen}
            data-ocid="nav.cart.button"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                {cartCount}
              </Badge>
            )}
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-ocid="nav.user.button">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => navigate({ to: "/orders" })}
                  data-ocid="nav.orders.link"
                >
                  <Package className="w-4 h-4 mr-2" /> My Orders
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem
                    onClick={() => navigate({ to: "/admin" })}
                    data-ocid="nav.admin.dropdown.link"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  data-ocid="nav.logout.button"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={handleLogin}
              disabled={loginStatus === "logging-in"}
              size="sm"
              data-ocid="nav.login.button"
            >
              {loginStatus === "logging-in" ? "Logging in..." : "Login"}
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-3">
          <Link
            to="/"
            className="text-sm font-medium py-2"
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.home.link"
          >
            Home
          </Link>
          <Link
            to="/shop"
            search={{ category: undefined }}
            className="text-sm font-medium py-2"
            onClick={() => setMobileOpen(false)}
            data-ocid="nav.mobile.shop.link"
          >
            Shop
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="text-sm font-medium py-2"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile.admin.link"
            >
              Admin
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/orders"
              className="text-sm font-medium py-2"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile.orders.link"
            >
              My Orders
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
