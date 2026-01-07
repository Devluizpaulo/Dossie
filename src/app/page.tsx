"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Accordion,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { slugify } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Home,
  ClipboardList,
  Building2,
  Lightbulb,
  CheckCircle,
  Search,
  Expand,
  ListCollapse,
  ArrowUp,
  Menu
} from 'lucide-react';

import { ThemeToggle } from './components/dossier/theme-toggle';
import { DossierContent, sections } from './components/dossier/content';
import { DossierSidebar } from './components/dossier/sidebar';

export default function DossierPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [allExpanded, setAllExpanded] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const allSectionIds = useMemo(() => sections.map(s => slugify(s.title)), []);

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedSections([]);
    } else {
      setExpandedSections(allSectionIds);
    }
    setAllExpanded(!allExpanded);
  };

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logo = PlaceHolderImages.find(img => img.id === 'bmv-logo');

  const navItems = [
    { href: '#objetivo-do-dossiê-propósito-e-aplicações', icon: Home, label: 'Início' },
    { href: '#contexto-geral-do-sistema-bmv', icon: ClipboardList, label: 'Contexto' },
    { href: '#arquitetura-e-herança-do-sistema-legado', icon: Building2, label: 'Arquitetura' },
    { href: '#recomendações-estratégicas-gerais', icon: Lightbulb, label: 'Recomendações' },
    { href: '#conclusão-final-versão-revisada-–-ponto-de-corte-técnico', icon: CheckCircle, label: 'Conclusão' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4">
            {logo && <Image src={logo.imageUrl} alt="BMV Logo" width={40} height={40} className="rounded-md" data-ai-hint={logo.imageHint} />}
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-primary">BMV • Dossiê de Avaliação</h1>
              <p className="text-sm text-muted-foreground">Guia técnico de avaliação do sistema</p>
            </div>
          </div>

          <div className="flex-1 flex justify-center px-4 lg:px-16">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                id="searchInput"
                placeholder="Pesquisar no manual..."
                aria-label="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="hidden md:flex items-center space-x-1">
                {navItems.map(item => (
                  <Button variant="ghost" asChild key={item.label}>
                    <a href={item.href} title={item.label} className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                      <item.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
            </nav>
            <ThemeToggle />
            <Button variant="outline" onClick={toggleExpandAll} className="hidden lg:inline-flex">
                {allExpanded ? <ListCollapse className="mr-2 h-4 w-4" /> : <Expand className="mr-2 h-4 w-4" />}
                {allExpanded ? 'Recolher' : 'Expandir'}
            </Button>
            {/* Mobile Menu */}
            <div className="md:hidden">
                <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Abrir menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col space-y-4 pt-8">
                             {navItems.map(item => (
                                <a key={item.label} href={item.href} onClick={() => setIsMobileSheetOpen(false)} className="flex items-center space-x-3 text-lg font-medium text-foreground transition-colors hover:text-primary">
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </header>


      <div className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12">
          <aside className="hidden md:block w-full">
            <div className="sticky top-28">
              <DossierSidebar searchTerm={searchTerm} />
            </div>
          </aside>
          
          <main id="content">
            <Accordion
              type="multiple"
              value={expandedSections}
              onValueChange={setExpandedSections}
              className="w-full"
            >
              <DossierContent searchTerm={searchTerm} />
            </Accordion>
          </main>
        </div>
      </div>

      <footer className="border-t">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BMV — Dossiê
        </div>
      </footer>
      
      {showBackToTop && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full h-12 w-12 shadow-lg"
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
