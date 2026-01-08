"use client";

import Image from 'next/image';
import { useState, useRef, MouseEvent, WheelEvent } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

interface ImageZoomProps {
    imageUrl: string;
    alt: string;
}

export function ImageZoom({ imageUrl, alt }: ImageZoomProps) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const startPos = useRef({ x: 0, y: 0 });

    const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 5));
    const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.5));
    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
            if (imageRef.current) {
                imageRef.current.style.cursor = 'grabbing';
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (imageRef.current) {
            imageRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && scale > 1) {
            const newX = e.clientX - startPos.current.x;
            const newY = e.clientY - startPos.current.y;
            
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                const max_x = (rect.width * scale - rect.width) / 2;
                const max_y = (rect.height * scale - rect.height) / 2;

                setPosition({
                    x: Math.max(-max_x, Math.min(max_x, newX)),
                    y: Math.max(-max_y, Math.min(max_y, newY)),
                });
            }
        }
    };
    
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-muted/20 overflow-hidden" onWheel={handleWheel}>
            <div 
                className="relative w-full h-full flex items-center justify-center"
                ref={imageRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: scale > 1 ? 'grab' : 'default' }}
            >
                <div style={{ transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`, transition: 'transform 0.1s ease-out' }}>
                    <Image 
                        src={imageUrl} 
                        alt={alt} 
                        width={1280}
                        height={720}
                        className="object-contain max-w-full max-h-full h-auto w-auto shadow-lg"
                        draggable="false"
                    />
                </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-lg p-1.5 flex items-center gap-1 shadow-md border">
                <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={scale <= 0.5}>
                    <ZoomOut className="h-5 w-5" />
                    <span className="sr-only">Diminuir zoom</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleReset} disabled={scale === 1}>
                    <RefreshCw className="h-4 w-4" />
                    <span className="sr-only">Restaurar zoom</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={scale >= 5}>
                    <ZoomIn className="h-5 w-5" />
                    <span className="sr-only">Aumentar zoom</span>
                </Button>
            </div>
        </div>
    );
}
