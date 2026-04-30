import { useState, useEffect, useCallback } from 'react';
import type { Page } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stack from '@/components/Stack';
import Projects from '@/components/Projects';
import CV from '@/components/CV';
import Contact from '@/components/Contact';
import PageTransition from '@/components/PageTransition';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isDark, setIsDark] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(shouldDark);
    if (shouldDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: Page) => {
    if (page === 'cv') {
      setCvOpen(true);
      return;
    }
    setCurrentPage(page);
  }, []);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Hero />;
      case 'stack':
        return <Stack />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Main Content */}
      <main className="min-h-screen pb-24">
        <PageTransition pageKey={currentPage}>
          {renderPage()}
        </PageTransition>
      </main>

      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* CV Modal */}
      <CV isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </div>
  );
}

export default App;
