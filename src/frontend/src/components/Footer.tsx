import { Package } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Package className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">ShopNow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for premium products at unbeatable
              prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Electronics</li>
              <li>Fashion</li>
              <li>Home & Garden</li>
              <li>Sports</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>FAQ</li>
              <li>Shipping Policy</li>
              <li>Returns</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {year}. Built with ❤️ using{" "}
          <a
            href={utm}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
