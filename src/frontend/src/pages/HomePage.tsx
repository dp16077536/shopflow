import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Tag, Truck, Zap } from "lucide-react";
import { motion } from "motion/react";
import ProductCard from "../components/ProductCard";
import { useGetProductsByName } from "../hooks/useQueries";

const CATEGORIES = [
  { name: "Electronics", emoji: "💻", color: "bg-blue-50 hover:bg-blue-100" },
  { name: "Fashion", emoji: "👗", color: "bg-pink-50 hover:bg-pink-100" },
  {
    name: "Home & Garden",
    emoji: "🏡",
    color: "bg-green-50 hover:bg-green-100",
  },
  { name: "Sports", emoji: "⚽", color: "bg-orange-50 hover:bg-orange-100" },
  { name: "Books", emoji: "📚", color: "bg-yellow-50 hover:bg-yellow-100" },
  { name: "Beauty", emoji: "💄", color: "bg-purple-50 hover:bg-purple-100" },
];

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4"];

export default function HomePage() {
  const { data: products = [], isLoading } = useGetProductsByName();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
                🎉 New Arrivals Every Week
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Shop the <span className="text-primary">Best Deals</span> Online
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Discover thousands of products across electronics, fashion, home
                goods, and more — all at prices you'll love.
              </p>
              <div className="flex gap-3">
                <Link to="/shop" search={{ category: undefined }}>
                  <Button size="lg" data-ocid="hero.shop.primary_button">
                    Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  data-ocid="hero.browse.secondary_button"
                >
                  Browse Categories
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden md:block"
            >
              <img
                src="/assets/generated/hero-banner.dim_1600x600.jpg"
                alt="Shop Now"
                className="w-full rounded-2xl shadow-card object-cover max-h-80"
              />
            </motion.div>
          </div>
        </div>

        {/* Feature badges */}
        <div className="bg-white border-y border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Truck, text: "Free Shipping over $50" },
                { icon: Shield, text: "Secure Payments" },
                { icon: Zap, text: "Fast Delivery" },
                { icon: Tag, text: "Best Price Guarantee" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl font-bold">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-1">
              Hand-picked just for you
            </p>
          </div>
          <Link to="/shop" search={{ category: undefined }}>
            <Button variant="outline" data-ocid="home.viewall.button">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKELETON_KEYS.map((k) => (
              <div key={k} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" data-ocid="featured.empty_state">
            <p className="text-muted-foreground">
              No featured products yet. Check back soon!
            </p>
            <Link to="/shop" search={{ category: undefined }}>
              <Button className="mt-4" variant="outline">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-muted/30 py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold">
              Shop by Category
            </h2>
            <p className="text-muted-foreground mt-1">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to="/shop"
                  search={{ category: cat.name }}
                  data-ocid={`category.${i + 1}.link`}
                >
                  <div
                    className={`${cat.color} rounded-xl p-5 text-center cursor-pointer transition-colors`}
                  >
                    <div className="text-3xl mb-2">{cat.emoji}</div>
                    <p className="text-sm font-semibold">{cat.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 py-14">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-bold mb-2">
              Summer Sale is Live!
            </h2>
            <p className="opacity-90">
              Up to 50% off on selected items. Limited time offer.
            </p>
          </div>
          <Link to="/shop" search={{ category: undefined }}>
            <Button
              size="lg"
              variant="secondary"
              className="shrink-0"
              data-ocid="promo.shop.button"
            >
              Shop the Sale <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
