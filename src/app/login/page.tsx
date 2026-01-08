"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { KeyRound } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { signIn } from '@/firebase/non-blocking-login';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!auth || !firestore) {
        toast({
            variant: "destructive",
            title: "Erro de Configuração",
            description: "Serviços do Firebase não estão disponíveis.",
        });
        setIsLoading(false);
        return;
    }

    try {
        const loggedInUser = await signIn(auth, firestore, email, token);
        if (loggedInUser) {
            toast({
                title: "Login bem-sucedido!",
                description: "Redirecionando para o dossiê.",
            });
            router.push('/');
        } else {
            toast({
                variant: "destructive",
                title: "Falha no Login",
                description: "E-mail ou token de acesso inválido. Por favor, verifique seus dados.",
            });
        }
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Erro inesperado",
            description: error.message || "Ocorreu um erro durante o login. Tente novamente.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  if (isUserLoading || user) {
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
            <KeyRound className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Acesso ao Dossiê</CardTitle>
          <CardDescription>
            Use seu e-mail e token de acesso para entrar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="seu-email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
            <Input
              type="text"
              placeholder="Seu token de acesso"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Entrar com Token'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-8 text-center max-w-sm">
        Este é um sistema restrito. O acesso é permitido apenas a usuários autorizados.
      </p>
    </div>
  );
}
