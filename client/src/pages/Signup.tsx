import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Music2, Mail, Lock, Check } from "lucide-react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password);
      toast({ title: "Account created successfully!" });
      setLocation("/songs");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account",
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
            <h1 className="text-4xl font-serif font-bold tracking-tight">Create account</h1>
            <p className="text-muted-foreground mt-2">Start your drumming journey today</p>
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
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-12 rounded-full glass-input border-border/20 text-base"
                    data-testid="input-password"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password</Label>
                <div className="relative">
                  <Check className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-12 rounded-full glass-input border-border/20 text-base"
                    data-testid="input-confirm-password"
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
                data-testid="button-signup"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:opacity-80 transition-opacity" data-testid="link-login">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
