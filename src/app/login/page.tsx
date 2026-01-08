"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserPlus } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function CreateMasterUserPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleCreateMasterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!auth || !firestore) {
        toast({
            variant: "destructive",
            title: "Erro de Inicialização",
            description: "Os serviços do Firebase não estão disponíveis.",
        });
        setIsLoading(false);
        return;
    }

    if (!email.endsWith('@bmv.global')) {
        toast({
            variant: "destructive",
            title: "Domínio Inválido",
            description: "Apenas e-mails com domínio @bmv.global são permitidos.",
        });
        setIsLoading(false);
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        if (firebaseUser) {
            const userDocRef = doc(firestore, "users", firebaseUser.uid);
            
            const userData = {
                id: firebaseUser.uid,
                name: name,
                email: firebaseUser.email,
                role: 'admin_master',
            };

            setDocumentNonBlocking(userDocRef, userData, { merge: false });

            toast({
                title: "Usuário Master Criado!",
                description: "Você será redirecionado para o painel.",
            });
            
            router.push('/');
        }
    } catch (error: any) {
        let description = "Ocorreu um erro ao criar o usuário. Tente novamente.";
        if (error.code === 'auth/email-already-in-use') {
            description = "Este e-mail já está em uso. Tente fazer login ou use outro e-mail.";
        } else if (error.code === 'auth/weak-password') {
            description = "A senha é muito fraca. Use pelo menos 6 caracteres.";
        }
        
        toast({
            variant: "destructive",
            title: "Erro na Criação",
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Criar Usuário Master</CardTitle>
          <CardDescription>
            Este é o primeiro acesso. Crie a conta de administrador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateMasterUser} className="space-y-4">
            <Input
              type="text"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
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
              placeholder="Crie uma senha forte"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-center"
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar Administrador'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-8 text-center max-w-sm">
        Esta tela é para a configuração inicial do administrador do sistema. Após a criação, o acesso será feito pela tela de login padrão.
      </p>
    </div>
  );
}
