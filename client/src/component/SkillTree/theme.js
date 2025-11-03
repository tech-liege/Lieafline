export const theme = {
  nodeColors: {
    skill: '#00f5d4',
    phase: '#00bbf9',
    module: '#48cae4',
    lesson: '#90e0ef',
  },
  linkColor: '#0077b6',
  progressGradient: progress => {
    const intensity = Math.min(1, progress / 100);
    return {
      start: `rgba(0, 255, 200, ${0.6 + intensity * 0.4})`,
      end: `rgba(0, 100, 255, ${0.3 + intensity * 0.3})`,
    };
  },
};
