'use client';

import React from "react"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { KyLogo } from '@/components/ky-logo';
import { storage } from '@/lib/storage';
import { Note } from '@/lib/types';
import Link from 'next/link';

const categories = ['Umum', 'Matematika', 'Bahasa', 'Sains', 'Sejarah', 'Seni', 'Olahraga', 'Tugas'];
const colors: Array<'blue' | 'pink' | 'green' | 'yellow' | 'purple'> = ['blue', 'pink', 'green', 'yellow', 'purple'];

const colorDisplay = {
  blue: 'bg-blue-500',
  pink: 'bg-pink-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
};

export default function AddNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [category, setCategory] = useState('Umum');
  const [customCategory, setCustomCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState<'blue' | 'pink' | 'green' | 'yellow' | 'purple'>('blue');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Judul catatan tidak boleh kosong');
      return;
    }

    if (!content.trim()) {
      setError('Isi catatan tidak boleh kosong');
      return;
    }

    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      content: content.trim(),
      category: category === '__other' ? (customCategory.trim() || 'Umum') : category,
      color: selectedColor,
      externalLink: externalLink.trim() || undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    storage.saveNote(newNote);
    router.push('/');
  };

  return (
    <AppShell>
      <div className="space-y-6 p-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 animate-slide-down">
          <Link
            href="/"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <KyLogo size="sm" />
          </div>
        </div>

        {/* Page Title */}
        <div className="animate-slide-up">
          <h1 className="text-2xl font-bold">Tambah Catatan</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Judul</label>
            <input
              type="text"
              placeholder="Masukkan judul catatan"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Isi Catatan</label>
            <textarea
              placeholder="Tulis catatanmu di sini..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError('');
              }}
              rows={6}
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-card text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* External Link Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Link Eksternal (Opsional)</label>
            <input
              type="url"
              placeholder="https://classroom.google.com/..."
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground placeholder:text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">Contoh: Google Classroom, GitHub, YouTube, dll</p>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="__other">Tambahin Lainnya (Sebutkan)</option>
            </select>

            {category === '__other' && (
              <input
                type="text"
                placeholder="Ketik kategori lain..."
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full mt-2 px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-card text-foreground placeholder:text-muted-foreground"
              />
            )}
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Warna Catatan</label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full transition-all ${colorDisplay[color]} ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-foreground' : 'opacity-50'
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg active:scale-95 transition-all mt-6"
          >
            <Save className="w-5 h-5" />
            Simpan Catatan
          </button>
        </form>
      </div>
    </AppShell>
  );
}
