export type Page = 'home' | 'stack' | 'projects' | 'cv' | 'contact';

export interface TechSkill {
  name: string;
  icon: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  languages: { name: string; level: string }[];
}
