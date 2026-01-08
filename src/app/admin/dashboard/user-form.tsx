
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useAuth } from '@/firebase';
import { createUser, updateUser, type User } from '@/firebase/user-service';
import { WhatsappLogo } from '@/components/whatsapp-logo';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Copy, Send } from 'lucide-react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório."),
  email: z.string().email("Por favor, insira um e-mail válido."),
  phone: z.string().optional(),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.").optional(),
}).refine(data => {
    // Make password required only when creating a new user (when user.id is not present)
    if (!('id' in data)) {
        return !!data.password;
    }
    return true;
}, {
    message: "A senha é obrigatória para novos usuários.",
    path: ["password"],
});


type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user?: User; 
}

export function UserForm({ isOpen, onOpenChange, user }: UserFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newUserCredentials, setNewUserCredentials] = useState<{email: string, password: string, phone?: string} | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();
  const auth = useAuth();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
        if (user) {
            form.reset({
              ...user,
              phone: user.phone?.replace('+55', '') || '',
              password: '', // Clear password field for editing
            });
        } else {
            form.reset({ name: '', email: '', phone: '', password: '' });
        }
    }
  }, [user, form, isOpen]);


  const onSubmit = async (data: UserFormValues) => {
    if (!firestore || !auth) {
        toast({ variant: "destructive", title: "Erro", description: "Serviços do Firebase não estão disponíveis." });
        return;
    }
    
    setIsSaving(true);

    try {
        if (user?.id) {
            // Update existing user logic
            await updateUser(auth, firestore, user.id, data);
            toast({
                title: "Usuário atualizado com sucesso!",
                description: `${data.name} foi atualizado.`,
            });
            onOpenChange(false);
        } else {
             if (!data.password) {
                toast({ variant: "destructive", title: "Erro", description: "Senha é obrigatória para novos usuários." });
                setIsSaving(false);
                return;
            }
            // Create new user logic
            const newUserData = { ...data, password: data.password };
            await createUser(auth, firestore, newUserData);
            setNewUserCredentials({ email: data.email, password: data.password, phone: data.phone });
            setShowSuccessDialog(true);
            toast({
                title: "Usuário criado com sucesso!",
                description: `${data.name} foi adicionado à lista de usuários.`,
            });
            onOpenChange(false); // Close the creation form
        }
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

  const handleCopyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
        toast({
            title: `${fieldName} copiado para a área de transferência!`,
        });
    });
  };

  const handleSendWhatsApp = () => {
    if (!newUserCredentials) return;

    const { email, password, phone } = newUserCredentials;
    if (!phone) {
        toast({
            variant: "destructive",
            title: "Telefone não informado",
            description: "Adicione um telefone ao usuário para enviar via WhatsApp.",
        });
        return;
    }
    
    const fullPhone = `+55${phone.replace(/\D/g, '')}`;
    const message = `Olá! 👋\n\nVocê foi convidado para acessar o Dossiê BMV. Use as credenciais abaixo para fazer o login:\n\n*E-mail:* ${email}\n*Senha:* *${password}*\n\nAcesse pelo link: https://bmv-lac.vercel.app/login`;
    const whatsappUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{user ? 'Editar Usuário' : 'Criar Novo Usuário'}</DialogTitle>
            <DialogDescription>
              Preencha as informações para gerenciar um usuário.
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
                      <Input type="email" placeholder="email@exemplo.com" {...field} disabled={!!user} />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={user ? "Deixe em branco para manter a atual" : "••••••••"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Salvando...' : 'Salvar Usuário'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Usuário Criado com Sucesso!</AlertDialogTitle>
                  <AlertDialogDescription>
                      As credenciais abaixo foram geradas. Você pode copiá-las ou enviá-las diretamente via WhatsApp.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-3 my-4">
                <div className="relative">
                    <Label htmlFor="new-user-email" className="text-xs text-muted-foreground">E-mail</Label>
                    <Input id="new-user-email" value={newUserCredentials?.email || ''} readOnly className="pr-10" />
                    <Button variant="ghost" size="icon" className="absolute right-1 bottom-1 h-8 w-8" onClick={() => handleCopyToClipboard(newUserCredentials?.email || '', 'E-mail')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <div className="relative">
                    <Label htmlFor="new-user-password">Senha</Label>
                    <Input id="new-user-password" value={newUserCredentials?.password || ''} readOnly className="pr-10" />
                    <Button variant="ghost" size="icon" className="absolute right-1 bottom-1 h-8 w-8" onClick={() => handleCopyToClipboard(newUserCredentials?.password || '', 'Senha')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
              </div>
              <AlertDialogFooter>
                  <Button variant="outline" onClick={() => setShowSuccessDialog(false)}>
                      Fechar
                  </Button>
                  <Button onClick={handleSendWhatsApp} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                      <WhatsappLogo className="h-5 w-5" />
                      Enviar Credenciais
                  </Button>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
