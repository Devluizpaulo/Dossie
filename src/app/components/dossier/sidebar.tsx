"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { slugify } from '@/lib/utils';
import { sections } from './content';
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDossierSearch } from '@/hooks/useDossierSearch';

interface DossierSidebarProps {
  onSearchTermChange: (term: string) => void;
  searchTerm: string;
}

interface TocItem {
  level: number;
  title: string;
  id: string;
  children: TocItem[];
}

const allIds = sections.flatMap(section => {
  const ids = [slugify(section.title)];
  const findIds = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, node => {
      if (React.isValidElement(node)) {
        const nodeProps = node.props as any;
        if (nodeProps.id && (node.type === 'h3' || node.type === 'h4')) {
          ids.push(nodeProps.id);
        }
        if (nodeProps.children) {
          findIds(nodeProps.children);
        }
      }
    });
  };
  findIds(section.content);
  return ids;
});

export const DossierSidebar: React.FC<DossierSidebarProps> = ({ onSearchTermChange, searchTerm }) => {
  const [activeId, setActiveId] = useState('');
  
  const { hasSearchTerm } = useDossierSearch(sections, searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };
  
  const generateToc = useCallback((searchTerm: string): TocItem[] => {
    const tocItems: TocItem[] = [];
  
    sections.forEach(section => {
      const sectionIsVisible = !searchTerm || section.title.toLowerCase().includes(searchTerm.toLowerCase()) || hasSearchTerm(section.content);
      
      if (sectionIsVisible) {
        const subHeadings: TocItem[] = [];
        
        const findSubHeadings = (nodes: React.ReactNode, level: number) => {
          React.Children.forEach(nodes, node => {
            if (React.isValidElement(node)) {
              const nodeProps = node.props as any;
              const nodeType = node.type as string;

              if (nodeProps.id && (nodeType === 'h3' || nodeType === 'h4')) {
                const title = React.Children.toArray(nodeProps.children).find(child => typeof child === 'string') as string || '';
                
                if (title && (!searchTerm || title.toLowerCase().includes(searchTerm.toLowerCase()))) {
                  const newSubHeading: TocItem = {
                    level: level,
                    title: title,
                    id: nodeProps.id,
                    children: []
                  };

                  if (nodeType === 'h3') {
                    subHeadings.push(newSubHeading);
                  } else if (nodeType === 'h4' && subHeadings.length > 0) {
                    subHeadings[subHeadings.length - 1].children.push(newSubHeading);
                  }
                }
              }
              
              if (nodeProps.children) {
                if (nodeType === 'h3') {
                  // Ao encontrar um h3, o próximo nível de aninhamento para h4 é 4
                  findSubHeadings(nodeProps.children, 4);
                } else {
                  findSubHeadings(nodeProps.children, level);
                }
              }
            }
          });
        };
  
        findSubHeadings(section.content, 3);
  
        if (!searchTerm || section.title.toLowerCase().includes(searchTerm.toLowerCase()) || subHeadings.length > 0) {
          tocItems.push({
            level: 2,
            title: section.title,
            id: slugify(section.title),
            children: subHeadings,
          });
        }
      }
    });
  
    return tocItems;
  }, [hasSearchTerm]);
  
  const tocItems = useMemo(() => generateToc(searchTerm), [searchTerm, generateToc]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    const elements = allIds.map(id => document.getElementById(id)).filter(Boolean);
    elements.forEach(el => observer.observe(el!));

    return () => elements.forEach(el => el && observer.unobserve(el));
  }, []);

  const renderToc = (items: TocItem[]) => {
    return (
      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative group">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                  if(history.pushState) {
                      history.pushState(null, "", `#${item.id}`);
                  } else {
                      location.hash = `#${item.id}`;
                  }
                }}
                className={`relative block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:translate-x-0.5 ${
                  isActive ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="toc-pill"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </a>
              {item.children && item.children.length > 0 && (
                <ul className="pl-4 mt-2 space-y-2 border-l border-border/60">
                  {item.children.map(child => {
                    const isChildActive = activeId === child.id;
                    return (
                      <li key={child.id} className="relative">
                        <a
                          href={`#${child.id}`}
                          onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(child.id)?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start'
                              });
                              if(history.pushState) {
                                  history.pushState(null, "", `#${child.id}`);
                              } else {
                                  location.hash = `#${child.id}`;
                              }
                          }}
                          className={`relative block rounded-md px-3 py-1.5 text-sm transition-all duration-200 hover:text-primary hover:translate-x-0.5 ${
                            isChildActive ? 'font-semibold text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {isChildActive && (
                            <motion.span
                              layoutId="toc-child-pill"
                              className="absolute inset-0 rounded-md bg-primary/8"
                              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                            />
                          )}
                          <span className="relative z-10">{child.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
  
  return (
    <div className="space-y-4 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
      <h3 className="text-lg font-semibold text-foreground">Sumário</h3>
      
      <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar no dossiê..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9"
          />
        </div>

        <nav aria-label="Sumário">
          {renderToc(tocItems)}
        </nav>

        {/* Annexes Links */}
        <div className="border-t pt-4 mt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Anexos</p>
          <nav className="space-y-2">
            <a href="/anexo-1" className="block text-sm text-primary hover:text-primary/80 transition-colors">
              Anexo I – Evidências
            </a>
            <a href="/anexo-2" className="block text-sm text-primary hover:text-primary/80 transition-colors">
              Anexo II – Linha do Tempo
            </a>
            <a href="/anexo-3" className="block text-sm text-primary hover:text-primary/80 transition-colors">
              Anexo III – Riscos
            </a>
            <a href="/anexo-4" className="block text-sm text-primary hover:text-primary/80 transition-colors">
              Anexo IV – Paridade Funcional
            </a>
            <a href="/anexo-5" className="block text-sm text-primary hover:text-primary/80 transition-colors">
              Anexo V – Fluxos
            </a>
          </nav>
        </div>
    </div>
  );
};
