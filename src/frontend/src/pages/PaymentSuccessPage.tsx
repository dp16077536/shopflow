import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle className="w-10 h-10 text-green-600" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="font-display text-4xl font-bold mb-3">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Thank you for your purchase! Your order has been placed and you'll
          receive a confirmation soon.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate({ to: "/orders" })}
            data-ocid="payment-success.orders.button"
          >
            <ShoppingBag className="mr-2 w-4 h-4" /> View My Orders
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              navigate({ to: "/shop", search: { category: undefined } })
            }
            data-ocid="payment-success.shop.button"
          >
            Continue Shopping
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
