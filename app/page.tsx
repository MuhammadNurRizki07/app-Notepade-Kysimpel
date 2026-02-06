'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { KyLogo } from '@/components/ky-logo';
import { Note } from '@/lib/types';
import { storage } from '@/lib/storage';
import { formatDateIndonesia } from '@/lib/date';
import Link from 'next/link';

const colorClasses = {
  blue: 'bg-blue-100 border-l-4 border-blue-500',
  pink: 'bg-pink-100 border-l-4 border-pink-500',
  green: 'bg-green-100 border-l-4 border-green-500',
  yellow: 'bg-yellow-100 border-l-4 border-yellow-500',
  purple: 'bg-purple-100 border-l-4 border-purple-500',
};

// status badge styles will vary depending on note.status

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setNotes(storage.getNotes());
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      storage.deleteNote(id);
      setNotes(storage.getNotes());
    }
  };

  if (!mounted) return null;

  const today = new Date();
  const dateString = formatDateIndonesia(today.getTime());

  return (
    <AppShell>
      <div className="space-y-6 p-4 animate-fade-in">
        {/* Header */}
        <div className="space-y-4 animate-slide-down">
          <div className="flex items-center justify-between">
            <KyLogo size="md" />
            <span className="text-xs text-muted-foreground font-medium">{dateString}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-3 animate-slide-up">
          {/* Section Title */}
          <div>
            <h1 className="text-2xl font-bold text-balance">Catatan & Link Belajar</h1>
          </div>

          {/* Add Button */}
          <Link
            href="/add-note"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            Tambah Catatan Baru
          </Link>
        </div>

        {/* Notes List */}
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-scale-in">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-foreground font-medium">Belum ada catatan.</p>
            <p className="text-muted-foreground text-sm">Yuk mulai buat catatan pertamamu!</p>
          </div>
        ) : (
          <div className="space-y-3 animate-stagger">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-lg ${colorClasses[note.color]} space-y-2 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-balance">{note.title}</h3>
                    <p className="text-sm text-slate-700 line-clamp-2 mt-1">{(note as any).sections?.[0]?.title || ''}</p>
                    <p className="text-sm text-slate-700 line-clamp-3 mt-1">{(note as any).sections?.[0]?.body || ''}</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Link
                      href={`/edit-note/${note.id}`}
                      className="p-2 hover:bg-white/50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </Link>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-2 hover:bg-white/50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {/** status badge */}
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    note.status === 'Baru' ? 'bg-blue-100 text-blue-700' : note.status === 'Proses' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>{note.status}</span>
                  {note.externalLink && (
                    <a
                      href={note.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <ExternalLinkIcon className="w-3 h-3" />
                      Link
                    </a>
                  )}
                </div>

                <p className="text-xs text-slate-500">
                  {new Date(note.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
