import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Minus, Package, Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddToCart, useGetProduct } from "../hooks/useQueries";

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/product/$id" });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: product, isLoading, isError } = useGetProduct(BigInt(id));
  const addToCart = useAddToCart();
  const { addToLocalCart } = useLocalCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    if (isAuthenticated) {
      addToCart.mutate(
        { productId: product.id, quantity: BigInt(quantity) },
        {
          onSuccess: () => toast.success(`${product.name} added to cart!`),
          onError: () => toast.error("Failed to add to cart"),
        },
      );
    } else {
      addToLocalCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main
        className="container mx-auto px-4 py-16 text-center"
        data-ocid="product.error_state"
      >
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Product not found</h2>
        <Button
          onClick={() =>
            navigate({ to: "/shop", search: { category: undefined } })
          }
          variant="outline"
        >
          Back to Shop
        </Button>
      </main>
    );
  }

  const inStock = Number(product.stockQuantity) > 0;
  const price = Number(product.price) / 100;

  return (
    <main className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() =>
          navigate({ to: "/shop", search: { category: undefined } })
        }
        data-ocid="product.back.button"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
      </Button>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <img
            src={
              product.imageUrl ||
              `https://picsum.photos/seed/${product.id}/800/600`
            }
            alt={product.name}
            className="w-full aspect-square object-cover rounded-2xl border border-border"
          />
          {product.featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h1 className="font-display text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold">${price.toFixed(2)}</span>
            <Badge variant={inStock ? "outline" : "secondary"}>
              {inStock ? `In Stock (${product.stockQuantity})` : "Out of Stock"}
            </Badge>
          </div>

          <Separator />

          <p className="text-muted-foreground leading-relaxed">
            {product.description || "No description available."}
          </p>

          <Separator />

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none rounded-l-md"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                data-ocid="product.quantity.decrease"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none rounded-r-md"
                onClick={() =>
                  setQuantity((q) =>
                    Math.min(Number(product.stockQuantity), q + 1),
                  )
                }
                disabled={quantity >= Number(product.stockQuantity)}
                data-ocid="product.quantity.increase"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            disabled={!inStock || addToCart.isPending}
            onClick={handleAddToCart}
            data-ocid="product.add_to_cart.button"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {addToCart.isPending ? "Adding..." : "Add to Cart"}
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
