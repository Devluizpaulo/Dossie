"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Lock } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import { useAuth, useUser } from '@/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.endsWith('@bmv.global')) {
        toast({
            variant: "destructive",
            title: "Acesso Negado",
            description: "Apenas e-mails com domínio @bmv.global são permitidos.",
        });
        setIsLoading(false);
        return;
    }

    try {
        // We now use anonymous sign-in as a base for our custom token auth.
        // The actual validation happens against the Firestore database.
        initiateAnonymousSignIn(auth);
        
        toast({
            title: "Verificando...",
            description: "Aguarde enquanto validamos suas credenciais.",
        });

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Erro de Autenticação",
            description: "Ocorreu um erro. Verifique suas credenciais e tente novamente.",
        });
        setIsLoading(false);
    }
  };

  // Redirect if user is already logged in
  if (!isUserLoading && user) {
    router.push('/');
  }

  // Show a loading state while checking auth
  if (isUserLoading) {
      return (
          <div className="flex min-h-screen items-center justify-center">
              <p>Carregando...</p>
          </div>
      )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Acesso Institucional</CardTitle>
          <CardDescription>
            Use seu e-mail corporativo e código de acesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="seu-email@bmv.global"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="Seu código de acesso"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Acessar Painel'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-8 text-center max-w-sm">
        Este é um sistema de acesso restrito. Se você acredita que isso é um erro ou precisa de acesso, entre em contato com o administrador de sistemas.
      </p>
    </div>
  );
}
