import { useState } from 'react';
import { Home, Layers, FolderOpen, FileText, Mail, Moon, Sun } from 'lucide-react';
import type { Page } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const navItems: { page: Page; icon: typeof Home; label: string }[] = [
  { page: 'home', icon: Home, label: 'Home' },
  { page: 'stack', icon: Layers, label: 'Stack' },
  { page: 'projects', icon: FolderOpen, label: 'Projects' },
  { page: 'cv', icon: FileText, label: 'CV' },
  { page: 'contact', icon: Mail, label: 'Contact' },
];

export default function Navbar({ currentPage, onPageChange, isDark, onToggleTheme }: NavbarProps) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex flex-col items-center gap-2">
        {/* Active Label Tooltip */}
        {activeLabel && (
          <div className="px-4 py-2 rounded-full glass shadow-lg text-sm font-medium animate-fade-in-up">
            {activeLabel}
          </div>
        )}

        {/* Nav Bar */}
        <div className="flex items-center gap-1 p-2 rounded-2xl glass shadow-xl border border-border/50">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => onPageChange(item.page)}
                onMouseEnter={() => setActiveLabel(item.label)}
                onMouseLeave={() => setActiveLabel(null)}
                className={`relative flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />

                {/* Separator */}
                {index === 3 && (
                  <div className="absolute -right-0.5 top-2 bottom-2 w-px bg-border" />
                )}
              </button>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            onMouseEnter={() => setActiveLabel(isDark ? 'Light Mode' : 'Dark Mode')}
            onMouseLeave={() => setActiveLabel(null)}
            className="flex items-center justify-center w-11 h-11 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-300"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
