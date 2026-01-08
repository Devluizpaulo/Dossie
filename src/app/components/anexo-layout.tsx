"use client";

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
  const anexos = [1, 2, 3, 4, 5];

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

      {/* Anexos Menu */}
      <div className="w-full border-b bg-background/80">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2">
          <nav className="flex gap-2 overflow-x-auto">
            {anexos.map((n) => (
              <Link key={n} href={`/anexo-${n}`}>
                <Button size="sm" variant={n === number ? "default" : "outline"}>
                  Anexo {n}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <main className="container mx-auto flex-1 px-3 sm:px-4 lg:px-6 py-6 sm:py-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          {/* Sidebar Navigation */}
          <aside className="bg-card border rounded-xl p-3 sm:p-4 h-fit sticky md:top-20">
            <h2 className="text-sm font-semibold mb-3">Anexos</h2>
            <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
              {anexos.map((n) => (
                <Link key={n} href={`/anexo-${n}`}>
                  <Button
                    size="sm"
                    variant={n === number ? "default" : "outline"}
                    className="w-full justify-start"
                  >
                    {`Anexo ${n}`}
                  </Button>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Card Content */}
          <div className="bg-card p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
            {children}
          </div>
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
