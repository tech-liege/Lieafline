import React from 'react';

export const TreeBackground = ({ progress }) => {
  const stages = [
    { threshold: 0, bg: 'bg-gradient-to-b from-black via-[#000814] to-[#001d3d]' },
    { threshold: 30, bg: 'bg-gradient-to-b from-[#001d3d] via-[#002855] to-[#003566]' },
    { threshold: 60, bg: 'bg-gradient-to-b from-[#003566] via-[#004b8d] to-[#0077b6]' },
    { threshold: 90, bg: 'bg-gradient-to-b from-[#0077b6] via-[#0096c7] to-[#00b4d8]' },
  ];

  const current = stages.reduce((acc, s) => (progress >= s.threshold ? s : acc), stages[0]);

  return <div className={`absolute inset-0 -z-10 transition-all duration-700 ${current.bg}`} />;
};
