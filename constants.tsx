import React from 'react';
import { Project, Experience, Skill } from './types';
import {
  Terminal,
  Database,
  Cloud,
  Cpu,
  Code2,
  Layout,
  Server,
  Shield
} from 'lucide-react';

export const RESUME_LINK = "#"; // Placeholder as actual link wasn't provided, usually a PDF URL
export const EMAIL = "nischayagarg008@gmail.com";
export const PHONE = "+91-9391882293";
export const GITHUB = "https://github.com/Nischaya008";
export const LINKEDIN = "https://linkedin.com/in/nischaya008";
export const LEETCODE = "https://leetcode.com/u/Nischaya008"; // Placeholder/Guessed based on username
export const GEEKSFORGEEKS = "https://www.geeksforgeeks.org/profile/nischaya008?tab=activity"; // Placeholder
export const MONKEYTYPE = "https://monkeytype.com/profile/Nischaya008"; // Placeholder

export const PROJECTS: Project[] = [
  {
    title: "RayTracerNG",
    description: "Built a real-time 2D ray tracer with interactive scene editing and lighting simulation. Implemented render optimizations and spatial partitioning to sustain 60+ FPS.",
    tech: ["C++17", "OpenGL", "ImGUI"],
    year: "2024",
    link: "#",
    demo: "https://raytracerng.vercel.app/",
    github: "https://github.com/Nischaya008/RayTracerNG",
    type: "Graphics Engine",
    images: [
      "/assets/Ray_Tracer1.jpeg",
      "/assets/Ray_Tracer2.jpeg",
      "/assets/Ray_Tracer3.jpeg"
    ]
  },
  {
    title: "ResumifyNG",
    description: "AI-driven resume analysis and interview coach. Developed ATS-aligned scoring and load-tested simulation backend to 10k+ virtual users with stable P95 latency.",
    tech: ["React", "FastAPI", "NLP/ML", "Load Testing", "System Design"],
    year: "2024",
    link: "#",
    demo: "https://resumifyng.vercel.app/",
    github: "https://github.com/Nischaya008/ResumifyNG",
    type: "AI Platform",
    images: [
      "/assets/Resumify1.jpeg",
      "/assets/Resumify2.jpeg",
      "/assets/Resumify3.jpeg"
    ]
  },
  {
    title: "CodeHiveNG",
    description: "Real-time collaborative coding platform. Validated system stability under 100+ concurrent user sessions with multi-language execution.",
    tech: ["React", "NodeJS", "WebSockets", "MongoDB", "Real-Time Comm", "Distributed Systems"],
    year: "2024",
    link: "#",
    demo: "https://codehiveng.vercel.app/",
    github: "https://github.com/Nischaya008/CodeHiveNG",
    type: "SaaS Product",
    images: [
      "/assets/Codehive1.png",
      "/assets/Codehive2.png",
      "/assets/Codehive3.png"
    ]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Python Automation Intern",
    company: "TSN Securitys",
    location: "Remote/Hybrid",
    period: "Jul 2025 – Sep 2025",
    description: [
      "Automated OSINT data-collection pipelines reducing workload by 60%.",
      "Created modular extraction utilities for vulnerability-analysis."
    ]
  },
  {
    role: "Co-Lead Web Developer",
    company: "Google Developers Group",
    location: "Chandigarh, IN",
    period: "Oct 2024 – Aug 2025",
    description: [
      "Reduced load time by 12% via asset bundling and caching.",
      "Improved user retention by 15% through routing refinements."
    ]
  },
  {
    role: "Web Development Mentor",
    company: "Assoc. for Cyber Security",
    location: "Chandigarh, IN",
    period: "Jul 2024 – Mar 2025",
    description: [
      "Mentored 50+ students in deployment workflows.",
      "Resolved integration issues to enhance stability."
    ]
  }
];

export const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: "C++, JavaScript/TypeScript, Python, SQL",
    icon: <Code2 className="w-6 h-6 text-primary" />
  },
  {
    category: "Frameworks",
    items: "React, Next.js, Express, FastAPI, Redux",
    icon: <Layout className="w-6 h-6 text-primary" />
  },
  {
    category: "Backend & DB",
    items: "PostgreSQL, MySQL, MongoDB, Redis",
    icon: <Database className="w-6 h-6 text-primary" />
  },
  {
    category: "DevOps & Cloud",
    items: "Docker, Git, CI/CD, AWS, GCP",
    icon: <Cloud className="w-6 h-6 text-primary" />
  },
  {
    category: "Technical Strengths",
    items: "Distributed Systems, API Design, System Debugging, Microservices, Load Testing, Data Structures",
    icon: <Shield className="w-6 h-6 text-primary" />
  }
];

export const ACHIEVEMENTS = [
  "AIR 11 – Naukri Campus Engineering Track",
  "Admiral V.S. Shekhawat Scholarship",
  "LeetCode: Global rank <145k; 550+ day streak",
  "GfG: 1950+ score; 550+ day streak"
];

export const CERTIFICATIONS = [
  "Oracle PL/SQL – DB Programming",
  "Azure AI-900 – AI Fundamentals",
  "Generative AI for Data Engineers – Coursera"
];