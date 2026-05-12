"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  STATS,
  SENDER_COLORS,
  SENDER_NAME_COLORS,
  MEDIA_FILES,
  normalizeSender,
  isBMV,
  CONTRACTUAL_ANALYSIS,
} from "./whatsapp-data";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  AlertCircle,
  Gavel,
  ShieldAlert,
  ClipboardCheck,
} from "lucide-react";
import {
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  FileText,
  Music,
  MessageSquare,
  Users,
  Calendar,
  Activity,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
} from "lucide-react";

/* ── Lightbox Modal ── */
function GalleryLightbox({
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
  const handleReset = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) setScale((s) => Math.min(s * 1.15, 6));
    else setScale((s) => Math.max(s / 1.15, 0.5));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) { setIsDragging(true); dragStart.current = { x: e.clientX, y: e.clientY }; posStart.current = { ...position }; }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) setPosition({ x: posStart.current.x + (e.clientX - dragStart.current.x), y: posStart.current.y + (e.clientY - dragStart.current.y) });
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "+" || e.key === "=") setScale((s) => Math.min(s * 1.3, 6));
    if (e.key === "-") setScale((s) => Math.max(s / 1.3, 0.5));
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} onWheel={handleWheel}>
      <button onClick={onClose} className="absolute top-4 right-4 z-[101] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
        <X className="h-6 w-6" />
      </button>
      <div className="absolute top-4 left-4 z-[101] text-white/70 text-xs font-mono bg-black/40 px-3 py-1.5 rounded-lg">{alt}</div>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}>
        <div style={{ transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`, transition: isDragging ? "none" : "transform 0.15s ease-out" }}>
          <Image src={src} alt={alt} width={1200} height={900} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" unoptimized draggable={false} />
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[101] flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-xl px-2 py-1.5 border border-white/10">
        <button onClick={handleZoomOut} className="p-1.5 text-white hover:bg-white/10 rounded-lg"><ZoomOut className="h-4 w-4" /></button>
        <span className="text-white/70 text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
        <button onClick={handleZoomIn} className="p-1.5 text-white hover:bg-white/10 rounded-lg"><ZoomIn className="h-4 w-4" /></button>
        <div className="w-px h-5 bg-white/20 mx-1" />
        <button onClick={handleReset} className="p-1.5 text-white hover:bg-white/10 rounded-lg"><RotateCcw className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

/* ── Statistics Cards ── */
export function WhatsAppStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard icon={<MessageSquare className="h-5 w-5" />} value={STATS.totalMessages.toString()} label="Mensagens" />
      <StatCard icon={<Calendar className="h-5 w-5" />} value={STATS.activeDays.toString()} label="Dias Ativos" />
      <StatCard icon={<ImageIcon className="h-5 w-5" />} value={STATS.totalImages.toString()} label="Imagens" />
      <StatCard icon={<Activity className="h-5 w-5" />} value={STATS.totalCalls.toString()} label="Chamadas" />
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-card border rounded-xl p-4 flex flex-col items-center gap-1 text-center">
      <div className="text-muted-foreground">{icon}</div>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

/* ── Participants ── */
export function ParticipantsList() {
  return (
    <div className="grid md:grid-cols-2 gap-2">
      {STATS.participants.map((p) => (
        <div
          key={p.name}
          className={`flex items-center gap-3 p-3 rounded-lg border ${
            p.org === "BMV"
              ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
              : "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
          }`}
        >
          <Users className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">{p.name}</p>
            <p className="text-xs text-muted-foreground">
              {p.role} – {p.org}
            </p>
          </div>
          <Badge variant="outline" className="ml-auto text-[10px]">
            {p.org}
          </Badge>
        </div>
      ))}
    </div>
  );
}

/* ── Key Incidents Timeline ── */
export function IncidentTimeline() {
  const sevColors: Record<string, string> = {
    critical: "border-red-500 bg-red-50 dark:bg-red-950/20",
    high: "border-orange-500 bg-orange-50 dark:bg-orange-950/20",
    medium: "border-amber-500 bg-amber-50 dark:bg-amber-950/20",
    info: "border-blue-500 bg-blue-50 dark:bg-blue-950/20",
  };
  const sevBadge: Record<string, string> = {
    critical: "destructive",
    high: "bg-orange-600",
    medium: "bg-amber-600",
    info: "bg-blue-600",
  };
  const sevLabel: Record<string, string> = {
    critical: "CRÍTICO",
    high: "ALTO",
    medium: "MÉDIO",
    info: "INFO",
  };

  return (
    <div className="space-y-2">
      {STATS.keyIncidents.map((inc, i) => (
        <div
          key={i}
          className={`border-l-4 pl-4 py-2 rounded-r-lg ${sevColors[inc.severity]}`}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-muted-foreground">
              {inc.date}
            </span>
            <Badge
              variant={inc.severity === "critical" ? "destructive" : "outline"}
              className={
                inc.severity !== "critical" ? sevBadge[inc.severity] + " text-white" : ""
              }
            >
              {sevLabel[inc.severity]}
            </Badge>
          </div>
          <p className="text-sm mt-1">{inc.title}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Contractual Analysis Table ── */
export function ContractualAnalysisTable() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {CONTRACTUAL_ANALYSIS.clauses.map((clause) => (
          <div key={clause.id} className="p-4 rounded-xl border bg-muted/30 border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Gavel className="h-4 w-4 text-primary" />
              <span className="font-bold text-primary text-sm uppercase tracking-wider">Cláusula {clause.id}</span>
            </div>
            <p className="text-xs italic text-muted-foreground mb-3 leading-relaxed">
              &quot;{clause.text}&quot;
            </p>
            <div className="flex items-start gap-2 bg-red-50 dark:bg-red-950/20 p-2 rounded-lg border border-red-100 dark:border-red-900/30">
              <ShieldAlert className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs font-medium text-red-800 dark:text-red-300">
                {clause.violationReason}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Activity className="h-4 w-4" /> Registro Cronológico de Inconformidades
        </h4>
        <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
          <ZoomIn className="h-3 w-3" /> Clique em uma linha para ver a conversa original
        </p>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table className="text-xs">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted font-bold">
              <TableHead className="w-20">Data</TableHead>
              <TableHead className="w-24">Solicitante</TableHead>
              <TableHead>Demanda / Problema</TableHead>
              <TableHead>Resposta do Fornecedor</TableHead>
              <TableHead className="w-24 text-center">Status</TableHead>
              <TableHead className="w-24 text-center">Framing</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CONTRACTUAL_ANALYSIS.incidentsTable.map((inc, i) => (
              <TableRow 
                key={i} 
                className="hover:bg-primary/5 cursor-pointer transition-colors group/row"
                onClick={() => {
                  const normalizedDate = inc.date.length === 8 
                    ? inc.date.slice(0, 6) + "20" + inc.date.slice(6) 
                    : inc.date;
                  window.dispatchEvent(new CustomEvent("whatsapp-scroll-to-date", { 
                    detail: { date: normalizedDate } 
                  }));
                }}
              >
                <TableCell className="font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover/row:opacity-100 transition-opacity" />
                    {inc.date}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{inc.requester}</TableCell>
                <TableCell className="font-medium text-red-700 dark:text-red-400">
                  {inc.demand}
                </TableCell>
                <TableCell className="text-muted-foreground leading-relaxed">
                  {inc.response}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Badge variant="outline" className="text-[10px]">
                    {inc.status}
                  </Badge>
                  {inc.days !== "0" && inc.days !== "" && (
                    <p className="text-[9px] text-muted-foreground mt-1">{inc.days} dias</p>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={inc.framing.includes("Cláusula") ? "destructive" : "secondary"} className="text-[9px]">
                    {inc.framing}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex gap-4">
        <div className="bg-primary/10 p-3 rounded-full h-fit">
          <ClipboardCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h4 className="font-bold text-primary mb-1">Conclusão da Auditoria de Comunicação</h4>
          <p className="text-sm text-justify leading-relaxed">
            {CONTRACTUAL_ANALYSIS.conclusion}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Collapsible media gallery ── */
export function MediaGallery() {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const images = Object.keys(MEDIA_FILES).filter(
    (k) => MEDIA_FILES[k].type === "image"
  );
  const pdfs = Object.keys(MEDIA_FILES).filter(
    (k) => MEDIA_FILES[k].type === "pdf"
  );

  return (
    <div className="space-y-4">
      {lightbox && (
        <GalleryLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          {images.length} Imagens + {pdfs.length} PDFs anexados
        </span>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {open && (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Evidências Fotográficas ({images.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((filename) => (
                <div
                  key={filename}
                  className="group relative cursor-pointer"
                  onClick={() => setLightbox({ src: `/Image/whatsapp/${filename}`, alt: filename })}
                >
                  <Image
                    src={`/Image/whatsapp/${filename}`}
                    alt={filename}
                    className="w-full aspect-square object-cover rounded-lg border hover:opacity-90 transition-opacity"
                    width={200}
                    height={200}
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <ZoomIn className="h-3 w-3" /> Ampliar
                    </span>
                  </div>
                  <span className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-[9px] px-1 py-0.5 rounded truncate">
                    {filename}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" /> Documentos PDF ({pdfs.length})
            </h4>
            <div className="space-y-2">
              {pdfs.map((filename) => (
                <a
                  key={filename}
                  href={`/Image/whatsapp/${filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-red-500" />
                  <span className="text-sm">
                    {MEDIA_FILES[filename].label || filename}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Single message bubble ── */
interface MessageBubbleProps {
  sender: string;
  time: string;
  text: string;
  media?: string;
  isSystem?: boolean;
}

export function MessageBubble({ sender, time, text, media, isSystem }: MessageBubbleProps) {
  const normalized = normalizeSender(sender);
  const bgColor = SENDER_COLORS[normalized] || "bg-muted/50 border-border";
  const nameColor = SENDER_NAME_COLORS[normalized] || "text-foreground";

  if (isSystem) {
    return (
      <div className="text-center text-xs text-muted-foreground italic py-1 px-4">
        {text}
      </div>
    );
  }

  const isLeft = !isBMV(normalized);

  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} mb-1`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] rounded-xl px-3 py-2 border text-sm ${bgColor}`}
      >
        <p className={`text-xs font-semibold mb-0.5 ${nameColor}`}>
          {normalized}
        </p>
        {media && MEDIA_FILES[media]?.type === "image" && (
          <Image
            src={`/Image/whatsapp/${media}`}
            alt={media}
            className="w-full max-w-xs rounded-lg mb-1"
            width={300}
            height={200}
            unoptimized
          />
        )}
        {media && MEDIA_FILES[media]?.type === "pdf" && (
          <a
            href={`/Image/whatsapp/${media}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline mb-1"
          >
            <FileText className="h-4 w-4" />
            <span className="text-xs">{MEDIA_FILES[media].label || media}</span>
          </a>
        )}
        {media && MEDIA_FILES[media]?.type === "audio" && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Music className="h-3 w-3" /> Áudio anexado
          </div>
        )}
        {text && (
          <p className="whitespace-pre-wrap break-words text-foreground leading-relaxed">
            {text}
          </p>
        )}
        <p className="text-[10px] text-muted-foreground text-right mt-0.5">
          {time}
        </p>
      </div>
    </div>
  );
}
