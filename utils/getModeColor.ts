export const getModeColor = (
  type: 'project' | 'study' | 'moco' | 'lesson' | '',
) => {
  switch (type) {
    case 'project':
      return '#0d6efd';
    case 'study':
      return '#f1e05a';
    case 'moco':
      return '#DA5B0B';
    case 'lesson':
      return '#178600';
    default:
      return '#000000';
  }
};
