import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { SkillNode } from './SkillNode';
import { ProgressModal } from './ProgressModal';
import { TreeBackground } from './TreeBackground';
import { theme } from './theme';

export const SkillTree = ({ skillsData }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const fgRef = useRef();

  // Convert your MongoDB nested structure (Skill → Phases → Modules → Lessons)
  // into a simple node-link graph structure for the visualization
  useEffect(() => {
    if (!skillsData) return;

    const nodes = [];
    const links = [];

    skillsData.forEach(skill => {
      const skillId = `skill-${skill._id}`;
      nodes.push({
        id: skillId,
        name: skill.title,
        type: 'skill',
        progress: skill.progress,
      });

      skill.phases.forEach(phase => {
        const phaseId = `phase-${phase._id}`;
        nodes.push({
          id: phaseId,
          name: phase.title,
          type: 'phase',
          progress: phase.progress,
        });
        links.push({ source: skillId, target: phaseId });

        phase.modules.forEach(mod => {
          const moduleId = `module-${mod._id}`;
          nodes.push({
            id: moduleId,
            name: mod.title,
            type: 'module',
            progress: mod.progress,
          });
          links.push({ source: phaseId, target: moduleId });

          mod.lessons.forEach(lesson => {
            const lessonId = `lesson-${lesson._id}`;
            nodes.push({
              id: lessonId,
              name: lesson.title,
              type: 'lesson',
              progress: lesson.completed ? 100 : 0,
            });
            links.push({ source: moduleId, target: lessonId });
          });
        });
      });
    });

    setGraphData({ nodes, links });
  }, [skillsData]);

  // Dynamic node rendering
  const paintNode = (node, ctx) => {
    const radius = node.type === 'skill' ? 10 : node.type === 'phase' ? 7 : node.type === 'module' ? 5 : 3;
    const color = theme.nodeColors[node.type];
    const progressFill = theme.progressGradient(node.progress);

    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
    gradient.addColorStop(0, progressFill.start);
    gradient.addColorStop(1, progressFill.end);

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
  };

  return (
    <div className='relative w-full h-full bg-gradient-to-b from-[#000814] to-[#001d3d]'>
      <TreeBackground progress={skillsData?.progress || 0} />
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeCanvasObject={paintNode}
        nodeLabel={node => `${node.name} (${node.progress}%)`}
        linkColor={() => theme.linkColor}
        onNodeClick={node => {
          if (node.type === 'lesson' || node.type === 'module' || node.type === 'phase' || node.type === 'skill') {
            setSelectedSkill(node);
          }
        }}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        backgroundColor='transparent'
      />
      {selectedSkill && <ProgressModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
    </div>
  );
};
