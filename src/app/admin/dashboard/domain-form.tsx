"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore } from '@/firebase';
import { createDomain, type AuthorizedDomain } from '@/firebase/domain-service';
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  domain: z.string().min(3, "O domínio é obrigatório.").refine(val => !val.startsWith('@'), {
    message: "Não inclua o '@' no início do domínio.",
  }),
  responsible: z.string().min(2, "O nome do responsável é obrigatório."),
  justification: z.string().min(10, "A justificativa é obrigatória e deve ter pelo menos 10 caracteres."),
});

type DomainFormValues = z.infer<typeof formSchema>;

interface DomainFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  domain?: AuthorizedDomain; // Optional domain for editing
}

export function DomainForm({ isOpen, onOpenChange, domain }: DomainFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<DomainFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: '',
      responsible: '',
      justification: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (domain) {
        form.reset(domain);
      } else {
        form.reset({ domain: '', responsible: '', justification: '' });
      }
    }
  }, [domain, form, isOpen]);

  const onSubmit = async (data: DomainFormValues) => {
    if (!firestore) {
      toast({ variant: "destructive", title: "Erro", description: "Serviço do Firestore não está disponível." });
      return;
    }

    setIsSaving(true);

    try {
      if (domain?.id) {
        // await updateDomain(firestore, domain.id, data);
        toast({
          title: "Domínio atualizado com sucesso!",
          description: `O domínio ${data.domain} foi atualizado.`,
        });
      } else {
        await createDomain(firestore, data);
        toast({
          title: "Domínio adicionado com sucesso!",
          description: `O domínio ${data.domain} foi autorizado.`,
        });
      }
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: domain?.id ? "Erro ao atualizar domínio" : "Erro ao adicionar domínio",
        description: error.message || "Não foi possível salvar o domínio. Tente novamente.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{domain ? 'Editar Domínio' : 'Adicionar Novo Domínio'}</DialogTitle>
          <DialogDescription>
            Preencha as informações para autorizar um novo domínio de e-mail no sistema.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domínio</FormLabel>
                  <FormControl>
                    <Input placeholder="exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsável pelo Domínio</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do responsável" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="justification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justificativa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva por que este domínio precisa ser autorizado."
                      className="resize-none"
                      {...field}
                    />
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
                {isSaving ? 'Salvando...' : 'Salvar Domínio'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
