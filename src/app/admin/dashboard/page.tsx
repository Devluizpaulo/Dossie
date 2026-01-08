
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useAuth, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Globe, KeyRound, ListChecks, FileText, LogOut, PlusCircle, MoreHorizontal, Edit, Trash2, Ban, Laptop, Smartphone } from 'lucide-react';
import { UserForm } from '@/app/admin/dashboard/user-form';
import { DomainForm } from '@/app/admin/dashboard/domain-form';
import type { User as FirestoreUser } from '@/firebase/user-service';
import type { AuthorizedDomain } from '@/firebase/domain-service';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';


type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated' | 'forbidden';

export default function AdminDashboardPage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const firestore = useFirestore();
    const router = useRouter();
    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [isDomainFormOpen, setIsDomainFormOpen] = useState(false);

    const usersQuery = useMemoFirebase(() => {
        if (!firestore || authStatus !== 'authenticated') return null;
        return query(collection(firestore, 'users'), orderBy('name'));
    }, [firestore, authStatus]);
    const { data: users, isLoading: usersLoading } = useCollection<FirestoreUser>(usersQuery);
    
    const domainsQuery = useMemoFirebase(() => {
        if (!firestore || authStatus !== 'authenticated') return null;
        return query(collection(firestore, 'authorizedDomains'), orderBy('createdAt', 'desc'));
    }, [firestore, authStatus]);
    const { data: domains, isLoading: domainsLoading } = useCollection<AuthorizedDomain>(domainsQuery);

    useEffect(() => {
        if (isUserLoading) {
            setAuthStatus('loading');
            return;
        }

        if (!user) {
            setAuthStatus('unauthenticated');
            router.push('/admin');
            return;
        }
        
        setAuthStatus('authenticated');
        
    }, [user, isUserLoading, router]);

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
        }
        router.push('/admin');
    };

    const getUserInitials = (name: string | null | undefined) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    }
    
    const formatTimestamp = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate();
        return format(date, "dd/MM/yyyy 'às' HH:mm");
    };

    const formatLastActivity = (date: Date) => {
        return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    }


    if (authStatus !== 'authenticated') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Verificando permissões...</p>
            </div>
        );
    }
    
    // User is authenticated as admin_master, render the dashboard
    return (
        <>
            <UserForm 
                isOpen={isUserFormOpen} 
                onOpenChange={setIsUserFormOpen} 
            />
            <DomainForm
                isOpen={isDomainFormOpen}
                onOpenChange={setIsDomainFormOpen}
            />
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
                                                {user && user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'Admin'} />}
                                                <AvatarFallback>{getUserInitials(user?.displayName)}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user?.displayName || 'Admin Master'}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user?.email}
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
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle>Gestão de Usuários</CardTitle>
                                            <Button onClick={() => setIsUserFormOpen(true)}>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Criar Novo Usuário
                                            </Button>
                                        </div>
                                        <CardDescription className="mb-6">
                                            Adicione, gerencie e visualize todos os usuários com acesso ao dossiê.
                                        </CardDescription>

                                        {usersLoading && <p>Carregando usuários...</p>}

                                        {!usersLoading && (!users || users.length === 0) && (
                                            <div className="text-center py-10 border-2 border-dashed rounded-lg">
                                                <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
                                                <p className="text-sm text-muted-foreground mt-2">Comece criando um novo usuário para visualizar aqui.</p>
                                            </div>
                                        )}
                                        
                                        {!usersLoading && users && users.length > 0 && (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Usuário</TableHead>
                                                        <TableHead className="hidden sm:table-cell">Telefone</TableHead>
                                                        <TableHead>Função</TableHead>
                                                        <TableHead><span className="sr-only">Ações</span></TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {users.map((u) => (
                                                        <TableRow key={u.id}>
                                                            <TableCell>
                                                                <div className="flex items-center gap-3">
                                                                    <Avatar>
                                                                        <AvatarFallback>{getUserInitials(u.name)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="font-medium">{u.name}</div>
                                                                        <div className="text-sm text-muted-foreground">{u.email}</div>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">{u.phone || 'Não informado'}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={u.role === 'admin_master' ? 'destructive' : 'secondary'}>
                                                                    {u.role === 'admin_master' ? 'Admin Master' : 'Usuário'}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                            <span className="sr-only">Alternar menu</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                                        <DropdownMenuItem>
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Editar
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="text-destructive">
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Excluir
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="domains">
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle>Gestão de Domínios Autorizados</CardTitle>
                                            <Button onClick={() => setIsDomainFormOpen(true)}>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Adicionar Domínio
                                            </Button>
                                        </div>
                                        <CardDescription className="mb-6">
                                            Cadastre, ative e desative domínios de e-mail permitidos no sistema, com registro de auditoria completo para cada alteração. O domínio `@bmv.global` é permitido por padrão.
                                        </CardDescription>

                                        {domainsLoading && <p>Carregando domínios...</p>}

                                        {!domainsLoading && (!domains || domains.length === 0) && (
                                            <div className="text-center py-10 border-2 border-dashed rounded-lg">
                                                <p className="text-muted-foreground">Nenhum domínio autorizado encontrado.</p>
                                                <p className="text-sm text-muted-foreground mt-2">Comece adicionando um novo domínio para visualizá-lo aqui.</p>
                                            </div>
                                        )}

                                        {!domainsLoading && domains && domains.length > 0 && (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Domínio</TableHead>
                                                        <TableHead>Responsável</TableHead>
                                                        <TableHead className="hidden md:table-cell">Justificativa</TableHead>
                                                        <TableHead className="hidden sm:table-cell">Data de Criação</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead><span className="sr-only">Ações</span></TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {domains.map((domain) => (
                                                        <TableRow key={domain.id}>
                                                            <TableCell className="font-medium">{domain.domain}</TableCell>
                                                            <TableCell>{domain.responsible}</TableCell>
                                                            <TableCell className="hidden md:table-cell text-xs text-muted-foreground max-w-xs truncate">{domain.justification}</TableCell>
                                                            <TableCell className="hidden sm:table-cell">{formatTimestamp(domain.createdAt)}</TableCell>
                                                            <TableCell>
                                                                <Badge variant={domain.status === 'active' ? 'default' : 'secondary'}>
                                                                    {domain.status === 'active' ? 'Ativo' : 'Inativo'}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                                                            <MoreHorizontal className="h-4 w-4" />
                                                                            <span className="sr-only">Alternar menu</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                                        <DropdownMenuItem>
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Editar
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="text-destructive">
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Desativar
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="sessions">
                                        <CardTitle className="mb-4">Controle de Sessões e Tokens</CardTitle>
                                        <CardDescription className="mb-6">
                                            Visualize sessões ativas, seus tempos de expiração e revogue-as manualmente para forçar o logout de usuários.
                                        </CardDescription>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Usuário</TableHead>
                                                    <TableHead>Dispositivo / IP</TableHead>
                                                    <TableHead>Última Atividade</TableHead>
                                                    <TableHead>Expira em</TableHead>
                                                    <TableHead><span className="sr-only">Ações</span></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                            {!usersLoading && users && users.map((u, index) => (
                                                    <TableRow key={u.id}>
                                                        <TableCell>
                                                            <div className="font-medium">{u.name}</div>
                                                            <div className="text-sm text-muted-foreground">{u.email}</div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                {index % 2 === 0 ? <Laptop className="h-4 w-4 text-muted-foreground" /> : <Smartphone className="h-4 w-4 text-muted-foreground" />}
                                                                <div>
                                                                    <div>{index % 2 === 0 ? 'Desktop' : 'Smartphone'}</div>
                                                                    <div className="text-xs text-muted-foreground">Não disponível</div>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>Não disponível</TableCell>
                                                        <TableCell>Não disponível</TableCell>
                                                        <TableCell>
                                                            <Button variant="destructive" size="sm">
                                                                <Ban className="mr-2 h-4 w-4" />
                                                                Revogar
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
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
        </>
    );
}


    
    
    