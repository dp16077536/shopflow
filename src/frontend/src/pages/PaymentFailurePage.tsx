import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
      >
        <XCircle className="w-10 h-10 text-red-600" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="font-display text-4xl font-bold mb-3">Payment Failed</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Your payment was not processed. Please try again or contact support if
          the issue persists.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate({ to: "/checkout" })}
            data-ocid="payment-failure.retry.button"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              navigate({ to: "/shop", search: { category: undefined } })
            }
            data-ocid="payment-failure.shop.button"
          >
            Back to Shop
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
