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
  LogOut,
  Printer,
} from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';


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
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);


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

  const handleSignOut = async () => {
    if (auth) {
        await signOut(auth);
        
        const userRole = await user?.getIdTokenResult()?.then(r => r.claims.role);
        if (userRole === 'admin_master') {
            router.push('/admin');
        } else {
            router.push('/login');
        }
    }
  };

  const handlePrint = () => {
    window.print();
  };
  
    if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Verificando acesso...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-muted/20 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70 no-print">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,hsla(var(--accent),0.10),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,hsla(var(--primary),0.08),transparent_30%)]" />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 print-container">
        <div
          className="flex flex-col md:flex-row gap-6 lg:gap-8"
        >
          
          {/* Sidebar */}
          <aside id="dossier-sidebar" className="w-full md:w-72 lg:w-80 flex-shrink-0 md:sticky md:top-0 md:h-screen md:py-6 no-print">
            <motion.div
              className="h-full glass-panel p-4 rounded-2xl transition-opacity duration-300 md:opacity-80 md:hover:opacity-100 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }}
            >
              <div className="flex items-center justify-center mb-4 pb-4 border-b flex-shrink-0">
                <Logo />
              </div>
              <DossierSidebar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
            </motion.div>
          </aside>

          {/* Main View */}
          <div 
            ref={contentRef}
            className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto space-y-2 py-6 print-content"
          >
            {/* Header */}
            <header id="dossier-header" className="sticky top-6 md:top-0 z-30 flex justify-between items-center p-3 sm:p-4 glass-panel rounded-2xl border-b shadow-lg overflow-hidden no-print">
               <div className="flex items-center gap-2">
                 <h1 className="text-lg font-semibold ml-1 hidden sm:block">Dossiê Técnico</h1>
               </div>
              <div className="flex items-center space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleExpandAll}
                    className="gap-2"
                  >
                      {allExpanded ? <ListCollapse className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                      <span className="hidden sm:inline">{allExpanded ? 'Recolher' : 'Expandir'}</span>
                  </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handlePrint}
                    className="gap-2"
                  >
                      <Printer className="h-4 w-4" />
                      <span className="hidden sm:inline">Imprimir</span>
                  </Button>
                <ThemeToggle />
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSignOut}
                    className="gap-2"
                  >
                      <LogOut className="h-4 w-4" />
                      <span className="hidden sm:inline">Sair</span>
                  </Button>
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
              className="flex-1 px-2 pt-2 pb-24 space-y-2"
            >
                <Accordion
                  type="multiple"
                  value={expandedSections}
                  onValueChange={setExpandedSections}
                  className="w-full space-y-2"
                  id="dossier-accordion"
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
                      className="fixed bottom-6 right-6 no-print"
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
          </div>
        </div>
      </div>
    </div>
  );
}
