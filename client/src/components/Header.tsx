import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { LogOut, User, Shield } from "lucide-react";

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
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <h1 className="text-2xl font-serif font-bold text-primary cursor-pointer">Drumeoke</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {user.isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="gap-2" data-testid="button-admin">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link href="/songs">
                <Button variant="outline" size="sm" data-testid="button-browse">
                  Browse Songs
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/songs">
                <Button variant="outline" size="sm">Browse Songs</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm" data-testid="button-login">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
