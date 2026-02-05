export type Theme = 'blue' | 'peach' | 'dark';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
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
