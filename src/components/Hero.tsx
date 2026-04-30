import { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import HandwritingText from './HandwritingText';

export default function Hero() {
  const [isReady, setIsReady] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      {/* Dots grid - left side */}
      <div className="absolute left-8 sm:left-16 top-1/2 -translate-y-1/2 hidden md:grid grid-cols-4 gap-3 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full border border-current"
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
        {/* Left side - Text */}
        <div className="flex flex-col items-start space-y-2">
          {/* THIS IS */}
          <div className="overflow-hidden">
            <HandwritingText
              text="THIS IS"
              fontSize={56}
              delay={0}
              color="#3b82f6"
              isReady={isReady}
              className="transform -rotate-3"
            />
          </div>

          {/* MOHAMED */}
          <div className="overflow-hidden -mt-2">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none animate-fade-in-up"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              MOHAMED
            </h1>
          </div>

          {/* ELTRAMSY */}
          <div className="overflow-hidden -mt-1 ml-8 sm:ml-16">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none animate-fade-in-up"
              style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
            >
              ELTRAMSY
            </h1>
          </div>

          {/* FULL STACK .NET & AI */}
          <div className="overflow-hidden ml-4 sm:ml-8">
            <HandwritingText
              text="FULL STACK .NET & AI"
              fontSize={40}
              delay={1.2}
              color="#3b82f6"
              isReady={isReady}
              className="transform -rotate-2"
            />
          </div>

          {/* Status pills */}
          <div
            className="flex items-center gap-3 mt-6 animate-fade-in-up"
            style={{ animationDelay: '1.8s', animationFillMode: 'both' }}
          >
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span>Available</span>
            </div>
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium shadow-sm">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>UTC+02:00</span>
            </div>
          </div>
        </div>

        {/* Right side - Profile Image */}
        <div
          className="relative animate-slide-in-right"
          style={{ animationDelay: '1s', animationFillMode: 'both' }}
        >
          {/* Decorative numbers */}
          <div className="absolute -left-8 top-1/4 text-sm font-medium text-muted-foreground writing-mode-vertical hidden lg:block">
            <span className="writing-mode-vertical">4.0</span>
          </div>
          <div className="absolute -bottom-4 right-8 text-sm font-medium text-muted-foreground hidden lg:block">
            5.0
          </div>

          {/* Image container */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100/50 to-blue-50/30 rounded-3xl blur-xl" />
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 dark:border-white/10">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src="/images/profile.jpg"
                alt="Mohamed Eltramsy"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-1.5 shadow-lg animate-float">
              <span className="text-sm font-semibold whitespace-nowrap">
                AI Student & Developer
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
