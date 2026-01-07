"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Accordion,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { slugify } from '@/lib/utils';
import {
  Expand,
  ListCollapse,
  ArrowUp,
  Menu,
  ChevronLeft,
} from 'lucide-react';

import { ThemeToggle } from './components/dossier/theme-toggle';
import { DossierContent, sections } from './components/dossier/content';
import { DossierSidebar } from './components/dossier/sidebar';
import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function DossierPage() {
  const allSectionIds = useMemo(() => sections.map(s => slugify(s.title)), []);
  
  const [expandedSections, setExpandedSections] = useState<string[]>(allSectionIds);
  const [allExpanded, setAllExpanded] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedSections([]);
    } else {
      setExpandedSections(allSectionIds);
    }
    setAllExpanded(!allExpanded);
  };
  
  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const checkScroll = () => {
      if (contentEl.scrollTop > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    contentEl.addEventListener('scroll', checkScroll);
    return () => contentEl.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader className="border-b h-14 justify-center">
            <Logo />
        </SidebarHeader>
        <SidebarContent className="p-0 flex flex-col">
          <div className="flex-1 overflow-y-auto p-3">
             <DossierSidebar onSearchTermChange={setSearchTerm} />
          </div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div ref={contentRef} className="flex flex-col min-h-screen bg-background overflow-auto">
          <header className="sticky top-0 z-40 w-full border-b bg-primary text-primary-foreground border-t-4 border-t-green-500 shadow-sm">
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 flex h-14 items-center justify-between">
                <div className="flex items-center gap-3">
                    <SidebarTrigger className="md:hidden -ml-2 h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10" />
                    <div className="sm:hidden">
                      <Logo />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                </div>
            </div>
           </header>
          <main id="content" className="container mx-auto flex-1 px-3 sm:px-4 lg:px-6 py-6">
            <div className="flex justify-end mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={toggleExpandAll}
                  className="gap-2"
                >
                    {allExpanded ? <ListCollapse className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                    {allExpanded ? 'Recolher' : 'Expandir'}
                </Button>
            </div>
            <Accordion
              type="multiple"
              value={expandedSections}
              onValueChange={setExpandedSections}
              className="w-full"
            >
              <DossierContent searchTerm={searchTerm} setExpandedSections={setExpandedSections} />
            </Accordion>
          </main>
          <footer className="border-t mt-12 bg-muted/30">
            <div className="container mx-auto py-4 px-3 sm:px-4 lg:px-6 text-center text-xs sm:text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BMV — Dossiê
            </div>
          </footer>
          {showBackToTop && (
            <Button
              variant="default"
              size="icon"
              className="fixed bottom-6 right-6 rounded-full h-10 w-10 shadow-lg hover:shadow-xl transition-shadow"
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          )}
        </div>
      </SidebarInset>
    </>
  );
}

    