
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestore, useUser } from '@/firebase';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Calendar, RefreshCw, Plus, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    dataRegistro: z.string().min(1, "Data de registro é obrigatória."),
    plataformaDestino: z.string().min(1, "Plataforma de destino é obrigatória."),
    produtorCpfCnpj: z.string().min(1, "CPF/CNPJ do produtor é obrigatório."),
    nomeProdutor: z.string().min(1, "Nome do produtor é obrigatório."),
    fazenda: z.string().min(1, "Fazenda é obrigatória."),
    quantidadeUcs: z.string().min(1, "Quantidade de UCS é obrigatória."),
    isin: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    mensagem: z.string().optional(),
});

type SafraFormValues = z.infer<typeof formSchema>;

interface SafraFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function SafraForm({ isOpen, onOpenChange }: SafraFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();
  const { user } = useUser();

  const form = useForm<SafraFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataRegistro: "13-01-2026",
      plataformaDestino: "Plataforma Mateus",
      produtorCpfCnpj: "Marco Antônio de Melo Melo (348.5...)",
      nomeProdutor: "Marco Antônio de Melo Melo",
      fazenda: "Fazenda Floresta Amazônica...",
      quantidadeUcs: "10.000",
      isin: "BRBMTCPR0190",
      latitude: "-9,80694682163762",
      longitude: "-52,080135208799",
      mensagem: "ex. operação referente a área ABC"
    },
  });

  const onSubmit = async (data: SafraFormValues) => {
    if (!firestore || !user?.email) {
      toast({ variant: "destructive", title: "Erro", description: "Serviços indisponíveis." });
      return;
    }
    setIsSaving(true);
    try {
      // Logic to save the new crop will go here
      console.log(data);
      toast({
        title: "Safra criada com sucesso!",
        description: `A safra de ${data.quantidadeUcs} UCS para ${data.nomeProdutor} foi registrada.`,
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar safra",
        description: error.message || "Não foi possível registrar a nova safra.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Nova Safra 2026</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Form */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="dataRegistro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Registro *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="plataformaDestino"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plataforma de Destino *</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a plataforma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Plataforma Mateus">Plataforma Mateus</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="produtorCpfCnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cpf/Cnpj Produtor *</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o produtor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Marco Antônio de Melo Melo (348.5...)">Marco Antônio de Melo Melo (348.5...)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="nomeProdutor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Produtor *</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-muted" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fazenda"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fazenda *</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a fazenda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fazenda Floresta Amazônica...">Fazenda Floresta Amazônica...</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="quantidadeUcs"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Quantidade de UCS *</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="isin"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>ISIN *</FormLabel>
                            <FormControl>
                                <Input {...field} readOnly className="bg-muted"/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Latitude *</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Longitude *</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
                <FormField
                  control={form.control}
                  name="mensagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem (opcional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column: Particionamento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Particionamento</h3>
                <div className="grid grid-cols-2 gap-2">
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Selecione o perfil" /></SelectTrigger>
                        <SelectContent><SelectItem value="produtor">Produtor</SelectItem></SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger><SelectValue placeholder="Selecione o usuário" /></SelectTrigger>
                        <SelectContent><SelectItem value="user1">Usuário 1</SelectItem></SelectContent>
                    </Select>
                </div>
                 <Button variant="outline" size="icon" className="ml-auto">
                    <Plus className="h-4 w-4" />
                </Button>

                <div className="space-y-3 rounded-lg border p-4">
                    {/* Produtor */}
                    <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 text-sm">
                        <div className="flex flex-col">
                            <span className="font-medium">Marco Antônio de MeloMelo</span>
                            <span className="text-xs text-muted-foreground">Produtor</span>
                        </div>
                        <Input value="3.334" className="w-20 text-right"/>
                        <span>ucs</span>
                        <Input value="33,34" className="w-16 text-right"/>
                        <span>%</span>
                    </div>
                     <div className="w-full h-2 bg-blue-600 rounded-full" />
                     {/* Associação */}
                     <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 text-sm">
                        <div className="flex flex-col">
                            <span className="font-medium">ASSOCIAÇÃO DE PRODUTORES RURAIS...</span>
                             <span className="text-xs text-muted-foreground">Associação</span>
                        </div>
                        <Input value="3.333" className="w-20 text-right"/>
                        <span>ucs</span>
                        <Input value="33,33" className="w-16 text-right"/>
                        <span>%</span>
                    </div>
                     <div className="w-full h-2 bg-blue-600 rounded-full" />
                    {/* IMEI */}
                     <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 text-sm">
                        <div className="flex flex-col">
                            <span className="font-medium">IMEIIMEI CONSULTORIA</span>
                             <span className="text-xs text-muted-foreground">IMEI</span>
                        </div>
                        <Input value="3.333" className="w-20 text-right"/>
                        <span>ucs</span>
                        <Input value="33,33" className="w-16 text-right"/>
                        <span>%</span>
                    </div>
                     <div className="w-full h-2 bg-blue-600 rounded-full" />
                </div>
                 <Button variant="outline" className="w-full gap-2">
                    <RefreshCw className="h-4 w-4"/>
                    Rebalancear particionamento
                </Button>
                <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <div className="text-center">
                        <Leaf className="h-6 w-6 mx-auto text-primary"/>
                        <p className="font-bold text-xl">10.000</p>
                        <p className="text-xs text-muted-foreground">UCS do ano</p>
                    </div>
                     <div className="text-center">
                        <Calendar className="h-6 w-6 mx-auto text-primary"/>
                        <p className="font-bold text-xl">2026</p>
                        <p className="text-xs text-muted-foreground">Ano da Safra</p>
                    </div>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-8">
                <Button type="button" variant="outline" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                    Pré-visualizar Particionamento
                </Button>
                <div className="flex-grow" />
               <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
