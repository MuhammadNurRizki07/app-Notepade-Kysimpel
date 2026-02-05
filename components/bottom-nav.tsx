'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Link2, Plus, BarChart3, Palette } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Beranda' },
  { href: '/links', icon: Link2, label: 'Link' },
  { href: '/add-note', icon: Plus, label: 'Tambah', center: true },
  { href: '/statistics', icon: BarChart3, label: 'Statistik' },
  { href: '/theme', icon: Palette, label: 'Tema' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-card">
      <div className="flex max-w-md items-center justify-around mx-auto h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all gap-1 ${
                item.center ? 'relative' : ''
              } ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div
                className={`${
                  item.center
                    ? 'absolute -top-6 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg'
                    : ''
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              {!item.center && (
                <span className="text-xs font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
