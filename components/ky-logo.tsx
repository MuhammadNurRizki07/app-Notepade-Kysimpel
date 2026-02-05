'use client';

import { BookOpen, Sparkles } from 'lucide-react';

interface KyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  tagline?: string;
}

export function KyLogo({ size = 'md', showTagline = false, tagline }: KyLogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizes[size]}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md blur-sm" />
        <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md transform rotate-3">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className={`flex items-center gap-1 ${textSizes[size]}`}>
        <span className="font-bold text-primary">Ky</span>
        <span className="font-normal text-foreground">Simpel</span>
        <Sparkles className="w-4 h-4 text-yellow-400 ml-1" />
      </div>
      {showTagline && tagline && (
        <div className="ml-2">
          <p className="text-xs text-muted-foreground">{tagline}</p>
        </div>
      )}
    </div>
  );
}
