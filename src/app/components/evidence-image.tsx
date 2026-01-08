"use client";

import Image from 'next/image';
import { getImage, ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';

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

  return (
    <Card className={className}>
        <CardContent className="p-2">
            <div className="aspect-video relative overflow-hidden rounded-md">
                <Image
                    src={image.imageUrl}
                    alt={caption || image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                />
            </div>
        </CardContent>
        {(caption || image.description) && (
            <CardFooter className="p-2 pt-0">
                <p className="text-xs text-muted-foreground text-center w-full">
                    {caption || image.description}
                </p>
            </CardFooter>
        )}
    </Card>
  );
}
