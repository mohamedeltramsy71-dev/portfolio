import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentKey, setCurrentKey] = useState(pageKey);

  useEffect(() => {
    if (pageKey !== currentKey) {
      setIsTransitioning(true);

      const exitTimer = setTimeout(() => {
        setDisplayChildren(children);
        setCurrentKey(pageKey);
        setIsTransitioning(false);
      }, 250);

      return () => clearTimeout(exitTimer);
    }
  }, [pageKey, children, currentKey]);

  return (
    <div
      className={`w-full h-full transition-all duration-250 ${
        isTransitioning
          ? 'opacity-0 translate-y-4 scale-[0.98]'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {displayChildren}
    </div>
  );
}
