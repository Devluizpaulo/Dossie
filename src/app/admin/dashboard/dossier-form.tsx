
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { FileText } from 'lucide-react';

const annexes = [
  { id: 'anexo-1', label: 'Anexo I – Evidências Técnicas' },
  { id: 'anexo-2', label: 'Anexo II – Linha do Tempo' },
  { id: 'anexo-3', label: 'Anexo III – Matriz de Risco' },
  { id: 'anexo-4', label: 'Anexo IV – Paridade Funcional' },
  { id: 'anexo-5', label: 'Anexo V – Fluxos de Processo' },
];

const formSchema = z.object({
  title: z.string().min(5, "O título é obrigatório e deve ter pelo menos 5 caracteres."),
  recipientEmail: z.string().email("Por favor, insira um e-mail válido para o destinatário."),
  includedAnnexes: z.array(z.string()).refine((value) => value.some((item) => item), {
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

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = async (data: DossierFormValues) => {
    if (!firestore || !user?.email) {
      toast({ variant: "destructive", title: "Erro", description: "Serviços do Firebase ou informações do usuário não estão disponíveis." });
      return;
    }

    setIsSaving(true);
    
    const dossierData: Omit<Dossier, 'id' | 'createdAt'> = {
        ...data,
        generatedBy: user.email,
    };

    try {
      await createDossier(firestore, dossierData);
      toast({
        title: "Dossiê gerado com sucesso!",
        description: `Um registro da emissão para ${data.recipientEmail} foi criado.`,
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar dossiê",
        description: error.message || "Não foi possível registrar a emissão do dossiê.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Gerar Novo Dossiê</DialogTitle>
          <DialogDescription>
            Preencha as informações para registrar a emissão de um novo dossiê.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input type="email" placeholder="destinatario@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Para quem este dossiê está sendo emitido.
                  </FormDescription>
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
                    <FormDescription>
                      Selecione os anexos que farão parte deste dossiê.
                    </FormDescription>
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
                              className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 transition-colors"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                               <FormLabel className="font-normal w-full cursor-pointer flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
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
                {isSaving ? 'Gerando...' : 'Gerar e Registrar Dossiê'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
