"use client";

import { useState, useEffect, useMemo, useCallback, useRef, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MEDIA_FILES,
  SENDER_COLORS,
  SENDER_NAME_COLORS,
  normalizeSender,
  isBMV,
} from "./whatsapp-data";
import Image from "next/image";
import {
  Printer,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  Music,
  Loader2,
  MessageSquare,
  Calendar,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

/* ── Lightbox Context ── */
const LightboxContext = createContext<{
  openLightbox: (src: string, alt: string) => void;
}>({ openLightbox: () => {} });

function useLightbox() {
  return useContext(LightboxContext);
}

/* ── Lightbox Modal ── */
function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => setScale((s) => Math.min(s * 1.3, 6));
  const handleZoomOut = () => setScale((s) => Math.max(s / 1.3, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) setScale((s) => Math.min(s * 1.15, 6));
    else setScale((s) => Math.max(s / 1.15, 0.5));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      posStart.current = { ...position };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: posStart.current.x + (e.clientX - dragStart.current.x),
        y: posStart.current.y + (e.clientY - dragStart.current.y),
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s * 1.3, 6));
      if (e.key === "-") setScale((s) => Math.max(s / 1.3, 0.5));
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onWheel={handleWheel}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Filename */}
      <div className="absolute top-4 left-4 z-[101] text-white/70 text-xs font-mono bg-black/40 px-3 py-1.5 rounded-lg">
        {alt}
      </div>

      {/* Image */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            unoptimized
            draggable={false}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[101] flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-xl px-2 py-1.5 border border-white/10">
        <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-8 w-8 text-white hover:bg-white/10 hover:text-white">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-white/70 text-xs font-mono w-12 text-center">
          {Math.round(scale * 100)}%
        </span>
        <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-8 w-8 text-white hover:bg-white/10 hover:text-white">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <div className="w-px h-5 bg-white/20 mx-1" />
        <Button variant="ghost" size="icon" onClick={handleReset} className="h-8 w-8 text-white hover:bg-white/10 hover:text-white">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/* ── Types ── */
interface ParsedMessage {
  date: string;
  time: string;
  sender: string;
  text: string;
  media?: string;
  isSystem: boolean;
}

interface DayGroup {
  date: string;
  dateLabel: string;
  messages: ParsedMessage[];
}

/* ── Parser ── */
const MSG_REGEX = /^(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2}) - (.+?)$/;

function parseWhatsAppExport(raw: string): DayGroup[] {
  const lines = raw.split("\n");
  const messages: ParsedMessage[] = [];
  let current: ParsedMessage | null = null;

  for (const line of lines) {
    // Strip hidden characters and BOM
    const trimmed = line.replace(/^\uFEFF/, "").replace(/\u200E/g, "").trim();
    if (!trimmed) continue;

    // Format 1: 06/11/2025 10:48 - Text/Sender: Text
    const match1 = trimmed.match(/^(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2}) - (.+)$/);
    // Format 2: [11/06/2025, 12:40:31] Sender: Text
    const match2 = trimmed.match(/^\[(\d{2}\/\d{2}\/\d{4}),\s(\d{2}:\d{2}:\d{2})\]\s(.+)$/);

    if (match1 || match2) {
      if (current) messages.push(current);
      
      let date, time, rest;
      if (match1) {
        [, date, time, rest] = match1;
      } else {
        [, date, time, rest] = match2!;
        // Normalize time to HH:MM for internal consistency
        time = time.slice(0, 5);
      }

      const colonIdx = rest.indexOf(": ");

      if (colonIdx === -1) {
        // System message
        current = { date, time, sender: "", text: rest, isSystem: true };
      } else {
        const sender = rest.slice(0, colonIdx);
        let text = rest.slice(colonIdx + 2);

        // Detect attached file
        let media: string | undefined;
        const attachMatch = text.match(/^(.+?) \(arquivo anexado\)$/) || text.match(/^(.+?) <anexado: .+?>$/) || text.match(/^(.+?) • .+? documento omitido$/);
        
        if (attachMatch) {
          media = attachMatch[1].trim();
          text = "";
        }
        
        // Handle specific media markers in text
        if (text.includes("documento omitido") || text.includes("imagem ocultada") || text.includes("vídeo omitido")) {
           // Try to extract filename if present
           const fileMatch = text.match(/^(.+?)\s(documento omitido|imagem ocultada|vídeo omitido)$/);
           if (fileMatch) {
             media = fileMatch[1].trim();
             text = "";
           }
        }

        if (text === "<Mídia oculta>") {
          current = { date, time, sender, text: "[Mídia não exportada]", isSystem: false, media: undefined };
        } else {
          current = { date, time, sender, text, media, isSystem: false };
        }
      }
    } else if (current) {
      // Continuation line
      current.text += (current.text ? "\n" : "") + trimmed;
    }
  }
  if (current) messages.push(current);

  // Group by date
  const groups: Map<string, ParsedMessage[]> = new Map();
  for (const msg of messages) {
    const arr = groups.get(msg.date) || [];
    arr.push(msg);
    groups.set(msg.date, arr);
  }

  const MONTHS = [
    "", "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  return Array.from(groups.entries()).map(([date, msgs]) => {
    const [d, m, y] = date.split("/").map(Number);
    const dt = new Date(y, m - 1, d);
    const weekday = WEEKDAYS[dt.getDay()];
    const monthName = MONTHS[m];
    return {
      date,
      dateLabel: `${weekday}, ${d} de ${monthName} de ${y}`,
      messages: msgs,
    };
  });
}

