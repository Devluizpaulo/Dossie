"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword, IdTokenResult } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LogIn, UserPlus } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { UserForm } from '@/app/admin/dashboard/user-form';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

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

    if (!auth) {
      toast({
        variant: "destructive",
        title: "Erro de Configuração",
        description: "O serviço de autenticação não está disponível.",
      });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // A verificação no useEffect cuidará do redirecionamento
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
    <>
      <UserForm 
          isOpen={isUserFormOpen} 
          onOpenChange={setIsUserFormOpen} 
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Logo />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
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
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" type="button" onClick={() => setIsUserFormOpen(true)} disabled={isLoading}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Cadastrar Admin
                    </Button>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Verificando...' : 'Entrar'}
                    </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        <p className="text-xs text-muted-foreground mt-8 text-center max-w-sm">
          Este é um ponto de acesso restrito. Todas as atividades são monitoradas.
        </p>
      </div>
    </>
  );
}
