import type { CollectionEntry } from 'astro:content';

const selection = [
  { id: 'rachel', summary: 'A family card game, now on iOS.' },
  { id: 'code198x', summary: 'Programming, game-making and computing history, explored through classic computers.' },
  { id: 'chaotic-tanx', summary: 'An artillery game; paused for refactoring.' },
];

export function getSelectedProjects(projects: CollectionEntry<'projects'>[]) {
  return selection.map(item => {
    const project = projects.find(project => project.id === item.id && !project.data.draft);
    if (!project) throw new Error(`Selected project is missing or unpublished: ${item.id}`);
    return { ...project, summary: item.summary };
  });
}

export function getProjectDestination(project: CollectionEntry<'projects'>) {
  if (project.id === 'rachel') {
    return { href: 'https://apps.apple.com/app/id6794358319', label: 'View on the App Store' };
  }
  if (!project.data.demo) return null;
  return {
    href: project.data.demo,
    label: project.id === 'code198x' ? 'Visit Code198x' : 'Visit project website',
  };
}
