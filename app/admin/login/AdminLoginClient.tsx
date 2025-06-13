'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginClient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(from);
    }
  }, [status, router, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(from);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-clr-primary" />
      </div>
    );
  }

  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-clr-surface-1 border border-clr-highlight/10 shadow-card-luxe">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-36 h-12">
              <Image
                src="/images/LargeSideLogo.png"
                alt="Aoniqq Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 144px, 144px"
                priority
              />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-clr-text-high">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-clr-primary-dark/30 border border-clr-primary-dark/50 text-clr-text-low px-4 py-2 rounded-md flex items-center mb-4">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-clr-text-low">Username</Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-clr-surface-0 border-clr-highlight/20 text-clr-text-high placeholder-clr-text-low/50"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-clr-surface-0 border-clr-highlight/20 text-clr-text-high placeholder-clr-text-low/50"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-clr-primary hover:bg-clr-primary-light text-clr-text-high"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}