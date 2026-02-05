'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { Plus, ExternalLink as ExternalLinkIcon, Trash2, X } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { KyLogo } from '@/components/ky-logo';
import { FavoriteLink } from '@/lib/types';
import { storage } from '@/lib/storage';

type LinkCategory = 'classroom' | 'github' | 'youtube' | 'drive' | 'other';

const categoryLabels: Record<LinkCategory, string> = {
  classroom: 'Google Classroom',
  github: 'GitHub',
  youtube: 'YouTube',
  drive: 'Google Drive',
  other: 'Lainnya',
};

const categoryColors: Record<LinkCategory, string> = {
  classroom: 'bg-red-100 text-red-700',
  github: 'bg-gray-100 text-gray-700',
  youtube: 'bg-red-100 text-red-700',
  drive: 'bg-blue-100 text-blue-700',
  other: 'bg-purple-100 text-purple-700',
};

export default function LinksPage() {
  const [links, setLinks] = useState<FavoriteLink[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<LinkCategory>('other');
  const [error, setError] = useState('');

  useEffect(() => {
    setLinks(storage.getLinks());
    setMounted(true);
  }, []);

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Nama link tidak boleh kosong');
      return;
    }

    // URL sekarang opsional - bisa kosong atau diisi
    const trimmedUrl = url.trim();
    if (trimmedUrl && trimmedUrl !== '-' && !isValidUrl(trimmedUrl)) {
      setError('URL tidak valid');
      return;
    }

    const newLink: FavoriteLink = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      url: trimmedUrl || '-',
      category,
      createdAt: Date.now(),
    };

    storage.saveLink(newLink);
    setLinks(storage.getLinks());
    setTitle('');
    setUrl('');
    setCategory('other');
    setShowForm(false);
  };

  const handleDeleteLink = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus link ini?')) {
      storage.deleteLink(id);
      setLinks(storage.getLinks());
    }
  };

  if (!mounted) return null;

  return (
    <AppShell>
      <div className="space-y-6 p-4 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <KyLogo size="sm" />
          <div>
            <h1 className="text-2xl font-bold">Link Favorit</h1>
            <p className="text-sm text-muted-foreground">Kumpulan link belajar dan resource penting</p>
          </div>
        </div>

        {/* Add Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            Tambah Link Favorit
          </button>
        )}

        {/* Add Link Form */}
        {showForm && (
          <div className="p-4 bg-muted rounded-lg space-y-3 border border-input">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Tambah Link Baru</h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setError('');
                  setTitle('');
                  setUrl('');
                  setCategory('other');
                }}
                className="p-1 hover:bg-background rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-2 bg-red-100 border border-red-300 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAddLink} className="space-y-3">
              {/* Title Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Nama Link</label>
                <input
                  type="text"
                  placeholder="Contoh: Video Belajar Python"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>

              {/* URL Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">URL <span className="text-muted-foreground">(Opsional)</span></label>
                <input
                  type="text"
                  placeholder="https://example.com (atau kosongkan / ketik -)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground placeholder:text-muted-foreground text-sm"
                />
              </div>

              {/* Category Select */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as LinkCategory)}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground text-sm"
                >
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:shadow-lg active:scale-95 transition-all"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError('');
                    setTitle('');
                    setUrl('');
                    setCategory('other');
                  }}
                  className="flex-1 px-3 py-2 border border-input rounded-lg font-medium text-sm hover:bg-muted transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Links List */}
        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
            <div className="text-5xl mb-4">🔗</div>
            <p className="text-foreground font-medium">Belum ada link tersimpan.</p>
            <p className="text-muted-foreground text-sm">Tambahkan link favoritmu!</p>
          </div>
        ) : (
          <div className="space-y-2 animate-stagger">
            {links.map((link) => (
              <div
                key={link.id}
                className="p-4 border border-input rounded-lg bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{link.title}</h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 truncate flex items-center gap-1 mt-1"
                    >
                      <ExternalLinkIcon className="w-3 h-3 flex-shrink-0" />
                      {link.url}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="p-2 hover:bg-muted rounded transition-colors flex-shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-foreground" />
                  </button>
                </div>

                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${categoryColors[link.category]}`}>
                  {categoryLabels[link.category]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
