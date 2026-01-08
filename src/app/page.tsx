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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <DossierSidebar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <button className="md:hidden mr-4">
              <Menu className="h-6 w-6 text-gray-500" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dossiê Técnico</h1>
          </div>
          <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleExpandAll}
                className="gap-2"
              >
                  {allExpanded ? <ListCollapse className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                  {allExpanded ? 'Recolher' : 'Expandir'}
              </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main id="content" ref={contentRef} className="flex-1 overflow-y-auto p-6">
            <Accordion
              type="multiple"
              value={expandedSections}
              onValueChange={setExpandedSections}
              className="w-full"
            >
              <DossierContent searchTerm={searchTerm} setExpandedSections={setExpandedSections} />
            </Accordion>
        </main>
        
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
    </div>
  );
}
