"use client";

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/utils';
import { sections } from './content';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDossierSearch } from '@/hooks/useDossierSearch';

interface DossierSidebarProps {
  onSearchTermChange: (term: string) => void;
}

interface TocItem {
  level: number;
  title: string;
  id: string;
  children: TocItem[];
}

const generateToc = (searchTerm: string, hasSearchTerm: (nodes: React.ReactNode) => boolean): TocItem[] => {
  const tocItems: TocItem[] = [];

  sections.forEach(section => {
    const sectionIsVisible = !searchTerm || section.title.toLowerCase().includes(searchTerm.toLowerCase()) || hasSearchTerm(section.content);
    
    if (sectionIsVisible) {
      const subHeadings: TocItem[] = [];
      
      const findSubHeadings = (nodes: React.ReactNode) => {
        React.Children.forEach(nodes, node => {
          if (React.isValidElement(node)) {
            const nodeProps = node.props as any;
            if (nodeProps.id && node.type === 'h3') {
              const title = React.Children.toArray(nodeProps.children).find(child => typeof child === 'string') as string || '';
              if (title && (!searchTerm || title.toLowerCase().includes(searchTerm.toLowerCase()))) {
                subHeadings.push({
                  level: 3,
                  title: title,
                  id: nodeProps.id,
                  children: []
                });
              }
            } else if (nodeProps.children) {
              findSubHeadings(nodeProps.children);
            }
          }
        });
      };

      findSubHeadings(section.content);

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
};

const allIds = sections.flatMap(section => {
  const ids = [slugify(section.title)];
  const findIds = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, node => {
      if (React.isValidElement(node)) {
        if ((node.props as any).id) {
          ids.push((node.props as any).id);
        }
        if ((node.props as any).children) {
          findIds((node.props as any).children);
        }
      }
    });
  };
  findIds(section.content);
  return ids;
});

export const DossierSidebar: React.FC<DossierSidebarProps> = ({ onSearchTermChange }) => {
  const [activeId, setActiveId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { hasSearchTerm } = useDossierSearch(sections, searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchTermChange(term);
  };
  
  const tocItems = generateToc(searchTerm, hasSearchTerm);

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
  
  return (
    <div className="space-y-4">
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
                    activeId === item.id
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
