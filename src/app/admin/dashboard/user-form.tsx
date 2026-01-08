
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore } from '@/firebase';
import { createUser, updateUser, type User } from '@/firebase/user-service';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Copy, Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório."),
  email: z.string().email("Por favor, insira um e-mail válido."),
  phone: z.string().optional(),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user?: User; // Optional user for editing
}

export function UserForm({ isOpen, onOpenChange, user }: UserFormProps) {
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
        if (user) {
            form.reset({
              ...user,
              phone: user.phone?.replace('+55', '') || '',
            });
            setGeneratedToken(user.accessCode || null);
        } else {
            form.reset({ name: '', email: '', phone: '' });
            setGeneratedToken(null);
        }
    }
  }, [user, form, isOpen]);


  const generateStrongToken = (length = 12) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  const handleGenerateToken = () => {
    const token = generateStrongToken();
    setGeneratedToken(token);
    toast({
      title: "Token Gerado!",
      description: `O novo token é: ${token}`,
    });
  };

  const copyTokenToClipboard = () => {
    if (!generatedToken) return;
    navigator.clipboard.writeText(generatedToken).then(() => {
        toast({
            title: "Token copiado para a área de transferência!",
        });
    });
  };

  const handleSendWhatsApp = () => {
    const name = form.getValues('name');
    const email = form.getValues('email');
    const phoneValue = form.getValues('phone');
    
    if (!phoneValue || !generatedToken) {
        toast({
            variant: "destructive",
            title: "Faltam informações",
            description: "É necessário um telefone e um token gerado para enviar a mensagem.",
        });
        return;
    }
    
    const fullPhone = `+55${phoneValue}`;
    const message = `Olá, ${name}! 👋\n\nVocê recebeu um convite para acessar o Dossiê BMV. Use as informações abaixo para fazer o login:\n\n*E-mail:* ${email}\n*Token de Acesso:* *${generatedToken}*\n\n_Acesse pelo link: [URL do Dossiê]_`;
    const whatsappUrl = `https://wa.me/${fullPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const onSubmit = async (data: UserFormValues) => {
    if (!firestore) {
        toast({ variant: "destructive", title: "Erro", description: "Serviço do Firestore não está disponível." });
        return;
    }
    if (!generatedToken) {
      toast({
        variant: "destructive",
        title: "Token não gerado",
        description: "Você precisa gerar um token antes de salvar o usuário.",
      });
      return;
    }

    setIsSaving(true);
    
    const userRole = data.email === 'luizpaulo.jesus@bmv.global' ? 'admin_master' : 'user';

    const userData: Omit<User, 'id' | 'status'> = {
        ...data,
        phone: data.phone ? `+55${data.phone}` : undefined,
        role: userRole,
        accessCode: generatedToken,
    };

    try {
        if (user?.id) {
            await updateUser(firestore, user.id, userData);
            toast({
                title: "Usuário atualizado com sucesso!",
                description: `${data.name} foi atualizado.`,
            });
        } else {
            await createUser(firestore, userData);
            toast({
                title: "Usuário criado com sucesso!",
                description: `${data.name} foi adicionado à lista de usuários.`,
            });
        }
        
        onOpenChange(false);

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: user?.id ? "Erro ao atualizar usuário" : "Erro ao criar usuário",
            description: error.message || "Não foi possível salvar o usuário. Tente novamente.",
        });
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Editar Usuário' : 'Criar Novo Usuário'}</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para criar ou editar um usuário comum.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                        <span className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-muted-foreground text-sm">
                            +55
                        </span>
                        <Input 
                            placeholder="11999998888" 
                            {...field}
                            className="rounded-l-none" 
                        />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
                <FormLabel>Token de Acesso</FormLabel>
                <div className="flex gap-2">
                    <Input 
                        value={generatedToken || 'Clique em "Gerar Token"'} 
                        readOnly 
                        className="font-mono"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={copyTokenToClipboard} disabled={!generatedToken}>
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleGenerateToken} className="gap-2">
                        <Wand2 className="h-4 w-4" />
                        Gerar
                    </Button>
                </div>
            </div>

            <DialogFooter className="pt-4">
                <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleSendWhatsApp}
                    disabled={!generatedToken || !form.getValues('phone')}
                    className="gap-2"
                >
                    <Send className="h-4 w-4" />
                    Encaminhar via WhatsApp
                </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Salvando...' : 'Salvar Usuário'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
