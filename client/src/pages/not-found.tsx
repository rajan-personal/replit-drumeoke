import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Link href="/">
        <Button variant="default" data-testid="button-home">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
