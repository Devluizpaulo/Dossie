"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function DossierPage() {
  const allSectionIds = useMemo(() => sections.map(s => slugify(s.title)), []);
  
  const [expandedSections, setExpandedSections] = useState<string[]>(allSectionIds);
  const [allExpanded, setAllExpanded] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
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
      const current = contentEl.scrollTop;
      const max = contentEl.scrollHeight - contentEl.clientHeight;
      setShowBackToTop(current > 300);
      setScrollProgress(max > 0 ? current / max : 0);
    };

    checkScroll();
    contentEl.addEventListener('scroll', checkScroll);
    return () => contentEl.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <div className="min-h-screen page-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,hsla(var(--accent),0.10),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,hsla(var(--primary),0.08),transparent_30%)]" />
      </div>

      {/* Main Container */}
      <div className="container mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
        >
          
          {/* Sidebar */}
          <aside className="w-full md:w-80 lg:w-96 flex-shrink-0">
            <motion.div
              className="sticky top-4 h-[calc(100vh-2rem)] glass-panel p-4 rounded-2xl transition-transform duration-200 hover:-translate-y-1 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }}
            >
              <div className="flex items-center justify-center mb-4 pb-4 border-b">
                <Logo />
              </div>
              <DossierSidebar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
            </motion.div>
          </aside>

          {/* Main View */}
          <div className="flex-1 flex flex-col min-w-0 space-y-2">
            {/* Header */}
            <header className="sticky top-4 z-30 flex justify-between items-center p-4 glass-panel rounded-2xl border-b shadow-sm overflow-hidden">
              <div className="flex items-center">
                <Logo />
                <h1 className="text-xl font-semibold ml-3">Dossiê Técnico</h1>
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

              <div className="absolute left-3 right-3 -bottom-0.5 h-1 rounded-full bg-border/60 overflow-hidden">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
                  style={{ scaleX: scrollProgress }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.7 }}
                />
              </div>
            </header>

            {/* Content */}
            <main
              id="content"
              ref={contentRef}
              className="flex-1 overflow-y-auto p-6 pb-24 glass-panel rounded-2xl shadow-sm relative"
            >
                <Accordion
                  type="multiple"
                  value={expandedSections}
                  onValueChange={setExpandedSections}
                  className="w-full space-y-2"
                >
                  <DossierContent searchTerm={searchTerm} setExpandedSections={setExpandedSections} />
                </Accordion>
                
                <AnimatePresence>
                  {showBackToTop && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="fixed bottom-6 right-6 md:absolute md:bottom-6 md:right-6"
                    >
                      <Button
                        variant="default"
                        size="icon"
                        className="rounded-full h-10 w-10 shadow-lg hover:shadow-2xl transition-shadow"
                        onClick={scrollToTop}
                        aria-label="Voltar ao topo"
                      >
                        <ArrowUp className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
            </main>
            {/* Fixed Footer */}
            <motion.div
              className="fixed bottom-4 left-4 right-4 z-30"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
            >
              <div className="glass-panel rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleExpandAll}
                    className="gap-2"
                    aria-label={allExpanded ? 'Recolher tudo' : 'Expandir tudo'}
                  >
                    {allExpanded ? <ListCollapse className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                    <span className="hidden sm:inline">{allExpanded ? 'Recolher tudo' : 'Expandir tudo'}</span>
                  </Button>
                  <Button size="sm" variant="secondary" onClick={scrollToTop} className="gap-2" aria-label="Ir ao topo">
                    <ArrowUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Topo</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
