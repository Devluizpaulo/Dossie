"use client";

import { useState, useEffect, useMemo, useCallback, useRef, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  MEDIA_FILES,
  SENDER_COLORS,
  SENDER_NAME_COLORS,
  normalizeSender,
  isBMV,
} from "./whatsapp-data";
import {
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
    const trimmed = line.replace(/^\uFEFF/, "").replace(/\u200E/g, "");
    const match = trimmed.match(/^(\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2}) - (.+)$/);

    if (match) {
      if (current) messages.push(current);
      const [, date, time, rest] = match;
      const colonIdx = rest.indexOf(": ");

      if (colonIdx === -1) {
        // System message
        current = { date, time, sender: "", text: rest, isSystem: true };
      } else {
        const sender = rest.slice(0, colonIdx);
        let text = rest.slice(colonIdx + 2);

        // Detect attached file
        let media: string | undefined;
        const attachMatch = text.match(/^‎?(.+?) \(arquivo anexado\)$/);
        if (attachMatch) {
          media = attachMatch[1].trim();
          text = "";
        }
        // Detect hidden media
        if (text === "<Mídia oculta>") {
          current = { date, time, sender, text: "[Mídia não exportada]", isSystem: false, media: undefined };
        } else {
          current = { date, time, sender, text, media, isSystem: false };
        }
      }
    } else if (current && trimmed) {
      // Continuation line
      current.text += "\n" + trimmed;
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
function MsgBubble({ msg }: { msg: ParsedMessage }) {
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
    <div className={`flex ${isRight ? "justify-end" : "justify-start"} mb-1.5`}>
      <div className={`max-w-[85%] md:max-w-[75%] rounded-xl px-3 py-1.5 border text-[13px] ${bgColor}`}>
        <p className={`text-[11px] font-bold mb-0.5 ${nameColor}`}>
          {normalized}
        </p>

        {/* Image */}
        {msg.media && mediaInfo?.type === "image" && !imgError && (
          <div
            className="my-1 cursor-pointer group/img relative"
            onClick={() => openLightbox(`/Image/whatsapp/${msg.media}`, msg.media!)}
          >
            <Image
              src={`/Image/whatsapp/${msg.media}`}
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

        {/* PDF */}
        {msg.media && mediaInfo?.type === "pdf" && (
          <a href={`/Image/whatsapp/${msg.media}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline my-1 text-xs">
            <FileText className="h-4 w-4 text-red-500 flex-shrink-0" />
            {mediaInfo.label || msg.media}
          </a>
        )}

        {/* Audio */}
        {msg.media && mediaInfo?.type === "audio" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground my-1">
            <Music className="h-3 w-3" /> Áudio ({msg.media})
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
  const [rawData, setRawData] = useState<string | null>(null);
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
  const loadData = useCallback(async () => {
    if (rawData) {
      setExpanded(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/Image/whatsapp/chat.txt");
      const text = await res.text();
      setRawData(text);
      setExpanded(true);
    } catch (e) {
      console.error("Erro ao carregar transcrição:", e);
    } finally {
      setLoading(false);
    }
  }, [rawData]);

  const dayGroups = useMemo(() => {
    if (!rawData) return [];
    return parseWhatsAppExport(rawData);
  }, [rawData]);

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
      if (!rawData) {
        loadData().then(() => {
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
  }, [rawData, loadData, filteredGroups]);

  if (!expanded) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-justify">
          Clique abaixo para carregar a transcrição completa das {" "}
          <strong>1.598 mensagens</strong> do grupo de suporte. As mensagens são exibidas 
          cronologicamente, agrupadas por data, com todas as mídias anexas incorporadas.
        </p>
        <Button onClick={loadData} disabled={loading} className="w-full gap-2" size="lg">
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Carregando...</>
          ) : (
            <><MessageSquare className="h-4 w-4" /> Carregar Transcrição Completa</>
          )}
        </Button>
      </div>
    );
  }

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
    <div className="space-y-4" ref={containerRef}>
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
            <Button variant="outline" size="sm" onClick={expandAll} className="text-xs h-7">
              Expandir Todos
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs h-7">
              Recolher
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setExpanded(false)} className="text-xs h-7">
              Fechar
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
                <div className="flex items-center gap-2">
                  {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4 rotate-180" />}
                  <span className="text-sm font-semibold">{group.dateLabel}</span>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {group.messages.length} msg
                </Badge>
              </button>

              {isOpen && (
                <div className="px-3 py-3 space-y-0.5 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.01)_20px,rgba(0,0,0,0.01)_40px)] dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.01)_20px,rgba(255,255,255,0.01)_40px)]">
                  {group.messages.map((msg, i) => (
                    <MsgBubble key={`${group.date}-${i}`} msg={msg} />
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
    </LightboxContext.Provider>
  );
}
