'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { KyLogo } from '@/components/ky-logo';
import { useTheme } from '@/lib/theme-context';
import { Theme } from '@/lib/types';

interface ThemeOption {
  id: Theme;
  name: string;
  description: string;
  gradient: string;
  accentColor: string;
}

const themes: ThemeOption[] = [
  {
    id: 'blue',
    name: 'Biru Segar',
    description: 'Tema biru muda yang menenangkan',
    gradient: 'from-blue-200 to-blue-100',
    accentColor: 'bg-blue-400',
  },
  {
    id: 'peach',
    name: 'Peach Hangat',
    description: 'Tema peach dan pink yang lembut',
    gradient: 'from-orange-200 to-pink-100',
    accentColor: 'bg-orange-400',
  },
  {
    id: 'dark',
    name: 'Mode Gelap',
    description: 'Tema gelap untuk mata lebih nyaman',
    gradient: 'from-gray-700 to-gray-600',
    accentColor: 'bg-gray-500',
  },
];

export default function ThemePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AppShell>
      <div className="space-y-6 p-4 animate-fade-in">
        {/* Header */}
        <div className="space-y-2 animate-slide-down">
          <KyLogo size="sm" />
          <div>
            <h1 className="text-2xl font-bold">Pilih Tema</h1>
            <p className="text-sm text-muted-foreground">Sesuaikan tampilan aplikasi sesuai seleramu</p>
          </div>
        </div>

        {/* Theme Options */}
        <div className="space-y-3 animate-stagger">
          {themes.map((themeOption) => {
            const isActive = theme === themeOption.id;

            return (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`w-full p-4 border rounded-lg transition-all ${
                  isActive
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-input hover:border-primary/50'
                }`}
              >
                <div className="flex gap-4 items-start">
                  {/* Theme Preview */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-br ${themeOption.gradient} relative overflow-hidden shadow-md`}
                    >
                      <div
                        className={`absolute bottom-2 right-2 w-4 h-4 rounded-full ${themeOption.accentColor}`}
                      />
                      {isActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{themeOption.name}</h3>
                      {isActive && (
                        <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Aktif
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{themeOption.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            Tema yang kamu pilih akan tersimpan otomatis dan tetap aktif saat kamu membuka aplikasi lagi.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
