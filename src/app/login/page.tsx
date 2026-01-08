
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { KeyRound } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!auth) {
        toast({
            variant: "destructive",
            title: "Erro de Configuração",
            description: "Serviços do Firebase não estão disponíveis.",
        });
        setIsLoading(false);
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
            title: "Login bem-sucedido!",
            description: "Redirecionando para o dossiê.",
        });
        router.push('/');
    } catch (error: any) {
        let description = "Ocorreu um erro inesperado. Tente novamente.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            description = "E-mail ou senha inválidos. Por favor, verifique seus dados."
        }
        toast({
            variant: "destructive",
            title: "Falha no Login",
            description: description,
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
    <div 
      className="flex min-h-screen flex-col items-center justify-center md:items-end p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/Image/Tech_37.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="z-10 w-full max-w-md md:mr-[4vw]">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <Card className="w-full text-center">
          <CardHeader>
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 flex justify-center"
              >
                <Logo />
            </motion.div>
            <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
              <KeyRound className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">Acesso ao Dossiê</CardTitle>
            <CardDescription>
              Use seu e-mail e senha para entrar.
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
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-center"
                disabled={isLoading}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verificando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
              <Link href="/forgot-password">
                  <Button variant="link">Esqueceu sua senha?</Button>
              </Link>
          </CardFooter>
        </Card>
        </motion.div>
        <p className="text-xs text-white/70 mt-8 text-center max-w-sm mx-auto">
          Este é um sistema restrito. O acesso é permitido apenas a usuários autorizados.
        </p>
      </div>
    </div>
  );
}
