
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LogIn } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { AdminCreationForm } from './admin-creation-form';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists() && docSnap.data().role === 'admin_master') {
          router.push('/admin/dashboard');
        }
      });
    }
  }, [user, isUserLoading, router, firestore]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!auth || !firestore) {
      toast({
        variant: "destructive",
        title: "Erro de Configuração",
        description: "O serviço de autenticação ou Firestore não está disponível.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(firestore, 'users', userCredential.user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists() && docSnap.data().role === 'admin_master') {
        router.push('/admin/dashboard');
      } else {
        await auth.signOut();
        toast({
          variant: "destructive",
          title: "Acesso Negado",
          description: "Você não tem permissão de administrador.",
        });
      }
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
      <AdminCreationForm 
          isOpen={isAdminFormOpen} 
          onOpenChange={setIsAdminFormOpen} 
      />
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
                        {isLoading ? 'Verificando...' : 'Entrar'}
                    </Button>
                </form>
                </CardContent>
            </Card>
            </motion.div>
            <p className="text-xs text-white/70 mt-8 text-center max-w-sm mx-auto">
            Este é um ponto de acesso restrito. Todas as atividades são monitoradas.
            </p>
        </div>
      </div>
    </>
  );
}
