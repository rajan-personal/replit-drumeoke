import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Music2, Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({ title: "Logged in successfully!" });
      setLocation("/songs");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full glass-clear flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <Music2 className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to continue drumming</p>
          </div>
        </div>

        <Card className="glass-card border border-border/10 shadow-2xl rounded-3xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-8 pb-6 px-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 rounded-full glass-input border-border/20 text-base"
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 rounded-full glass-input border-border/20 text-base"
                    data-testid="input-password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 pb-8 px-8">
              <Button 
                type="submit" 
                size="lg"
                className="w-full btn-capsule glass-glow text-base font-semibold" 
                disabled={isLoading} 
                data-testid="button-login"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary font-semibold hover:opacity-80 transition-opacity" data-testid="link-signup">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
