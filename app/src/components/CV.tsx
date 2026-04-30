import { useEffect, useState } from 'react';
import { X, Mail, Phone, MapPin, Download, GraduationCap, Code2, Brain, Palette, Database, Bot } from 'lucide-react';
import type { CVData } from '@/types';

const cvData: CVData = {
  name: 'MOHAMED ELTRAMSY',
  title: 'Full Stack .Net Web Developer || AI Student',
  email: 'mohamedeltramsy71@gmail.com',
  phone: '01553102202',
  location: 'Daqahliya, Egypt',
  about:
    'AI student and competitive programmer with strong problem-solving skills. Experienced in Python, C++, C#, Full Stack .Net Web Development, algorithms, machine learning fundamentals, and building small-scale applications. Completed NVIDIA – ITI training in Generative AI, prompt engineering.',
  education: [
    {
      degree: 'Faculty of Computers and Artificial Intelligence',
      institution: 'AI Department',
      period: 'Present',
      details: 'Studying Artificial Intelligence and Computer Science fundamentals',
    },
  ],
  experience: [
    {
      title: 'Full Stack .NET Web Developer Trainee',
      company: 'DEPI',
      period: 'Present',
      description: 'Training in full-stack .NET web development',
    },
  ],
  skills: [
    'Python',
    'C++',
    'JavaScript',
    'C#',
    'HTML',
    'CSS',
    'SQL',
    'MongoDB',
    'Neo4j',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Seaborn',
    'Scikit-learn',
    'FastAPI',
    'Tkinter',
    'Jupyter',
    'UI/UX Design',
    'Competitive Programming',
    'Algorithms',
    'Data Structures',
    'Problem Solving',
    'Prompt Engineering',
    'LangChain',
  ],
  projects: [
    {
      id: 'aialddins',
      title: 'AIALDDINS',
      description: 'Designed complete UI/UX including flows, wireframes, and high-fidelity interfaces.',
      technologies: ['UI/UX', 'Figma', 'Design Systems'],
    },
    {
      id: 'cryptography',
      title: 'Cryptography Platform',
      description: 'Built a full cryptography platform with FastAPI backend and responsive frontend.',
      technologies: ['Python', 'FastAPI', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      id: 'auction-dashboard',
      title: 'Auction / Dashboard Platform',
      description: 'Complete UI/UX design for a professional auction/dashboard platform with dark-themed interface.',
      technologies: ['UI/UX', 'Figma', 'Dashboard Design'],
    },
    {
      id: 'veloura-boutique',
      title: 'Veloura Boutique UI/UX',
      description: 'High-end fashion e-commerce interface with minimal black-themed visual identity.',
      technologies: ['UI/UX', 'Figma', 'E-commerce'],
    },
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Professional' },
  ],
};

interface CVProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CV({ isOpen, onClose }: CVProps) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      document.body.style.overflow = '';
      setAnimateIn(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold">Fast Report</span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 sm:p-8">
          {/* Name & Title */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-black mb-2">
              {cvData.name.split(' ')[0]}{' '}
              <span className="text-primary">{cvData.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">
              {cvData.title}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {cvData.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                {cvData.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {cvData.location}
              </span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  Overview
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cvData.about}
                </p>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  Projects
                </h3>
                <div className="space-y-4">
                  {cvData.projects.map((project) => (
                    <div key={project.id}>
                      <h4 className="font-bold text-lg">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  <GraduationCap className="w-4 h-4 inline mr-1" />
                  Education
                </h3>
                {cvData.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-primary font-medium mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  Experience
                </h3>
                {cvData.experience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="font-bold">{exp.title}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-xs text-primary font-medium mt-1">{exp.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Skills */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cvData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  Services
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <Code2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Full Stack Web Development</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <Database className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Database Design & Management</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <Bot className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">RAG With LLMs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <Palette className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">UI/UX Design</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                    <Brain className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Machine Learning</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  Connect
                </h3>
                <div className="space-y-2">
                  <a
                    href={`mailto:${cvData.email}`}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {cvData.email}
                  </a>
                  <div className="flex items-center gap-2 p-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {cvData.phone}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
                  Languages
                </h3>
                <div className="space-y-2">
                  {cvData.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between">
                      <span className="text-sm">{lang.name}</span>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border text-center text-xs text-muted-foreground">
          Engineered with precision using React & Tailwind CSS &copy; {new Date().getFullYear()} {cvData.name}
        </div>
      </div>
    </div>
  );
}
