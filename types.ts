import React from 'react';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  year: string;
  link?: string;
  demo?: string;
  github?: string;
  type: string;
  images?: string[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string;
  icon: React.ReactNode;
}