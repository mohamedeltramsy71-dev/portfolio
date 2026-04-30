import { useEffect, useRef, useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

const projects: Project[] = [
  {
    id: 'aialddins',
    title: 'AIALDDINS',
    description:
      'Designed complete UI/UX including flows, wireframes, and high-fidelity interfaces. A comprehensive design project focused on creating intuitive and visually appealing user experiences.',
    technologies: ['UI/UX', 'Figma', 'Design Systems'],
    image: '/images/projects/aialddins.jpg',
  },
  {
    id: 'cryptography-platform',
    title: 'Cryptography Platform',
    description:
      'Built a full cryptography platform integrating backend algorithms with FastAPI and a responsive frontend using HTML, CSS, and JavaScript. Features multiple encryption/decryption methods and a clean user interface.',
    technologies: ['Python', 'FastAPI', 'HTML', 'CSS', 'JavaScript'],
    image: '/images/projects/cryptography.jpg',
  },
  {
    id: 'auction-dashboard',
    title: 'Auction / Dashboard Platform',
    description:
      'Complete UI/UX design for a professional auction/dashboard platform. The design focuses on delivering a modern, dark-themed interface with clear data visualization, smooth user flow, and high usability.',
    technologies: ['UI/UX', 'Figma', 'Dashboard Design'],
    image: '/images/projects/auction-dashboard.jpg',
  },
  {
    id: 'veloura-boutique',
    title: 'Veloura Boutique UI/UX',
    description:
      'Designed a modern, high-end fashion e-commerce interface with a minimal black-themed visual identity, focusing on usability and visual hierarchy. Improved product pages, CTAs, and mobile responsiveness to enhance overall user experience.',
    technologies: ['UI/UX', 'Figma', 'E-commerce'],
    image: '/images/projects/veloura-boutique.jpg',
  },
];

const allTags = Array.from(
  new Set(projects.flatMap((p) => p.technologies))
).sort();

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesTag = activeTag ? project.technologies.includes(activeTag) : true;
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesTag && matchesSearch;
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="handwriting-text text-3xl sm:text-4xl text-primary mb-1">
            Selected
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            Projects
          </h2>
        </div>

        {/* Search */}
        <div
          className={`relative mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects by title, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl pl-12 pr-4 py-3 rounded-full bg-card border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Filter Tags */}
        <div
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeTag
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border hover:border-primary/50'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === tag
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border hover:border-primary/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 flex items-center justify-center"
                  style={{ display: project.image ? 'none' : 'flex' }}
                >
                  <span className="text-4xl font-black text-primary/20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
