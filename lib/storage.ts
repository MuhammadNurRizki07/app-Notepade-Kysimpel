import { Note, FavoriteLink, Theme } from './types';

const NOTES_KEY = 'kysimpel-notes';
const LINKS_KEY = 'kysimpel-links';
const THEME_KEY = 'kysimpel-theme';

export const storage = {
  // Notes
  getNotes: (): Note[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(NOTES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveNote: (note: Note): void => {
    if (typeof window === 'undefined') return;
    const notes = storage.getNotes();
    const existingIndex = notes.findIndex(n => n.id === note.id);
    if (existingIndex >= 0) {
      notes[existingIndex] = note;
    } else {
      notes.push(note);
    }
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  deleteNote: (id: string): void => {
    if (typeof window === 'undefined') return;
    const notes = storage.getNotes().filter(n => n.id !== id);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  // Links
  getLinks: (): FavoriteLink[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(LINKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveLink: (link: FavoriteLink): void => {
    if (typeof window === 'undefined') return;
    const links = storage.getLinks();
    const existingIndex = links.findIndex(l => l.id === link.id);
    if (existingIndex >= 0) {
      links[existingIndex] = link;
    } else {
      links.push(link);
    }
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  },

  deleteLink: (id: string): void => {
    if (typeof window === 'undefined') return;
    const links = storage.getLinks().filter(l => l.id !== id);
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  },

  // Theme
  getTheme: (): Theme => {
    if (typeof window === 'undefined') return 'blue';
    try {
      const data = localStorage.getItem(THEME_KEY);
      return (data as Theme) || 'blue';
    } catch {
      return 'blue';
    }
  },

  setTheme: (theme: Theme): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(THEME_KEY, theme);
  },
};
