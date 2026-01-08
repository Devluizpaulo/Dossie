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
} from 'lucide-react';

import { ThemeToggle } from './components/dossier/theme-toggle';
import { DossierContent, sections } from './components/dossier/content';
import { DossierSidebar } from './components/dossier/sidebar';
import { Logo } from '@/components/logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';

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
    <div className="min-h-screen bg-muted/40">
      {/* Main Container */}
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          
          {/* Sidebar */}
          <aside className="hidden md:block w-full md:w-80 lg:w-96 flex-shrink-0">
            <div className="sticky top-6 bg-card p-4 rounded-xl shadow-sm transition-opacity duration-300 opacity-80 hover:opacity-100">
              <div className="flex items-center justify-center mb-4 pb-4 border-b">
                <Logo />
              </div>
              <DossierSidebar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
            </div>
          </aside>

          {/* Main View */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-card rounded-t-xl border-b shadow-sm">
              <div className="flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden mr-2">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <div className="flex items-center justify-center h-16 border-b">
                      <Logo />
                    </div>
                     <div className="p-4">
                       <DossierSidebar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
                     </div>
                  </SheetContent>
                </Sheet>
                <h1 className="text-xl font-semibold">Dossiê Técnico</h1>
              </div>
              <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleExpandAll}
                    className="gap-2"
                  >
                      {allExpanded ? <ListCollapse className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                      <span className="hidden sm:inline">{allExpanded ? 'Recolher' : 'Expandir'}</span>
                  </Button>
                <ThemeToggle />
              </div>
            </header>

            {/* Content */}
            <main id="content" ref={contentRef} className="flex-1 overflow-y-auto p-6 bg-card rounded-b-xl shadow-sm relative">
                <Accordion
                  type="multiple"
                  value={expandedSections}
                  onValueChange={setExpandedSections}
                  className="w-full"
                >
                  <DossierContent searchTerm={searchTerm} setExpandedSections={setExpandedSections} />
                </Accordion>
                
                {showBackToTop && (
                  <Button
                    variant="default"
                    size="icon"
                    className="fixed bottom-6 right-6 md:absolute md:bottom-6 md:right-6 rounded-full h-10 w-10 shadow-lg hover:shadow-xl transition-shadow"
                    onClick={scrollToTop}
                    aria-label="Voltar ao topo"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
