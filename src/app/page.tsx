"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Accordion,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { slugify } from '@/lib/utils';
import {
  Expand,
  ListCollapse,
  ArrowUp,
  ChevronLeft,
  Menu,
} from 'lucide-react';

import { ThemeToggle } from './components/dossier/theme-toggle';
import { DossierContent, sections } from './components/dossier/content';
import { DossierSidebar } from './components/dossier/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function DossierPage() {
  const allSectionIds = useMemo(() => sections.map(s => slugify(s.title)), []);
  
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [allExpanded, setAllExpanded] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const logo = PlaceHolderImages.find(img => img.id === 'bmv-logo');

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedSections([]);
    } else {
      const filteredIds = sections
        .filter(section => !searchTerm || section.title.toLowerCase().includes(searchTerm.toLowerCase()) || hasSearchTerm(section.content, searchTerm))
        .map(section => slugify(section.title));
      setExpandedSections(filteredIds);
    }
    setAllExpanded(!allExpanded);
  };
  
  useEffect(() => {
    const filteredIds = sections
        .filter(section => !searchTerm || section.title.toLowerCase().includes(searchTerm.toLowerCase()) || hasSearchTerm(section.content, searchTerm))
        .map(section => slugify(section.title));
    setExpandedSections(filteredIds);
    setAllExpanded(true);
  }, [searchTerm, sections]);

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

  const hasSearchTerm = (nodes: React.ReactNode, term: string): boolean => {
    if (!term.trim()) return true;
    const lowerCaseTerm = term.toLowerCase();

    return React.Children.toArray(nodes).some(node => {
      if (typeof node === 'string') {
        return node.toLowerCase().includes(lowerCaseTerm);
      }
      if (React.isValidElement(node) && node.props.children) {
        return hasSearchTerm(node.props.children, term);
      }
      return false;
    });
  };

  return (
    <>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {logo && <Image src={logo.imageUrl} alt="BMV Logo" width={32} height={32} className="rounded-md" data-ai-hint={logo.imageHint} />}
                    <div className="flex flex-col">
                        <h1 className="text-md font-bold text-primary">Dossiê</h1>
                    </div>
                </div>
                <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <ChevronLeft />
                    </Button>
                </SidebarTrigger>
            </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
          <div className="p-4">
             <DossierSidebar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
          </div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div ref={contentRef} className="flex flex-col min-h-screen bg-background overflow-auto">
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center">
                    <SidebarTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu />
                      </Button>
                    </SidebarTrigger>
                </div>

                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                </div>
            </div>
           </header>
          <main id="content" className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-end mb-4">
                <Button variant="outline" onClick={toggleExpandAll}>
                    {allExpanded ? <ListCollapse className="mr-2 h-4 w-4" /> : <Expand className="mr-2 h-4 w-4" />}
                    {allExpanded ? 'Recolher' : 'Expandir'}
                </Button>
            </div>
            <Accordion
              type="multiple"
              value={expandedSections}
              onValueChange={setExpandedSections}
              className="w-full"
            >
              <DossierContent searchTerm={searchTerm} />
            </Accordion>
          </main>
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
      </SidebarInset>
    </>
  );
}
