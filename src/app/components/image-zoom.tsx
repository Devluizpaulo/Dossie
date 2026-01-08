"use client";

import Image from 'next/image';

interface ImageZoomProps {
    imageUrl: string;
    alt: string;
}

export function ImageZoom({ imageUrl, alt }: ImageZoomProps) {
    return (
        <div className="w-full h-auto aspect-video relative">
            <Image 
                src={imageUrl} 
                alt={alt} 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
}
