'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, FileText, Link as LinkIcon } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { KyLogo } from '@/components/ky-logo';
import { Note, FavoriteLink } from '@/lib/types';
import { storage } from '@/lib/storage';
import { getWeekRange } from '@/lib/date';

interface CategoryStats {
  category: string;
  count: number;
}

export default function StatisticsPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [links, setLinks] = useState<FavoriteLink[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setNotes(storage.getNotes());
    setLinks(storage.getLinks());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const weekRange = getWeekRange();

  // Weekly Stats
  const weeklyNewNotes = notes.filter(
    n => n.createdAt >= weekRange.start && n.createdAt <= weekRange.end
  ).length;

  const weeklyNewLinks = links.filter(
    l => l.createdAt >= weekRange.start && l.createdAt <= weekRange.end
  ).length;

  // Overall Stats
  const totalNotes = notes.length;
  const totalLinks = links.length;

  // Top Categories
  const categoryStats: Record<string, number> = {};
  notes.forEach(note => {
    categoryStats[note.category] = (categoryStats[note.category] || 0) + 1;
  });

  const topCategories: CategoryStats[] = Object.entries(categoryStats)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Notes with links
  const notesWithLinks = notes.filter(n => n.externalLink).length;

  // Favorite color
  const colorStats: Record<string, number> = {};
  notes.forEach(note => {
    colorStats[note.color] = (colorStats[note.color] || 0) + 1;
  });

  const favoriteColor = Object.entries(colorStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Tidak ada';

  const colorLabels: Record<string, string> = {
    blue: 'Biru',
    pink: 'Pink',
    green: 'Hijau',
    yellow: 'Kuning',
    purple: 'Ungu',
  };

  const maxCategoryCount = Math.max(...topCategories.map(c => c.count), 1);

  return (
    <AppShell>
      <div className="space-y-6 p-4 animate-fade-in">
        {/* Header */}
        <div className="space-y-2 animate-slide-down">
          <KyLogo size="sm" />
          <div>
            <h1 className="text-2xl font-bold">Statistik</h1>
            <p className="text-sm text-muted-foreground">Ringkasan aktivitas belajarmu</p>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="space-y-3 animate-slide-up">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <TrendingUp className="w-4 h-4" />
            Minggu Ini
          </div>
          <div className="grid grid-cols-2 gap-3 animate-stagger">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Catatan Baru</p>
              <p className="text-3xl font-bold text-blue-600">{weeklyNewNotes}</p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Link Ditambahkan</p>
              <p className="text-3xl font-bold text-green-600">{weeklyNewLinks}</p>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm font-semibold text-foreground">Keseluruhan</p>
          <div className="grid grid-cols-2 gap-3 animate-stagger">
            <div className="p-4 border border-input rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Catatan</p>
                  <p className="text-3xl font-bold text-foreground">{totalNotes}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500 opacity-20" />
              </div>
            </div>
            <div className="p-4 border border-input rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Link</p>
                  <p className="text-3xl font-bold text-foreground">{totalLinks}</p>
                </div>
                <LinkIcon className="w-8 h-8 text-green-500 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm font-semibold text-foreground">Kategori Teratas</p>
          {topCategories.length === 0 ? (
            <p className="text-sm text-muted-foreground">Belum ada data kategori</p>
          ) : (
            <div className="space-y-2 animate-stagger">
              {topCategories.map((cat) => {
                const percentage = Math.round((cat.count / maxCategoryCount) * 100);
                return (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{cat.category}</span>
                      <span className="text-xs text-muted-foreground">{cat.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Other Info */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Info Lainnya</p>
          <div className="space-y-2">
            <div className="p-3 border border-input rounded-lg flex items-center justify-between">
              <span className="text-sm text-foreground">Catatan dengan Link</span>
              <span className="font-semibold text-primary">{notesWithLinks}</span>
            </div>
            <div className="p-3 border border-input rounded-lg flex items-center justify-between">
              <span className="text-sm text-foreground">Warna Favorit</span>
              <span className="font-semibold text-primary">
                {colorLabels[favoriteColor] || favoriteColor}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
