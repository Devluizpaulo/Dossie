"use client";

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/utils';
import { sections } from './content';
import React from 'react';

interface DossierSidebarProps {
  onSearchTermChange: (term: string) => void;
}

interface TocItem {
  level: number;
  title: string;
  id: string;
  children?: TocItem[];
}

const tocItems: TocItem[] = sections.map(section => {
  const mainHeading: TocItem = {
    level: 2,
    title: section.title,
    id: slugify(section.title),
    children: [],
  };

  // Function to recursively find h3s
  const findSubHeadings = (nodes: React.ReactNode): TocItem[] => {
    const headings: TocItem[] = [];
    React.Children.forEach(nodes, node => {
      if (React.isValidElement(node)) {
        // Check for h3 equivalent
        if (node.props.className && typeof node.props.className === 'string' && node.props.className.includes('text-xl font-semibold')) {
          const title = React.Children.toArray(node.props.children).join('');
          if (title) {
            headings.push({
              level: 3,
              title: title,
              id: node.props.id || slugify(title),
              children: []
            });
          }
        }
        if (node.props.children) {
          headings.push(...findSubHeadings(node.props.children));
        }
      }
    });
    return headings;
  };
  
  mainHeading.children = findSubHeadings(section.content);
  return mainHeading;
});

const allIds = tocItems.flatMap(item => [item.id, ...(item.children?.map(child => child.id) || [])]);


export const DossierSidebar: React.FC<DossierSidebarProps> = () => {
  const [activeId, setActiveId] = useState('');

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
      <h3 className="text-lg font-semibold text-foreground">📑 Manual de Operações</h3>
      
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
    </div>
  );
};
