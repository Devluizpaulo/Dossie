"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/app/components/dossier/theme-toggle";

interface AnexoLayoutProps {
  children: React.ReactNode;
  title: string;
  number: number;
}

export function AnexoLayout({ children, title, number }: AnexoLayoutProps) {
  const prevAnexo = number > 1 ? `/anexo-${number - 1}` : "/";
  const nextAnexo = number < 5 ? `/anexo-${number + 1}` : null;

  return (
    <SidebarProvider>
      <Sidebar side="left">
        <SidebarHeader className="border-b">
          <div className="flex items-center justify-between gap-2 px-2">
            <Link href="/" className="hover:opacity-80">
              <h1 className="text-sm font-bold text-primary truncate">Dossiê</h1>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-0 flex flex-col">
          <div className="flex-1 overflow-y-auto p-3">
            <nav className="space-y-4">
              {/* Dossiê Principal */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Dossiê
                </p>
                <Link href="/" className="block text-sm text-primary hover:text-primary/80 transition-colors" title="Dossiê Técnico">
                  Dossiê Técnico
                </Link>
              </div>

              {/* Anexos */}
              <div className="border-t pt-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Anexos
                </p>
                <nav className="space-y-2">
                  <Link
                    href="/anexo-1"
                    className={`block text-sm transition-colors ${
                      number === 1
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                    title="Anexo I – Evidências"
                  >
                    Anexo I – Evidências
                  </Link>
                  <Link
                    href="/anexo-2"
                    className={`block text-sm transition-colors ${
                      number === 2
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                    title="Anexo II – Linha do Tempo"
                  >
                    Anexo II – Linha do Tempo
                  </Link>
                  <Link
                    href="/anexo-3"
                    className={`block text-sm transition-colors ${
                      number === 3
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                    title="Anexo III – Riscos"
                  >
                    Anexo III – Riscos
                  </Link>
                  <Link
                    href="/anexo-4"
                    className={`block text-sm transition-colors ${
                      number === 4
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                    title="Anexo IV – Paridade Funcional"
                  >
                    Anexo IV – Paridade Funcional
                  </Link>
                  <Link
                    href="/anexo-5"
                    className={`block text-sm transition-colors ${
                      number === 5
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                    title="Anexo V – Fluxos AS-IS e TO-BE"
                  >
                    Anexo V – Fluxos
                  </Link>
                </nav>
              </div>
            </nav>
          </div>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="flex flex-col min-h-screen bg-background">
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b bg-primary text-primary-foreground border-t-4 border-t-green-500 shadow-sm">
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 flex h-14 items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-2 h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10 md:hidden" />
                <div className="hidden sm:block">
                  <Logo />
                </div>
              </div>
              <h1 className="text-sm font-semibold text-center flex-1">{title}</h1>
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto flex-1 px-3 sm:px-4 lg:px-6 py-6">
            {children}
          </main>

          {/* Footer Navigation */}
          <footer className="border-t bg-muted/50 py-4">
            <div className="container mx-auto px-3 sm:px-4 lg:px-6">
              <div className="flex justify-between items-center gap-4">
                <Link href={prevAnexo}>
                  <Button variant="outline" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    {number === 1 ? "Voltar ao Dossiê" : "Anexo Anterior"}
                  </Button>
                </Link>
                {nextAnexo ? (
                  <Link href={nextAnexo}>
                    <Button className="gap-2">
                      Próximo Anexo
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/">
                    <Button className="gap-2">
                      Voltar ao Dossiê
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
