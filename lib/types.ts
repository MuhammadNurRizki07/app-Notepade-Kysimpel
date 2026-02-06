export type Theme = 'blue' | 'peach' | 'dark';

export interface Section {
  id: string;
  title: string;
  body: string;
  status: 'Baru' | 'Proses' | 'Selesai';
}

export interface Note {
  id: string;
  title: string;
  sections: Section[];
  status: 'Baru' | 'Proses' | 'Selesai';
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'purple';
  externalLink?: string;
  createdAt: number;
  updatedAt: number;
}

export interface FavoriteLink {
  id: string;
  title: string;
  url: string;
  category: 'classroom' | 'github' | 'youtube' | 'drive' | 'other';
  createdAt: number;
}

export interface NoteLink {
  id: string;
  title: string;
  url: string;
  noteId: string;
  createdAt: number;
}
