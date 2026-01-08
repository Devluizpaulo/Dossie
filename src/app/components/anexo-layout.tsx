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
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
             <Link href={prevAnexo}>
               <Button variant="outline" size="icon" className="h-8 w-8">
                 <ChevronLeft className="h-4 w-4" />
                 <span className="sr-only">Anexo anterior</span>
               </Button>
             </Link>
             <div className="hidden sm:block">
               <Link href="/" className="hover:opacity-80 transition-opacity">
                <Logo />
               </Link>
            </div>
          </div>
          <h1 className="text-sm font-semibold text-center flex-1 truncate px-2">{title}</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {nextAnexo ? (
              <Link href={nextAnexo}>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4 rotate-180" />
                  <span className="sr-only">Próximo anexo</span>
                </Button>
              </Link>
            ) : (
              <Link href="/">
                <Button variant="outline" size="icon" className="h-8 w-8">
                   <ChevronLeft className="h-4 w-4 rotate-180" />
                   <span className="sr-only">Voltar ao dossiê</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-3 sm:px-4 lg:px-6 py-6 sm:py-8 pb-24">
        <div className="bg-card p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
            {children}
        </div>
      </main>
      {/* Fixed Footer Navigation */}
      <footer className="fixed bottom-4 left-4 right-4 z-30">
        <div className="glass-panel rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center gap-4">
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
      </footer>
    </div>
  );
}
