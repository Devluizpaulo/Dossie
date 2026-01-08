"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword, IdTokenResult } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LogIn } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [claims, setClaims] = useState<IdTokenResult['claims'] | null>(null);

  useEffect(() => {
    if (!isUserLoading && user) {
        user.getIdTokenResult().then(idTokenResult => {
            if (idTokenResult.claims.role === 'admin_master') {
                router.push('/admin/dashboard');
            }
        });
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login de Administrador bem-sucedido!",
        description: "Você será redirecionado para o painel de controle.",
      });
      // O useEffect cuidará do redirecionamento
    } catch (error: any) {
      let description = "Ocorreu um erro ao fazer login. Verifique suas credenciais.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        description = "E-mail ou senha de administrador inválidos.";
      }
      
      toast({
        variant: "destructive",
        title: "Erro no Login",
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <LogIn className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Acesso Administrativo</CardTitle>
          <CardDescription>
            Entre com suas credenciais de Administrador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="admin@bmv.global"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="Sua senha de administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Verificando...' : 'Entrar como Administrador'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-8 text-center max-w-sm">
        Este é um ponto de acesso restrito. Todas as atividades são monitoradas.
      </p>
    </div>
  );
}
