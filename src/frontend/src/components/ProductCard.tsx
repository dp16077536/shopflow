import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend";
import { useLocalCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddToCart } from "../hooks/useQueries";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const addToCart = useAddToCart();
  const { addToLocalCart } = useLocalCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      addToCart.mutate(
        { productId: product.id, quantity: BigInt(1) },
        {
          onSuccess: () => toast.success(`${product.name} added to cart`),
          onError: () => toast.error("Failed to add to cart"),
        },
      );
    } else {
      addToLocalCart(product, 1);
      toast.success(`${product.name} added to cart`);
    }
  };

  const inStock = Number(product.stockQuantity) > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to="/product/$id" params={{ id: product.id.toString() }}>
        <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-card transition-shadow duration-200">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img
              src={
                product.imageUrl ||
                `https://picsum.photos/seed/${product.id}/400/300`
              }
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
            {!inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">
                ${(Number(product.price) / 100).toFixed(2)}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={!inStock || addToCart.isPending}
                onClick={handleAddToCart}
                data-ocid={`product.${index + 1}.add_button`}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
