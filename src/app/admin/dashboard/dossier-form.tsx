
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useUser } from '@/firebase';
import { createDossier, type Dossier } from '@/firebase/dossier-service';
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const annexes = [
  { id: 'anexo-1', label: 'Anexo I – Evidências Técnicas e Operacionais' },
  { id: 'anexo-2', label: 'Anexo II – Linha do Tempo de Suporte' },
  { id: 'anexo-3', label: 'Anexo III – Matriz de Risco' },
  { id: 'anexo-4', label: 'Anexo IV – Matriz de Paridade Funcional' },
  { id: 'anexo-5', label: 'Anexo V – Fluxos de Processo' },
];

const formSchema = z.object({
  title: z.string().min(5, "O título do dossiê é obrigatório."),
  recipientEmail: z.string().email("Por favor, insira um e-mail válido para o destinatário."),
  includedAnnexes: z.array(z.string()).refine(value => value.some(item => item), {
    message: "Você deve selecionar pelo menos um anexo.",
  }),
});

type DossierFormValues = z.infer<typeof formSchema>;

interface DossierFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DossierForm({ isOpen, onOpenChange }: DossierFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<DossierFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Dossiê de Avaliação do Sistema BMV 2025',
      recipientEmail: '',
      includedAnnexes: annexes.map(a => a.id),
    },
  });

  const onSubmit = async (data: DossierFormValues) => {
    if (!firestore || !user?.email) {
      toast({ variant: "destructive", title: "Erro", description: "Serviços indisponíveis ou usuário não autenticado." });
      return;
    }

    setIsSaving(true);

    try {
      const dossierData: Omit<Dossier, 'id' | 'createdAt'> = {
        ...data,
        generatedBy: user.email,
      };
      await createDossier(firestore, dossierData);
      toast({
        title: "Registro de dossiê criado!",
        description: `Um registro para ${data.recipientEmail} foi salvo.`,
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao registrar dossiê",
        description: error.message || "Não foi possível salvar o registro do dossiê.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
        form.reset({
            title: 'Dossiê de Avaliação do Sistema BMV 2025',
            recipientEmail: '',
            includedAnnexes: annexes.map(a => a.id),
        });
    }
  }, [isOpen, form]);


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerar Novo Dossiê</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para registrar a emissão de um novo dossiê.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Dossiê</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do dossiê" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail do Destinatário</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="destinatario@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="includedAnnexes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Anexos Incluídos</FormLabel>
                  </div>
                  <div className="space-y-2">
                  {annexes.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="includedAnnexes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Registrando...' : 'Registrar Emissão'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
