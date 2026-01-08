"use client";

import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ImageZoom } from './image-zoom';


interface EvidenceImageProps {
  imageId: string;
  caption?: string;
  className?: string;
}

export function EvidenceImage({ imageId, caption, className }: EvidenceImageProps) {
  const image = getImage(imageId);

  if (!image) {
    return (
        <div className="bg-muted p-4 rounded-lg text-center text-sm text-destructive">
            Imagem com ID "{imageId}" não encontrada.
        </div>
    );
  }

  const imageCaption = caption || image.description;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={`${className} cursor-zoom-in`}>
            <CardContent className="p-2">
                <div className="aspect-video relative overflow-hidden rounded-md">
                    <Image
                        src={image.imageUrl}
                        alt={imageCaption}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </CardContent>
            {imageCaption && (
                <CardFooter className="p-2 pt-0">
                    <p className="text-xs text-muted-foreground text-center w-full">
                        {imageCaption}
                    </p>
                </CardFooter>
            )}
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-7xl p-2 h-[90vh] flex flex-col">
        <DialogTitle className="sr-only">{imageCaption}</DialogTitle>
        <DialogDescription className="sr-only">Imagem ampliada de: {imageCaption}</DialogDescription>
        <ImageZoom imageUrl={image.imageUrl} alt={imageCaption} />
      </DialogContent>
    </Dialog>
  );
}
