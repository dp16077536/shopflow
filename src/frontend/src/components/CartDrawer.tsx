import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useLocalCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCart,
  useRemoveFromCart,
  useUpdateCart,
} from "../hooks/useQueries";
import { useGetProductsByName } from "../hooks/useQueries";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();

  // Authenticated cart
  const { data: cartItems = [] } = useGetCart();
  const { data: products = [] } = useGetProductsByName();
  const removeFromCart = useRemoveFromCart();
  const updateCart = useUpdateCart();

  // Local (guest) cart
  const {
    localCart,
    removeFromLocalCart,
    updateLocalCartQuantity,
    localCartTotal,
  } = useLocalCart();

  const authCartWithProducts = cartItems
    .map((ci) => ({
      item: ci,
      product: products.find((p) => p.id === ci.productId),
    }))
    .filter((x) => x.product !== undefined);

  const authTotal = authCartWithProducts.reduce(
    (sum, { item, product }) =>
      sum + Number(product!.price) * Number(item.quantity),
    0,
  );

  const totalItems = isAuthenticated
    ? cartItems.reduce((s, i) => s + Number(i.quantity), 0)
    : localCart.reduce((s, i) => s + i.quantity, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      onClose();
      return;
    }
    onClose();
    navigate({ to: "/checkout" });
  };

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:w-96 p-0 flex flex-col"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Cart ({totalItems})
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-ocid="cart.close.button"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {isAuthenticated ? (
            authCartWithProducts.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 gap-3"
                data-ocid="cart.empty_state"
              >
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <div className="py-4 space-y-4">
                {authCartWithProducts.map(({ item, product }, idx) => (
                  <div
                    key={product!.id.toString()}
                    className="flex gap-3"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <img
                      src={
                        product!.imageUrl ||
                        `https://picsum.photos/seed/${product!.id}/80/80`
                      }
                      alt={product!.name}
                      className="w-16 h-16 object-cover rounded-md border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {product!.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(Number(product!.price))}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateCart.mutate({
                              productId: item.productId,
                              quantity: BigInt(
                                Math.max(1, Number(item.quantity) - 1),
                              ),
                            })
                          }
                          data-ocid={`cart.item.${idx + 1}.decrease`}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm w-6 text-center">
                          {Number(item.quantity)}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateCart.mutate({
                              productId: item.productId,
                              quantity: BigInt(Number(item.quantity) + 1),
                            })
                          }
                          data-ocid={`cart.item.${idx + 1}.increase`}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() =>
                        removeFromCart.mutate(item.productId, {
                          onSuccess: () => toast.success("Removed from cart"),
                        })
                      }
                      data-ocid={`cart.item.${idx + 1}.delete_button`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )
          ) : localCart.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16 gap-3"
              data-ocid="cart.empty_state"
            >
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="py-4 space-y-4">
              {localCart.map(({ product, quantity }, idx) => (
                <div
                  key={product.id.toString()}
                  className="flex gap-3"
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <img
                    src={
                      product.imageUrl ||
                      `https://picsum.photos/seed/${product.id}/80/80`
                    }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(Number(product.price))}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateLocalCartQuantity(product.id, quantity - 1)
                        }
                        data-ocid={`cart.item.${idx + 1}.decrease`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm w-6 text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          updateLocalCartQuantity(product.id, quantity + 1)
                        }
                        data-ocid={`cart.item.${idx + 1}.increase`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromLocalCart(product.id)}
                    data-ocid={`cart.item.${idx + 1}.delete_button`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {(isAuthenticated
          ? authCartWithProducts.length > 0
          : localCart.length > 0) && (
          <div className="border-t border-border px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm font-semibold">
              <span>Subtotal</span>
              <span>
                {formatPrice(isAuthenticated ? authTotal : localCartTotal)}
              </span>
            </div>
            <Button
              className="w-full"
              onClick={handleCheckout}
              data-ocid="cart.checkout.button"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
