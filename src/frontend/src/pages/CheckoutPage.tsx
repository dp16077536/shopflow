import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2, Lock, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { ShoppingItem } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreateCheckoutSession,
  useGetCart,
  useGetProductsByName,
} from "../hooks/useQueries";

export default function CheckoutPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();
  const { data: cartItems = [], isLoading: cartLoading } = useGetCart();
  const { data: products = [] } = useGetProductsByName();
  const createCheckoutSession = useCreateCheckoutSession();

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Login required</h2>
        <p className="text-muted-foreground mb-6">
          Please login to proceed to checkout.
        </p>
        <Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
      </main>
    );
  }

  const cartWithProducts = cartItems
    .map((ci) => ({
      item: ci,
      product: products.find((p) => p.id === ci.productId),
    }))
    .filter((x) => x.product !== undefined);

  const subtotal = cartWithProducts.reduce(
    (sum, { item, product }) =>
      sum + Number(product!.price) * Number(item.quantity),
    0,
  );
  const shipping = subtotal >= 5000 ? 0 : 999;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (cartWithProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const shoppingItems: ShoppingItem[] = cartWithProducts.map(
      ({ item, product }) => ({
        productId: item.productId,
        productName: product!.name,
        productDescription: product!.description || "",
        quantity: item.quantity,
        priceInCents: product!.price,
        currency: "usd",
      }),
    );

    createCheckoutSession.mutate(shoppingItems, {
      onSuccess: (session) => {
        window.location.href = session.url;
      },
      onError: (err: any) => {
        toast.error(err.message || "Checkout failed. Please try again.");
      },
    });
  };

  if (cartLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        {cartWithProducts.length === 0 ? (
          <div className="text-center py-16" data-ocid="checkout.empty_state">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty.</p>
            <Button
              onClick={() =>
                navigate({ to: "/shop", search: { category: undefined } })
              }
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <Card data-ocid="checkout.order.card">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cartWithProducts.map(({ item, product }, idx) => (
                  <div
                    key={item.productId.toString()}
                    className="flex justify-between items-center"
                    data-ocid={`checkout.item.${idx + 1}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          product!.imageUrl ||
                          `https://picsum.photos/seed/${product!.id}/60/60`
                        }
                        alt={product!.name}
                        className="w-12 h-12 object-cover rounded-md border border-border"
                      />
                      <div>
                        <p className="font-medium text-sm">{product!.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {Number(item.quantity)}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      $
                      {(
                        (Number(product!.price) * Number(item.quantity)) /
                        100
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0
                      ? "Free"
                      : `$${(shipping / 100).toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full"
              onClick={handleCheckout}
              disabled={createCheckoutSession.isPending}
              data-ocid="checkout.pay.primary_button"
            >
              {createCheckoutSession.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Pay Securely with Stripe
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Secured by Stripe. Your payment information is encrypted.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
