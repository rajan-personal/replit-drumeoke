import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { LogOut, User, Shield, Heart } from "lucide-react";

interface HeaderProps {
  showBackButton?: boolean;
  backPath?: string;
}

export default function Header({ showBackButton, backPath }: HeaderProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 glass-clear border-b border-border/10 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <h1 className="text-2xl font-serif font-bold text-primary cursor-pointer tracking-tight hover:opacity-80 transition-opacity">Drumeoke</h1>
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              {user.isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="gap-2 btn-capsule glass-hover" data-testid="button-admin">
                    <Shield className="h-4 w-4" />
                    <span className="hidden sm:inline">Admin</span>
                  </Button>
                </Link>
              )}
              <Link href="/songs">
                <Button variant="outline" size="sm" className="btn-capsule glass-hover" data-testid="button-browse">
                  <span className="hidden sm:inline">Browse Songs</span>
                  <span className="sm:hidden">Browse</span>
                </Button>
              </Link>
              <Link href="/favorites">
                <Button variant="outline" size="sm" className="gap-2 btn-capsule glass-hover" data-testid="button-favorites">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Favorites</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full glass-hover" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/songs">
                <Button variant="outline" size="sm" className="btn-capsule glass-hover">
                  <span className="hidden sm:inline">Browse Songs</span>
                  <span className="sm:hidden">Browse</span>
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="btn-capsule glass-glow" data-testid="button-login">
                  Login
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
