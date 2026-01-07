"use client";

import { useState, useEffect } from 'react';
import { slugify } from '@/lib/utils';
import { sections } from './content';

interface DossierSidebarProps {
  searchTerm: string;
}

const tocItems = sections.map(section => {
  const mainHeading = {
    level: 2,
    title: section.title,
    id: slugify(section.title),
  };
  
  // Basic regex to find h3 content; for real-world use a parser would be better.
  const contentString = JSON.stringify(section.content);
  const subHeadings = (contentString.match(/"text-xl font-semibold[^>]*>([^<]+)/g) || [])
    .map(h => {
        const title = h.split('>').pop()?.replace(/"/g, '').trim();
        if(!title) return null;
        // This is a simplification; sub-ids might not perfectly match content.tsx
        return {
            level: 3,
            title: title,
            id: slugify(title)
        }
    }).filter(Boolean);

  return [mainHeading];
}).flat();


export const DossierSidebar: React.FC<DossierSidebarProps> = ({ searchTerm }) => {
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

    const elements = tocItems.map(item => document.getElementById(item.id)).filter(Boolean);
    elements.forEach(el => observer.observe(el!));

    return () => elements.forEach(el => observer.unobserve(el!));
  }, []);

  const filteredToc = tocItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">📑 Manual de Operações</h3>
      {filteredToc.length > 0 ? (
        <nav aria-label="Sumário">
          <ul className="space-y-2">
            {filteredToc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-sm transition-colors hover:text-primary ${
                    activeId === item.id
                      ? 'font-semibold text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhuma seção encontrada.</p>
      )}
    </div>
  );
};
