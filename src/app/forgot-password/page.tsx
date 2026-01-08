
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { MailQuestion } from 'lucide-react';
import { Logo } from "@/components/logo";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
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
        await sendPasswordResetEmail(auth, email);
        setIsEmailSent(true);
        toast({
            title: "E-mail enviado!",
            description: "Verifique sua caixa de entrada para o link de redefinição de senha.",
        });
    } catch (error: any) {
        let description = "Ocorreu um erro ao enviar o e-mail. Tente novamente.";
        if (error.code === 'auth/user-not-found') {
            description = "Nenhum usuário encontrado com este e-mail.";
        }
        toast({
            variant: "destructive",
            title: "Falha no Envio",
            description: description,
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center md:justify-end p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/Image/Tech_37.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="z-10 w-full max-w-md md:mr-[8vw]">
        
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
                <MailQuestion className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Recuperar Senha</CardTitle>
              <CardDescription>
                {isEmailSent 
                    ? "Um link para redefinir sua senha foi enviado para seu e-mail."
                    : "Digite seu e-mail para receber um link de redefinição de senha."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
                {isEmailSent ? (
                    <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-md">
                        <p className="text-green-800 dark:text-green-300">Verifique sua caixa de entrada e spam.</p>
                    </div>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <Input
                        type="email"
                        placeholder="seu-email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-center"
                        disabled={isLoading}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                        </Button>
                    </form>
                )}
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
                <Link href="/login">
                    <Button variant="link">Voltar para o Login</Button>
                </Link>
            </CardFooter>
          </Card>
        </motion.div>
        <p className="text-xs text-white/70 mt-8 text-center max-w-sm mx-auto">
          Se você não receber o e-mail em alguns minutos, verifique sua pasta de spam.
        </p>
      </div>
    </div>
  );
}