/* ── Message Bubble ── */
function MsgBubble({ msg, basePath }: { msg: ParsedMessage; basePath: string }) {
  const [imgError, setImgError] = useState(false);
  const { openLightbox } = useLightbox();

  if (msg.isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 text-[11px] px-3 py-1 rounded-full text-center max-w-[80%]">
          {msg.text}
        </span>
      </div>
    );
  }

  if (msg.text === "Mensagem apagada") {
    return (
      <div className="flex justify-center my-1">
        <span className="text-[11px] text-muted-foreground italic">
          {normalizeSender(msg.sender)}: mensagem apagada
        </span>
      </div>
    );
  }

  const normalized = normalizeSender(msg.sender);
  const isRight = isBMV(normalized);
  const bgColor = SENDER_COLORS[normalized] || "bg-muted/50 border-border";
  const nameColor = SENDER_NAME_COLORS[normalized] || "text-foreground";
  const mediaInfo = msg.media ? MEDIA_FILES[msg.media] : undefined;

  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"} mb-1.5 msg-bubble`}>
      <div className="msg-meta hidden print:block text-[8pt] text-muted-foreground min-w-[120px] text-right">
        {msg.date} {msg.time}
      </div>
      <div className={`max-w-[85%] md:max-w-[75%] rounded-xl px-3 py-1.5 border text-[13px] ${bgColor} msg-text`}>
        <p className={`text-[11px] font-bold mb-0.5 ${nameColor}`}>
          {normalized} {isRight && <span className="print:hidden">✓</span>}
        </p>

        {/* Image */}
        {msg.media && mediaInfo?.type === "image" && !imgError && (
          <div
            className="my-1 cursor-pointer group/img relative"
            onClick={() => openLightbox(`${basePath}/${msg.media}`, msg.media!)}
          >
            <Image
              src={`${basePath}/${msg.media}`}
              alt={msg.media}
              width={280}
              height={180}
              className="rounded-lg max-w-full h-auto transition-opacity group-hover/img:opacity-90"
              unoptimized
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
              <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <ZoomIn className="h-3 w-3" /> Ampliar
              </span>
            </div>
          </div>
        )}

        {/* Video */}
        {msg.media && msg.media.endsWith(".mp4") && (
          <div className="my-1">
            <video 
              src={`${basePath}/${msg.media}`} 
              controls 
              className="rounded-lg max-w-full h-auto max-h-[300px]"
            />
          </div>
        )}

        {/* PDF */}
        {msg.media && mediaInfo?.type === "pdf" && (
          <a href={`${basePath}/${msg.media}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline my-1 text-xs">
            <FileText className="h-4 w-4 text-red-500 flex-shrink-0" />
            {mediaInfo.label || msg.media}
          </a>
        )}

        {/* Audio */}
        {msg.media && (mediaInfo?.type === "audio" || msg.media.endsWith(".opus")) && (
          <div className="flex flex-col gap-1 my-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Music className="h-3 w-3" /> Áudio ({msg.media})
            </div>
            <audio src={`${basePath}/${msg.media}`} controls className="h-8 w-full max-w-[240px]" />
          </div>
        )}

        {/* Text */}
        {msg.text && (
          <p className="whitespace-pre-wrap break-words leading-relaxed">
            {msg.text}
          </p>
        )}

        <p className="text-[10px] text-muted-foreground text-right mt-0.5">{msg.time}</p>
      </div>
    </div>
  );
}

/* ── Main Transcript Component ── */
export function WhatsAppTranscript() {
  const [selectedGroup, setSelectedGroup] = useState<"suporte" | "multiledgers">("suporte");
  const [rawData, setRawData] = useState<Record<string, string | null>>({
    suporte: null,
    multiledgers: null,
  });
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  // Fetch and parse
  const loadData = useCallback(async (group: "suporte" | "multiledgers") => {
    if (rawData[group]) {
      setExpanded(true);
      return;
    }
    setLoading(true);
    try {
      const path = group === "suporte" ? "/Image/whatsapp/chat.txt" : "/Image/whatsapp-multiledgers/chat.txt";
      const res = await fetch(path);
      const text = await res.text();
      setRawData(prev => ({ ...prev, [group]: text }));
      setExpanded(true);
    } catch (e) {
      console.error("Erro ao carregar transcrição:", e);
    } finally {
      setLoading(false);
    }
  }, [rawData]);

  const dayGroups = useMemo(() => {
    const currentRaw = rawData[selectedGroup];
    if (!currentRaw) return [];
    return parseWhatsAppExport(currentRaw);
  }, [rawData, selectedGroup]);

  // Search filter
  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return dayGroups;
    const term = searchTerm.toLowerCase();
    return dayGroups
      .map((g) => ({
        ...g,
        messages: g.messages.filter(
          (m) =>
            m.text.toLowerCase().includes(term) ||
            m.sender.toLowerCase().includes(term) ||
            (m.media && m.media.toLowerCase().includes(term))
        ),
      }))
      .filter((g) => g.messages.length > 0);
  }, [dayGroups, searchTerm]);

  const totalFiltered = useMemo(
    () => filteredGroups.reduce((a, g) => a + g.messages.length, 0),
    [filteredGroups]
  );

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  const expandAll = () => setExpandedDays(new Set(filteredGroups.map((g) => g.date)));
  const collapseAll = () => setExpandedDays(new Set());

  // Deep linking listener
  useEffect(() => {
    const handleScrollToDate = (e: any) => {
      const { date } = e.detail;
      if (!date) return;

      // Ensure data is loaded
      if (!rawData[selectedGroup]) {
        loadData(selectedGroup).then(() => {
          // Retry after data is loaded
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("whatsapp-scroll-to-date", { detail: { date } }));
          }, 500);
        });
        return;
      }

      // Expand the day
      setExpandedDays((prev) => {
        const next = new Set(prev);
        next.add(date);
        return next;
      });

      // Clear search to show the date
      setSearchTerm("");

      // Scroll to the transcript section first
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      // Then try to scroll to the specific day group
      setTimeout(() => {
        const element = document.getElementById(`chat-day-${date}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Flash effect
          element.classList.add("ring-2", "ring-primary", "ring-offset-2");
          setTimeout(() => element.classList.remove("ring-2", "ring-primary", "ring-offset-2"), 2000);
        }
      }, 300);
    };

    window.addEventListener("whatsapp-scroll-to-date", handleScrollToDate);
    return () => window.removeEventListener("whatsapp-scroll-to-date", handleScrollToDate);
  }, [rawData, selectedGroup, loadData, filteredGroups]);

  if (!expanded) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:border-primary transition-colors overflow-hidden border-2" onClick={() => { setSelectedGroup("multiledgers"); loadData("multiledgers"); }}>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Fase 1</Badge>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Jun/25 - Nov/25</span>
              </div>
              <h3 className="font-bold text-sm">Multiledgers - suporte BMV</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Primeiro canal de suporte. Registro de falhas iniciais, problemas de DNS e migração de sistema legado.
              </p>
              <Button variant="secondary" size="sm" className="w-full h-8 text-xs gap-2">
                <MessageSquare className="h-3 w-3" /> Abrir Histórico
              </Button>
            </div>
          </Card>

          <Card className="cursor-pointer hover:border-primary transition-colors overflow-hidden border-2" onClick={() => { setSelectedGroup("suporte"); loadData("suporte"); }}>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Fase 2</Badge>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Nov/25 - Mar/26</span>
              </div>
              <h3 className="font-bold text-sm">BMV {"<>"} Multi - SUPORTE</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Canal consolidado. Registro de incidentes críticos, erros de emissão de UCS e queda total de sistema.
              </p>
              <Button variant="secondary" size="sm" className="w-full h-8 text-xs gap-2">
                <MessageSquare className="h-3 w-3" /> Abrir Histórico
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
    <div className="space-y-4 transcript-container" ref={containerRef}>
      {/* Lightbox */}
      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
      {/* Controls */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm pb-3 pt-1 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              variant={selectedGroup === "multiledgers" ? "default" : "outline"} 
              size="sm" 
              onClick={() => { setSelectedGroup("multiledgers"); loadData("multiledgers"); }}
              className="text-xs h-7"
            >
              Fase 1 (Jun-Nov)
            </Button>
            <Button 
              variant={selectedGroup === "suporte" ? "default" : "outline"} 
              size="sm" 
              onClick={() => { setSelectedGroup("suporte"); loadData("suporte"); }}
              className="text-xs h-7"
            >
              Fase 2 (Nov-Mar)
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(false)} className="text-xs h-7 no-print">
            Voltar
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar mensagens, remetente ou arquivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-8 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{filteredGroups.length} dias</span>
            <span className="text-border">|</span>
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{totalFiltered} mensagens</span>
            {searchTerm && (
              <Badge variant="secondary" className="text-[10px]">filtrado</Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="text-xs h-7 gap-1">
              <Printer className="h-3 w-3" /> Imprimir
            </Button>
            <Button variant="outline" size="sm" onClick={expandAll} className="text-xs h-7">
              Expandir Todos
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs h-7">
              Recolher
            </Button>
          </div>
        </div>
      </div>

      {/* Day groups */}
      <div className="space-y-2">
        {filteredGroups.map((group) => {
          const isOpen = expandedDays.has(group.date);
          return (
            <div key={group.date} id={`chat-day-${group.date}`} className="border rounded-xl overflow-hidden transition-all duration-500">
              <button
                onClick={() => toggleDay(group.date)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-muted/50 hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-2 day-header">
                  {isOpen ? <ChevronDown className="h-4 w-4 no-print" /> : <ChevronUp className="h-4 w-4 rotate-180 no-print" />}
                  <span className="text-sm font-semibold">{group.dateLabel}</span>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {group.messages.length} msg
                </Badge>
              </button>

              {isOpen && (
                <div className="px-3 py-3 space-y-0.5 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.01)_20px,rgba(0,0,0,0.01)_40px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.01)_20px,rgba(255,255,255,0.01)_40px)]">
                  {group.messages.map((msg, i) => (
                    <MsgBubble 
                      key={`${group.date}-${i}`} 
                      msg={msg} 
                      basePath={selectedGroup === "suporte" ? "/Image/whatsapp" : "/Image/whatsapp-multiledgers"} 
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredGroups.length === 0 && searchTerm && (
        <div className="text-center py-8 text-muted-foreground">
          <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhuma mensagem encontrada para &quot;{searchTerm}&quot;</p>
        </div>
      )}
    </div>
    <style jsx global>{`
      @media print {
        .no-print { display: none !important; }
        .print-only { display: block !important; }
        
        /* Force expand all days for print */
        .transcript-container [aria-expanded="false"] + div {
          display: block !important;
        }
        
        .transcript-container button { display: none !important; }
        .transcript-container .border { border: none !important; border-bottom: 1px solid #eee !important; }
        .transcript-container .rounded-xl { border-radius: 0 !important; }
        .transcript-container { padding: 0 !important; }
        
        /* Message styling for print - High density */
        .transcript-container .msg-bubble {
          display: flex !important;
          flex-direction: row !important;
          gap: 10px !important;
          margin-bottom: 4px !important;
          font-size: 9pt !important;
          border: none !important;
          padding: 2px 0 !important;
        }
        
        .transcript-container .msg-meta {
          min-width: 140px !important;
          font-size: 8pt !important;
          color: #666 !important;
          text-align: right !important;
        }
        
        .transcript-container .msg-text {
          flex: 1 !important;
          background: none !important;
          border: none !important;
          padding: 0 !important;
        }

        .transcript-container .day-header { 
          display: block !important; 
          font-weight: bold !important; 
          font-size: 11pt !important;
          border-bottom: 2px solid #000 !important;
          margin-top: 30px !important;
          padding-bottom: 5px !important;
          page-break-after: avoid !important;
        }
      }
    `}</style>
    </LightboxContext.Provider>
  );
}
