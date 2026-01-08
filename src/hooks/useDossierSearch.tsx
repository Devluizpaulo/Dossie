import React, { useMemo, useEffect, useCallback } from 'react';
import { slugify } from '@/lib/utils';

type Section = {
  title: string;
  content: React.ReactNode;
};

// Componente para realçar o texto
const Highlight = ({ text, highlight }: { text: string; highlight?: string }) => {
  if (!highlight || !highlight.trim()) {
    return <>{text}</>;
  }
  try {
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? <mark key={i}>{part}</mark> : <React.Fragment key={i}>{part}</React.Fragment>
        )}
      </>
    );
  } catch (e) {
    // Fallback for invalid regex
    return <>{text}</>;
  }
};

export const useDossierSearch = (
  sections: Section[],
  searchTerm?: string,
  setExpandedSections?: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const lowerCaseSearchTerm = useMemo(() => searchTerm?.toLowerCase() || '', [searchTerm]);

  const hasSearchTerm = useCallback((nodes: React.ReactNode): boolean => {
    if (!lowerCaseSearchTerm) return true;

    return React.Children.toArray(nodes).some(node => {
      if (typeof node === 'string') {
        return node.toLowerCase().includes(lowerCaseSearchTerm);
      }
      if (React.isValidElement(node) && (node.props as any).children) {
        // Não busca dentro de 'a' tags para não quebrar links
        if (node.type === 'a') return false;
        return hasSearchTerm((node.props as any).children);
      }
      return false;
    });
  }, [lowerCaseSearchTerm]);

  const filteredSections = useMemo(() => {
    if (!lowerCaseSearchTerm) {
      return sections;
    }
    return sections.filter(section => 
        section.title.toLowerCase().includes(lowerCaseSearchTerm) || hasSearchTerm(section.content)
    );
  }, [sections, lowerCaseSearchTerm, hasSearchTerm]);

  useEffect(() => {
    if (setExpandedSections && lowerCaseSearchTerm) {
      setExpandedSections(filteredSections.map(s => slugify(s.title)));
    }
  }, [filteredSections, lowerCaseSearchTerm, setExpandedSections]);
  
  const addHighlight = useCallback((nodes: React.ReactNode): React.ReactNode => {
    if (!lowerCaseSearchTerm) return nodes;

    return React.Children.map(nodes, (node, index) => {
        if (typeof node === 'string') {
            return <Highlight text={node} highlight={searchTerm} key={index} />;
        }
        if (React.isValidElement(node) && (node.props as any).children) {
             return React.cloneElement(node, {
                ...node.props,
                key: index,
                children: addHighlight((node.props as any).children),
            });
        }
        return node;
    });
  }, [lowerCaseSearchTerm, searchTerm]);

  return {
    filteredSections,
    Highlight: ({ text }: { text: string }) => <Highlight text={text} highlight={searchTerm} />,
    addHighlight,
    hasSearchTerm,
  };
};
