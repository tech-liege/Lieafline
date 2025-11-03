export const SkillNode = ({ node }) => {
  const typeStyles = {
    skill: { color: '#00f5d4', size: 12 },
    phase: { color: '#00bbf9', size: 9 },
    module: { color: '#48cae4', size: 7 },
    lesson: { color: '#90e0ef', size: 5 },
  };

  const { color, size } = typeStyles[node.type] || {};
  return (
    <div
      style={{
        width: size * 2,
        height: size * 2,
        backgroundColor: color,
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      }}
      title={node.name}
    />
  );
};
