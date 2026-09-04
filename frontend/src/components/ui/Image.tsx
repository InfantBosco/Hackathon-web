import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Skeleton } from './Skeleton';
import { ImageOff } from 'lucide-react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait';
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectClasses = {
    auto: 'aspect-auto',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div className={cn('relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]', aspectClasses[aspectRatio], className)}>
      {isLoading && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] text-xs font-mono">
          <ImageOff className="w-6 h-6 mb-2 text-red-400" />
          <span>IMAGE_FAILED</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          {...props}
        />
      )}
    </div>
  );
};
