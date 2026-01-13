
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useAuth, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Globe, KeyRound, ListChecks, FileText, LogOut, PlusCircle, MoreHorizontal, Edit, Trash2, Ban, Laptop, Smartphone, Filter, FileSpreadsheet, Download, CheckCircle, XCircle, Palette, Printer } from 'lucide-react';
import { UserForm } from '@/app/admin/dashboard/user-form';
import { DomainForm } from '@/app/admin/dashboard/domain-form';
import { DossierForm } from '@/app/admin/dashboard/dossier-form';
import { updateUser, deleteUser, type User as FirestoreUser } from '@/firebase/user-service';
import type { AuthorizedDomain } from '@/firebase/domain-service';
import type { Dossier } from '@/firebase/dossier-service';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';


type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated' | 'forbidden';

export default function AdminDashboardPage() {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();

    const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [isDomainFormOpen, setIsDomainFormOpen] = useState(false);
    const [isDossierFormOpen, setIsDossierFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<FirestoreUser | undefined>(undefined);

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

    const dossiersQuery = useMemoFirebase(() => {
        if (!firestore || authStatus !== 'authenticated') return null;
        return query(collection(firestore, 'dossiers'), orderBy('createdAt', 'desc'));
    }, [firestore, authStatus]);
    const { data: dossiers, isLoading: dossiersLoading } = useCollection<Dossier>(dossiersQuery);

    useEffect(() => {
        if (isUserLoading) {
            setAuthStatus('loading');
            return;
        }

        if (!user || !firestore) {
            setAuthStatus('unauthenticated');
            router.push('/admin');
            return;
        }

        const userDocRef = doc(firestore, 'users', user.uid);
        getDoc(userDocRef).then(docSnap => {
            if (docSnap.exists() && docSnap.data().role === 'admin_master') {
                setAuthStatus('authenticated');
            } else {
                setAuthStatus('forbidden');
                toast({
                    variant: "destructive",
                    title: "Acesso Negado",
                    description: "Você não tem permissão para acessar o painel de administração.",
                });
                if (auth) signOut(auth);
                router.push('/admin');
            }
        }).catch(() => {
            setAuthStatus('forbidden');
            toast({
                variant: "destructive",
                title: "Erro de Permissão",
                description: "Não foi possível verificar suas permissões de acesso.",
            });
            if (auth) signOut(auth);
            router.push('/admin');
        });
    }, [user, isUserLoading, router, toast, auth, firestore]);

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
        }
        router.push('/admin');
    };

    const handleEditUser = (userToEdit: FirestoreUser) => {
        setSelectedUser(userToEdit);
        setIsUserFormOpen(true);
    };

    const handleCreateUser = () => {
        setSelectedUser(undefined);
        setIsUserFormOpen(true);
    };

    const handleToggleUserStatus = async (userToToggle: FirestoreUser) => {
        if (!firestore) return;
        const newStatus = userToToggle.status === 'active' ? 'inactive' : 'active';
        try {
            await updateUser(firestore, userToToggle.id!, { status: newStatus });
            toast({
                title: "Status do usuário atualizado!",
                description: `O usuário ${userToToggle.name} foi ${newStatus === 'active' ? 'ativado' : 'inativado'}.`,
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erro ao atualizar status",
                description: error.message,
            });
        }
    };
    
    const handleDeleteUser = async (userId: string) => {
        if (!firestore) return;
        try {
            // Note: Deleting from Auth requires admin SDK, so we only delete from Firestore here.
            await deleteUser(firestore, userId);
            toast({
                title: "Usuário excluído com sucesso!",
                description: "O registro do usuário foi removido do Firestore.",
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erro ao excluir usuário",
                description: error.message,
            });
        }
    };

    const getUserInitials = (name: string | null | undefined) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    }
    
    const formatTimestamp = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
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
                user={selectedUser}
            />
            <DomainForm
                isOpen={isDomainFormOpen}
                onOpenChange={setIsDomainFormOpen}
            />
            <DossierForm
                isOpen={isDossierFormOpen}
                onOpenChange={setIsDossierFormOpen}
            />
            <div id="admin-dashboard" className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8 print-hide">
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
                            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6 print-hide">
                                <TabsTrigger value="users"><Users className="mr-2" /> Usuários</TabsTrigger>
                                <TabsTrigger value="domains"><Globe className="mr-2" /> Domínios</TabsTrigger>
                                <TabsTrigger value="sessions"><KeyRound className="mr-2" /> Sessões</TabsTrigger>
                                <TabsTrigger value="logs"><ListChecks className="mr-2" /> Auditoria</TabsTrigger>
                                <TabsTrigger value="dossiers"><FileText className="mr-2" /> Dossiês</TabsTrigger>
                                <TabsTrigger value="whitelabel"><Palette className="mr-2" /> White Label</TabsTrigger>
                            </TabsList>
                            
                            <Card className="mt-4">
                                <CardContent className="pt-6">
                                    <TabsContent value="users">
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle>Gestão de Usuários</CardTitle>
                                            <Button onClick={handleCreateUser}>
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
                                                        <TableHead>Status</TableHead>
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
                                                                <Badge variant={u.status === 'active' ? 'default' : 'outline'}>
                                                                    {u.status === 'active' ? 'Ativo' : 'Inativo'}
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
                                                                        <DropdownMenuItem onClick={() => handleEditUser(u)}>
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Editar
                                                                        </DropdownMenuItem>
                                                                         <DropdownMenuItem onClick={() => handleToggleUserStatus(u)}>
                                                                            {u.status === 'active' ? <Ban className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                                                                            {u.status === 'active' ? 'Inativar' : 'Ativar'}
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <AlertDialog>
                                                                            <AlertDialogTrigger asChild>
                                                                                <button className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-destructive w-full">
                                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                                    Excluir
                                                                                </button>
                                                                            </AlertDialogTrigger>
                                                                            <AlertDialogContent>
                                                                                <AlertDialogHeader>
                                                                                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                                                                    <AlertDialogDescription>
                                                                                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o usuário "{u.name}" e removerá seus dados de nossos servidores.
                                                                                    </AlertDialogDescription>
                                                                                </AlertDialogHeader>
                                                                                <AlertDialogFooter>
                                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                                    <AlertDialogAction onClick={() => handleDeleteUser(u.id!)}>Continuar</AlertDialogAction>
                                                                                </AlertDialogFooter>
                                                                            </AlertDialogContent>
                                                                        </AlertDialog>
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
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle>Auditoria e Logs</CardTitle>
                                            <Button variant="outline">
                                                <Filter className="mr-2 h-4 w-4" />
                                                Exportar Logs
                                            </Button>
                                        </div>
                                        <CardDescription className="mb-6">
                                            Rastreie todas as ações críticas no sistema. Os logs são imutáveis e servem como registro oficial para auditoria.
                                        </CardDescription>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                            <Input placeholder="Filtrar por usuário..." />
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Filtrar por ação..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="create_user">Criação de Usuário</SelectItem>
                                                    <SelectItem value="add_domain">Adição de Domínio</SelectItem>
                                                    <SelectItem value="login">Login</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline">Filtrar por data...</Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar mode="range" />
                                                </PopoverContent>
                                            </Popover>
                                            <Button>Aplicar Filtros</Button>
                                        </div>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Data</TableHead>
                                                    <TableHead>Usuário</TableHead>
                                                    <TableHead>Ação</TableHead>
                                                    <TableHead>Detalhes</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{formatTimestamp(new Date('2024-07-28T10:00:00Z'))}</TableCell>
                                                    <TableCell>luizpaulo.jesus@bmv.global</TableCell>
                                                    <TableCell><Badge variant="secondary">Criação de Usuário</Badge></TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">Usuário 'joao.silva@cliente.com' criado.</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{formatTimestamp(new Date('2024-07-28T10:05:00Z'))}</TableCell>
                                                    <TableCell>luizpaulo.jesus@bmv.global</TableCell>
                                                    <TableCell><Badge variant="secondary">Adição de Domínio</Badge></TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">Domínio 'cliente.com' autorizado.</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>{formatTimestamp(new Date('2024-07-28T11:30:00Z'))}</TableCell>
                                                    <TableCell>joao.silva@cliente.com</TableCell>
                                                    <TableCell><Badge>Login</Badge></TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">Login bem-sucedido a partir do IP 192.168.1.10.</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TabsContent>
                                    <TabsContent value="dossiers">
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle>Emissão de Dossiês e Anexos</CardTitle>
                                            <Button onClick={() => setIsDossierFormOpen(true)}>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Gerar Novo Dossiê
                                            </Button>
                                        </div>
                                        <CardDescription className="mb-6">
                                            Registre e visualize todas as emissões de dossiês institucionais, incluindo destinatários e anexos selecionados.
                                        </CardDescription>

                                        {dossiersLoading && <p>Carregando emissões de dossiês...</p>}

                                        {!dossiersLoading && (!dossiers || dossiers.length === 0) && (
                                            <div className="text-center py-10 border-2 border-dashed rounded-lg">
                                                <p className="text-muted-foreground">Nenhuma emissão de dossiê encontrada.</p>
                                                <p className="text-sm text-muted-foreground mt-2">Comece gerando um novo dossiê para visualizá-lo aqui.</p>
                                            </div>
                                        )}
                                        
                                        {!dossiersLoading && dossiers && dossiers.length > 0 && (
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Dossiê</TableHead>
                                                        <TableHead>Destinatário</TableHead>
                                                        <TableHead className="hidden sm:table-cell">Data de Emissão</TableHead>
                                                        <TableHead><span className="sr-only">Ações</span></TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {dossiers.map((d) => (
                                                        <TableRow key={d.id}>
                                                            <TableCell>
                                                                <div className="font-medium">{d.title}</div>
                                                                <div className="text-sm text-muted-foreground flex flex-wrap gap-1 mt-1">
                                                                    {d.includedAnnexes.map(anexo => (
                                                                        <Badge key={anexo} variant="secondary" className="font-normal">{anexo.replace('-', ' ')}</Badge>
                                                                    ))}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="font-medium">{d.recipientEmail}</div>
                                                                <div className="text-sm text-muted-foreground">Gerado por: {d.generatedBy}</div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">{formatTimestamp(d.createdAt)}</TableCell>
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
                                                                            <Download className="mr-2 h-4 w-4" />
                                                                            Baixar PDF
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem className="text-destructive">
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Excluir Registro
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
                                    <TabsContent value="whitelabel">
                                        <div className="flex items-center justify-between mb-4 print-hide">
                                            <CardTitle>Requisitos para Sistema White Label</CardTitle>
                                             <Button variant="outline" onClick={() => window.print()}>
                                                <Printer className="mr-2 h-4 w-4" />
                                                Imprimir Escopo
                                            </Button>
                                        </div>
                                        <CardDescription className="mb-6 print-hide">
                                            Esta seção detalha os requisitos funcionais e técnicos para a criação de um sistema white label, servindo como escopo para orçamento de desenvolvimento.
                                        </CardDescription>

                                        <div className="flex gap-8">
                                            <aside className="w-56 flex-shrink-0 sticky top-24 h-fit print-hide">
                                                <nav className="flex flex-col space-y-2">
                                                    <h3 className="font-semibold px-3">Navegação</h3>
                                                     <a href="#wl-principio" className="text-sm p-3 rounded-md hover:bg-muted">Princípio do Sistema</a>
                                                     <a href="#wl-arquitetura" className="text-sm p-3 rounded-md hover:bg-muted">Arquitetura e Premissas</a>
                                                     <a href="#wl-complexidade" className="text-sm p-3 rounded-md hover:bg-muted">Complexidade do Sistema</a>
                                                     <a href="#wl-telas" className="text-sm p-3 rounded-md hover:bg-muted">Telas e Funcionalidades</a>
                                                     <a href="#wl-bmv-digital" className="text-sm p-3 rounded-md hover:bg-muted">BMV Digital</a>
                                                     <a href="#wl-tesouro-verde" className="text-sm p-3 rounded-md hover:bg-muted">Tesouro Verde</a>
                                                     <a href="#wl-kanban" className="text-sm p-3 rounded-md hover:bg-muted">Fluxo Kanban</a>
                                                     <a href="#wl-estoque" className="text-sm p-3 rounded-md hover:bg-muted">Gestão de Estoque</a>
                                                     <a href="#wl-admin" className="text-sm p-3 rounded-md hover:bg-muted">Módulos Administrativos</a>
                                                </nav>
                                            </aside>
                                            <div className="space-y-6 prose prose-lg dark:prose-invert max-w-none flex-1">
                                                <section id="wl-principio">
                                                    <h4>Princípio do Sistema</h4>
                                                    <p>O sistema white label permitirá que parceiros de negócio (Operadores) utilizem a plataforma da BMV com sua própria marca, oferecendo os serviços a seus próprios clientes finais. A BMV atuará como a provedora da tecnologia de base, enquanto o Operador terá uma instância personalizada e isolada para gerenciar sua operação.</p>
                                                </section>

                                                <section id="wl-arquitetura">
                                                    <h4>Arquitetura e Premissas</h4>
                                                    <ul>
                                                        <li><strong>Multi-Tenancy:</strong> A arquitetura deve suportar múltiplos Operadores (tenants), com total isolamento de dados entre eles. Cada Operador só pode ver e gerenciar seus próprios clientes e dados.</li>
                                                        <li><strong>Administração Central (BMV):</strong> A BMV, como administradora master, deve ter um painel para gerenciar todos os Operadores, visualizar relatórios consolidados e administrar o faturamento.</li>
                                                        <li><strong>Domínio Personalizado:</strong> Cada Operador deve poder apontar seu próprio subdomínio (ex: `app.parceiro.com`) para sua instância da plataforma.</li>
                                                    </ul>
                                                </section>
                                                
                                                <section id="wl-complexidade">
                                                    <h4 className="font-bold text-xl mt-8 mb-4 border-t pt-6">Complexidade do Sistema e Engenharia de Ativos</h4>
                                                    <p>A plataforma foi concebida como um sistema de engenharia própria, com alto nível de complexidade operacional e lógica de negócios, no qual todos os módulos trabalham de forma integrada para garantir a administração, rastreabilidade e governança dos ativos.</p>
                                                    <p>Grande parte dessa complexidade é tratada por meio do módulo de Estatísticas e CI (Camada de Inteligência), responsável por consolidar regras, validações, cálculos e decisões automáticas utilizadas na administração dos ativos ao longo de todo o ciclo de vida.</p>
                                                    
                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Exemplo Prático – Cadastro e Gestão de Safra</h5>
                                                    <p>Para ilustrar essa complexidade, o processo de cadastro de uma safra envolve múltiplas camadas de validação, integração e geração de dados estruturados.</p>
                                                    
                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Fluxo Operacional da Safra</h5>
                                                    <ul>
                                                        <li><strong>Acesso ao Módulo Safra:</strong> O usuário acessa o módulo de Safra, seleciona o ano da safra e clica em Novo.</li>
                                                        <li><strong>Abertura de Pop-up de Cadastro:</strong> É exibida uma janela modal (pop-up) onde são inseridas as informações estruturantes da safra.</li>
                                                        <li><strong>Seleção da Plataforma de Destino:</strong> Definição da plataforma onde os ativos daquela safra serão operados e distribuídos.</li>
                                                        <li>
                                                            <strong>Identificação do Produtor:</strong>
                                                            <p>Informar o CPF do produtor (titular do certificado). A partir desse CPF, o sistema:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Carrega automaticamente o nome do produtor</li>
                                                                <li>Lista as áreas e fazendas já cadastradas e vinculadas a esse CPF</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <strong>Vinculação da Área e Fazenda:</strong>
                                                            <p>Caso necessário, o cadastro da área é realizado, indicando:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Proprietário</li>
                                                                <li>Nome da fazenda</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <strong>Definição dos Ativos da Safra:</strong>
                                                            <p>Inserção dos dados produtivos e técnicos:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Quantidade de UCS</li>
                                                                <li>ISNI</li>
                                                                <li>Tipo de produto</li>
                                                                <li>Mensagem adicional (informações complementares)</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <strong>Distribuição e Particionamento das UCS:</strong>
                                                            <p>Com base nas regras configuradas no sistema:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>As UCS são distribuídas e particionadas</li>
                                                                <li>O estoque é estruturado conforme áreas, produtores e plataformas</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <strong>Criação da Base Blockchain:</strong>
                                                            <p>Ao final do processo, o sistema:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Cria a base do ativo na blockchain</li>
                                                                <li>Vincula a safra, produtor, área, UCS e plataforma</li>
                                                                <li>Garante rastreabilidade on-chain desde a origem</li>
                                                            </ul>
                                                        </li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Visão Técnica e Estratégica</h5>
                                                    <p>Esse fluxo demonstra que a plataforma não se limita a cadastros simples, mas opera como um sistema de engenharia de ativos digitais e ambientais, onde:</p>
                                                     <ul className="list-disc pl-6 mt-2">
                                                        <li>Cada dado cadastrado gera impactos em estoque, certificação, financeiro e blockchain</li>
                                                        <li>O módulo de Estatísticas e CI assegura coerência lógica, cálculos, validações e consistência</li>
                                                        <li>A criação da safra já nasce preparada para distribuição, certificação e rastreabilidade on-chain</li>
                                                    </ul>
                                                </section>

                                                <section id="wl-telas">
                                                    <h4>Telas e Funcionalidades Essenciais</h4>
                                                    
                                                    <h5>1. Painel de Administração Master (BMV)</h5>
                                                    <ul>
                                                        <li><strong>Gestão de Operadores:</strong> Tela para cadastrar, visualizar, ativar/inativar e configurar Operadores.</li>
                                                        <li><strong>Dashboard Consolidado:</strong> Visão geral com estatísticas de todos os Operadores (nº de clientes, volume de transações, etc.).</li>
                                                        <li><strong>Faturamento:</strong> Módulo para gerar e gerenciar as faturas para cada Operador, com base no uso (ex: por cliente, por transação).</li>
                                                    </ul>

                                                    <h5>2. Painel do Operador (Parceiro)</h5>
                                                    <ul>
                                                        <li><strong>Dashboard do Operador:</strong> Visão geral de sua própria operação (seus clientes, suas transações).</li>
                                                        <li><strong>Gestão de Clientes:</strong> CRUD completo para que o Operador gerencie seus próprios clientes finais. O Operador não pode ver clientes de outros Operadores.</li>
                                                        <li><strong>Customização da Marca (Branding):</strong>
                                                            <ul>
                                                                <li>Upload de logo.</li>
                                                                <li>Definição de esquema de cores primárias.</li>
                                                                <li>Configuração de domínio/subdomínio.</li>
                                                            </ul>
                                                        </li>
                                                        <li><strong>Relatórios:</strong> Relatórios de sua própria operação.</li>
                                                        <li><strong>Configurações de Faturamento:</strong> Tela para o Operador visualizar suas faturas da BMV e gerenciar detalhes de pagamento.</li>
                                                    </ul>

                                                    <h5>3. Visão do Cliente Final</h5>
                                                    <p>A experiência do cliente final permanece similar à atual, mas totalmente imersa na marca do Operador (logo, cores, URL). O cliente final pertence a um, e somente um, Operador.</p>
                                                </section>
                                                
                                                <section id="wl-bmv-digital">
                                                    <h4 className="font-bold text-xl mt-8 mb-4 border-t pt-6">BMV Digital</h4>
                                                    <p>A BMV Digital é a plataforma central responsável pela gestão e movimentação de saldo de clientes e produtores, atuando como a camada transacional e orquestradora das operações da BMV.</p>
                                                    <p>Nessa plataforma são registradas todas as intenções de movimentação, que dão origem às operações financeiras, comerciais e operacionais. Essas intenções são formalizadas por meio de pedidos, garantindo rastreabilidade, controle, validações e integração sistêmica antes da efetiva liquidação.</p>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Funcionalidades e Módulos</h5>
                                                    <ul>
                                                        <li>
                                                            <strong>Pedido de Compras:</strong>
                                                            <p>Registro e controle das intenções de aquisição de ativos, com fluxo de validação e acompanhamento do status da operação.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Pedido de Vendas:</strong>
                                                            <p>Gestão das intenções de venda, permitindo o controle do ciclo comercial desde a solicitação até a conclusão.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Pedido de Transferência:</strong>
                                                            <p>Formalização das intenções de transferência de ativos, incluindo UCSs, entre clientes, produtores, carteiras ou sistemas integrados.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Pedido de Certificados:</strong>
                                                            <p>Gestão das intenções de emissão, movimentação e controle de certificados, organizada por tipo de operação:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Cliente</li>
                                                                <li>Distribuidor Financeiro</li>
                                                                <li>Distribuidor Geral</li>
                                                                <li>SaaS Tesouro Verde</li>
                                                                <li>SaaS BMV</li>
                                                                <li>CDE</li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <strong>Integração de Movimentação:</strong>
                                                            <p>Módulo responsável por integrar e sincronizar as movimentações entre os sistemas internos e externos, assegurando consistência, automação e confiabilidade dos dados.</p>
                                                        </li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Visão Geral</h5>
                                                    <p>A BMV Digital consolida todos os pedidos que representam intenções de movimentação de saldo, ativos e certificados, funcionando como o ponto único de entrada para as operações da BMV, com foco em governança, escalabilidade e segurança operacional.</p>
                                                </section>
                                                <section id="wl-tesouro-verde">
                                                    <h4 className="font-bold text-xl mt-8 mb-4 border-t pt-6">Tesouro Verde</h4>
                                                    <p>A plataforma Tesouro Verde é responsável pela gestão operacional, financeira e regulatória dos programas ambientais, atuando como o ambiente onde são tratadas, processadas e consolidadas todas as solicitações relacionadas a selos, programas, parceiros e repasses financeiros.</p>
                                                    <p>Todas as funcionalidades da plataforma operam de forma integrada, seguindo uma lógica de câmbio e processamento, na qual cada pedido percorre etapas bem definidas de validação, aprovação, pagamento e conclusão, garantindo rastreabilidade, conformidade e segurança operacional.</p>
                                                
                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Módulos da Plataforma</h5>
                                                    <ul>
                                                        <li>
                                                            <strong>Parceiros</strong>
                                                            <p>Gestão de parceiros institucionais, operacionais e comerciais vinculados aos programas do Tesouro Verde, definindo papéis, responsabilidades e regras de atuação.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Programas</strong>
                                                            <p>Cadastro e administração dos programas ambientais, incluindo critérios, regras de elegibilidade, parâmetros operacionais e vínculo com selos e royalties.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Pedidos de Selos</strong>
                                                            <p>Módulo central da plataforma, responsável pelo tratamento completo dos pedidos de selos ambientais, desde a solicitação até o encerramento do processo.</p>
                                                            <p>Os pedidos seguem um fluxo lógico e controlado, passando pelos seguintes status operacionais:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Pendente de Aprovação</li>
                                                                <li>Pendente de Pagamento</li>
                                                                <li>Pagamentos Efetuados</li>
                                                                <li>Pré-processados</li>
                                                                <li>Processados</li>
                                                                <li>Falhas</li>
                                                                <li>Negados</li>
                                                                <li>Arquivados</li>
                                                            </ul>
                                                            <p>Esse fluxo garante que cada pedido seja corretamente analisado, validado, processado e registrado, assegurando consistência entre as etapas financeiras, operacionais e regulatórias.</p>
                                                        </li>
                                                        <li>
                                                            <strong>DARE / Royalties</strong>
                                                            <p>Módulo responsável pela gestão financeira e fiscal, incluindo cálculo, controle e repasse de DAREs e royalties associados aos programas e selos, garantindo aderência às regras contratuais e regulatórias.</p>
                                                        </li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Visão Geral</h5>
                                                    <p>A plataforma Tesouro Verde funciona como o motor operacional dos programas ambientais, onde todas as solicitações são tratadas de forma integrada, seguindo uma lógica clara de processamento e câmbio de informações entre módulos, assegurando transparência, governança e eficiência do início ao fim do ciclo operacional.</p>
                                                </section>
                                                <section id="wl-kanban">
                                                    <h4 className="font-bold text-xl mt-8 mb-4 border-t pt-6">Fluxo Kanban de Pedidos – BMV Digital</h4>
                                                    <p>Todos os pedidos da plataforma BMV Digital são tratados por meio de um fluxo Kanban padronizado, que representa visualmente o ciclo completo da intenção de movimentação, desde a solicitação inicial até o encerramento do processo.</p>
                                                    <p>Esse fluxo garante governança, rastreabilidade, controle operacional e financeiro, permitindo que cada pedido avance de forma lógica e validada entre as etapas.</p>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Status do Fluxo Kanban</h5>
                                                    <ul>
                                                        <li><strong>Pendente de Aprovação:</strong> Pedido registrado e aguardando análise e validação interna, conforme regras de negócio, elegibilidade e conformidade.</li>
                                                        <li><strong>Pendente de Pagamento:</strong> Pedido aprovado, aguardando a realização do pagamento necessário para dar continuidade ao processamento.</li>
                                                        <li><strong>Pagamentos Efetuados:</strong> Pagamento confirmado com sucesso, liberando o pedido para as etapas operacionais seguintes.</li>
                                                        <li><strong>Pré-processados:</strong> Pedido validado financeiramente e preparado para execução, com checagens finais de consistência e integração entre sistemas.</li>
                                                        <li><strong>Processados:</strong> Pedido executado com sucesso, com a movimentação de saldo, ativos, UCSs ou certificados devidamente registrada e concluída.</li>
                                                        <li><strong>Falhas:</strong> Pedidos que apresentaram inconsistências técnicas, operacionais ou de integração durante o processamento, exigindo correção ou reprocessamento.</li>
                                                        <li><strong>Negados:</strong> Pedidos reprovados por critérios de negócio, documentação, conformidade ou regras operacionais.</li>
                                                        <li><strong>Arquivados:</strong> Pedidos finalizados e encerrados, mantidos apenas para fins de histórico, auditoria e rastreabilidade.</li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Aplicação do Fluxo por Tipo de Pedido</h5>
                                                    <ul>
                                                        <li><strong>Pedidos de Compra:</strong> Fluxo completo desde a aprovação até o processamento financeiro e operacional da aquisição.</li>
                                                        <li><strong>Pedidos de Venda:</strong> Gestão do ciclo de venda, garantindo validação, pagamento, processamento e encerramento da operação.</li>
                                                        <li><strong>Pedidos de Transferência:</strong> Tratamento das intenções de transferência de ativos e UCSs entre partes, com controle de aprovação, execução e arquivamento.</li>
                                                        <li>
                                                            <strong>Pedidos de Certificados:</strong>
                                                            <p>O fluxo Kanban é aplicado de forma consistente aos diferentes tipos de certificados:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Certificado de Cliente</li>
                                                                <li>Certificado de Distribuidor Financeiro</li>
                                                                <li>Certificado de Distribuidor Geral</li>
                                                                <li>Certificado de SaaS Tesouro Verde</li>
                                                                <li>Certificado de SaaS BMV</li>
                                                                <li>Certidão de Disponibilidade de Estoque</li>
                                                            </ul>
                                                            <p>Alguns tipos de certificado podem incluir etapas adicionais, como:</p>
                                                            <ul className="list-disc pl-6 mt-2">
                                                                <li>Pendente de Validação</li>
                                                                <li>Pendente de Documentação</li>
                                                            </ul>
                                                            <p>Essas etapas garantem conformidade documental e regulatória antes da liberação para pagamento e processamento.</p>
                                                        </li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Visão Geral</h5>
                                                    <p>O fluxo Kanban da BMV Digital padroniza o tratamento de todos os pedidos, assegurando que cada intenção de movimentação percorra um caminho lógico, auditável e controlado, desde a solicitação até a conclusão, independentemente do tipo de operação ou certificado envolvido.</p>
                                                </section>
                                                <section id="wl-estoque">
                                                    <h4 className="font-bold text-xl mt-8 mb-4 border-t pt-6">Módulo de Gestão de Estoque</h4>
                                                    <p>O Módulo de Gestão de Estoque é responsável pelo controle, organização e rastreabilidade dos ativos, UCSs e saldos administrados pela BMV, garantindo que todas as movimentações ocorram de forma segura, validada e integrada aos demais módulos da plataforma.</p>
                                                    <p>Esse módulo sustenta as operações de compra, venda, transferência e certificação, funcionando como a base operacional para a execução das intenções de movimentação.</p>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Submódulos da Gestão de Estoque</h5>
                                                    <ul>
                                                        <li>
                                                            <strong>Safra</strong>
                                                            <p>Gestão das safras vinculadas aos ativos, permitindo o controle por período, origem e características produtivas, garantindo rastreabilidade desde a geração do estoque.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Abastecimento</strong>
                                                            <p>Registro das entradas de estoque, seja por geração própria, aquisição, integração externa ou ajustes operacionais, assegurando a correta formação do saldo disponível.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Configuração de Distribuição</strong>
                                                            <p>Definição das regras de distribuição do estoque entre contas, carteiras, participantes ou programas, estabelecendo critérios de alocação, limites e prioridades.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Movimentações</strong>
                                                            <p>Histórico completo de todas as entradas, saídas, reservas e transferências de estoque, garantindo transparência, auditoria e rastreabilidade.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Transferência de Titularidade</strong>
                                                            <p>Gestão da mudança de titularidade dos ativos ou UCSs entre partes, mantendo o histórico, a origem e a conformidade jurídica da operação.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Ajustes entre Contas</strong>
                                                            <p>Módulo destinado a correções controladas de saldo entre contas, mediante regras de autorização, justificativa e registro auditável.</p>
                                                        </li>
                                                        <li>
                                                            <strong>Bloqueio de UCS</strong>
                                                            <p>Funcionalidade que permite bloquear UCSs específicas, impedindo sua movimentação até liberação formal, seja por motivos regulatórios, operacionais ou contratuais.</p>
                                                        </li>
                                                        <li>
                                                            <strong>CPR Verde</strong>
                                                            <p>Gestão dos ativos vinculados à CPR Verde, garantindo controle de estoque, elegibilidade, rastreabilidade e conformidade com os instrumentos financeiros associados.</p>
                                                        </li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Visão Geral</h5>
                                                    <p>O Módulo de Gestão de Estoque assegura que todo ativo ou UCS possua origem, saldo, titularidade e histórico claramente definidos, integrando-se ao fluxo Kanban de pedidos e aos módulos financeiros e de certificação, garantindo governança, segurança e escalabilidade.</p>
                                                </section>
                                                <section id="wl-admin">
                                                    <h4 className="font-bold text-xl mt-8 mb-4 border-t pt-6">Módulos Administrativos e de Governança da Plataforma</h4>
                                                    <p>Para garantir o correto funcionamento de todos os fluxos operacionais, financeiros e regulatórios da plataforma, foi estruturado um conjunto de módulos administrativos, responsáveis pelo cadastro, gestão, parametrização e governança de todas as entidades que sustentam o ecossistema.</p>
                                                    <p>Esses módulos funcionam como a camada estrutural do sistema, assegurando padronização, controle de acesso, conformidade e flexibilidade operacional.</p>
                                                    
                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Módulos de Cadastro e Gestão</h5>
                                                    <ul>
                                                      <li><strong>Áreas</strong>
                                                        <p>Módulo destinado ao cadastro e gerenciamento das áreas, permitindo:</p>
                                                        <ul className="list-disc pl-6 mt-2">
                                                          <li>Organização estrutural do sistema</li>
                                                          <li>Análise e validação de documentos</li>
                                                          <li>Gestão de pastas e arquivos vinculados às áreas</li>
                                                        </ul>
                                                      </li>
                                                      <li><strong>Núcleos</strong><p>Permite o cadastro e a gestão de núcleos, seguindo o mesmo princípio das áreas, possibilitando segmentação operacional, organizacional ou regional.</p></li>
                                                      <li><strong>Associações</strong><p>Módulo responsável pelo cadastro e gerenciamento de associações e produtores, mantendo o vínculo institucional, operacional e histórico de relacionamento.</p></li>
                                                      <li><strong>Usuários</strong>
                                                        <p>Gestão completa de usuários da plataforma, incluindo:</p>
                                                        <ul className="list-disc pl-6 mt-2">
                                                          <li>Cadastro e manutenção de usuários</li>
                                                          <li>Definição de perfis e permissões</li>
                                                          <li>Controle de acesso por módulos e funcionalidades</li>
                                                        </ul>
                                                      </li>
                                                      <li><strong>Bancos</strong><p>Cadastro e administração das instituições bancárias, utilizadas nos fluxos de pagamento, recebimento e integração financeira.</p></li>
                                                      <li><strong>Acervo</strong><p>Módulo central de gestão do acervo documental, permitindo organizar, versionar e controlar documentos utilizados ao longo dos processos da plataforma.</p></li>
                                                      <li><strong>Relatórios</strong>
                                                        <p>O módulo de Relatórios centraliza a extração de informações operacionais e financeiras, incluindo:</p>
                                                        <ul className="list-disc pl-6 mt-2">
                                                          <li>Relatórios de vendas individuais</li>
                                                          <li>Relatórios de vendas gerais</li>
                                                          <li>Relatórios de vendas por governo</li>
                                                          <li>Relatórios de pagamentos a fornecedores</li>
                                                          <li>Relatórios de pagamentos do Tesouro Verde</li>
                                                          <li>Relatórios de pagamentos de fornecedores PMBGista</li>
                                                        </ul>
                                                        <p>Esse módulo apoia a análise estratégica, auditoria e tomada de decisão.</p>
                                                      </li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Módulos de Configuração e Parametrização</h5>
                                                    <ul>
                                                      <li><strong>Cotação</strong>
                                                        <p>Configuração da cotação da UCS, parametrizada por:</p>
                                                        <ul className="list-disc pl-6 mt-2">
                                                          <li>Ano e mês</li>
                                                          <li>Moeda (Real, Dólar e Euro)</li>
                                                          <li>Índices (CRS)</li>
                                                        </ul>
                                                        <p>Gestão do Índice de Cotas Notice de Distribuição Social, atualmente configurado em R$ 2,00, com múltiplos marcadores ajustáveis conforme regras de negócio.</p>
                                                      </li>
                                                      <li><strong>Taxas</strong>
                                                        <p>Cadastro e gerenciamento das taxas cobradas por entrega ou operação, com funcionalidades de:</p>
                                                        <ul className="list-disc pl-6 mt-2">
                                                          <li>Inserção</li>
                                                          <li>Inativação</li>
                                                          <li>Exclusão</li>
                                                        </ul>
                                                      </li>
                                                      <li><strong>Cupons</strong><p>Gestão de cupons promocionais ou operacionais, utilizados em campanhas, incentivos ou regras comerciais específicas.</p></li>
                                                      <li><strong>Comissões</strong><p>Configuração das condições e comissões dos vendedores, permitindo flexibilidade nas regras comerciais.</p></li>
                                                      <li><strong>Modelos de Certificado</strong><p>Cadastro e manutenção dos modelos de certificados emitidos pela plataforma, garantindo padronização, identidade visual e conformidade documental.</p></li>
                                                      <li><strong>Plataformas</strong><p>Módulo para cadastro e gestão das plataformas integradas ou operadas dentro do ecossistema da BMV.</p></li>
                                                      <li><strong>Substrate / Blockchain</strong>
                                                        <p>Gestão das carteiras blockchain, incluindo:</p>
                                                        <ul className="list-disc pl-6 mt-2">
                                                          <li>Cadastro de wallets</li>
                                                          <li>Parametrizações técnicas</li>
                                                          <li>Controle e segurança das operações on-chain</li>
                                                        </ul>
                                                        <p>Este módulo é considerado crítico, pois sustenta a integridade das operações em blockchain.</p>
                                                      </li>
                                                      <li><strong>Configurações Gerais</strong><p>Configurações sistêmicas que impactam o comportamento global da plataforma, regras operacionais e integrações.</p></li>
                                                      <li><strong>API de Parceiros</strong>
                                                        <p>Módulo dedicado à gestão de integrações externas, permitindo:</p>
                                                        <ul className="list-disc pl-6 mt-2">
                                                          <li>Cadastro de usuários de API</li>
                                                          <li>Definição de senhas e tokens</li>
                                                          <li>Controle de acesso e segurança para parceiros integrados</li>
                                                        </ul>
                                                      </li>
                                                    </ul>

                                                    <h5 className="font-semibold text-lg mt-6 mb-3">Visão Geral</h5>
                                                    <p>Esse conjunto de módulos administrativos garante que toda a plataforma opere de forma organizada, parametrizada, segura e escalável, sustentando os fluxos de pedidos, estoque, certificação, pagamentos e blockchain com governança e confiabilidade.</p>
                                                </section>
                                            </div>
                                        </div>
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

    

    




    

    

    

    

    
