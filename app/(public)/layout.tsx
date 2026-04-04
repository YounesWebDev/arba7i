// --- components/public/footer.tsx ---
import Link from "next/link";
import { Globe } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-muted/30 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand & Trust Section */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
              Arba7i<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The premier Cash on Delivery platform for Algerian sellers. 
              Manage stores, confirm orders, and track your real net profit—all in one place.
            </p>
            {/* Language Switch */}
            <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              <Globe className="h-4 w-4" />
              <span>English (EN)</span>
            </button>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground tracking-tight">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Partners</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground tracking-tight">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground tracking-tight">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright - No lines, just spacing! */}
        <div className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Arba7i SaaS. All rights reserved.</p>
          <p>Built for Algerian Sellers.</p>
        </div>
      </div>
    </footer>
  );
}