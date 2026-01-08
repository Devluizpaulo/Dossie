"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Users, Globe, KeyRound, ListChecks, FileText, LogOut, CircleUser } from 'lucide-react';
import { IdTokenResult } from 'firebase/auth';

export default function AdminDashboardPage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();
    const [claims, setClaims] = useState<IdTokenResult['claims'] | null>(null);
    const [isLoadingClaims, setIsLoadingClaims] = useState(true);

    useEffect(() => {
        if (isUserLoading) return;
        if (!user) {
            router.push('/admin');
            return;
        }

        user.getIdTokenResult(true) // Force refresh to get latest claims
            .then((idTokenResult) => {
                setClaims(idTokenResult.claims);
                 if (idTokenResult.claims.role !== 'admin_master') {
                    router.push('/');
                }
                setIsLoadingClaims(false);
            })
            .catch(() => {
                // Error fetching claims, deny access
                setIsLoadingClaims(false);
                router.push('/');
            });

    }, [user, isUserLoading, router]);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/admin');
    };

    const getUserInitials = (email: string | null | undefined) => {
        if (!email) return '?';
        return email.charAt(0).toUpperCase();
    }


    if (isUserLoading || isLoadingClaims) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Verificando permissões...</p>
            </div>
        );
    }
    
    if (!user || claims?.role !== 'admin_master') {
       return (
         <div className="flex min-h-screen items-center justify-center">
            <p>Acesso negado. Redirecionando...</p>
        </div>
       );
    }


    return (
        <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <Card className="flex items-center justify-between p-4">
                        <div>
                            <CardTitle className="text-2xl flex items-center gap-3">
                                <Shield className="h-7 w-7 text-primary" />
                                Painel Administrativo Master
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Central de governança, auditoria e controle do sistema.
                            </CardDescription>
                        </div>
                        <div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'Admin'} />}
                                            <AvatarFallback>{getUserInitials(user.email)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">Admin Master</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sair</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </Card>
                </header>

                <main>
                    <Tabs defaultValue="users" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                            <TabsTrigger value="users"><Users className="mr-2" /> Usuários</TabsTrigger>
                            <TabsTrigger value="domains"><Globe className="mr-2" /> Domínios</TabsTrigger>
                            <TabsTrigger value="sessions"><KeyRound className="mr-2" /> Sessões</TabsTrigger>
                            <TabsTrigger value="logs"><ListChecks className="mr-2" /> Auditoria</TabsTrigger>
                            <TabsTrigger value="dossiers"><FileText className="mr-2" /> Dossiês</TabsTrigger>
                        </TabsList>
                        
                        <Card className="mt-4">
                            <CardContent className="pt-6">
                                <TabsContent value="users">
                                    <CardTitle className="mb-4">Gestão de Usuários Autenticados</CardTitle>
                                    <p className="text-muted-foreground">
                                        Módulo para visualizar, revogar e gerenciar todos os usuários que acessaram o sistema. A implementação incluirá uma tabela com dados de usuários, status e ações administrativas.
                                    </p>
                                </TabsContent>
                                <TabsContent value="domains">
                                    <CardTitle className="mb-4">Gestão de Domínios Autorizados (Whitelist)</CardTitle>
                                    <p className="text-muted-foreground">
                                        Funcionalidade para cadastrar, ativar e desativar domínios de e-mail permitidos no sistema, com registro de auditoria completo para cada alteração.
                                    </p>
                                </TabsContent>
                                <TabsContent value="sessions">
                                     <CardTitle className="mb-4">Controle de Sessões e Tokens</CardTitle>
                                     <p className="text-muted-foreground">
                                        Painel para visualizar sessões ativas, tokens emitidos, seus tempos de expiração e a capacidade de revogá-los manualmente para forçar o logout de usuários.
                                    </p>
                                </TabsContent>
                                <TabsContent value="logs">
                                     <CardTitle className="mb-4">Auditoria e Logs</CardTitle>
                                     <p className="text-muted-foreground">
                                        Módulo de auditoria com filtros avançados para rastrear todas as ações críticas no sistema. Os logs serão imutáveis e exportáveis.
                                    </p>
                                </TabsContent>
                                <TabsContent value="dossiers">
                                    <CardTitle className="mb-4">Emissão de Dossiês e Anexos</CardTitle>
                                    <p className="text-muted-foreground">
                                        Funcionalidades para gerar dossiês institucionais personalizados, selecionando anexos, aplicando templates e registrando cada emissão.
                                    </p>
                                </TabsContent>
                            </CardContent>
                        </Card>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}
