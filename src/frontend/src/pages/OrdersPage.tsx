import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Package } from "lucide-react";
import { motion } from "motion/react";
import { OrderStatus } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetMyOrders } from "../hooks/useQueries";

const STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.pending]: "bg-yellow-100 text-yellow-800",
  [OrderStatus.paid]: "bg-blue-100 text-blue-800",
  [OrderStatus.shipped]: "bg-purple-100 text-purple-800",
  [OrderStatus.delivered]: "bg-green-100 text-green-800",
};

const SKELETON_KEYS = ["sk-1", "sk-2", "sk-3"];

export default function OrdersPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useGetMyOrders();

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Login required</h2>
        <p className="text-muted-foreground mb-6">
          Please login to view your orders.
        </p>
        <Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">My Orders</h1>

      {isLoading ? (
        <div className="space-y-4" data-ocid="orders.loading_state">
          {SKELETON_KEYS.map((k) => (
            <Skeleton key={k} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16" data-ocid="orders.empty_state">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No orders yet.</p>
          <Button
            onClick={() =>
              navigate({ to: "/shop", search: { category: undefined } })
            }
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <motion.div
              key={order.id.toString()}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card data-ocid={`orders.item.${idx + 1}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Order #{order.id.toString()}
                    </CardTitle>
                    <Badge className={STATUS_COLORS[order.status]}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(
                      Number(order.timestamp) / 1_000_000,
                    ).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                    <p className="font-bold">
                      ${(Number(order.total) / 100).toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
