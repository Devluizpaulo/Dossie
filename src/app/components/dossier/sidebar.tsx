"use client";

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/utils';
import { sections } from './content';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DossierSidebarProps {
  onSearchTermChange: (term: string) => void;
}

interface TocItem {
  level: number;
  title: string;
  id: string;
  children: TocItem[];
}

// Helper to recursively search for text in React nodes
const hasSearchTerm = (nodes: React.ReactNode, term: string): boolean => {
  if (!term.trim()) return true;
  const lowerCaseTerm = term.toLowerCase();

  return React.Children.toArray(nodes).some(node => {
    if (typeof node === 'string') {
      return node.toLowerCase().includes(lowerCaseTerm);
    }
    if (React.isValidElement(node) && (node.props as any).children) {
      return hasSearchTerm((node.props as any).children, term);
    }
    return false;
  });
};


const generateToc = (searchTerm: string) => {
  const tocItems: TocItem[] = [];

  sections.forEach(section => {
    const sectionIsVisible = !searchTerm || section.title.toLowerCase().includes(searchTerm.toLowerCase()) || hasSearchTerm(section.content, searchTerm);
    
    if (sectionIsVisible) {
      const mainHeading: TocItem = {
        level: 2,
        title: section.title,
        id: slugify(section.title),
        children: [],
      };

      const findSubHeadings = (nodes: React.ReactNode): TocItem[] => {
        const headings: TocItem[] = [];
        React.Children.forEach(nodes, node => {
          if (React.isValidElement(node)) {
            const nodeProps = node.props as any;
            const isH3 = nodeProps.className && typeof nodeProps.className === 'string' && nodeProps.className.includes('text-xl font-semibold');
            
            if (isH3) {
              const title = React.Children.toArray(nodeProps.children)
                .filter(child => typeof child === 'string')
                .join('');
              if (title && (!searchTerm || title.toLowerCase().includes(searchTerm.toLowerCase()) || hasSearchTerm(section.content, searchTerm))) {
                headings.push({
                  level: 3,
                  title: title,
                  id: nodeProps.id || slugify(title),
                  children: []
                });
              }
            } else if (nodeProps.children) {
              // only dive deeper if the parent section is visible
              headings.push(...findSubHeadings(nodeProps.children));
            }
          }
        });
        return headings;
      };
      
      const subHeadings = findSubHeadings(section.content);
      
      if (!searchTerm || section.title.toLowerCase().includes(searchTerm.toLowerCase()) || subHeadings.length > 0) {
        mainHeading.children = subHeadings;
        tocItems.push(mainHeading);
      }
    }
  });

  return tocItems;
};


const allIds = sections.flatMap(section => {
  const ids = [slugify(section.title)];
  React.Children.forEach(section.content, node => {
    if (React.isValidElement(node) && (node.props as any).id) {
      ids.push((node.props as any).id);
    }
  });
  return ids;
});


export const DossierSidebar: React.FC<DossierSidebarProps> = ({ onSearchTermChange }) => {
  const [activeId, setActiveId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchTermChange(term);
  };
  
  const tocItems = generateToc(searchTerm);

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

    return () => elements.forEach(el => observer.unobserve(el!));
  }, []);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Dossiê</h3>
      
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
          <ul className="space-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                     // Update URL hash without jumping
                    if(history.pushState) {
                        history.pushState(null, "", `#${item.id}`);
                    } else {
                        location.hash = `#${item.id}`;
                    }
                  }}
                  className={`block text-sm font-medium transition-colors hover:text-primary ${
                    activeId === item.id && (!item.children || item.children.length === 0)
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {item.title}
                </a>
                {item.children && item.children.length > 0 && (
                  <ul className="pl-4 mt-2 space-y-2 border-l border-border">
                    {item.children.map(child => (
                       <li key={child.id}>
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
                           className={`block text-sm transition-colors hover:text-primary ${
                            activeId === child.id
                              ? 'font-semibold text-primary'
                              : 'text-muted-foreground'
                          }`}
                         >
                           {child.title}
                         </a>
                       </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
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
          </nav>
        </div>
    </div>
  );
};
