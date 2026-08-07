import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  tagBg: string;
  linkColor: string;
  demoText: string;
  githubUrl: string;
  liveUrl: string;
  category: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="project-card group relative rounded-2xl overflow-hidden bg-white/5 aspect-[4/3]">
    <div
      className={`project - image absolute inset - 0 bg - gradient - to - br ${project.gradient} transition - transform duration - 700`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-8xl font-bold opacity-20">{project.number}</span>
      </div>
    </div>
    <div className="project-overlay absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 flex flex-col justify-end p-8">
      <div className="flex gap-2 mb-3">
        {project.tags.map((tag) => (
          <span key={tag} className={`px - 2 py - 1 ${project.tagBg} rounded text - xs`}>
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-400 mb-4">{project.description}</p>
      <div className="flex gap-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${project.linkColor} flex items - center gap - 1 text - sm`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Code
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${project.linkColor} flex items - center gap - 1 text - sm`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          {project.demoText}
        </a>
      </div>
    </div>
  </div>
);

export default ProjectCard;


